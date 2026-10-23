import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { ArrowRight, Star, RotateCcw, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateProgress } from "@/lib/progressHelper";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";
const feedbackData: Record<number, string> = {
  1: "Sí. Recuerda que es necesario que el consultorio esté equipado con un área destinada para cambiarte, o en su defecto que te den un espacio a solas para hacerlo.",
  2: "No. El personal de salud debe brindarte todos los elementos necesarios para una revisión segura, lo cual incluye material limpio.",
  3: "Sí. Es muy importante contar con un área de entrevista separada de las demás áreas. Asimismo, el lavado de manos es indispensable para cualquier intervención médica.",
  4: "Sí. El consultorio debe contar con un lavabo funcional para asegurar la correcta higiene en los procedimientos.",
  5: "Sí. Es muy importante que, en caso de que haya un acompañante, pueda ser un familiar o bien una enfermera o personal de apoyo.",
  6: "No. En un consultorio no debe existir una zona de comida, ya que es fundamental mantener el ambiente limpio y libre de olores.",
  7: "Sí. Debe existir confidencialidad sobre los procedimientos realizados, tu expediente clínico y cualquier tema que trates.",
  8: "Sí. La ética siempre debe estar presente por parte del personal de salud que te atiende.",
  9: "Sí. El respeto es un derecho al que siempre tienes acceso, especialmente durante una cita ginecológica.",
  10: "Sí. Es tu derecho ser informada sobre todos los procedimientos y que te pregunten si estás de acuerdo.",
  11: "No. Tu vida sexual forma parte de tu historial de salud; sin embargo, no deben existir juicios ni comentarios personales.",
  12: "Sí. Es muy importante que exista comunicación. Esto te brinda la oportunidad de expresarte libremente.",
  13: "Sí. Antes de cualquier exploración, deben explicarte el paso a paso y las acciones que se llevarán a cabo.",
  14: "Sí. Es indispensable que el área de intervención esté separada del área de entrevista y cuente con privacidad.",
  15: "No. Es responsabilidad del personal de salud mantener la higiene del consultorio tras la salida de cada paciente.",
  16: "Sí. Es indispensable que exista una separación para asegurar la privacidad de la paciente.",
};

const phraseTexts: Record<number, string> = {
  1: 'Área para cambiarte',
  2: 'Sábanas sucias',
  3: 'Área de entrevista',
  4: 'Lavabo',
  5: 'Acompañante',
  6: 'Zona de comida',
  7: 'Confidencialidad',
  8: 'Ética',
  9: 'Respeto',
  10: 'Consentimiento',
  11: 'Comentarios personales sobre tu vida sexual',
  12: 'Comunicación',
  13: 'Instrucciones',
  14: 'Área de intervención',
  15: 'Olores desagradables',
  16: 'Biombo/cortina/separación',
};

const correctInside = [1, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 16];

const Module2Feedback = () => {
  const { goTo } = useRoleNavigation();
  const location = useLocation();
  const [isSaving, setIsSaving] = useState(false);

  const state = location.state as { score?: number; accepted?: number[]; rejected?: number[]; attempts?: number } | null;
  const score = state?.score ?? 0;
  const accepted = state?.accepted ?? [];
  const rejected = state?.rejected ?? [];
  const attempts = state?.attempts ?? 1;

  const stars = score <= 5 ? 1 : score <= 10 ? 2 : 3;
  const canRetry = attempts < 3;

  const handleContinue = async () => {
    setIsSaving(true);
    try {
      await updateProgress("m2_feedback");
      // USAMOS TU RUTA ORIGINAL PARA EVITAR EL 404
      goTo("/module-2-game-2");
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      goTo("/module-2-game-2");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3xl space-y-8">
          
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h1 className="text-3xl font-bold text-primary">Retroalimentación</h1>
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map((s) => (
                  <Star
                    key={s}
                    className={`w-10 h-10 transition-all ${
                      s <= stars ? "text-yellow-400 fill-yellow-400 scale-110" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-lg text-muted-foreground">
                Obtuviste <strong className="text-primary text-2xl">{score}</strong> de 16 aciertos
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {canRetry && (
                  <Button
                    variant="outline"
                    onClick={() => goTo("/module-2-game", { state: { attempts } })}
                    className="px-6 py-6 border-primary text-primary hover:bg-primary/5"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reintentar ({3 - attempts} restantes)
                  </Button>
                )}
                <Button
                  onClick={handleContinue}
                  disabled={isSaving}
                  className="gradient-primary text-white px-10 py-6 text-lg shadow-md"
                >
                  {isSaving ? <Loader2 className="animate-spin" /> : (
                    <>
                      Continuar
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-quirona">
            <CardContent className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Revisemos cada elemento:
              </h2>
              
              <ScrollArea className="h-[550px] pr-4">
                <div className="space-y-6">
                  {Object.keys(phraseTexts)
                    .map(Number)
                    .sort((a, b) => a - b)
                    .map((id) => {
                      const isCorrectInside = correctInside.includes(id);
                      const userAccepted = accepted.includes(id);
                      const userRejected = rejected.includes(id);
                      const userCorrect = isCorrectInside ? userAccepted : userRejected;
                      const unanswered = !userAccepted && !userRejected;

                      return (
                        <div
                          key={id}
                          className={`p-5 rounded-xl border-2 transition-all ${
                            unanswered
                              ? "border-muted bg-muted/20 opacity-60"
                              : userCorrect
                              ? "border-primary/30 bg-primary/5" 
                              : "border-purple-900/30 bg-purple-900/10" 
                          }`}
                        >
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span
                              className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${
                                isCorrectInside
                                  ? "bg-primary text-white"
                                  : "bg-purple-900 text-white"
                              }`}
                            >
                              {isCorrectInside ? "DENTRO" : "FUERA"}
                            </span>
                            
                            {!unanswered && (
                              <span
                                className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 ${
                                  userCorrect
                                    ? "bg-primary/20 text-primary"
                                    : "bg-purple-900/20 text-purple-900"
                                }`}
                              >
                                {userCorrect ? (
                                  <><CheckCircle2 className="w-3 h-3" /> Correcto</>
                                ) : (
                                  <><XCircle className="w-3 h-3" /> Incorrecto</>
                                )}
                              </span>
                            )}
                          </div>
                          
                          <p className="font-bold text-foreground mb-2 leading-tight">
                            {phraseTexts[id]}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feedbackData[id]}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Module2Feedback;