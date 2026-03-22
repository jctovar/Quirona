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
  "Que no tengas la intimidad suficiente para cambiarte.",
  "Que el personal de la salud no te trate con respeto.",
  "Sensaciones de miedo o ansiedad.",
  "Que te presionen a realizarte un chequeo.",
  "Que el personal de salud te permita estar acompañada en tu consulta.",
  "Que las instalaciones no estén en un estado insalubre o de inseguridad.",
  "Que el personal establezca una comunicación clara conmigo.",
  "Que el personal te comunique que todos los procedimientos a realizar. ",
  "Que las instalaciones estén sucias."
];

const correctAnswers = [
  "verdadero", // 1
  "verdadero", // 2
  "verdadero", // 3
  "verdadero", // 4
  "falso", // 5
  "falso", // 6
  "falso", // 7
  "falso", // 8
  "verdadero" // 9
];

const Module2Game2 = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const allAnswered = Object.keys(answers).length === statements.length;

  const handleSubmit = () => {
    if (!allAnswered) {
      toast.error("Por favor responde todas las afirmaciones antes de continuar.");
      return;
    }
    setSubmitted(true);
  };

  const incorrectAnswers = statements
    .map((_, index) => index)
    .filter(index => answers[index] !== correctAnswers[index]);

  const handleRepeat = () => {
    if (attempts < 3) {
      setAnswers({});
      setSubmitted(false);
      setAttempts(prev => prev + 1);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      <div className="pt-96 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              {!submitted ? (
                <>
                  <h1 className="text-3xl font-bold text-center mb-4 text-primary">
                    Acitividad 2. Verdadero o Falso
                  </h1>
                  <p className="text-muted-foreground text-center mb-10 text-lg">
                    Lee cada afirmación con atención y selecciona la opción que corresponda (Verdadero o Falso).
                    Las afirmaciones se refieren a situaciones que pueden detonar que pidas la <strong>interrupción de tu revisión </strong> o que decidas <strong>salir de la consulta ginecológica</strong>.
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
                      Calificar
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
                    Tuviste {statements.length - incorrectAnswers.length} respuestas correctas de {statements.length}.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Intento {attempts} de 3
                  </p>
                  <div className="flex justify-center gap-4 mt-6">
                    {incorrectAnswers.length > 0 && attempts < 3 ? (
                      <Button
                        onClick={handleRepeat}
                        className="bg-secondary text-secondary-foreground px-6 py-3"
                      >
                        Repetir ({attempts}/3)
                      </Button>
                    ) : null}
                    <Button
                      onClick={() => navigate("/module-2-closure")}
                      className="gradient-primary text-white px-8 py-6 text-lg"
                    >
                      Continuar a la siguiente sección
                      <ArrowRight className="ml-2 w-5 h-5" />
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
