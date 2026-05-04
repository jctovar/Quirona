import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TestMenu } from "@/components/TestMenu";
import { markTestCompleted } from "@/lib/testProgress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { GripVertical, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/supabaseClient"; // Agregado

type Phase = 
  | "training-intro" | "training-words" | "training-summary" | "training-rank" | "training-complete"
  | "exercise1-words" | "exercise1-summary" | "exercise1-rank"
  | "exercise2-words" | "exercise2-summary" | "exercise2-rank"
  | "complete";

// --- Tu componente DraggableList original ---
interface DraggableListProps {
  items: string[];
  onReorder: (items: string[]) => void;
  stimulusWord: string;
}

const DraggableList = ({ items, onReorder, stimulusWord }: DraggableListProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    onReorder(newItems);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-2">
      <p className="text-center font-semibold text-primary mb-4 uppercase">{stimulusWord}</p>
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={() => handleDrop(index)}
          className={`flex items-center gap-3 p-3 bg-card border rounded-lg cursor-move transition-all ${
            draggedIndex === index ? "opacity-50 scale-95" : ""
          } ${dragOverIndex === index ? "border-primary border-2" : "border-border"}`}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground w-6">{index + 1}.</span>
          <span className="flex-1">{item}</span>
        </div>
      ))}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Arrastra las palabras hacia arriba para indicar mayor importancia
      </p>
    </div>
  );
};

