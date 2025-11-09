import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";
import { toast } from "sonner";

// 1. Definición del tipo seguro para el estado de respuestas
interface AnswersState {
  edad: number[];
  genero: string | undefined;
  sexoNacer: string | undefined;
  orientacion: string;
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

const InitialTest = () => {
  const navigate = useNavigate();
  // 2. Inicialización del estado con valores predeterminados (incluyendo todos los campos)
  const [answers, setAnswers] = useState<AnswersState>({
    edad: [18], // Inicializado como array de números para el Slider
    genero: undefined,
    sexoNacer: undefined,
    orientacion: "",
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
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Respuestas del test:", answers);
    // Nota: Aquí podrías añadir una validación para asegurar que todos los campos requeridos tengan valor.
    toast.success("Test completado. ¡Bienvenida a tu aprendizaje!");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
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
                  {/* El 'value' debe ser la propiedad del estado, no el valor del RadioGroup */}
                  <RadioGroup value={answers.genero} onValueChange={(value) => updateAnswer("genero", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mujer" id="gen-mujer" />
                      <Label htmlFor="gen-mujer" className="font-normal cursor-pointer">Mujer</Label>
                    </div>
                    {/* ... (otras opciones de RadioGroup) */}
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
                </div>

                {/* Sexo al nacer */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Al nacer ¿Qué sexo se te atribuyó?</Label>
                  <RadioGroup value={answers.sexoNacer} onValueChange={(value) => updateAnswer("sexoNacer", value)}>
                    {/* ... (opciones) */}
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
                </div>

                {/* Orientación sexual */}
                <div className="space-y-3">
                  <Label htmlFor="orientacion" className="text-base font-semibold">En cuanto a tu orientación sexual te consideras:</Label>
                  <Input 
                    id="orientacion" 
                    // Se usa answers.orientacion que se inicializó como ""
                    value={answers.orientacion} 
                    onChange={(e) => updateAnswer("orientacion", e.target.value)}
                    placeholder="Escribe tu respuesta"
                  />
                </div>

                {/* Edad con slider */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Tu edad en años es: {answers.edad[0]}</Label>
                  <Slider 
                    // El valor ahora siempre será answers.edad que es number[]
                    value={answers.edad} 
                    // updateAnswer maneja el tipo number[] correctamente
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
                      {/* El valor de SelectValue es answers.estado (string | undefined) */}
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
                    {/* ... (opciones) */}
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
                    {/* ... (opciones) */}
                    {[
                      "Latinoamericana", "Europea", "Blanca americana", "Africana",
                      "Asiática (ej. China, Coreana, Japonesa)", "Sur asiática (ej. India, Pakistaní, Sri Lanka)",
                      "Sudeste asiática (ej. Camboya, Indonesia, Vietnamita)", "Árabe",
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
                    {/* ... (opciones) */}
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
                    {/* ... (opciones) */}
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
                    {/* ... (opciones) */}
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
                      // Se usa answers.cualLengua que se inicializó como ""
                      value={answers.cualLengua} 
                      onChange={(e) => updateAnswer("cualLengua", e.target.value)}
                      placeholder="Escribe tu respuesta"
                    />
                  </div>
                )}

                {/* Estudios jefe/a hogar */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Pensando en la jefa o jefe de tu hogar, ¿Cuál fue el último año de estudios que aprobó en la escuela?</Label>
                  <RadioGroup value={answers.estudiosJefe} onValueChange={(value) => updateAnswer("estudiosJefe", value)}>
                    {/* ... (opciones) */}
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
                    {/* ... (opciones) */}
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
                  <Label className="text-base font-semibold">¿Cuántos automóviles o camionetas tienen en tu hogar?</Label>
                  <RadioGroup value={answers.autos} onValueChange={(value) => updateAnswer("autos", value)}>
                    {/* ... (opciones) */}
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
                    {/* ... (opciones) */}
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
                    {/* ... (opciones) */}
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
                    {/* ... (opciones) */}
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
                    {/* ... (opciones) */}
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
                    {/* ... (opciones) */}
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
                    <Label htmlFor="areasSalud" className="text-base font-semibold">¿Cuáles áreas de estudio?</Label>
                    <Input 
                      id="areasSalud" 
                      // Se usa answers.areasSalud que se inicializó como ""
                      value={answers.areasSalud} 
                      onChange={(e) => updateAnswer("areasSalud", e.target.value)}
                      placeholder="Escribe las áreas"
                    />
                  </div>
                )}

                {/* Trabajo en institución de salud */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">¿Trabajas en alguna institución de salud particular o pública?</Label>
                  <RadioGroup value={answers.trabajoSalud} onValueChange={(value) => updateAnswer("trabajoSalud", value)}>
                    {/* ... (opciones) */}
                    {["Sí", "No"].map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`tsalud-${opt}`} />
                        <Label htmlFor={`tsalud-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Actividad profesional en salud */}
                {answers.trabajoSalud === "Sí" && (
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">¿Qué descripción se ajusta mejor a tu actividad profesional en salud?</Label>
                    <RadioGroup value={answers.actividadSalud} onValueChange={(value) => updateAnswer("actividadSalud", value)}>
                      {/* ... (opciones) */}
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
                    className="w-full gradient-primary transition-quirona hover:opacity-90"
                    size="lg"
                  >
                    Completar test e ir al inicio
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InitialTest;