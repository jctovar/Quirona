import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Brain, Clock, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const phrases = [
  { id: 1, text: '"Vas al ginecólogo si hiciste algo indebido"', correct: false },
  { id: 2, text: '"Puedes ir a consulta ginecológica para informarte"', correct: true },
  { id: 3, text: '"En la consulta, solo la médico o el médico hacen preguntas"', correct: false },
  { id: 4, text: '"Te preguntarán sobre tu cuerpo, tu historia familiar y tus hábitos de salud"', correct: true },
  { id: 5, text: '"Van a checar tu peso, tu altura y tu presión arterial"', correct: true },
  { id: 6, text: '"Pueden hablar sobre si quieres embarazarte en algún momento"', correct: true },
  { id: 7, text: '"Te harán un examen pélvico aún si no tienes malestares"', correct: false },
  { id: 8, text: '"Tu acompañante debe escuchar todo lo que tienes que decir"', correct: false },
  { id: 9, text: '"Te preguntarán sobre tu vida sexual"', correct: true },
  { id: 10, text: '"Pueden ofrecerte la vacuna contra el Virus del Papiloma Humano"', correct: true },
  { id: 11, text: '"Es innecesario ir a la consulta ginecológica por dolores menstruales fuertes"', correct: false },
  { id: 12, text: '"Los remedios caseros pueden ocultar una enfermedad más grave"', correct: true },
  { id: 13, text: '"Te deben de regañar por haberte enfermado"', correct: false },
  { id: 14, text: '"Puedo hacer preguntas para conocer mejor a mi médico"', correct: true },
  { id: 15, text: '"Una consulta ginecológica puede ser como un trabajo de equipo"', correct: true },
  { id: 16, text: '"La primera consulta debe ser después de mi primera relación sexual"', correct: false },
  { id: 17, text: '"Mi primera consulta puede ser entre los 13 y 15 años de edad"', correct: true },
];

const TOTAL_TIME = 60;
const MAX_VISIBLE = 5;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Module1Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevAttempts = (location.state as { attempts?: number } | null)?.attempts ?? 0;
  const [phase, setPhase] = useState<"intro" | "playing" | "done">("intro");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [queue, setQueue] = useState<typeof phrases>([]);
  const [visible, setVisible] = useState<typeof phrases>([]);
  const [accepted, setAccepted] = useState<number[]>([]);
  const [rejected, setRejected] = useState<number[]>([]);

  const startGame = useCallback(() => {
    const shuffled = shuffleArray(phrases);
    setQueue(shuffled.slice(MAX_VISIBLE));
    setVisible(shuffled.slice(0, MAX_VISIBLE));
    setAccepted([]);
    setRejected([]);
    setTimeLeft(TOTAL_TIME);
    setPhase("playing");
  }, []);

  // Timer
  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      setPhase("done");
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  // Check if all phrases are classified
  useEffect(() => {
    if (phase === "playing" && accepted.length + rejected.length === phrases.length) {
      setPhase("done");
    }
  }, [accepted, rejected, phase]);

  const handleClassify = (id: number, accept: boolean) => {
    if (accept) setAccepted((p) => [...p, id]);
    else setRejected((p) => [...p, id]);

    setVisible((prev) => {
      const remaining = prev.filter((p) => p.id !== id);
      if (queue.length > 0) {
        const next = queue[0];
        setQueue((q) => q.slice(1));
        return [...remaining, next];
      }
      return remaining;
    });
  };

  // Calculate score
  const getScore = () => {
    let correct = 0;
    accepted.forEach((id) => {
      const p = phrases.find((ph) => ph.id === id);
      if (p?.correct) correct++;
    });
    rejected.forEach((id) => {
      const p = phrases.find((ph) => ph.id === id);
      if (!p?.correct) correct++;
    });
    return correct;
  };

  // Ensure at least one correct phrase is visible
  useEffect(() => {
    if (phase !== "playing") return;
    const hasCorrect = visible.some((v) => v.correct);
    if (!hasCorrect && queue.length > 0) {
      const correctIdx = queue.findIndex((q) => q.correct);
      if (correctIdx >= 0) {
        setQueue((prev) => {
          const newQ = [...prev];
          const [correctPhrase] = newQ.splice(correctIdx, 1);
          setVisible((v) => [...v, correctPhrase]);
          return newQ;
        });
      }
    }
  }, [visible, queue, phase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />

      <div className="pt-96 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {phase === "intro" && (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <h1 className="text-3xl font-bold text-primary">
                  ¡Fortalezcamos tus conocimientos preventivos!
                </h1>

                {/* Brain placeholder */}
                <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-primary/40" />
                </div>

                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  A continuación encontrarás algunas frases relacionadas con creencias sobre la primera consulta ginecológica. Selecciona las frases que son importantes que se queden contigo y descarta las que no necesitas.
                </p>
                <p className="text-sm text-muted-foreground">
                  Tienes <strong>1 minuto</strong> para clasificar todas las frases.
                </p>
                <Button onClick={startGame} className="gradient-primary text-white px-8 py-6 text-lg">
                  ¡Comenzar!
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          )}

          {phase === "playing" && (
            <div className="space-y-6">
              {/* Timer bar */}
              <Card className="border-2 shadow-quirona">
                <CardContent className="p-4 flex items-center gap-4">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <Progress value={(timeLeft / TOTAL_TIME) * 100} className="flex-1" />
                  <span className="text-lg font-bold text-primary tabular-nums w-12 text-right">
                    {timeLeft}s
                  </span>
                </CardContent>
              </Card>

              {/* Brain placeholder center */}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
                  <Brain className="w-12 h-12 text-primary/40" />
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Clasificadas: {accepted.length + rejected.length} / {phrases.length}
              </p>

              {/* Phrase cards */}
              <div className="space-y-4">
                {visible.map((phrase) => (
                  <Card key={phrase.id} className="border-2 shadow-quirona">
                    <CardContent className="p-5 flex flex-col sm:flex-row items-center gap-4">
                      <p className="text-foreground font-medium flex-1 text-center sm:text-left">
                        {phrase.text}
                      </p>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          onClick={() => handleClassify(phrase.id, true)}
                          className="bg-primary text-primary-foreground hover:bg-primary/80"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Quédate
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleClassify(phrase.id, false)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Fuera
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {phase === "done" && (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <h2 className="text-2xl font-bold text-primary">¡Tiempo terminado!</h2>
                <p className="text-muted-foreground text-lg">
                  Clasificaste {accepted.length + rejected.length} de {phrases.length} frases.
                </p>
                <Button
                  onClick={() => {
                    const score = getScore();
                    navigate("/module-1-feedback", { state: { score, accepted, rejected, attempts: prevAttempts + 1 } });
                  }}
                  className="gradient-primary text-white px-8 py-6 text-lg"
                >
                  Ver retroalimentación
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Module1Game;