const SemanticNetworkTest = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [phase, setPhase] = useState<Phase>("training-intro");
  const [isSaving, setIsSaving] = useState(false); // Para el botón final
  
  // Estados originales
  const [trainingWords, setTrainingWords] = useState<string[]>(["", "", ""]);
  const [trainingRanked, setTrainingRanked] = useState<string[]>([]);
  
  const [exercise1Words, setExercise1Words] = useState<string[]>(Array(10).fill(""));
  const [exercise1Ranked, setExercise1Ranked] = useState<string[]>([]);
  const [ex1InitialOrder, setEx1InitialOrder] = useState<string[]>([]); // Para DB

  const [exercise2Words, setExercise2Words] = useState<string[]>(Array(10).fill(""));
  const [exercise2Ranked, setExercise2Ranked] = useState<string[]>([]);
  const [ex2InitialOrder, setEx2InitialOrder] = useState<string[]>([]); // Para DB

  // Funciones de actualización originales
  const updateTrainingWord = (index: number, value: string) => {
    const newWords = [...trainingWords];
    newWords[index] = value;
    setTrainingWords(newWords);
  };

  const updateExercise1Word = (index: number, value: string) => {
    const newWords = [...exercise1Words];
    newWords[index] = value;
    setExercise1Words(newWords);
  };

  const updateExercise2Word = (index: number, value: string) => {
    const newWords = [...exercise2Words];
    newWords[index] = value;
    setExercise2Words(newWords);
  };

  const getFilledWords = (words: string[]) => words.filter(w => w.trim() !== "");

  // --- Manejo de Fases con Validación y Captura de Orden Inicial ---

  const handleTrainingNext = () => {
    const filled = getFilledWords(trainingWords);
    if (filled.length < 3) {
      toast.error("Por favor, escribe las 3 palabras para continuar");
      return;
    }
    setTrainingRanked(filled);
    setPhase("training-summary");
  };

  const handleExercise1Next = () => {
    const filled = getFilledWords(exercise1Words);
    if (filled.length < 5) { // 
      toast.error("Por favor, completa por lo menos 5 palabras para continuar");
      return;
    }
    setEx1InitialOrder(filled); // Guardamos como las escribió
    setExercise1Ranked(filled);
    setPhase("exercise1-summary");
  };

  const handleExercise2Next = () => {
    const filled = getFilledWords(exercise2Words);
    if (filled.length < 5) { 
      toast.error("Por favor, completa por lo menos 5 palabras para continuar");
      return;
    }
    setEx2InitialOrder(filled); // Guardamos como las escribió
    setExercise2Ranked(filled);
    setPhase("exercise2-summary");
  };

  // --- FUNCIÓN FINAL CON SUPABASE ---
  const handleComplete = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Sesión no encontrada");

      const { error } = await supabase
        .from('semantic_network_responses')
        .upsert({
          id: user.id,
          ex1_initial: ex1InitialOrder,
          ex1_final: exercise1Ranked,
          ex2_initial: ex2InitialOrder,
          ex2_final: exercise2Ranked,
          is_completed: true,
          updated_at: new Date()
        });

      if (error) throw error;

      toast.success("¡Cuestionario completado exitosamente!");
      markTestCompleted("semantic-network");
      
      // Redirigir a initial-question como pediste
      navigate("/initial-question"); 

    } catch (error: any) {
      toast.error("Error al guardar: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const formatWordsList = (words: string[]) => {
    if (words.length === 0) return "";
    if (words.length === 1) return words[0];
    if (words.length === 2) return `${words[0]} y ${words[1]}`;
    return words.slice(0, -1).join(", ") + " y " + words[words.length - 1];
  };

  if (showMenu) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Navbar isAuthenticated />
        <TestMenu currentTest="semantic-network" onStart={() => setShowMenu(false)} />
      </div>
    );
  }

  // --- RENDERIZADO CON TUS TEXTOS ORIGINALES ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      
      <main className="container mx-auto pt-48 pb-8 px-4">
        <Card className="max-w-3xl mx-auto border-2 shadow-quirona">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary font-bold">
              Cuestionario 2: Redes Semánticas Naturales Modificadas
            </CardTitle>
            {phase.startsWith("training") && <CardDescription className="text-lg">Entrenamiento</CardDescription>}
            {phase.startsWith("exercise1") && <CardDescription className="text-lg">Ejercicio 1</CardDescription>}
            {phase.startsWith("exercise2") && <CardDescription className="text-lg">Ejercicio 2</CardDescription>}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {phase === "training-intro" && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-4 border">
                  <h3 className="font-semibold text-lg">Instrucciones</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    A continuación, se te presentará una frase estímulo, para la cual, tú debes escribir 
                    3 palabras (independientes las unas de las otras), para definir lo que significa para ti 
                    (puedes utilizar sustantivos, adjetivos, verbos y adverbios).
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 p-4 rounded-lg flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Nota:</strong> No puedes emplear preposiciones, conjunciones, artículos o cualquier otro tipo de partículas gramaticales.
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Antes de pasar al ejercicio principal, te pido que realicemos una breve práctica:
                  </p>
                </div>
                <Button onClick={() => setPhase("training-words")} className="w-full gradient-primary" size="lg">
                  Comenzar entrenamiento
                </Button>
              </div>
            )}

            {phase === "training-words" && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">Escribe 3 palabras para definir lo que significa para ti...</p>
                <p className="text-center text-3xl font-bold text-primary tracking-widest">MANZANA</p>
                <div className="space-y-4 max-w-md mx-auto">
                  {trainingWords.map((word, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-20">Palabra {index + 1}:</span>
                      <Input value={word} onChange={(e) => updateTrainingWord(index, e.target.value)} placeholder={`Palabra ${index + 1}`} className="flex-1" />
                    </div>
                  ))}
                </div>
                <Button onClick={handleTrainingNext} className="w-full gradient-primary" size="lg">Continuar</Button>
              </div>
            )}

            {/* Fases de resumen y ordenamiento mantienen TUS textos de importancia */}
            {phase === "training-summary" && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">Las palabras que escribiste fueron:</p>
                <p className="text-center text-lg font-semibold text-primary">{formatWordsList(trainingRanked)}</p>
                <div className="bg-muted/50 p-6 rounded-lg space-y-4 border">
                  <h3 className="font-semibold">Segunda Parte:</h3>
                  <p className="text-sm text-muted-foreground">
                    Debes asignar la parte más alta de la lista a la palabra más importante... la segunda posición a la que le sigue en importancia... y así sucesivamente.
                  </p>
                </div>
                <Button onClick={() => setPhase("training-rank")} className="w-full gradient-primary" size="lg">Ordenar palabras</Button>
              </div>
            )}

            {phase === "training-rank" && (
              <div className="space-y-6">
                <DraggableList items={trainingRanked} onReorder={setTrainingRanked} stimulusWord="Manzana" />
                <Button onClick={() => setPhase("training-complete")} className="w-full gradient-primary" size="lg">Continuar</Button>
              </div>
            )}

            {phase === "training-complete" && (
              <div className="space-y-6 text-center">
                <Check className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="text-xl font-semibold">¡Muy bien! Has terminado el entrenamiento</h3>
                <Button onClick={() => setPhase("exercise1-words")} className="w-full gradient-primary" size="lg">Iniciar ejercicio</Button>
              </div>
            )}

            {phase === "exercise1-words" && (
              <div className="space-y-6">
                <p className="text-center text-2xl font-bold text-primary uppercase">Consulta/revisión ginecológica</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercise1Words.map((word, index) => (
                    <Input key={index} value={word} onChange={(e) => updateExercise1Word(index, e.target.value)} placeholder={index < 5 ? `Palabra ${index + 1} *` : `Palabra ${index + 1}`} />
                  ))}
                </div>
                <Button onClick={handleExercise1Next} className="w-full gradient-primary" size="lg">Continuar</Button>
              </div>
            )}

            {phase === "exercise1-summary" && (
              <div className="space-y-6 text-center">
                <p className="text-lg font-semibold text-primary">{formatWordsList(exercise1Ranked)}</p>
                <Button onClick={() => setPhase("exercise1-rank")} className="w-full gradient-primary" size="lg">Ordenar palabras</Button>
              </div>
            )}

            {phase === "exercise1-rank" && (
              <div className="space-y-6">
                <DraggableList items={exercise1Ranked} onReorder={setExercise1Ranked} stimulusWord="Consulta ginecológica" />
                <Button onClick={() => setPhase("exercise2-words")} className="w-full gradient-primary" size="lg">Continuar al Ejercicio 2</Button>
              </div>
            )}

            {phase === "exercise2-words" && (
              <div className="space-y-6">
                <p className="text-center text-2xl font-bold text-primary uppercase">Violencia ginecológica</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercise2Words.map((word, index) => (
                    <Input key={index} value={word} onChange={(e) => updateExercise2Word(index, e.target.value)} placeholder={index < 5 ? `Palabra ${index + 1} *` : `Palabra ${index + 1}`} />
                  ))}
                </div>
                <Button onClick={handleExercise2Next} className="w-full gradient-primary" size="lg">Continuar</Button>
              </div>
            )}

            {phase === "exercise2-summary" && (
              <div className="space-y-6 text-center">
                <p className="text-lg font-semibold text-primary">{formatWordsList(exercise2Ranked)}</p>
                <Button onClick={() => setPhase("exercise2-rank")} className="w-full gradient-primary" size="lg">Ordenar palabras</Button>
              </div>
            )}

            {phase === "exercise2-rank" && (
              <div className="space-y-6">
                <DraggableList items={exercise2Ranked} onReorder={setExercise2Ranked} stimulusWord="Violencia ginecológica" />
                <Button onClick={handleComplete} disabled={isSaving} className="w-full gradient-primary" size="lg">
                  {isSaving ? "Guardando..." : "Pasar al siguiente cuestionario"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SemanticNetworkTest;