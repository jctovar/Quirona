import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { GripVertical, Check, AlertCircle } from "lucide-react";

type Phase = 
  | "training-intro"
  | "training-words"
  | "training-summary"
  | "training-rank"
  | "training-complete"
  | "exercise1-words"
  | "exercise1-summary"
  | "exercise1-rank"
  | "exercise2-words"
  | "exercise2-summary"
  | "exercise2-rank"
  | "complete";

interface DraggableListProps {
  items: string[];
  onReorder: (items: string[]) => void;
  stimulusWord: string;
}

const DraggableList = ({ items, onReorder, stimulusWord }: DraggableListProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

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

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-2">
      <p className="text-center font-semibold text-primary mb-4">{stimulusWord}</p>
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={() => handleDrop(index)}
          onDragEnd={handleDragEnd}
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
  const [phase, setPhase] = useState<Phase>("training-intro");
  
  // Training state
  const [trainingWords, setTrainingWords] = useState<string[]>(["", "", ""]);
  const [trainingRanked, setTrainingRanked] = useState<string[]>([]);
  
  // Exercise 1 state - Consulta ginecológica
  const [exercise1Words, setExercise1Words] = useState<string[]>(Array(10).fill(""));
  const [exercise1Ranked, setExercise1Ranked] = useState<string[]>([]);
  
  // Exercise 2 state - Violencia ginecológica
  const [exercise2Words, setExercise2Words] = useState<string[]>(Array(10).fill(""));
  const [exercise2Ranked, setExercise2Ranked] = useState<string[]>([]);

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
    if (filled.length < 5) {
      toast.error("Por favor, escribe al menos 5 palabras para continuar");
      return;
    }
    setExercise1Ranked(filled);
    setPhase("exercise1-summary");
  };

  const handleExercise2Next = () => {
    const filled = getFilledWords(exercise2Words);
    if (filled.length < 5) {
      toast.error("Por favor, escribe al menos 5 palabras para continuar");
      return;
    }
    setExercise2Ranked(filled);
    setPhase("exercise2-summary");
  };

  const handleComplete = () => {
    console.log("Semantic Network Results:", {
      training: trainingRanked,
      exercise1: exercise1Ranked,
      exercise2: exercise2Ranked
    });
    toast.success("¡Cuestionario completado exitosamente!");
    setTimeout(() => navigate("/anxiety-inventory"), 1500);
  };

  const formatWordsList = (words: string[]) => {
    if (words.length === 0) return "";
    if (words.length === 1) return words[0];
    if (words.length === 2) return `${words[0]} y ${words[1]}`;
    return words.slice(0, -1).join(", ") + " y " + words[words.length - 1];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      
      <main className="container mx-auto pt-96 pb-8 px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">
              Cuestionario 2: Redes Semánticas Naturales Modificadas
            </CardTitle>
            {phase.startsWith("training") && (
              <CardDescription className="text-lg">Entrenamiento</CardDescription>
            )}
            {phase.startsWith("exercise1") && (
              <CardDescription className="text-lg">Ejercicio 1</CardDescription>
            )}
            {phase.startsWith("exercise2") && (
              <CardDescription className="text-lg">Ejercicio 2</CardDescription>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Training Introduction */}
            {phase === "training-intro" && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Instrucciones</h3>
                  <p className="text-muted-foreground">
                    A continuación, se te presentará una frase estímulo, para la cual, tú debes escribir 
                    10 palabras (independientes las unas de las otras), para definir lo que significa para ti 
                    (puedes utilizar sustantivos, adjetivos, verbos y adverbios).
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-lg flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Nota:</strong> No puedes emplear preposiciones (antes, bajo, con, contra, de, desde, etc.), 
                      conjunciones (y, ni, pero, porque, aunque, etc.), artículos (el, los, las, un, unos, etc.) 
                      o cualquier otro tipo de partículas gramaticales de este tipo.
                    </p>
                  </div>
                  <p className="text-muted-foreground">
                    Antes de pasar al ejercicio principal, te pido que realicemos una breve práctica de la tarea que realizarás:
                  </p>
                </div>
                
                <Button 
                  onClick={() => setPhase("training-words")} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Comenzar entrenamiento
                </Button>
              </div>
            )}

            {/* Training - Write Words */}
            {phase === "training-words" && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">
                  Escribe 3 palabras para definir lo que significa para ti...
                </p>
                <p className="text-center text-2xl font-bold text-primary">Manzana</p>
                
                <div className="space-y-4 max-w-md mx-auto">
                  {trainingWords.map((word, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-20">
                        Palabra {index + 1}:
                      </span>
                      <Input
                        value={word}
                        onChange={(e) => updateTrainingWord(index, e.target.value)}
                        placeholder={`Palabra ${index + 1}`}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleTrainingNext} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Continuar
                </Button>
              </div>
            )}

            {/* Training - Summary */}
            {phase === "training-summary" && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">Las palabras que escribiste fueron:</p>
                <p className="text-center text-lg font-semibold text-primary">
                  {formatWordsList(trainingRanked)}
                </p>
                
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold">Segunda Parte:</h3>
                  <p className="text-muted-foreground">
                    Una vez escritas las palabras que has elegido, debes jerarquizarlas, es decir, 
                    debes elegir el grado de importancia que estas palabras tienen para ti. Arrastra las palabras para poder acomodarlas.
                  </p>
                  <p className="text-muted-foreground">
                    Debes asignar la parte más alta de la lista a la palabra más importante, relacionada o que mejor define 
                    para ti a la palabra "manzana", la segunda posición a la que le sigue en importancia, la tercera posición 
                    de arriba hacia abajo a la siguiente y así sucesivamente hasta terminar de jerarquizar todas las palabras que elegiste previamente.
                  </p>
                </div>

                <Button 
                  onClick={() => setPhase("training-rank")} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Ordenar palabras
                </Button>
              </div>
            )}

            {/* Training - Rank */}
            {phase === "training-rank" && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">
                  Ordena las palabras arrastrando hacia arriba las palabras que mejor definan para ti:
                </p>
                
                <div className="max-w-md mx-auto">
                  <DraggableList 
                    items={trainingRanked}
                    onReorder={setTrainingRanked}
                    stimulusWord="Manzana"
                  />
                </div>

                <Button 
                  onClick={() => setPhase("training-complete")} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Continuar
                </Button>
              </div>
            )}

            {/* Training Complete */}
            {phase === "training-complete" && (
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">
                  ¡Muy bien! Has terminado el ejercicio de entrenamiento
                </h3>
                <p className="text-muted-foreground">
                  Da clic en el botón de "Iniciar ejercicio" para comenzar.
                </p>
                
                <Button 
                  onClick={() => setPhase("exercise1-words")} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Iniciar ejercicio
                </Button>
              </div>
            )}

            {/* Exercise 1 - Words */}
            {phase === "exercise1-words" && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    A continuación, se te presentará una frase estímulo, para la cual, tú debes escribir 
                    10 palabras (independientes las unas de las otras), para definir lo que significa para ti 
                    (puedes utilizar sustantivos, adjetivos, verbos y adverbios).
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                    <strong>Nota:</strong> No puedes emplear preposiciones, conjunciones, artículos o cualquier 
                    otro tipo de partículas gramaticales de este tipo.
                  </p>
                </div>

                <p className="text-center text-muted-foreground">
                  Escribe al menos 5 (cinco) palabras y máximo 10 (diez) palabras de lo que es para ti...
                </p>
                <p className="text-center text-2xl font-bold text-primary">Consulta/revisión ginecológica</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercise1Words.map((word, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-24">
                        Palabra {index + 1}:
                      </span>
                      <Input
                        value={word}
                        onChange={(e) => updateExercise1Word(index, e.target.value)}
                        placeholder={index < 5 ? `Palabra ${index + 1} *` : `Palabra ${index + 1}`}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">* Campos obligatorios (mínimo 5 palabras)</p>

                <Button 
                  onClick={handleExercise1Next} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Continuar
                </Button>
              </div>
            )}

            {/* Exercise 1 - Summary */}
            {phase === "exercise1-summary" && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">Las palabras que escribiste fueron:</p>
                <p className="text-center text-lg font-semibold text-primary">
                  {formatWordsList(exercise1Ranked)}
                </p>
                
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="text-muted-foreground">
                    Para cada palabra elegida, debes asignar el primer lugar (la parte más alta de la lista) a la palabra 
                    más importante, relacionada o que mejor define a la frase, el segundo lugar a la que le sigue en importancia, 
                    el tercer lugar a la siguiente y así sucesivamente hasta terminar de jerarquizar todas las palabras que elegiste previamente.
                  </p>
                </div>

                <Button 
                  onClick={() => setPhase("exercise1-rank")} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Ordenar palabras
                </Button>
              </div>
            )}

            {/* Exercise 1 - Rank */}
            {phase === "exercise1-rank" && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">
                  Ordena las palabras arrastrando hacia arriba las palabras que mejor definan para ti la frase:
                </p>
                
                <div className="max-w-md mx-auto">
                  <DraggableList 
                    items={exercise1Ranked}
                    onReorder={setExercise1Ranked}
                    stimulusWord="Consulta/revisión ginecológica"
                  />
                </div>

                <Button 
                  onClick={() => setPhase("exercise2-words")} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Continuar al Ejercicio 2
                </Button>
              </div>
            )}

            {/* Exercise 2 - Words */}
            {phase === "exercise2-words" && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    A continuación, se te presentará una frase estímulo, para la cual, tú debes escribir 
                    10 palabras (independientes las unas de las otras), para definir lo que significa para ti 
                    (puedes utilizar sustantivos, adjetivos, verbos y adverbios).
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                    <strong>Nota:</strong> No puedes emplear preposiciones, conjunciones, artículos o cualquier 
                    otro tipo de partículas gramaticales de este tipo.
                  </p>
                </div>

                <p className="text-center text-muted-foreground">
                  Escribe al menos 5 (cinco) palabras y máximo 10 (diez) palabras de lo que para ti es...
                </p>
                <p className="text-center text-2xl font-bold text-primary">Violencia ginecológica</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercise2Words.map((word, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-24">
                        Palabra {index + 1}:
                      </span>
                      <Input
                        value={word}
                        onChange={(e) => updateExercise2Word(index, e.target.value)}
                        placeholder={index < 5 ? `Palabra ${index + 1} *` : `Palabra ${index + 1}`}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">* Campos obligatorios (mínimo 5 palabras)</p>

                <Button 
                  onClick={handleExercise2Next} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Continuar
                </Button>
              </div>
            )}

            {/* Exercise 2 - Summary */}
            {phase === "exercise2-summary" && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">Las palabras que escribiste fueron:</p>
                <p className="text-center text-lg font-semibold text-primary">
                  {formatWordsList(exercise2Ranked)}
                </p>
                
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="text-muted-foreground">
                    Para cada palabra elegida, debes asignar el primer lugar (la parte más alta de la lista) a la palabra 
                    más importante, relacionada, o que mejor define a la frase, el segundo lugar a la que le sigue en importancia, 
                    el tercer lugar a la siguiente y así sucesivamente hasta terminar de jerarquizar todas las palabras que elegiste previamente.
                  </p>
                </div>

                <Button 
                  onClick={() => setPhase("exercise2-rank")} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Ordenar palabras
                </Button>
              </div>
            )}

            {/* Exercise 2 - Rank */}
            {phase === "exercise2-rank" && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">
                  Ordena las palabras arrastrando hacia arriba las palabras que mejor definan para ti la frase:
                </p>
                
                <div className="max-w-md mx-auto">
                  <DraggableList 
                    items={exercise2Ranked}
                    onReorder={setExercise2Ranked}
                    stimulusWord="Violencia ginecológica"
                  />
                </div>

                <Button 
                  onClick={handleComplete} 
                  className="w-full gradient-primary"
                  size="lg"
                >
                  Pasar al siguiente cuestionario
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
