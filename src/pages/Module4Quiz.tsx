import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { updateProgress } from "@/lib/progressHelper";
import { Loader2 } from "lucide-react";

const statements = [
  "Ser asertiva significa decir lo que necesito con claridad y respeto, sin agredir.",
  "Ser asertiva es lo mismo que ser grosera o conflictiva.",
  "Si algo me incomoda, tengo derecho a pedir que me expliquen qué harán antes de continuar.",
  "Si me duele durante una revisión, lo “normal” es aguantar para que termine rápido.",
  "Pedir privacidad (puerta cerrada, bata o sábana) es exagerado.",
  "Si me quedo callada o me congelo, es porque me faltó carácter.",
  "Decir “alto” y pedir una pausa puede ser una forma de autocuidado.",
  "Si no respetan mi límite, puedo repetirlo con firmeza o terminar la consulta y retirarme.",
  "Pedir que me avisen antes de tocarme es una petición válida.",
  "Pedir apoyo (como hablar con alguien de confianza) después de una mala experiencia puede ayudar.",
  "Es mi obligación denunciar si tengo una experiencia de violencia ginecológica.",
];
const Module4Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const allAnswered = Object.keys(answers).length === statements.length;
  const handleSubmit = async () => {
    if (!allAnswered) {
      toast.error("Por favor responde todas las afirmaciones antes de continuar.");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión de usuario activa");

      // 1. Guardamos respuestas en la tabla del Módulo 4
      const { error: quizError } = await supabase
        .from('module_4_responses')
        .upsert({
          id: user.id,
          quiz_answers: answers,
          updated_at: new Date()
        });

      if (quizError) throw quizError;

      // 2. Marcamos el progreso
      await updateProgress("m4_quiz");

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un problema al guardar tus respuestas.");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
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
                      className="gradient-primary text-white px-8 py-6 text-lg"
                      disabled={!allAnswered || isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="animate-spin mr-2" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          Enviar respuestas
                          <ArrowRight className="ml-2 w-5 h-5" />
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
                    onClick={() => navigate("/module-4-visit")}
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
export default Module4Quiz;
