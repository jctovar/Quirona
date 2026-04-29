import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/supabaseClient"; // Importación de Supabase
import { updateProgress } from "@/lib/progressHelper";
import consultorioImg from "@/assets/consultorio.png";
const phrases = [
  { id: 1, text: 'Área para cambiarte', correct: true },
  { id: 2, text: 'Sábanas sucias', correct: false },
  { id: 3, text: 'Área de entrevista', correct: true },
  { id: 4, text: 'Lavabo', correct: true },
  { id: 5, text: 'Acompañante', correct: true },
  { id: 6, text: 'Zona de comida', correct: false },
  { id: 7, text: 'Confidencialidad', correct: true },
  { id: 8, text: 'Ética', correct: true },
  { id: 9, text: 'Respeto', correct: true },
  { id: 10, text: 'Consentimiento', correct: true },
  { id: 11, text: 'Comentarios personales sobre tu vida sexual', correct: false },
  { id: 12, text: 'Comunicación', correct: true },
  { id: 13, text: 'Instrucciones', correct: true },
  { id: 14, text: 'Área de intervención', correct: true },
  { id: 15, text: 'Olores desagradables', correct: false },
  { id: 16, text: 'Biombo/Cortina/Separación', correct: true },
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
const Module2Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevAttempts = (location.state as { attempts?: number } | null)?.attempts ?? 0;
  const [phase, setPhase] = useState<"intro" | "playing" | "done">("intro");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [queue, setQueue] = useState<typeof phrases>([]);
  const [visible, setVisible] = useState<typeof phrases>([]);
  const [accepted, setAccepted] = useState<number[]>([]);
  const [rejected, setRejected] = useState<number[]>([]);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
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
  // --- FUNCIÓN PARA GUARDAR RESULTADOS Y PROGRESO ---
  const handleFinishGame = async () => {
    setIsSaving(true);
    const score = getScore();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      // 1. Guardamos el score en la tabla del módulo 2
      const { error: saveError } = await supabase
        .from('module_2_responses')
        .upsert({
          id: user.id,
          game_score: score,
          updated_at: new Date()
        });

      if (saveError) throw saveError;

      // 2. Actualizamos el progreso total (m2_game)
      await updateProgress("m2_game");

      // 3. Navegamos a la retroalimentación
      navigate("/module-2-feedback", { 
        state: { 
          score, 
          accepted, 
          rejected, 
          attempts: prevAttempts + 1 
        } 
      });

    } catch (error: any) {
      console.error("Error al guardar resultados del juego:", error);
      // Navegamos de todos modos para no interrumpir el flujo
      navigate("/module-2-feedback", { state: { score, accepted, rejected, attempts: prevAttempts + 1 } });
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
                  <img src={consultorioImg} alt="Consultorio" className="w-full h-full object-contain" />
                </div>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Ésta es la imagen de un consultorio adecuado para un check up. Alrededor de esta encontrarás diversas palabras, arrastra dentro de la imagen aquellas palabras que corresponden a los elementos básicos indispensables que debe tener un consultorio para revisión ginecológica.
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
                      src={consultorioImg} 
                      alt="Consultorio" 
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
            <Card className="border-2 shadow-quirona animate-in zoom-in-95 duration-500">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                   <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-primary">¡Sesión terminada!</h2>
                <p className="text-muted-foreground text-lg">
                  Clasificaste <strong>{accepted.length + rejected.length}</strong> elementos del consultorio.
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg inline-block">
                   <p className="text-sm font-medium">Puntuación obtenida:</p>
                   <p className="text-4xl font-bold text-primary">{getScore()}</p>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={handleFinishGame}
                    disabled={isSaving}
                    className="gradient-primary text-white px-10 py-8 text-xl shadow-lg hover:scale-105 transition-transform"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        Guardando resultados...
                      </>
                    ) : (
                      <>
                        Ver mi retroalimentación
                        <ArrowRight className="ml-2 w-6 h-6" />
                      </>
                    )}
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
export default Module2Game;
