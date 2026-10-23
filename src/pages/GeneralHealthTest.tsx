import { getErrorMessage } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { markTestCompleted } from "@/lib/testProgress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/supabaseClient";

type Phase = "intro" | "ghq" | "mini" | "complete";
interface GHQItem {
  question: string;
  options: string[];
}
const ghqItems: GHQItem[] = [
  { question: "¿Te has sentido bien y con buena salud?", options: ["Mejor que antes", "Igual que antes", "Peor que antes", "Mucho peor que antes"] },
  { question: "¿Te has sentido agotada y sin fuerza para nada?", options: ["No", "Como antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has tenido la sensación de estar enferma?", options: ["No", "Como antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has tenido dolores de cabeza?", options: ["No", "Como antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has tenido pesadez en la cabeza o la sensación de que la cabeza te va a estallar?", options: ["No", "Como antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has tenido bochornos o escalofríos?", options: ["No", "Como antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Te despiertas demasiado temprano y no te puedes volver a dormir?", options: ["No", "Como antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Te has sentido llena de vida y energía?", options: ["Más que antes", "Igual que antes", "Menos que antes", "Mucho menos que antes"] },
  { question: "¿Has tenido dificultad para dormirte o conciliar el sueño?", options: ["No", "Como antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has tenido dificultad para dormir toda la noche sin despertar hasta la mañana siguiente?", options: ["No", "Como antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has pasado noches inquietas o intranquilas?", options: ["No", "Como antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has sentido que por lo general, haces las cosas bien?", options: ["Más que antes", "Igual que antes", "Menos que antes", "Mucho menos que antes"] },
  { question: "¿Te has sentido satisfecha con tu manera de hacer las cosas?", options: ["Más que antes", "Igual que antes", "Menos que antes", "Mucho menos que antes"] },
  { question: "¿Sientes cariño y afecto por los que te rodean?", options: ["Más que antes", "Igual que antes", "Menos que antes", "Mucho menos que antes"] },
  { question: "¿Te llevas bien con los demás?", options: ["Mejor que antes", "Igual que antes", "Peor que antes", "Mucho peor que antes"] },
  { question: "¿Has sentido que estás jugando un papel útil en la vida?", options: ["Más que antes", "Igual que antes", "Menos que antes", "Mucho menos que antes"] },
  { question: "¿Te has sentido capaz de tomar decisiones?", options: ["Más que antes", "Igual que antes", "Menos que antes", "Mucho menos que antes"] },
  { question: "¿Te sientes incapaz de resolver tus problemas?", options: ["No, para nada", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Disfrutas tus actividades diarias?", options: ["Más que antes", "Igual que antes", "Menos que antes", "Mucho menos que antes"] },
  { question: "¿Te has sentido irritada y de mal humor?", options: ["No, para nada", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Te has sentido asustada y con mucho miedo sin que haya una razón?", options: ["No", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Te has sentido triste y deprimida?", options: ["No, para nada", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has perdido confianza y fe en ti misma?", options: ["No, para nada", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has pensado que tú no vales nada?", options: ["No, para nada", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Sientes que no se puede esperar nada de la vida?", options: ["No, para nada", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Te has sentido nerviosa a punto de estallar constantemente?", options: ["No", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has pensado en la posibilidad de quitarte la vida?", options: ["No", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has notado que a veces no puedes hacer nada por lo nerviosa que estás?", options: ["No", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has deseado estar muerta y lejos de todo?", options: ["No", "No más que antes", "Más que antes", "Mucho más que antes"] },
  { question: "¿Has notado que la idea de quitarte la vida viene repetidamente a tu mente?", options: ["No", "No más que antes", "Más que antes", "Mucho más que antes"] },
];
const miniQuestions = [
  "Durante este último mes ¿Has pensado que sería mejor morirse o has deseado estar muerta?",
  "Durante este último mes ¿Has querido hacerte daño o te has hecho daño (por ejemplo cortes en tu piel, golpearte, consumir medicamentos sin prescripción, quemarte)?",
  "Durante este último mes ¿Has pensado en el suicidio?",
  "Durante este último mes ¿Has planeado suicidarte?",
  "Durante este último mes ¿Has intentado suicidarte?",
  "A lo largo de tu vida ¿Alguna vez has intentado suicidarte?",
];
const GeneralHealthTest = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [ghqAnswers, setGhqAnswers] = useState<Record<number, string>>({});
  const [miniAnswers, setMiniAnswers] = useState<Record<number, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const updateGhq = (i: number, v: string) => setGhqAnswers((p) => ({ ...p, [i]: v }));
  const updateMini = (i: number, v: string) => setMiniAnswers((p) => ({ ...p, [i]: v }));
  const handleGhqSubmit = () => {
    const missing = ghqItems.filter((_, i) => ghqAnswers[i] === undefined);
    if (missing.length > 0) {
      toast.error(`Faltan ${missing.length} preguntas por contestar.`);
      return;
    }
    setPhase("mini");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleMiniSubmit = async () => {
    const missing = miniQuestions.filter((_, i) => miniAnswers[i] === undefined);
    if (missing.length > 0) {
      toast.error(`Faltan ${missing.length} preguntas por contestar.`);
      return;
    }

    setIsSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Sesión no encontrada");

      // 1. Detectar Riesgo
      const hasRisk = Object.values(miniAnswers).some((v) => v === "si");

      // 2. Preparar datos
      const ghqArray = ghqItems.map((_, i) => parseInt(ghqAnswers[i]));
      const miniArray = miniQuestions.map((_, i) => miniAnswers[i]);

      // 3. Guardar en Supabase
      const { error } = await supabase
        .from('general_health_responses')
        .upsert({
          id: user.id,
          ghq_answers: ghqArray,
          mini_answers: miniArray,
          sent_to_derivation: hasRisk,
          is_completed: true,
          updated_at: new Date()
        });

      if (error) throw error;

      // 4. Lógica de Navegación Condicional
      if (hasRisk) {
        // Redirección de la que no se puede regresar (replace: true)
        navigate("/derivacion", { replace: true });
      } else {
        toast.success("¡Evaluación de salud completada!");
        markTestCompleted("general-health");
        setPhase("complete");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

    } catch (error) {
      toast.error("Error al guardar: " + getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      <main className="container mx-auto pt-48 pb-8 px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">
              Cuestionario 6: Cuestionario General de Salud (GHQ-30)
            </CardTitle>
            <CardDescription className="text-lg">
              Evalúa tu estado general de salud
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Intro */}
            {phase === "intro" && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Instrucciones</h3>
                  <p className="text-muted-foreground">
                    Este cuestionario evalúa tu estado general de salud, identificando si en estos momentos
                    presentas malestar psicológico. Contesta de forma individual y sincera. Todas las preguntas
                    se refieren exclusivamente a cómo te has sentido en las <strong>dos últimas semanas</strong>.
                    Selecciona la respuesta que consideres más adecuada para ti.
                  </p>
                </div>
                <Button onClick={() => setPhase("ghq")} className="w-full gradient-primary" size="lg">
                  Comenzar
                </Button>
              </div>
            )}
            {/* GHQ-30 Questions */}
            {phase === "ghq" && (
              <div className="space-y-4">
                {ghqItems.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border bg-card space-y-3">
                    <p className="font-medium">
                      <span className="text-primary font-bold mr-2">{index + 1}.-</span>
                      {item.question}
                    </p>
                    <RadioGroup
                      value={ghqAnswers[index] ?? ""}
                      onValueChange={(v) => updateGhq(index, v)}
                      className="grid gap-2"
                    >
                      {item.options.map((opt, oi) => (
                        <div key={oi} className="flex items-center space-x-2">
                          <RadioGroupItem value={String(oi)} id={`ghq-${index}-${oi}`} />
                          <Label htmlFor={`ghq-${index}-${oi}`} className="cursor-pointer text-sm">
                            <span className="font-semibold mr-1">{oi}:</span> {opt}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
                <Button onClick={handleGhqSubmit} className="w-full gradient-primary" size="lg">
                  Continuar a la siguiente sección
                </Button>
              </div>
            )}
            {/* MINI - Suicide Risk */}
            {phase === "mini" && (
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  
                  <p className="text-muted-foreground text-sm">
                    Por favor responde con sinceridad las siguientes preguntas.
                  </p>
                </div>
                {miniQuestions.map((q, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border bg-card space-y-3">
                    <p className="font-medium">
                      <span className="text-primary font-bold mr-2">{index + 1}.-</span>
                      {q}
                    </p>
                    <RadioGroup
                      value={miniAnswers[index] ?? ""}
                      onValueChange={(v) => updateMini(index, v)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id={`mini-${index}-si`} />
                        <Label htmlFor={`mini-${index}-si`} className="cursor-pointer text-sm font-medium">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`mini-${index}-no`} />
                        <Label htmlFor={`mini-${index}-no`} className="cursor-pointer text-sm font-medium">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
                <Button onClick={handleMiniSubmit} disabled={isSaving} className="w-full gradient-primary" size="lg">
                  {isSaving ? "Guardando..." : "Finalizar cuestionario"}
                </Button>
              </div>
            )}
            {/* Complete */}
            {phase === "complete" && (
              <div className="space-y-6 text-center py-8">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/initial-question")}
                >
                  Regresar al menú de test
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
export default GeneralHealthTest;
