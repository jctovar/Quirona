import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight, CheckCircle, Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { updateProgress } from "@/lib/progressHelper";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";
/**
 * Quiz de refuerzo del Módulo 2.
 *
 * Cada afirmación se marca como verdadera si representa un motivo válido para
 * interrumpir o salir de la consulta. `correctAnswers` mantiene la respuesta
 * esperada en el mismo orden que `statements`.
 */
const statements = [
  "Que no tengas la intimidad suficiente para cambiarte.",
  "Que el personal de la salud no te trate con respeto.",
  "Sensaciones de miedo o ansiedad.",
  "Que te presionen a realizarte un chequeo.",
  "Que el personal de salud te permita estar acompañada en tu consulta.",
  "Que las instalaciones no estén en un estado insalubre o de inseguridad.",
  "Que el personal establezca una comunicación clara conmigo.",
  "Que el personal te comunique todos los procedimientos a realizar.",
  "Que las instalaciones estén sucias."
];

const correctAnswers = [
  "verdadero", // 1. Falta de intimidad -> Motivo de interrupción
  "verdadero", // 2. Falta de respeto -> Motivo de interrupción
  "verdadero", // 3. Miedo/Ansiedad -> Motivo de interrupción
  "verdadero", // 4. Presión -> Motivo de interrupción
  "falso",     // 5. Acompañamiento -> Es un derecho (No es motivo de interrupción)
  "falso",     // 6. Estado salubre -> Es lo correcto (No es motivo de interrupción)
  "falso",     // 7. Comunicación clara -> Es lo correcto (No es motivo de interrupción)
  "falso",     // 8. Comunicación de procedimientos -> Es lo correcto (No es motivo de interrupción)
  "verdadero"  // 9. Suciedad -> Motivo de interrupción
];

/**
 * Pantalla del quiz de refuerzo.
 *
 * Permite hasta tres intentos. El puntaje se calcula comparando cada respuesta
 * con `correctAnswers`; el progreso solo se marca al enviar el quiz.
 */
const Module2Game2 = () => {
  const { goTo } = useRoleNavigation();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  
  const allAnswered = Object.keys(answers).length === statements.length;

  // Aciertos = total de afirmaciones menos las respuestas incorrectas.
  const score = statements.length - statements
    .map((_, index) => index)
    .filter(index => answers[index] !== correctAnswers[index]).length;

  /** Guarda respuestas y puntaje, y marca `m2_quiz2`. */
  const handleSubmit = async () => {
    if (!allAnswered) {
      toast.error("Por favor responde todas las afirmaciones antes de continuar.");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      // 1. Guardamos respuestas y puntuación del Quiz 2
      const { error: saveError } = await supabase
        .from('module_2_responses')
        .upsert({
          id: user.id,
          quiz2_answers: answers,
          quiz2_score: score,
          updated_at: new Date()
        });

      if (saveError) throw saveError;

      // 2. Marcamos progreso (m2_quiz2)
      await updateProgress("m2_quiz2");

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar tus respuestas.");
    } finally {
      setIsSaving(false);
    }
  };

  /** Reinicia el formulario conservando el límite de tres intentos. */
  const handleRepeat = () => {
    if (attempts < 3) {
      setAnswers({});
      setSubmitted(false);
      setAttempts(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const incorrectAnswersCount = statements.length - score;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              {!submitted ? (
                <>
                  <h1 className="text-3xl font-bold text-center mb-4 text-primary">
                    Actividad 2. Verdadero o Falso
                  </h1>
                  <p className="text-muted-foreground text-center mb-10 text-lg">
                    Selecciona <strong>Verdadero</strong> si la situación es un motivo válido para <strong>interrumpir o salir</strong> de la consulta, o <strong>Falso</strong> si es un procedimiento correcto.
                  </p>
                  <div className="space-y-8">
                    {statements.map((statement, index) => (
                      <div key={index} className="p-6 rounded-xl border bg-muted/30 transition-all hover:border-primary/20">
                        <p className="text-foreground font-medium mb-4">
                          {index + 1}. {statement}
                        </p>
                        <RadioGroup
                          value={answers[index] || ""}
                          onValueChange={(val) =>
                            setAnswers((prev) => ({ ...prev, [index]: val }))
                          }
                          className="flex gap-6"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="verdadero" id={`q${index}-v`} />
                            <Label htmlFor={`q${index}-v`} className="cursor-pointer">Verdadero</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="falso" id={`q${index}-f`} />
                            <Label htmlFor={`q${index}-f`} className="cursor-pointer">Falso</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-10">
                    <Button
                      onClick={handleSubmit}
                      disabled={!allAnswered || isSaving}
                      className="gradient-primary text-white px-10 py-7 text-lg shadow-lg"
                    >
                      {isSaving ? <Loader2 className="animate-spin mr-2" /> : "Calificar"}
                      {!isSaving && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-8 py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">¡Evaluación completada!</h2>
                    <p className="text-xl text-muted-foreground">
                      Obtuviste <span className="font-bold text-primary">{score}</span> de {statements.length} aciertos.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Intento {attempts} de 3</p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    {incorrectAnswersCount > 0 && attempts < 3 && (
                      <Button
                        onClick={handleRepeat}
                        variant="outline"
                        className="px-8 py-6 border-primary text-primary"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Repetir intento
                      </Button>
                    )}
                    <Button
                      onClick={() => goTo("/module-2-closure")}
                      className="gradient-primary text-white px-10 py-6 text-lg shadow-md"
                    >
                      Continuar al cierre
                      <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Module2Game2;