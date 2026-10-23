import { getErrorMessage } from "@/lib/utils";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { markTestCompleted } from "@/lib/testProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

// 1. Definición del tipo seguro para el estado de respuestas
interface AnswersState {
  edad: number[];
  genero: string | undefined;
  sexoNacer: string | undefined;
  orientacion: string | undefined;
  orientacionOtra: string;
  estado: string | undefined;
  estudios: string | undefined;
  trasfondo: string | undefined;
  afromexicana: string | undefined;
  indigena: string | undefined;
  lenguaIndigena: string | undefined;
  cualLengua: string;
  estudiosJefe: string | undefined;
  banos: string | undefined;
  autos: string | undefined;
  internet: string | undefined;
  trabajadores: string | undefined;
  cuartos: string | undefined;
  consultaGine: string | undefined;
  estudiosSalud: string | undefined;
  areasSalud: string;
  trabajoSalud: string | undefined;
  actividadSalud: string | undefined;
}

/**
 * Test sociodemográfico inicial.
 *
 * Guarda una fila en `initial_test_responses` y marca el test en localStorage.
 * Después continúa con el cuestionario de redes semánticas. Las preguntas
 * condicionales (orientación “Otra”, lengua indígena y área de salud) solo se
 * validan cuando la respuesta anterior las activa.
 */
