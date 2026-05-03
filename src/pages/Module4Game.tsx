import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Clock, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import sillaImg from "@/assets/silla.jpg";
import { supabase } from "@/supabaseClient";
import { updateProgress } from "@/lib/progressHelper";
import { Loader2 } from "lucide-react";

const phrases = [
  { id: 1, text: '“Perdón por molestar, mejor no pregunto para no verme intensa.”', correct: true },
  { id: 2, text: '“Necesito que cierren la puerta y que nadie entre sin mi consentimiento.”', correct: false },
  { id: 3, text: '“Si me duele, mejor me aguanto; dicen que así son estas revisiones.”', correct: true },
  { id: 4, text: '“Antes de iniciar, necesito que me explique qué va a hacer y por qué, paso por paso.”', correct: true },
  { id: 5, text: '“No pasa nada si entra alguien, no soy tan delicada.”', correct: true },
  { id: 6, text: '“Me siento rebasada. Voy a detener la consulta y la retomaré cuando me sienta lista.”', correct: false },
  { id: 7, text: '“No se preocupe si va rápido, yo me adapto… para no hacerla perder tiempo.”', correct: true },
  { id: 8, text: '“Alto. Me duele. Pare ahora y pausamos; no continúe.”', correct: true },
  { id: 9, text: '“No voy a pedir que me avise antes de tocarme, suena exagerado.” ', correct: true },
  { id: 10, text: '“Necesito que me diga qué está observando y qué significa en términos claros.”', correct: true },
  { id: 11, text: '“Está bien, no hace falta que me explique… usted sabe, yo confío.”', correct: false },
  { id: 12, text: '“Para continuar necesito una bata o sábana para cubrirme, por favor.”', correct: true },
  { id: 13, text: '“Prefiero no traer acompañante… una mujer debe aguantar sola y sin quejarse.”', correct: true },
  { id: 14, text: '“Espere. Quiero que me pregunte antes de tocarme y yo le digo cuando esté lista.”', correct: true },
  { id: 15, text: '“Voy a tomarme un momento. Necesito privacidad y tiempo; no continuaré con prisa.”', correct: false },
  { id: 16, text: '“El dolor no es algo que tenga que aguantar. Ajuste el procedimiento o lo detenemos.”', correct: true },
  { id: 17, text: '“Si me siento mal, mejor termino y ya… pero sin decir nada, para evitar problemas.”', correct: true },
  { id: 18, text: '“Me da pena decir ‘alto’… no quiero verme dramática.”', correct: true },
  { id: 19, text: '“Para continuar, quiero que mi acompañante esté presente durante la exploración.”.', correct: true },
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
const Module4Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevAttempts = (location.state as { attempts?: number } | null)?.attempts ?? 0;
  const [phase, setPhase] = useState<"intro" | "playing" | "done">("intro");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isSaving, setIsSaving] = useState(false);
  const [queue, setQueue] = useState<typeof phrases>([]);
  const [visible, setVisible] = useState<typeof phrases>([]);
  const [accepted, setAccepted] = useState<number[]>([]);
  const [rejected, setRejected] = useState<number[]>([]);
  const [draggedId, setDraggedId] = useState<number | null>(null);
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
  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropOnBrain = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedId === null) return;

    // Add to accepted
    setAccepted((p) => [...p, draggedId]);
    removePhrase(draggedId);
    setDraggedId(null);
  };

  const removePhrase = (id: number) => {
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

  const handleReject = (id: number) => {
    setRejected((p) => [...p, id]);
    removePhrase(id);
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
  const handleFinishGame = async () => {
    setIsSaving(true);
    const score = getScore();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // 1. Guardamos el score en la tabla del Módulo 4
        await supabase
          .from('module_4_responses')
          .upsert({
            id: user.id,
            game_score: score,
            updated_at: new Date()
          });
      }

      // 2. Marcamos m4_game en el progreso
      await updateProgress("m4_game");

      // 3. Navegamos al feedback pasando los datos
      navigate("/module-4-feedback", { 
        state: { 
          score, 
          accepted, 
          rejected, 
          attempts: prevAttempts + 1 
        } 
      });
    } catch (error) {
      console.error("Error al guardar juego:", error);
      // Navegamos de todos modos para no bloquear a la usuaria
      navigate("/module-4-feedback");
    } finally {
      setIsSaving(false);
    }
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
      <Navbar isAuthenticated />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {phase === "intro" && (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <h1 className="text-3xl font-bold text-primary">
                  ¡Fortalezcamos tus conocimientos preventivos!
                </h1>
                {/* Brain image */}
                <div className="w-80 h-15 mx-auto">
                  <img src={sillaImg} alt="Silla" className="w-full h-full object-contain" />
                </div>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Ésta es la imagen de una silla adecuada para un check up. Alrededor de esta encontrarás diversas frases que se podrían pensar o decir ante determinadas situaciones en una consulta ginecológica, arrasta a la imagen aquellas frases que son asertivas y deja fuera aquellas que no lo sean.
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

              {/* Score counter */}
              <p className="text-center text-sm text-muted-foreground">
                Clasificadas: {accepted.length + rejected.length} / {phrases.length}
              </p>

              {/* Main game area with brain and phrases */}
              <div className="relative w-full">
                {/* Brain center dropzone */}
                <div 
                  className="flex justify-center my-8"
                  onDragOver={handleDragOver}
                  onDrop={handleDropOnBrain}
                >
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <img 
                      src={sillaImg} 
                      alt="Silla" 
                      className={`w-full h-full object-contain transition-all ${
                        draggedId !== null ? "opacity-80 scale-105" : "opacity-100 scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center pointer-events-none">
                        <p className="text-xs text-primary/60 font-semibold">Arrastra aquí</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phrase cards around the brain */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visible.map((phrase) => (
                    <Card 
                      key={phrase.id} 
                      className={`border-2 shadow-quirona cursor-move transition-all ${
                        draggedId === phrase.id ? "opacity-50" : "opacity-100"
                      }`}
                      draggable
                      onDragStart={() => handleDragStart(phrase.id)}
                      onDragEnd={() => setDraggedId(null)}
                    >
                      <CardContent className="p-4">
                        <p className="text-foreground font-medium text-sm mb-4">
                          {phrase.text}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(phrase.id)}
                            className="flex-1"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Descartar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                  onClick={handleFinishGame}
                  disabled={isSaving}
                  className="gradient-primary text-white px-8 py-6 text-lg"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      Ver retroalimentación
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
export default Module4Game;
