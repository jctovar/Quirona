import { getErrorMessage } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TestMenu } from "@/components/TestMenu";
import { markTestCompleted } from "@/lib/testProgress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/supabaseClient";

type Phase = "state-intro" | "state-questions" | "trait-intro" | "trait-questions" | "complete";
const stateQuestions = [
  "Me siento calmada.",
  "Me siento segura.",
  "Estoy tensa.",
  "Estoy contrariada.",
  "Estoy a gusto.",
  "Me siento alterada.",
  "Estoy preocupada actualmente por algún posible contratiempo.",
  "Me siento descansada.",
  "Me siento ansiosa.",
  "Me siento cómoda.",
  "Me siento con confianza en mí misma.",
  "Me siento nerviosa.",
  "Me siento agitada.",
  'Me siento "a punto de explotar".',
  "Me siento reposada.",
  "Me siento satisfecha.",
  "Estoy preocupada.",
  "Me siento muy excitada y aturdida.",
  "Me siento alegre.",
  "Me siento bien.",
];
const traitQuestions = [
  "Me siento bien.",
  "Me canso rápidamente.",
  "Siento ganas de llorar.",
  "Quisiera ser tan feliz como otros parecen serlo.",
  "Pierdo oportunidades por no poder decidirme rápidamente.",
  "Me siento descansada.",
  'Soy una persona "tranquila, serena y sosegada".',
  "Siento que las dificultades se me amontonan al punto de no poder superarlas.",
  "Me preocupo demasiado por cosas sin importancia.",
  "Soy feliz.",
  "Tomo las cosas muy a pecho.",
  "Me falta confianza en mí misma.",
  "Me siento segura.",
  "Procuro evitar enfrentarme a las crisis y dificultades.",
  "Me siento melancólica.",
  "Me siento satisfecha.",
  "Algunas ideas poco importantes pasan por mi mente y me molestan.",
  "Me afectan tanto los desengaños que no me los puede quitar de la cabeza.",
  "Soy una persona estable.",
  "Cuando pienso en mis preocupaciones actuales me pongo tensa y alterada.",
];
const stateOptions = [
  { value: "1", label: "No en lo absoluto" },
  { value: "2", label: "Un poco" },
  { value: "3", label: "Bastante" },
  { value: "4", label: "Mucho" },
];
const traitOptions = [
  { value: "1", label: "Casi nunca" },
  { value: "2", label: "Algunas veces" },
  { value: "3", label: "Frecuentemente" },
  { value: "4", label: "Casi siempre" },
];
interface QuestionItemProps {
  number: number;
  text: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}
