import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight, Star } from "lucide-react";
import { supabase } from "@/supabaseClient";
import { updateProgress } from "@/lib/progressHelper";
import { Loader2 } from "lucide-react";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";

/**
 * Juego de identificación de violencia ginecológica (Módulo 3).
 *
 * Cada caso se evalúa en dos criterios:
 * 1. ¿La situación es violencia? (sí/no).
 * 2. Si es violencia, ¿a qué grupo pertenece?
 *
 * Solo las preguntas que son violencia exigen ambos criterios para otorgar
 * punto; las que no lo son se resuelven con la primera respuesta.
 */
const questions = [
  {
    id: 1,
    text: "El médico revisa tus resultados y comenta en tono de desaprobación: 'Con tantas parejas, no me sorprende que tengas esta infección; deberías tener más respeto por ti misma'",
    shouldBeYes: true,
    correctGroup: "violencias psicológicas y de subordinación",
  },
  {
    id: 2,
    text: "Al solicitar una ligadura de trompas, la doctora te responde: 'Es un desperdicio; eres joven y vas a cambiar de opinión porque tu destino natural es ser madre'",
    shouldBeYes: true,
    correctGroup: "violencias psicológicas y de subordinación",
  },
  {
    id: 3,
    text: "Al llamarte, escuchas que el doctor comenta a la enfermera entre risas: 'No atiendo gorditas, es una pérdida de tiempo porque no se cuidan'.",
    shouldBeYes: true,
    correctGroup: "violencias psicológicas y de subordinación",
  },
  {
    id: 4,
    text: "Acudes por cólicos intensos y discapacitantes, la ginecóloga te niega el medicamento que ya has tomado antes, diciéndote: 'No exageres, ese dolor es normal y no amerita medicina'.",
    shouldBeYes: true,
    correctGroup: "violencias hacia tu cuerpo",
  },
  {
    id: 5,
    text: "El ginecólogo introduce el espéculo de forma rápida sin pedirte que te relajes. Le comentas que te dolió mucho. 'Responde: 'Fue rápido, ¡ya! ¡no pasa nada!'",
    shouldBeYes: true,
    correctGroup: "violencias hacia tu cuerpo",
  },
  {
    id: 6,
    text: "Al saber que vienes de una zona de población indígena, te presiona para ponerte un DIU ahora mismo, con la justificación de 'luego tienen chamacos que ni siquiera pueden mantener'.",
    shouldBeYes: true,
    correctGroup: "violencias hacia tu cuerpo",
  },
  {
    id: 7,
    text: "Mientras realiza un examen de mamas, el doctor dice: 'Qué cuerpo tan bonito tienes, seguro tu pareja te lo dice todo el tiempo'.",
    shouldBeYes: true,
    correctGroup: "violencias sexuales y contra la intimidad",
  },
  {
    id: 8,
    text: "La ginecóloga manipula tu clítoris durante un examen de rutina sin haber explicado previamente el procedimiento, ni solicitado tu consentimiento para ese contacto específico.",
    shouldBeYes: true,
    correctGroup: "violencias sexuales y contra la intimidad",
  },
  {
    id: 9,
    text: "El ginecólogo utiliza su celular para tomar fotografías de tus genitales alegando que son \"para su registro clínico personal\", sin haberte pedido autorización previa.",
    shouldBeYes: true,
    correctGroup: "violencias sexuales y contra la intimidad",
  },
  {
    id: 10,
    text: "El médico familiar te envía a casa con una infección grave. Te comenta: 'el hospital ahorita no tiene camas disponibles ni personal suficiente para monitorearte'.",
    shouldBeYes: false,
  },
  {
    id: 11,
    text: "El ginecólogo te hace esperar a ti y a otras pacientes 2 horas en la sala de espera sin avisarte previamente.",
    shouldBeYes: false,
  },
  {
    id: 12,
    text: "Intentas explicar un dolor agudo en tu lengua materna y el personal médico te ignora o te habla con impaciencia por no hablar español, sin ofrecer asistencia lingüística.",
    shouldBeYes: false,
  },
  {
    id: 13,
    text: "Solicitas tu expediente para una segunda opinión y la ginecóloga te dice que 'se extravió'.",
    shouldBeYes: false,
  },
  {
    id: 14,
    text: "El consultorio no está lo suficientemente equipado. La ginecóloga te pide que esperes en bata en un pasillo donde transitan otras personas.",
    shouldBeYes: false,
  },
];

/** Grupos válidos para clasificar los casos que sí son violencia. */
const violenceGroups = [
  "violencias psicológicas y de subordinación",
  "violencias hacia tu cuerpo",
  "violencias sexuales y contra la intimidad",
];

/**
 * Pantalla del juego.
 *
 * El estado `step` alterna entre la pregunta sí/no y la selección de grupo.
 * `playCount` se guarda en localStorage para limitar las repeticiones.
 */
