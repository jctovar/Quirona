import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";

type Phase = "intro" | "questions" | "complete";

const questions = [
  "¿Alguno de tus padres u otros adultos en su casa te ofendían, te insultaban, te menospreciaban o te humillaban con frecuencia, o actuaban de tal forma que tenías miedo de que te fueran a lastimar físicamente?",
  "¿Alguno de tus padres u otros adultos en tu casa te empujaban, te jalaban, te abofeteaban, o te aventaban cosas con frecuencia? o ¿alguna vez te golpearon con tanta fuerza que te dejaron marcas o te lastimaron?",
  "¿Algún adulto o alguna otra persona cuando menos cinco años mayor que tu te tocó alguna vez, intentó o te pidió que lo tocaras de alguna forma sexual?",
  "¿Sentías con frecuencia que nadie en tu familia te quería o pensarás que eras especial o importante?, o ¿en tu familia no se cuidaban unos a los otros, no sentían que tenían una relación cercana, o no se apoyaban?",
  "¿Sentías con frecuencia que no tenías suficiente comida, que tenías que usar ropa sucia o que no tenías a nadie que te protegiera? ¿Tus padres estaban demasiado borrachos o drogados para cuidarte o llevarte al médico si es que lo necesitabas?",
  "¿Alguna vez perdiste a tu padre o madre biológicos debido a un divorcio, abandono o alguna otra razón?",
  "¿Con frecuencia te empujaban, jalaban, golpeaban o te aventaban cosas a su madre o madrastra?, o ¿con frecuencia te pegaban, te mordían, te daban puñetazos o te golpeaban con algún objeto duro? ¿Alguna vez te golpearon durante varios minutos seguidos o te amenazaron con una pistola o cuchillo?",
  "¿Viviste con alguien que se emborrachaba o era alcohólico, o que usaba drogas?",
  "¿Algún miembro de tu familia sufría depresión o alguna otra enfermedad mental, o trató de suicidarse?",
  "¿Algún miembro de tu familia estuvo en la cárcel?",
];

const AdverseExperiencesTest = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const updateAnswer = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    const unanswered = questions.filter((_, i) => !answers[i]);
    if (unanswered.length > 0) {
      toast.error(`Por favor responde todas las preguntas. Faltan ${unanswered.length} por contestar.`);
      return;
    }
    console.log("Adverse Experiences Results:", answers);
    toast.success("¡Cuestionario completado exitosamente!");
    setPhase("complete");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    navigate("/general-health");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      <main className="container mx-auto pt-96 pb-8 px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">
              Cuestionario 5: Experiencias Adversas en la Infancia
            </CardTitle>
            <CardDescription className="text-lg">
              Selecciona Sí o No para cada experiencia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Intro */}
            {phase === "intro" && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Instrucciones</h3>
                  <p className="text-muted-foreground">
                    A continuación encontrarás una lista de 10 Experiencias Adversas en la Infancia.
                    Selecciona <strong>Sí</strong> o <strong>No</strong> según si tuviste esa experiencia
                    antes de cumplir 18 años.
                  </p>
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
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border bg-card space-y-3">
                    <p className="font-medium">
                      <span className="text-primary font-bold mr-2">{index + 1}.-</span>
                      {question}
                    </p>
                    <RadioGroup
                      value={answers[index] || ""}
                      onValueChange={(value) => updateAnswer(index, value)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id={`q${index}-si`} />
                        <Label htmlFor={`q${index}-si`} className="cursor-pointer text-sm font-medium">
                          Sí
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`q${index}-no`} />
                        <Label htmlFor={`q${index}-no`} className="cursor-pointer text-sm font-medium">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
                <Button
                  onClick={handleSubmit}
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Finalizar cuestionario
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
                <h3 className="text-xl font-semibold">¡Cuestionario completado!</h3>
                <p className="text-muted-foreground">
                  Has completado exitosamente el cuestionario de Experiencias Adversas en la Infancia.
                </p>
                <Button
                  onClick={handleNext}
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Continuar al panel principal
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdverseExperiencesTest;
