import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Star, RotateCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
const feedbackData: Record<number, string> = {
  1: "Ir a consulta médica no es un castigo ni tiene que ver con juicios morales, ya que el personal de salud debe escucharte siempre sin juzgarte.",
  2: "Tienes todo el derecho de buscar información confiable y actualizada sobre tu propio cuerpo y tu sexualidad. Nunca tengas miedo de preguntar si eso te hará sentir segura.",
  3: "La consulta debe ser como un trabajo en equipo, donde tú también participas activamente. Lo ideal es que exista un ambiente de confianza donde puedas contar tu historia y aclarar todas tus dudas.",
  4: "Te harán preguntas sobre tus antecedentes y tus hábitos para entender tu salud de forma integral, viendo tanto lo biológico como lo emocional. Esto incluye revisar si hay enfermedades en tu familia que deban tomarse en cuenta.",
  5: "Estas medidas son parte de los signos vitales básicos que se revisan en cualquier chequeo físico. Ayudan a los médicos a saber que tu desarrollo va por buen camino.",
  6: "Aunque tengas 15 años, la consulta es un lugar seguro para recibir asesoría sobre tu salud reproductiva a futuro. Hablar de estos temas ayuda a que tomes decisiones informadas sobre tu propio proyecto de vida.",
  7: "Estos exámenes no se hacen de rutina porque sí; normalmente se realizan solo si tienes alguna molestia específica o si el médico detecta una necesidad clara durante la entrevista.",
  8: "Tienes derecho a la privacidad y a la confidencialidad, y por lo tanto puedes ejercer tu autonomía y decidir quién escucha sobre tus asuntos personales y si prefieres hablar a solas con el médico.",
  9: "Hablar sobre tu sexualidad es una parte normal de revisar tu salud genitourinaria. Esto ayuda al médico a saber si necesitas algún cuidado especial o prevenir infecciones de transmisión sexual.",
  10: "El sistema de salud busca prevenir problemas antes de que aparezcan, y la vacunación es una de las mejores herramientas para proteger tu salud a largo plazo.",
  11: "No tienes que aguantar el dolor en silencio. Los dolores fuertes (llamados dismenorrea) pueden tratarse para que no te detengan en tus actividades diarias.",
  12: 'Aunque parezcan inofensivos, lo "natural" no siempre es seguro. Algunas hierbas pueden causar reacciones inesperadas o hacer que tardes más en buscar la ayuda médica que realmente necesitas para sanar.',
  13: "El médico debe escucharte sin juicios ni críticas. La medicina nunca debe verse como un castigo, sino como una herramienta para que recuperes tu bienestar y te sientas bien contigo misma.",
  14: "¡Es tu derecho! Hacer preguntas ayuda a crear una relación de confianza y respeto. Sentirte cómoda con la persona que cuida tu salud es clave para que el tratamiento funcione mejor.",
  15: "El personal de salud y tú son aliados. Ellos ponen el conocimiento médico y tú conoces mejor que nadie tu historia y lo que sientes; juntos forman el mejor equipo para cuidar tu cuerpo.",
  16: "No hay que esperar a eso. La pubertad (que suele ocurrir entre los 12 y 14 años) trae muchos cambios físicos y dudas sobre tu desarrollo que son razones perfectas para una primera visita informativa.",
  17: "Esta es una etapa ideal para empezar a conocer cómo funciona tu sistema reproductivo. Ir a esta edad te permite recibir información confiable y aprender a prevenir problemas antes de que aparezcan.",
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
const correctOutside = [1, 3, 7, 8, 11, 13, 16];
const Module1Feedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { score?: number; accepted?: number[]; rejected?: number[]; attempts?: number } | null;
  const score = state?.score ?? 0;
  const accepted = state?.accepted ?? [];
  const rejected = state?.rejected ?? [];
  const attempts = state?.attempts ?? 1;
  const stars = score <= 5 ? 1 : score <= 10 ? 2 : 3;
  const canRetry = attempts < 3;
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      <div className="pt-96 pb-16 px-4">
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
                Obtuviste <strong className="text-primary">{score}</strong> de {17} aciertos
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {canRetry && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate("/module-1-game", { state: { attempts } })
                    }
                    className="px-6 py-5"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Intentar de nuevo ({3 - attempts} restantes)
                  </Button>
                )}
                <Button
                  onClick={() => navigate("/module-1-closure")}
                  className="gradient-primary text-white px-8 py-5 text-lg"
                >
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
              <ScrollArea className="max-h-[600px]">
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
                          className={`p-5 rounded-xl border-2 ${
                            unanswered
                              ? "border-muted bg-muted/20"
                              : userCorrect
                              ? "border-emerald-300 bg-emerald-50/50"
                              : "border-destructive/30 bg-destructive/5"
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded ${
                                isCorrectInside
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {isCorrectInside ? "QUÉDATE" : "FUERA"}
                            </span>
                            {!unanswered && (
                              <span
                                className={`text-xs font-bold px-2 py-1 rounded ${
                                  userCorrect
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {userCorrect ? "✓ Correcto" : "✗ Incorrecto"}
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-foreground mb-2">
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