const Module3Game = () => {
  const { goTo } = useRoleNavigation();
  const [isSaving, setIsSaving] = useState(false);
  const [phase, setPhase] = useState<"intro" | "playing" | "feedback" | "done">("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [step, setStep] = useState<"yesno" | "group">("yesno");
  const [points, setPoints] = useState(0);
  const [firstCriterionCorrect, setFirstCriterionCorrect] = useState<boolean | null>(null);
  const [userAnswers, setUserAnswers] = useState<Array<{
    questionId: number;
    userResponse: boolean; // true = respondió "Sí", false = respondió "No"
    groupAnswer?: string;
    isCorrect: boolean;
  }>>([]);
  const [playCount, setPlayCount] = useState(0);

  // Recupera cuántas veces se ha jugado en este navegador. Se usa para
  // mostrar la pantalla de introducción solo las primeras tres veces.
  useEffect(() => {
    const count = parseInt(localStorage.getItem('module3PlayCount') || '0');
    setPlayCount(count);
  }, []);

  /** Convierte el puntaje en una calificación visual de 1 a 3 estrellas. */
  const getStars = (points: number) => {
    if (points <= 5) return 1;
    if (points <= 10) return 2;
    return 3;
  };

  /** Reinicia el estado de la partida sin borrar el contador de intentos. */
  const startGame = () => {
    setQuestionIndex(0);
    setStep("yesno");
    setPoints(0);
    setFirstCriterionCorrect(null);
    setUserAnswers([]);
    setPhase("playing");
  };

  const currentQuestion = questions[questionIndex];

  const saveGameResults = async (finalPoints: number) => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Guardamos el puntaje (game_score) en la tabla del módulo 3
      await supabase
        .from('module_3_responses')
        .upsert({ 
          id: user.id, 
          game_score: finalPoints,
          updated_at: new Date() 
        });

      // 2. Marcamos m3_game como completado en el progreso general
      await updateProgress("m3_game");
    } catch (error) {
      console.error("Error al guardar resultados del juego:", error);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Cierra la pregunta actual y avanza a la siguiente.
   *
   * `secondCriterion` es el resultado del grupo (o `true` cuando la pregunta
   * no es violencia y basta con el primer criterio). Al terminar la última
   * pregunta se guarda el puntaje y se pasa a la fase de feedback.
   */
  const finishQuestion = (secondCriterion: boolean, firstCriterionParam?: boolean, userResponseParam?: boolean, groupAnswerParam?: string) => {
    const firstCriterionValue = firstCriterionParam !== undefined ? firstCriterionParam : firstCriterionCorrect;

    // Las preguntas que sí son violencia requieren acertar también el grupo;
    // las que no lo son se evalúan solo con el sí/no.
    const totalCorrect = currentQuestion.shouldBeYes
      ? firstCriterionValue && secondCriterion
      : firstCriterionValue;

    if (totalCorrect) {
      setPoints((p) => p + 1);
    }

    // Guarda la respuesta para mostrarla en la tabla de feedback.
    const currentAnswer = {
      questionId: currentQuestion.id,
      userResponse: userResponseParam !== undefined ? userResponseParam : false, // true = respondió "Sí"
      groupAnswer: groupAnswerParam || (step === "group" ? currentQuestion.correctGroup : undefined),
      isCorrect: totalCorrect,
    };
    setUserAnswers(prev => [...prev, currentAnswer]);

    const nextIndex = questionIndex + 1;
    if (nextIndex >= questions.length) {
      setPhase("feedback");
      saveGameResults(totalCorrect ? points + 1 : points);

      // El contador local limita la introducción a las primeras partidas.
      const newCount = playCount + 1;
      localStorage.setItem('module3PlayCount', newCount.toString());
      setPlayCount(newCount);
    } else {
      setQuestionIndex(nextIndex);
      setStep("yesno");
      setFirstCriterionCorrect(null);
    }
  };

  /** Primer criterio: decidir si el caso es violencia. */
  const handleYesNo = (answerYes: boolean) => {
    const isCorrect = answerYes === currentQuestion.shouldBeYes;
    setFirstCriterionCorrect(isCorrect);

    if (answerYes) {
      // Si responde "Sí", siempre va al paso de selección de grupo
      setStep("group");
      return;
    }

    // Si responde "No", finaliza la pregunta
    const secondCriterion = !currentQuestion.shouldBeYes; // Para preguntas no violencia, el segundo criterio siempre es true
    finishQuestion(secondCriterion, isCorrect, false); // false porque respondió "No"
  };

  /** Segundo criterio: clasificar el caso en el grupo correcto. */
  const handleGroup = (group: string) => {
    const secondCriterion = group === currentQuestion.correctGroup;
    // Se pasa `true` como respuesta porque este paso solo ocurre tras un “Sí”.
    finishQuestion(secondCriterion, firstCriterionCorrect || false, true, group);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {phase === "intro" && playCount < 3 && (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <h1 className="text-3xl font-bold text-primary">¡Fortalezcamos tus conocimientos preventivos!</h1>
                <p className="text-muted-foreground text-lg">
                  Responde siempre con honestidad. Primero decides si la frase describe violencia ginecológica (sí/no). Si respondes "sí", elige el grupo correcto.
                </p>
                <p className="text-sm text-muted-foreground">
                  Tienes {3 - playCount} intento{3 - playCount === 1 ? '' : 's'} restante{3 - playCount === 1 ? '' : 's'}.
                </p>
                <Button onClick={startGame} className="gradient-primary text-white px-8 py-6 text-lg">
                  Iniciar Ejercicio
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          )}

          {phase === "intro" && playCount >= 3 && (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <h1 className="text-3xl font-bold text-primary">Límite alcanzado</h1>
                <p className="text-muted-foreground text-lg">
                  Has alcanzado el máximo de 3 intentos para este ejercicio.
                </p>
                <Button onClick={() => goTo("/module-3-feedback")} className="gradient-primary text-white px-8 py-6 text-lg">
                  Ir a retroalimentación
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          )}

          {phase === "playing" && (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <h2 className="text-2xl font-bold text-primary">Pregunta {questionIndex + 1} de {questions.length}</h2>
                <p className="text-foreground text-lg leading-relaxed">{currentQuestion.text}</p>

                {step === "yesno" && (
                  <div className="flex justify-center gap-4">
                    <Button onClick={() => handleYesNo(true)} className="bg-green-500 text-white hover:bg-green-600 px-8">
                      Sí
                    </Button>
                    <Button onClick={() => handleYesNo(false)} className="bg-red-500 text-white hover:bg-red-600 px-8">
                      No
                    </Button>
                  </div>
                )}

                {step === "group" && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Elige el grupo de violencia ginecológica:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {violenceGroups.map((group) => (
                        <Button
                          key={group}
                          onClick={() => handleGroup(group)}
                          className="border bg-white text-foreground hover:bg-muted h-auto min-h-20 py-4 px-3 whitespace-normal"
                        >
                          {group}
                        </Button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Criterio 1: {firstCriterionCorrect ? "Correcto" : "Incorrecto"}. Selecciona el grupo que mejor describe la situación.
                    </p>
                  </div>
                )}

                
              </CardContent>
            </Card>
          )}

          {phase === "feedback" && (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-primary mb-4">¡Ejercicio completado!</h2>
                  <div className="flex justify-center items-center gap-2 mb-4">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-8 h-8 ${
                          i < getStars(points)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground text-lg mb-6">
                    Obtuviste {points} de {questions.length} posibles puntos.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-primary text-center">Revisemos cada frase</h3>
                  {questions.map((question) => {
                    const userAnswer = userAnswers.find(a => a.questionId === question.id);
                    return (
                      <div key={question.id} className="border rounded-lg p-4 bg-muted/20">
                        <p className="font-medium mb-2">{question.text}</p>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Tu respuesta:</span>{" "}
                            {userAnswer?.userResponse ? "Sí" : "No"}
                            {userAnswer?.groupAnswer && ` - ${userAnswer.groupAnswer}`}
                          </p>
                          <p>
                            <span className="font-medium">Respuesta correcta:</span>{" "}
                            {question.shouldBeYes ? "Sí" : "No"}
                            {question.shouldBeYes && question.correctGroup && ` - ${question.correctGroup}`}
                          </p>
                          <p className={`font-medium ${userAnswer?.isCorrect ? "text-green-600" : "text-red-600"}`}>
                            {userAnswer?.isCorrect ? "✓ Correcto" : "✗ Incorrecto"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center gap-4 pt-6">
                  {playCount < 3 && (
                    <Button onClick={startGame} className="bg-blue-600 text-white hover:bg-blue-700 px-8">
                      Jugar otra vez
                    </Button>
                  )}
                  <Button onClick={() => goTo("/module-3-feedback")} className="bg-gray-500 text-white hover:bg-gray-600 px-8">
                    Ir a retroalimentación
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {phase === "done" && (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <h2 className="text-2xl font-bold text-primary">¡Ejercicio completado!</h2>
                <p className="text-foreground text-lg">Obtuviste {points} de {questions.length} posibles. Recuerda que solo se consigue punto si completas ambos criterios correctamente.</p>
                <div className="flex justify-center gap-4">
                  <Button onClick={startGame} className="bg-blue-600 text-white hover:bg-blue-700 px-8">
                    Jugar otra vez
                  </Button>
                  <Button 
                    onClick={() => goTo("/module-3-feedback")} 
                    disabled={isSaving}
                    className="bg-gray-500 text-white hover:bg-gray-600 px-8"
                  >
                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : null}
                    Ir a retroalimentación
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
export default Module3Game;
