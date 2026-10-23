import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { ArrowRight, Star, RotateCcw, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateProgress } from "@/lib/progressHelper";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";
import useRoleNavigation from "@/hooks/useRoleNavigation";

const feedbackData: Record<number, string> = {
  1: "Ir a consulta médica no es un castigo ni tiene que ver con juicios morales, ya que el personal de salud debe escucharte siempre sin juzgarte.",
  2: "Tienes todo el derecho de buscar información confiable y actualizada sobre tu propio cuerpo y tu sexualidad.",
  3: "La consulta debe ser como un trabajo en equipo, donde tú también participas activamente.",
  4: "Te harán preguntas sobre tus antecedentes y tus hábitos para entender tu salud de forma integral.",
  5: "Estas medidas son parte de los signos vitales básicos que se revisan en cualquier chequeo físico.",
  6: "Hablar de estos temas ayuda a que tomes decisiones informadas sobre tu propio proyecto de vida.",
  7: "Estos exámenes no se hacen de rutina; se realizan solo si hay una necesidad clara.",
  8: "Tienes derecho a la privacidad y a decidir quién escucha sobre tus asuntos personales.",
  9: "Hablar sobre tu sexualidad es una parte normal de revisar tu salud genitourinaria.",
  10: "La vacunación es una de las mejores herramientas para proteger tu salud a largo plazo.",
  11: "No tienes que aguantar el dolor en silencio. Los dolores fuertes pueden tratarse.",
  12: 'Lo "natural" no siempre es seguro. Algunas hierbas pueden causar reacciones inesperadas.',
  13: "La medicina nunca debe verse como un castigo, sino como una herramienta para tu bienestar.",
  14: "Hacer preguntas ayuda a crear una relación de confianza y respeto con tu médico.",
  15: "El personal de salud y tú son aliados buscando la misma meta: tu salud.",
  16: "La pubertad trae cambios físicos y dudas que son razones perfectas para una primera visita informativa.",
  17: "Ir a esta edad (13-15) te permite recibir información confiable antes de que aparezcan problemas.",
};

const phraseTexts: Record<number, string> = {
  1: '"Vas al ginecólogo si hiciste algo indebido"',
  2: '"Puedes ir a consulta ginecológica para informarte"',
  3: '"En la consulta, solo la médico o el médico hacen preguntas"',
  4: '"Te preguntarán sobre tu cuerpo, tu historia familiar y tus hábitos de salud"',
  5: '"Van a checar tu peso, tu altura y tu presión arterial"',
  6: '"Pueden hablar sobre si quieres embarazarte en algún momento"',
  7: '"Te harán un examen pélvico aún si no tienes malestares"',
  8: '"Tu acompañante debe escuchar todo lo que tienes que decir"',
  9: '"Te preguntarán sobre tu vida sexual"',
  10: '"Pueden ofrecerte la vacuna contra el Virus del Papiloma Humano"',
  11: '"Es innecesario ir a la consulta ginecológica por dolores menstruales fuertes"',
  12: '"Los remedios caseros pueden ocultar una enfermedad más grave"',
  13: '"Te deben de regañar por haberte enfermado"',
  14: '"Puedo hacer preguntas para conocer mejor a mi médico"',
  15: '"Una consulta ginecológica puede ser como un trabajo de equipo"',
  16: '"La primera consulta debe ser después de mi primera relación sexual"',
  17: '"Mi primera consulta puede ser entre los 13 y 15 años de edad"',
};

const correctInside = [2, 4, 5, 6, 9, 10, 12, 14, 15, 17];

const Module1Feedback = () => {
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
      await updateProgress("m1_feedback");
      goTo("/module-1-closure");
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      goTo("/module-1-closure");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3xl space-y-8">
          
          <Card className="border-2 shadow-quirona overflow-hidden">
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
                Obtuviste <strong className="text-primary text-2xl">{score}</strong> de 17 aciertos
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                {canRetry && (
                  <Button
                    variant="outline"
                    onClick={() => goTo("/module-1-game", { state: { attempts } })}
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
                Revisemos cada frase:
              </h2>
              
              <ScrollArea className="h-[500px] pr-4">
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
                              : "border-purple-900/30 bg-purple-900/5" 
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
                              {isCorrectInside ? "QUÉDATE" : "FUERA"}
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
                          
                          <p className="font-bold text-foreground mb-2">
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

export default Module1Feedback;