const InitialTest = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [answers, setAnswers] = useState<AnswersState>({
    edad: [18], // Inicializado como array de números para el Slider
    genero: undefined,
    sexoNacer: undefined,
    orientacion: undefined,
    orientacionOtra: "",
    estado: undefined,
    estudios: undefined,
    trasfondo: undefined,
    afromexicana: undefined,
    indigena: undefined,
    lenguaIndigena: undefined,
    cualLengua: "",
    estudiosJefe: undefined,
    banos: undefined,
    autos: undefined,
    internet: undefined,
    trabajadores: undefined,
    cuartos: undefined,
    consultaGine: undefined,
    estudiosSalud: undefined,
    areasSalud: "",
    trabajoSalud: undefined,
    actividadSalud: undefined,
  });

  const estados = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
    "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Guanajuato",
    "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos", "Nayarit",
    "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí",
    "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
  ];


  // 3. Función de actualización con tipado para la clave
  const updateAnswer = <K extends keyof AnswersState>(key: K, value: AnswersState[K]) => {
    setAnswers(prev => ({ ...prev, [key]: value } as AnswersState));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Claves de `AnswersState` que deben tener respuesta antes de guardar.
    const camposObligatorios: (keyof AnswersState)[] = [
      "genero", "sexoNacer", "orientacion", "estado", "estudios", 
      "trasfondo", "afromexicana", "indigena", "lenguaIndigena", 
      "estudiosJefe", "banos", "autos", "internet", 
      "trabajadores", "cuartos", "consultaGine", "estudiosSalud"
    ];

    // Validación general de campos obligatorios.
    for (const campo of camposObligatorios) {
      if (answers[campo] === undefined || answers[campo] === "") {
        toast.error("Por favor, responde todas las preguntas antes de continuar.");
        return; // Detiene la función si falta algo
      }
    }

    // Validaciones condicionales: solo aplican si la respuesta anterior las
    // activa (“Otra”, “Sí”).

    if (answers.orientacion === "Otra" && !answers.orientacionOtra?.trim()) {
      toast.error("Por favor, especifica tu orientación sexual.");
      return;
    }

    if (answers.lenguaIndigena === "Sí" && !answers.cualLengua?.trim()) {
      toast.error("Por favor, escribe qué lengua indígena hablas.");
      return;
    }

    if (answers.estudiosSalud === "Sí") {
      if (!answers.trabajoSalud || !answers.actividadSalud) {
        toast.error("Por favor, completa la información sobre tu área de salud.");
        return;
      }
    }

    setIsSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("No se encontró una sesión activa.");

      const { error } = await supabase
        .from('initial_test_responses')
        .upsert({
          id: user.id,
          edad: answers.edad[0], // Extraemos el número del array del Slider
          genero: answers.genero,
          sexo_nacer: answers.sexoNacer,
          orientacion: answers.orientacion,
          orientacion_otra: answers.orientacionOtra,
          estado: answers.estado,
          estudios: answers.estudios,
          trasfondo: answers.trasfondo,
          afromexicana: answers.afromexicana,
          indigena: answers.indigena,
          lengua_indigena: answers.lenguaIndigena,
          cual_lengua: answers.cualLengua,
          estudios_jefe: answers.estudiosJefe,
          banos: answers.banos,
          autos: answers.autos,
          internet: answers.internet,
          trabajadores: answers.trabajadores,
          cuartos: answers.cuartos,
          consulta_gine: answers.consultaGine,
          estudios_salud: answers.estudiosSalud,
          areas_salud: answers.areasSalud,
          trabajo_salud: answers.trabajoSalud,
          actividad_salud: answers.actividadSalud,
          is_completed: true,
          updated_at: new Date()
        });

      if (error) throw error;

      toast.success("¡Test completado con éxito!");

      try {
        markTestCompleted("initial-test");
      } catch {
        console.warn("No se pudo actualizar el progreso localmente, pero se guardó en la nube.");
      }

      // El siguiente instrumento es la red semántica.
      navigate("/semantic-network-test");

    } catch (error) {
      toast.error("Error al guardar: " + getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="shadow-quirona border-2">
            <CardHeader className="text-center">
              <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold">Test inicial</CardTitle>
              <CardDescription className="text-base">
                A continuación te realizaremos una serie de preguntas sobre ti, tu vida y sobre tu salud. Por favor, respóndelas de la manera más honesta posible. Tus respuestas nos permitirán conocerte mejor, evaluar nuestro trabajo y saber si esta intervención resulta benéfica para ti.
              </CardDescription>
              <p className="text-sm font-semibold mt-4">Para empezar, queremos saber algunos datos sobre ti.</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Identidad de género */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">En cuanto a tu género, te identificas como:</Label>
                  <RadioGroup value={answers.genero} onValueChange={(value) => updateAnswer("genero", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mujer" id="gen-mujer" />
                      <Label htmlFor="gen-mujer" className="font-normal cursor-pointer">Mujer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hombre" id="gen-hombre" />
                      <Label htmlFor="gen-hombre" className="font-normal cursor-pointer">Hombre</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="otra" id="gen-otra" />
                      <Label htmlFor="gen-otra" className="font-normal cursor-pointer">Otra identidad</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefiero-no-decir" id="gen-no" />
                      <Label htmlFor="gen-no" className="font-normal cursor-pointer">Prefiero no decir</Label>
                    </div>
                  </RadioGroup>
                  {answers.genero === "hombre" && (
                    <div className="bg-black-50 dark:bg-black-950/30 border border-black-200 dark:border-black-800 p-4 rounded-lg flex gap-3 mt-3 animate-in fade-in slide-in-from-top-2">
                      <AlertCircle className="h-5 w-5 text-black-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-black-900 dark:text-black-200">Aviso importante</p>
                        <p className="text-sm text-black-800 dark:text-black-300">Queremos ser muy claros desde el inicio, porque creemos que la honestidad es la base de cualquier espacio de cuidado.</p>
                        <p className="text-sm text-black-800 dark:text-black-300">Este proyecto se encuentra en una fase inicial. Los contenidos que vas a encontrar fueron ideados y diseñados originalmente pensando en las experiencias de <span className="font-semibold">mujeres cisgenero.</span></p>
                        <p className="font-semibold text-black-800 dark:text-black-200 text-sm">¿Qué implica esto?</p>
                        <p className="text-sm text-black-800 dark:text-black-300">Es probable que los contenidosno reflejen plenamente las experiencias de hombres trans, mujeres trans u hombres cisgénero.</p>
                        <p className="text-sm text-black-800 dark:text-black-300">Si perteneces a alguno de estos grupos, es posible que sientas que hay aspectos de tu vivencia no contemplados. Y tendrás razón. </p>
                        <p className="text-sm text-black-800 dark:text-black-300">Dicho esto, <span className="font-semibold">todas las personas son bienvenidas</span> Nos alegra que estés aquí por curiosidad, aprendizaje o apoyo.</p>
                        <p className="text-sm text-black-800 dark:text-black-300">Estamos trabajando para que este proyecto crezca y ofrecerte información según tu realidad:</p>
                        <p className="text-sm text-black-800 dark:text-black-300 font-semibold">Hombre trans</p>
                        <p className="text-sm text-black-800 dark:text-black-300 font-semibold">Mujer trans</p>
                        <p className="text-sm text-black-800 dark:text-black-300 font-semibold">Hombre cis</p>
                        <p className="text-sm text-black-800 dark:text-black-300">Gracias por tu disposición a acompañarnos en este camino. Estamos aprendiendo contigo.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sexo al nacer */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Al nacer ¿Qué sexo se te atribuyó?</Label>
                  <RadioGroup value={answers.sexoNacer} onValueChange={(value) => updateAnswer("sexoNacer", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mujer" id="sexo-mujer" />
                      <Label htmlFor="sexo-mujer" className="font-normal cursor-pointer">Mujer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hombre" id="sexo-hombre" />
                      <Label htmlFor="sexo-hombre" className="font-normal cursor-pointer">Hombre</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefiero-no-decir" id="sexo-no" />
                      <Label htmlFor="sexo-no" className="font-normal cursor-pointer">Prefiero no decir</Label>
                    </div>
                  </RadioGroup>
                  {answers.sexoNacer && answers.sexoNacer !== "mujer" && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-lg flex gap-3 mt-3 animate-in fade-in slide-in-from-top-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                        <strong>Nota Informativa:</strong> Actualmente, los contenidos y materiales educativos de la plataforma QUIRONA han sido diseñados específicamente para el sexo femenino. Agradecemos tu interés y comprensión.
                      </p>
                    </div>
                  )}
                </div>

                {/* Orientación sexual */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">En cuanto a tu orientación sexual te consideras:</Label>
                  <RadioGroup value={answers.orientacion} onValueChange={(value) => updateAnswer("orientacion", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Heterosexual" id="ori-heterosexual" />
                      <Label htmlFor="ori-heterosexual" className="font-normal cursor-pointer">Heterosexual: Atracción hacia personas del sexo opuesto.</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Homosexual" id="ori-homosexual" />
                      <Label htmlFor="ori-homosexual" className="font-normal cursor-pointer">Homosexual: Atracción hacia personas del mismo sexo (gays o lesbianas).</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Bisexual" id="ori-bisexual" />
                      <Label htmlFor="ori-bisexual" className="font-normal cursor-pointer">Bisexual: Atracción hacia personas de más de un género o sexo.</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Pansexual" id="ori-pansexual" />
                      <Label htmlFor="ori-pansexual" className="font-normal cursor-pointer">Pansexual: Atracción hacia personas sin importar su género o sexo.</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Asexual" id="ori-asexual" />
                      <Label htmlFor="ori-asexual" className="font-normal cursor-pointer">Asexual: No experimenta atracción sexual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Otra" id="ori-otra" />
                      <Label htmlFor="ori-otra" className="font-normal cursor-pointer">Otra</Label>
                    </div>
                  </RadioGroup>
                  {answers.orientacion === "Otra" && (
                    <div className="space-y-3">
                      <Label htmlFor="orientacionOtra" className="text-base font-semibold">Especifica tu orientación sexual:</Label>
                      <Input 
                        id="orientacionOtra" 
                        value={answers.orientacionOtra || ""} 
                        onChange={(e) => updateAnswer("orientacionOtra", e.target.value)}
                        placeholder="Escribe tu respuesta"
                      />
                    </div>
                  )}
                </div>

                {/* Edad con slider */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Tu edad en años es: {answers.edad?.[0] || 18}</Label>
                  <Slider 
                    value={answers.edad || [18]} 
                    onValueChange={(value) => updateAnswer("edad", value)}
                    min={10}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Estado */}
                <div className="space-y-3">
                  <Label htmlFor="estado" className="text-base font-semibold">¿En qué Estado de la República vives?</Label>
                  <Select value={answers.estado} onValueChange={(value) => updateAnswer("estado", value)}>
                    <SelectTrigger id="estado">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estados.map(estado => (
                        <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Grado de estudios */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">¿Cuál es tu último grado de estudios?</Label>
                  <RadioGroup value={answers.estudios} onValueChange={(value) => updateAnswer("estudios", value)}>
                    {["Primaria", "Secundaria", "Preparatoria", "Universidad", "Posgrado"].map(nivel => (
                      <div key={nivel} className="flex items-center space-x-2">
                        <RadioGroupItem value={nivel} id={`est-${nivel}`} />
                        <Label htmlFor={`est-${nivel}`} className="font-normal cursor-pointer">{nivel}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Trasfondo cultural */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Muchas personas que viven en México tienen diferentes trasfondos de origen y cultural. De los siguientes ¿Qué trasfondo cultural y de origen aplica mejor a ti?</Label>
                  <RadioGroup value={answers.trasfondo} onValueChange={(value) => updateAnswer("trasfondo", value)}>
                    {[
                      "Latinoamericana", "Europea", "Blanca americana", "Africana",
                      "Asiática (ej. China, Coreana, Japonesa)", "Sur asiática (ej. Indi, Pakistaní, Sri Lanka)",
                      "Sudeste asiática (ej. Cambodí, Indonesia, Vietnamita)", "Árabe",
                      "Multicultural (ej. origen de dos o más de las anteriores)"
                    ].map(origen => (
                      <div key={origen} className="flex items-center space-x-2">
                        <RadioGroupItem value={origen} id={`tras-${origen}`} />
                        <Label htmlFor={`tras-${origen}`} className="font-normal cursor-pointer">{origen}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Afromexicana */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Por tus antepasados y de acuerdo con tus costumbres y tradiciones, ¿te consideras afromexicana, negra o afrodescendiente?</Label>
                  <RadioGroup value={answers.afromexicana} onValueChange={(value) => updateAnswer("afromexicana", value)}>
                    {["Sí", "No", "No lo sé"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`afro-${opt}`} />
                        <Label htmlFor={`afro-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Indígena */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">De acuerdo a tus costumbres y tradiciones, ¿te consideras indígena?</Label>
                  <RadioGroup value={answers.indigena} onValueChange={(value) => updateAnswer("indigena", value)}>
                    {["Sí", "No", "No lo sé"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`ind-${opt}`} />
                        <Label htmlFor={`ind-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Lengua indígena */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">¿Hablas alguna lengua indígena?</Label>
                  <RadioGroup value={answers.lenguaIndigena} onValueChange={(value) => updateAnswer("lenguaIndigena", value)}>
                    {["Sí", "No", "No lo sé"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`lengua-${opt}`} />
                        <Label htmlFor={`lengua-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Cuál lengua */}
                {answers.lenguaIndigena === "Sí" && (
                  <div className="space-y-3">
                    <Label htmlFor="cualLengua" className="text-base font-semibold">¿Qué dialecto o lengua indígena hablas?</Label>
                    <Input 
                      id="cualLengua" 
                      value={answers.cualLengua || ""} 
                      onChange={(e) => updateAnswer("cualLengua", e.target.value)}
                      placeholder="Escribe tu respuesta"
                    />
                  </div>
                )}

                {/* Estudios jefe/a hogar */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Pensando en la jefa o jefe de tu hogar, ¿Cuál fue el último año de estudios que aprobó en la escuela?</Label>
                  <RadioGroup value={answers.estudiosJefe} onValueChange={(value) => updateAnswer("estudiosJefe", value)}>
                    {[
                      "No estudió", "Primaria Incompleta", "Primaria Completa", "Secundaria Incompleta",
                      "Secundaria Completa", "Carrera comercial", "Carrera técnica", "Preparatoria Incompleta",
                      "Preparatoria Completa", "Licenciatura Incompleta", "Licenciatura Completa",
                      "Diplomado o maestría", "Doctorado"
                    ].map(nivel => (
                      <div key={nivel} className="flex items-center space-x-2">
                        <RadioGroupItem value={nivel} id={`jefe-${nivel}`} />
                        <Label htmlFor={`jefe-${nivel}`} className="font-normal cursor-pointer">{nivel}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Baños */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">¿Cuántos baños completos con regadera y W.C. (excusado) hay en tu vivienda?</Label>
                  <RadioGroup value={answers.banos} onValueChange={(value) => updateAnswer("banos", value)}>
                    {["0", "1", "2 o más"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`bano-${opt}`} />
                        <Label htmlFor={`bano-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Automóviles */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">¿Cuántos automóviles o camionetas tienen en tu hogar, incluyendo camionetas cerradas, o con cabina o caja?</Label>
                  <RadioGroup value={answers.autos} onValueChange={(value) => updateAnswer("autos", value)}>
                    {["0", "1", "2 o más"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`auto-${opt}`} />
                        <Label htmlFor={`auto-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Internet */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Sin tomar en cuenta la conexión móvil que pudieras tener desde algún celular ¿tu hogar cuenta con internet?</Label>
                  <RadioGroup value={answers.internet} onValueChange={(value) => updateAnswer("internet", value)}>
                    {["Sí tiene", "No tiene"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`int-${opt}`} />
                        <Label htmlFor={`int-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Personas que trabajan */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">De todas las personas de 14 años o más que viven en el hogar, ¿Cuántas trabajaron en el último mes?</Label>
                  <RadioGroup value={answers.trabajadores} onValueChange={(value) => updateAnswer("trabajadores", value)}>
                    {["0", "1", "2", "3", "4 o más"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`trab-${opt}`} />
                        <Label htmlFor={`trab-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Cuartos para dormir */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">En tu vivienda, ¿Cuántos cuartos se usan para dormir, sin contar pasillos ni baños?</Label>
                  <RadioGroup value={answers.cuartos} onValueChange={(value) => updateAnswer("cuartos", value)}>
                    {["0", "1", "2", "3", "4 o más"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`cuart-${opt}`} />
                        <Label htmlFor={`cuart-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Consulta ginecológica */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Al día de hoy ¿has asistido alguna vez a una consulta ginecológica o recibido atención ginecológica?</Label>
                  <RadioGroup value={answers.consultaGine} onValueChange={(value) => updateAnswer("consultaGine", value)}>
                    {["Sí", "No"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`gine-${opt}`} />
                        <Label htmlFor={`gine-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Estudios en salud */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">¿Tienes estudios en alguna área de la salud como medicina, enfermería, psicología, optometría, odontología, partera o doula?</Label>
                  <RadioGroup value={answers.estudiosSalud} onValueChange={(value) => updateAnswer("estudiosSalud", value)}>
                    {["Sí", "No"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`esalud-${opt}`} />
                        <Label htmlFor={`esalud-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Área de estudios en salud */}
                {answers.estudiosSalud === "Sí" && (
                  <div className="space-y-3">
                  <Label className="text-base font-semibold">¿Trabajas en alguna institución de salud particular o pública?</Label>
                  <RadioGroup value={answers.trabajoSalud} onValueChange={(value) => updateAnswer("trabajoSalud", value)}>
                    {["Sí", "No"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`tsalud-${opt}`} />
                        <Label htmlFor={`tsalud-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                )}


                {/* Actividad profesional en salud */}
                {answers.estudiosSalud === "Sí" && (
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">¿Qué descripción se ajusta mejor a tu actividad profesional en salud?</Label>
                    <RadioGroup value={answers.actividadSalud} onValueChange={(value) => updateAnswer("actividadSalud", value)}>
                      {[
                        "Estudiante de medicina", "Estudiante de enfermería", "Estudiante en otra área de la salud",
                        "Médico general", "Médico especialista", "Ginecólogo/obstetra", "Médico cirujano",
                        "Enfermera/o profesional", "Enfermera/o familiar", "Enfermera/o pediátrica", "Enfermera/o geriátrica",
                        "Partera con conocimientos tradicionales", "Partera con formación profesional", "Paramédico/a",
                        "Nutricionista", "Psicólogo", "Fisioterapeuta", "Odontólogo", "Optometrista"
                      ].map(act => (
                        <div key={act} className="flex items-center space-x-2">
                          <RadioGroupItem value={act} id={`act-${act}`} />
                          <Label htmlFor={`act-${act}`} className="font-normal cursor-pointer">{act}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                <div className="pt-4">
                  <Button 
                    type="submit"
                    disabled={isSaving}
                    className="w-full gradient-primary transition-quirona hover:opacity-90"
                    size="lg"
                  >
                    {isSaving ? "Guardando..." : "Pasar al siguiente test"}
                  </Button>
                </div>
              </form>
              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                  navigate("/initial-question");
                }}
              >
                Regresar al menú de test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InitialTest;