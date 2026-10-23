import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient"; 
import { updateProgress } from "@/lib/progressHelper";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";
const statements = [
  "Un examen pélvico es una exploración física en la que se evalúan los órganos reproductores femeninos para verificar su estado de salud.",
  "Cuando una joven como Ximena va a una primera consulta ginecológica, siempre debe realizarse un examen pélvico.",
  "En la primera consulta ginecológica te hacen varias preguntas sobre tus periodos menstruales, tus actividades sexuales y tus hábitos de salud.",
  "Cuando una joven como Ximena asiste a una consulta ginecológica, no puede hacer preguntas sobre dudas que tenga.",
  "Solo se debe asistir a una consulta ginecológica cuando tenga síntomas o malestares en mi región púbica, o cuando haya empezado mi vida sexual.",
];
/**
 * Quiz inicial del Módulo 1.
 *
 * Las respuestas no se califican aquí: se guardan en
 * `module_1_responses.quiz_answers` para el análisis del proyecto y se marca
 * `m1_quiz` al enviar.
 */
const Module1Quiz = () => {
  const { goTo } = useRoleNavigation();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const allAnswered = Object.keys(answers).length === statements.length;
  
  /** Persiste las respuestas y marca `m1_quiz`. */
  const handleSubmit = async () => {
    if (!allAnswered) {
      toast.error("Por favor responde todas las afirmaciones antes de continuar.");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No se encontró sesión de usuario");

      // 1. Guardamos las respuestas en la columna 'quiz_answers'
      const { error: saveError } = await supabase
        .from('module_1_responses')
        .upsert({
          id: user.id,
          quiz_answers: answers,
          updated_at: new Date()
        });

      if (saveError) throw saveError;

      // 2. Actualizamos el progreso global (m1_quiz)
      // Esto sumará un paso más y actualizará el % en la tabla 'user_progress'
      await updateProgress("m1_quiz");

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un error al enviar tus respuestas.");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              {!submitted ? (
                <>
                  <h1 className="text-3xl font-bold text-center mb-4 text-primary">
                    Verdadero o Falso
                  </h1>
                  <p className="text-muted-foreground text-center mb-10 text-lg">
                    A partir de lo que tú sepas en este momento, marca como verdadero o falso las siguientes frases. No es importante estar en lo correcto, sino que identifiques qué es lo que piensas en este momento.
                  </p>
                  <div className="space-y-8">
                    {statements.map((statement, index) => (
                      <div key={index} className="p-6 rounded-xl border bg-muted/30">
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
                            <Label htmlFor={`q${index}-v`} className="cursor-pointer">
                              Verdadero
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="falso" id={`q${index}-f`} />
                            <Label htmlFor={`q${index}-f`} className="cursor-pointer">
                              Falso
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-10">
                    <Button
                      onClick={handleSubmit}
                      disabled={!allAnswered || isSaving}
                      className="gradient-primary text-white px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar respuestas
                          <ArrowRight className="ml-2 w-6 h-6" />
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto" />
                  <h2 className="text-2xl font-bold text-primary">
                    ¡Gracias por tus respuestas!
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                    Tus respuestas han sido registradas. Continuaremos explorando estos temas a lo largo del módulo.
                  </p>
                  <Button
                    onClick={() => goTo("/module-1-visit")}
                    className="gradient-primary text-white px-8 py-6 text-lg mt-4"
                  >
                    Continuar a la siguiente sección
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Module1Quiz;
