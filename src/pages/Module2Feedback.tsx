import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Star, RotateCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
const feedbackData: Record<number, string> = {
  1: "Sí. Recuerda que es necesario que el consultorio esté equipado con un área destinada para cambiarte, o en su defecto que te den un espacio a solas para hacerlo.",
  2: "No. El personal de salud debe brindarte todos los elementos necesarios para una revisión segura, lo cual incluye material limpio.",
  3: "Sí. Es muy importante contar con un área de entrevista separada de las demás áreas. Asimismo, el lavado de manos es indispensable para cualquier intervención médica, por lo que debe existir un lavabo para garantizar la higiene necesaria.",
  4: "Sí. El consultorio debe contar con un lavabo funcional para asegurar la correcta higiene en los procedimientos.",
  5: "Sí. Es muy importante que, en caso de que haya un acompañante, pueda ser un familiar (especialmente si eres menor de edad) o bien una enfermera o personal de apoyo que asista al personal de salud.",
  6: "No. En un consultorio no debe existir una zona de comida, ya que es fundamental mantener el ambiente limpio y libre de olores desagradables.",
  7: "Sí. Debe existir confidencialidad sobre los procedimientos realizados, tu expediente clínico y cualquier tema que quieras tratar con el médico.",
  8: "Sí. La ética siempre debe estar presente por parte del personal de salud que te atiende.",
  9: "Sí. El respeto es un derecho al que siempre tienes acceso, especialmente durante una cita ginecológica.",
  10: "Sí. Es tu derecho ser informada sobre todos los procedimientos que se te vayan a realizar y que te pregunten si estás de acuerdo, ya que se trata de tu cuerpo.",
  11: "No. Tu vida sexual forma parte de tu historial de salud; sin embargo, no deben existir juicios ni comentarios personales por parte del personal médico.",
  12: "Sí. Es muy importante que exista comunicación entre tú y el médico. Esto no te obliga a hablar de lo que no deseas, sino que te brinda la oportunidad de expresarte libremente y ser tratada con respeto.",
  13: "Sí. Antes de cualquier exploración, deben explicarte el paso a paso, así como las acciones que tú debes realizar y las que llevará a cabo el personal de salud.",
  14: "Sí. Es indispensable que el área de intervención esté separada del área de entrevista y cuente con la privacidad necesaria para tu revisión.",
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
const correctOutside = [2, 6, 11, 15];
const Module2Feedback = () => {
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
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
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
                Obtuviste <strong className="text-primary">{score}</strong> de {16} aciertos
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
                  onClick={() => navigate("/module-2-game-2")}
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
export default Module2Feedback;
