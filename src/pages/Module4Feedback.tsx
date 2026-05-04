import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight, Star, RotateCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateProgress } from "@/lib/progressHelper";
import { Loader2 } from "lucide-react";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";
const feedbackData: Record<number, string> = {
  1: "No asertiva: Te minimiza y te calla. Preguntar no es ser intensa: es participar y cuidarte.",
  2: "Asertiva: Protege tu privacidad y establece una regla clara: nadie entra al consultorio sin tu autorización.",
  3: "No asertiva: Normaliza el dolor y te deja sin opciones. Si duele, puedes pedir pausa o detener.",
  4: "Asertiva: Pide información clara y te coloca como parte activa de la decisión. Reduce la incertidumbre y aumenta control.",
  5: "No asertiva: Normaliza la falta de privacidad. Pedir privacidad no es ser delicada, es un derecho",
  6: "Asertiva: Reconoce tu estado emocional y toma una decisión de autocuidado sin culpa.",
  7: "No asertiva: Prioriza la prisa del otro sobre tu seguridad. Tú tienes derecho a ir a tu ritmo.",
  8: "Asertiva: Es directa, prioriza tu seguridad física y detiene una acción que te está lastimando.",
  9: "No asertiva: Niega consentimiento básico. Pedir aviso es una práctica respetuosa, no exageración.",
  10: "Asertiva: Exige comprensión real. Te ayuda a tomar decisiones informadas y reduce la ansiedad.",
  11: "No asertiva: Renuncias a tu derecho a entender. Confiar no significa dejar de pedir información.",
  12: "Asertiva: Solicita una condición básica de respeto (cobertura) y deja claro que cubrirte es necesario para seguir.",
  13: "No asertiva: Usa un estereotipo que te quita apoyo. Pedir compañía es una forma legítima de cuidarte",
  14: "Asertiva: Reafirma consentimiento y te devuelve control sobre el contacto físico.",
  15: "Asertiva: Marca un límite de tiempo y privacidad sin agredir. Prioriza tu seguridad y comodidad.",
  16: "Asertiva: Desafía la normalización del dolor y ofrece opciones claras: ajustar o parar.",
  17: "No asertiva: Te vas sin expresar límites ni dejar claro el motivo; tú puedes retirarte de una consulta con claridad y respeto, pero por tu protección.",
  18: "No asertiva: La vergüenza te impide protegerte. Decir las cosas en voz alta es una forma de poner un límite válido.",
  19: "Asertiva: Pide apoyo para sentirte segura y lo plantea como condición para continuar."
};
const phraseTexts: Record<number, string> = {
  1: '“Perdón por molestar, mejor no pregunto para no verme intensa.”',
  2: '“Necesito que cierren la puerta y que nadie entre sin mi consentimiento.”',
  3: '“Si me duele, mejor me aguanto; dicen que así son estas revisiones.”',
  4: '“Antes de iniciar, necesito que me explique qué va a hacer y por qué, paso por paso.”',
  5: '“No pasa nada si entra alguien, no soy tan delicada.”',
  6: '“Me siento rebasada. Voy a detener la consulta y la retomaré cuando me sienta lista.”',
  7: '“No se preocupe si va rápido, yo me adapto… para no hacerla perder tiempo.”',
  8: '“Alto. Me duele. Pare ahora y pausamos; no continúe.”',
  9: '“No voy a pedir que me avise antes de tocarme, suena exagerado.” ',
  10: '“Necesito que me diga qué está observando y qué significa en términos claros.”',
  11: '“Está bien, no hace falta que me explique… usted sabe, yo confío.”',
  12: '“Para continuar necesito una bata o sábana para cubrirme, por favor.”',
  13: '“Prefiero no traer acompañante… una mujer debe aguantar sola y sin quejarse.”',
  14: '“Espere. Quiero que me pregunte antes de tocarme y yo le digo cuando esté lista.”',
  15: '“Voy a tomarme un momento. Necesito privacidad y tiempo; no continuaré con prisa.”',
  16: '“El dolor no es algo que tenga que aguantar. Ajuste el procedimiento o lo detenemos.”',
  17: '“Si me siento mal, mejor termino y ya… pero sin decir nada, para evitar problemas.”',
  18: '“Me da pena decir ‘alto’… no quiero verme dramática.”',
  19: '“Para continuar, quiero que mi acompañante esté presente durante la exploración.”',
};

const correctInside = [1, 3, 5, 7, 9, 11, 13, 15, 18, 19];
const correctOutside = [2, 4, 6, 8, 10, 12, 14, 16, 17];
const Module4Feedback = () => {
  const { goTo } = useRoleNavigation();
  const [isSaving, setIsSaving] = useState(false);
  const location = useLocation();
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
      await updateProgress("m4_feedback");
      goTo("/module-4-closure");
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      goTo("/module-4-closure");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2 space-y-8">
          {/* Score card */}
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h1 className="text-3xl font-bold text-primary">Retroalimentación</h1>
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map((s) => (
                  <Star
                    key={s}
                    className={`w-10 h-10 ${
                      s <= stars ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-lg text-muted-foreground">
                Obtuviste <strong className="text-primary">{score}</strong> de {19} aciertos
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {canRetry && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      goTo("/module-4-game", { state: { attempts } })
                    }
                    className="px-6 py-5"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Intentar de nuevo ({3 - attempts} restantes)
                  </Button>
                )}
                <Button
                  onClick={handleContinue}
                  disabled={isSaving}
                  className="gradient-primary text-white px-8 py-5 text-lg"
                >
                  {isSaving ? <Loader2 className="animate-spin mr-2" /> : null}
                  Continuar
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Detailed feedback */}
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Revisemos cada frase:
              </h2>
              <ScrollArea className="h-[700px] w-full rounded-md border p-4 bg-white/50">
                <div className="space-y-6 pr-4">
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
                          className={`p-6 rounded-xl border-2 transition-colors ${
                            unanswered
                              ? "border-muted bg-muted/20"
                              : userCorrect
                              ? "border-primary/30 bg-primary/10" // MORADO CLARO (Correcto)
                              : "border-primary bg-primary/30"    // MORADO MÁS FUERTE (Incorrecto)
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full ${
                                isCorrectInside
                                  ? "bg-primary text-white" 
                                  : "bg-destructive text-white"
                              }`}
                            >
                              {isCorrectInside ? "ASERTIVA" : "NO ASERTIVA"}
                            </span>
                            
                            {!unanswered && (
                              <span
                                className={`text-xs font-bold px-3 py-1 rounded-full ${
                                  userCorrect
                                    ? "bg-green-100 text-green-700 border border-green-300"
                                    : "bg-red-100 text-red-700 border border-red-300"
                                }`}
                              >
                                {userCorrect ? "✓ Tu respuesta fue correcta" : "✗ Tu respuesta fue incorrecta"}
                              </span>
                            )}
                          </div>
                          <p className="font-semibold text-foreground text-lg mb-2">
                            {phraseTexts[id]}
                          </p>
                          <p className={`text-sm leading-relaxed ${userCorrect ? "text-muted-foreground" : "text-foreground font-medium"}`}>
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
export default Module4Feedback;
