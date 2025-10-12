import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";
import { toast } from "sonner";

const InitialTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "q1",
      question: "¿Sabes qué es la violencia ginecológica?",
      options: ["Sí, completamente", "Tengo una idea general", "No estoy segura", "No lo sé"],
    },
    {
      id: "q2",
      question: "¿Conoces tus derechos durante una consulta ginecológica?",
      options: ["Sí, los conozco bien", "Conozco algunos", "No estoy segura", "No los conozco"],
    },
    {
      id: "q3",
      question: "¿Te sientes cómoda haciendo preguntas sobre tu salud reproductiva?",
      options: ["Muy cómoda", "Algo cómoda", "Poco cómoda", "Nada cómoda"],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.keys(answers).length < questions.length) {
      toast.error("Por favor responde todas las preguntas");
      return;
    }

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
                Estas preguntas nos ayudarán a conocer tu nivel de conocimiento actual
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {questions.map((q, index) => (
                  <div key={q.id} className="space-y-4">
                    <div className="flex gap-3">
                      <span className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <Label className="text-lg font-semibold leading-tight">{q.question}</Label>
                    </div>
                    
                    <RadioGroup
                      value={answers[q.id]}
                      onValueChange={(value) => setAnswers({ ...answers, [q.id]: value })}
                      className="pl-11 space-y-3"
                    >
                      {q.options.map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                          <Label 
                            htmlFor={`${q.id}-${option}`}
                            className="font-normal cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}

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