const QuestionItem = ({ number, text, options, value, onChange }: QuestionItemProps) => (
  <div className="p-4 rounded-lg border border-border bg-card space-y-3">
    <p className="font-medium">
      <span className="text-primary font-bold mr-2">{number}.-</span>
      {text}
    </p>
    <RadioGroup value={value} onValueChange={onChange} className="flex flex-wrap gap-4">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={`q${number}-${option.value}`} />
          <Label htmlFor={`q${number}-${option.value}`} className="cursor-pointer text-sm">
            {option.value}. {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);
const AnxietyInventoryTest = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [phase, setPhase] = useState<Phase>("state-intro");
  const [stateAnswers, setStateAnswers] = useState<Record<number, string>>({});
  const [traitAnswers, setTraitAnswers] = useState<Record<number, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const updateStateAnswer = (index: number, value: string) => {
    setStateAnswers((prev) => ({ ...prev, [index]: value }));
  };
  const updateTraitAnswer = (index: number, value: string) => {
    setTraitAnswers((prev) => ({ ...prev, [index]: value }));
  };
  const handleStateSubmit = () => {
    const unanswered = stateQuestions.filter((_, i) => !stateAnswers[i]);
    if (unanswered.length > 0) {
      toast.error(`Por favor responde todas las preguntas. Faltan ${unanswered.length} por contestar.`);
      return;
    }
    setPhase("trait-intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- FUNCIÓN FINAL CON SUPABASE ---
  const handleTraitSubmit = async () => {
    const unanswered = traitQuestions.filter((_, i) => !traitAnswers[i]);
    if (unanswered.length > 0) {
      toast.error(`Por favor responde todas las preguntas. Faltan ${unanswered.length} por contestar.`);
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No se encontró sesión activa");

      // Convertimos los objetos de respuestas en arreglos ordenados de números
      const stateArray = stateQuestions.map((_, i) => parseInt(stateAnswers[i]));
      const traitArray = traitQuestions.map((_, i) => parseInt(traitAnswers[i]));

      const { error } = await supabase
        .from('anxiety_inventory_responses')
        .upsert({
          id: user.id,
          state_answers: stateArray,
          trait_answers: traitArray,
          is_completed: true,
          updated_at: new Date()
        });

      if (error) throw error;

      toast.success("¡Inventario guardado con éxito!");
      markTestCompleted("anxiety");
      setPhase("complete");
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
      toast.error("Error al guardar: " + getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  // Redirigir al siguiente test: Escala de Asertividad
  const handleNext = () => {
    navigate("/assertiveness-scale");
  };

  if (showMenu) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Navbar isAuthenticated />
        <TestMenu currentTest="anxiety" onStart={() => setShowMenu(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      <main className="container mx-auto pt-48 pb-8 px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">
              Cuestionario 3: Inventario Ansiedad Rasgo-Estado
            </CardTitle>
            {(phase === "state-intro" || phase === "state-questions") && (
              <CardDescription className="text-lg">Parte 1: Estado de ansiedad</CardDescription>
            )}
            {(phase === "trait-intro" || phase === "trait-questions") && (
              <CardDescription className="text-lg">Parte 2: Rasgo de ansiedad</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* State Intro */}
            {phase === "state-intro" && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Instrucciones</h3>
                  <p className="text-muted-foreground">
                    A continuación encontrarás algunas expresiones que la gente usa para describirse.
                    Lee cada frase y elige la opción que indique cómo te sientes <strong>ahora mismo</strong>,
                    o sea, en este momento.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {stateOptions.map((opt) => (
                      <div key={opt.value} className="bg-card border border-border rounded-lg p-3 text-center">
                        <span className="block text-lg font-bold text-primary">{opt.value}</span>
                        <span className="text-xs text-muted-foreground">{opt.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    No hay respuestas correctas o incorrectas. No pienses mucho en cada frase,
                    pero trata de dar las respuestas que mejor describan tus sentimientos ahora.
                  </p>
                </div>
                <Button
                  onClick={() => setPhase("state-questions")}
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Comenzar
                </Button>
              </div>
            )}
            {/* State Questions */}
            {phase === "state-questions" && (
              <div className="space-y-4">
                {stateQuestions.map((question, index) => (
                  <QuestionItem
                    key={index}
                    number={index + 1}
                    text={question}
                    options={stateOptions}
                    value={stateAnswers[index] || ""}
                    onChange={(value) => updateStateAnswer(index, value)}
                  />
                ))}
                <Button
                  onClick={handleStateSubmit}
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Continuar a la Parte 2
                </Button>
              </div>
            )}
            {/* Trait Intro */}
            {phase === "trait-intro" && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Instrucciones</h3>
                  <p className="text-muted-foreground">
                    A continuación encontrarás algunas expresiones que la gente usa para describirse.
                    Lee cada frase y elige la opción que indique cómo te sientes <strong>generalmente</strong>.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {traitOptions.map((opt) => (
                      <div key={opt.value} className="bg-card border border-border rounded-lg p-3 text-center">
                        <span className="block text-lg font-bold text-primary">{opt.value}</span>
                        <span className="text-xs text-muted-foreground">{opt.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    No hay contestaciones buenas o malas. No emplee mucho tiempo en cada frase,
                    pero trate de dar la respuesta que mejor describa cómo se siente generalmente.
                  </p>
                </div>
                <Button
                  onClick={() => setPhase("trait-questions")}
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Comenzar Parte 2
                </Button>
              </div>
            )}
            {/* Trait Questions */}
            {phase === "trait-questions" && (
              <div className="space-y-4">
                {traitQuestions.map((question, index) => (
                  <QuestionItem
                    key={index}
                    number={index + 21}
                    text={question}
                    options={traitOptions}
                    value={traitAnswers[index] || ""}
                    onChange={(value) => updateTraitAnswer(index, value)}
                  />
                ))}
                <Button
                  onClick={handleTraitSubmit}
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Pasar al siguiente cuestionario
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
                <h3 className="text-xl font-semibold">¡Inventario completado!</h3>
                <p className="text-muted-foreground">
                  Has completado exitosamente el Inventario de Ansiedad Rasgo-Estado.
                </p>
                <Button
                  onClick={handleNext}
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Pasar al siguiente test
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowMenu(true)}
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
export default AnxietyInventoryTest;
