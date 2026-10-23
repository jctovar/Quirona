import { getErrorMessage } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TestMenu } from "@/components/TestMenu";
import { markTestCompleted } from "@/lib/testProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/supabaseClient";

type Phase = "intro" | "questions" | "complete";
interface Section {
  header: string;
  items: string[];
}
const sections: Section[] = [
  {
    header: "Cuando estoy en consulta y el médico:",
    items: [
      "Se equivoca, yo acabo pidiendo disculpas sabiendo que yo tengo la razón.",
      "Me falta al respeto, me quedo callada.",
      "Me explica algo que no entiendo, prefiero preguntarle a algún conocido.",
      "Atiende a una persona que llegó después que yo, prefiero quedarme callada.",
      "Me deja con dudas, prefiero dejarlas para la siguiente cita.",
      "Me trata mal, me es difícil decirle que debe respetarme.",
      "Me habla, yo me encojo.",
      "Me dice algo con lo que no estoy de acuerdo, prefiero quedarme callada.",
      "Termina la consulta, me siento frustrada.",
    ],
  },
  {
    header: "Cuando estoy en consulta y el médico:",
    items: [
      "Me habla, siento que mis manos tiemblan.",
      "Y yo hablamos, tengo mis manos tensas.",
      "Me pregunta algo y contesto, siento que mi voz es temblorosa.",
      "Me pregunta algo, me siento insegura.",
      "Me dice algo que no entiendo, me dan ganas de irme de ese lugar.",
    ],
  },
  {
    header: "Cuando estoy en consulta y el médico:",
    items: [
      "Me habla con palabras que no entiendo, le pido me explique de otra forma.",
      "No me pregunta algo que yo considero es importante, se lo digo.",
      "Me dice algo con lo que no estoy de acuerdo, se lo hago saber.",
      "Me pide la opinión sobre un tema, le digo lo que realmente pienso.",
    ],
  },
  {
    header: "Cuando estoy en consulta y el médico:",
    items: [
      "Y yo tenemos un desacuerdo, noto que subo el volumen de mi voz o grito.",
      "Me dice algo con lo que no estoy de acuerdo, soy sarcástica.",
      "Me habla, prefiero voltear a otro lado.",
    ],
  },
];
const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);
const scaleLabels: Record<number, string> = {
  1: "Nunca",
  2: "Casi nunca",
  3: "Pocas veces",
  4: "A veces",
  5: "Frecuentemente",
  6: "Casi siempre",
  7: "Siempre",
};
interface ScaleItemProps {
  number: number;
  text: string;
  value: number;
  onChange: (value: number) => void;
}
const ScaleItem = ({ number, text, value, onChange }: ScaleItemProps) => (
  <div className="p-4 rounded-lg border border-border bg-card space-y-4">
    <p className="font-medium">
      <span className="text-primary font-bold mr-2">{number}.-</span>
      {text}
    </p>
    <div className="space-y-2 px-2">
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        min={1}
        max={7}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <span
            key={n}
            className={`text-center w-8 ${value === n ? "text-primary font-bold" : ""}`}
          >
            {n}
          </span>
        ))}
      </div>
      <p className="text-center text-sm font-medium text-primary">
        {scaleLabels[value]}
      </p>
    </div>
  </div>
);
const AssertivenessScaleTest = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSaving, setIsSaving] = useState(false);
  const updateAnswer = (globalIndex: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [globalIndex]: value }));
  };
  const handleSubmit = async () => {
    const answeredCount = Object.keys(answers).length;
    
    // Validación obligatoria: totalItems es 21
    if (answeredCount < totalItems) {
      toast.error(
        `Por favor responde todas las preguntas. Faltan ${totalItems - answeredCount} por contestar.`
      );
      return;
    }

    setIsSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No se encontró sesión activa");

      // Convertimos el objeto Record<number, number> en un arreglo ordenado [ans1, ans2, ... ans21]
      const answersArray = Array.from({ length: totalItems }, (_, i) => answers[i]);

      const { error } = await supabase
        .from('assertiveness_scale_responses')
        .upsert({
          id: user.id,
          answers: answersArray,
          is_completed: true,
          updated_at: new Date()
        });

      if (error) throw error;

      toast.success("¡Escala guardada con éxito!");
      markTestCompleted("assertiveness");
      setPhase("complete");
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
      toast.error("Error al guardar: " + getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    // Redirigimos a la pantalla de inicio de tests (donde está el menú)
    navigate("/initial-question");
  };
  
  let globalIndex = 0;
  if (showMenu) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Navbar isAuthenticated />
        <TestMenu currentTest="assertiveness" onStart={() => setShowMenu(false)} />
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
              Cuestionario 4: Escala de Asertividad en Consulta Médica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Intro */}
            {phase === "intro" && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Instrucciones</h3>
                  <p className="text-muted-foreground">
                    A continuación encontrarás una serie de descripciones de cómo un médico puede
                    comportarse durante una consulta en la que estás siendo atendida, acompañada de
                    la forma en que las personas podrían responder o sentirse frente a este
                    comportamiento del médico.
                  </p>
                  <p className="text-muted-foreground">
                    Lee cada una de las situaciones y las posibles reacciones. Después, califica qué
                    tan frecuentemente respondes o reaccionas en situaciones como las descritas.
                  </p>
                  <p className="text-muted-foreground">
                    La calificación va desde el valor <strong>1</strong> al <strong>7</strong>, en el
                    que el valor 1 indica que <strong>NUNCA</strong> respondes así ante los
                    comportamientos descritos del médico, mientras que el valor 7 indica que{" "}
                    <strong>SIEMPRE</strong> respondes así ante los comportamientos descritos del
                    médico.
                  </p>
                  <div className="grid grid-cols-7 gap-1 mt-4">
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <div
                        key={n}
                        className="bg-card border border-border rounded-lg p-2 text-center"
                      >
                        <span className="block text-lg font-bold text-primary">{n}</span>
                        <span className="text-[10px] leading-tight text-muted-foreground">
                          {scaleLabels[n]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => setPhase("questions")}
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Comenzar
                </Button>
              </div>
            )}
            {/* Questions */}
            {phase === "questions" && (
              <div className="space-y-8">
                {sections.map((section, sectionIdx) => {
                  const sectionStart = globalIndex;
                  const sectionItems = section.items.map((item, itemIdx) => {
                    const currentIndex = sectionStart + itemIdx;
                    return (
                      <ScaleItem
                        key={currentIndex}
                        number={currentIndex + 1}
                        text={item}
                        value={answers[currentIndex] ?? 4}
                        onChange={(value) => updateAnswer(currentIndex, value)}
                      />
                    );
                  });
                  globalIndex = sectionStart + section.items.length;
                  return (
                    <div key={sectionIdx} className="space-y-4">
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <h3 className="font-semibold text-primary text-center">
                          {section.header}
                        </h3>
                      </div>
                      {sectionItems}
                    </div>
                  );
                })}
                <Button
                  onClick={handleSubmit}
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Finalizar escala
                </Button>
              </div>
            )}
            {/* Complete */}
            {phase === "complete" && (
              <div className="space-y-6 text-center py-8">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">¡Escala completada!</h3>
                <p className="text-muted-foreground">
                  Has completado exitosamente la Escala de Asertividad en Consulta Médica.
                </p>
                <Button
                  onClick={handleNext}
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Continuar al siguiente cuestionario
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
export default AssertivenessScaleTest;
