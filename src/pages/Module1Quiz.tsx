import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const statements = [
  "Un examen pélvico es una exploración física en la que se evalúan los órganos reproductores femeninos para verificar su estado de salud.",
  "Cuando una joven como Ximena va a una primera consulta ginecológica, siempre debe realizarse un examen pélvico.",
  "En la primera consulta ginecológica te hacen varias preguntas sobre tus periodos menstruales, tus actividades sexuales y tus hábitos de salud.",
  "Cuando una joven como Ximena asiste a una consulta ginecológica, no puede hacer preguntas sobre dudas que tenga.",
  "Solo se debe asistir a una consulta ginecológica cuando tenga síntomas o malestares en mi región púbica, o cuando haya empezado mi vida sexual.",
];

const Module1Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = Object.keys(answers).length === statements.length;

  const handleSubmit = () => {
    if (!allAnswered) {
      toast.error("Por favor responde todas las afirmaciones antes de continuar.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />

      <div className="pt-96 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
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
                      disabled={!allAnswered}
                    >
                      Enviar respuestas
                      <ArrowRight className="ml-2 w-5 h-5" />
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
                    onClick={() => navigate("/module-1-visit")}
                    className="gradient-primary text-white px-8 py-6 text-lg mt-4"
                  >
                    Continuar con la siguiente sección
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
