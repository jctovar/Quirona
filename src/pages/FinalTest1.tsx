import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowRight, AlertCircle, GripVertical, Loader2 } from "lucide-react";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner";
import { Reorder } from "framer-motion"; // Librería ideal para listas arrastrables

const FinalTest1 = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [isSaving, setIsSaving] = useState(false);

  // Estados para Ejercicio 1
  const [words1, setWords1] = useState<string[]>(Array(10).fill(""));
  const [ordered1, setOrdered1] = useState<string[]>([]);

  // Estados para Ejercicio 2
  const [words2, setWords2] = useState<string[]>(Array(10).fill(""));
  const [ordered2, setOrdered2] = useState<string[]>([]);

  // Validación: mínimo 5 palabras con contenido
  const isValid = (currentWords: string[]) => currentWords.filter(w => w.trim() !== "").length >= 5;

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const results = {
        ejercicio_1: { estimulo: "Consulta/revisión ginecológica", palabras_jerarquizadas: ordered1 },
        ejercicio_2: { estimulo: "Violencia ginecológica", palabras_jerarquizadas: ordered2 }
      };

      const { error } = await supabase
        .from('final_evaluations')
        .upsert({ 
            id: user.id, 
            test_1_results: results,
            updated_at: new Date() 
        });

      if (error) throw error;
      navigate("/final-test-2"); // Navegación al siguiente test
    } catch (error) {
      toast.error("Error al guardar los resultados");
    } finally {
      setIsSaving(false);
    }
  };

  const nextStep = () => {
    if (page === 2) setOrdered1(words1.filter(w => w.trim() !== ""));
    if (page === 5) setOrdered2(words2.filter(w => w.trim() !== ""));
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE]">
      <Navbar isAuthenticated />
      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          
          {/* Header del Cuestionario (Basado en imagen) */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#8B5CF6]">
              Cuestionario 2: Redes Semánticas Naturales Modificadas
            </h1>
            <p className="text-gray-500 mt-2">Evaluación Final</p>
          </div>

          <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
            <CardContent className="p-8 md:p-12">
              
              {/* PAGINA 1: INSTRUCCIONES */}
              {page === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800">Instrucciones</h2>
                  <p className="text-gray-600 leading-relaxed">
                    A continuación, se te presentará una frase estímulo, para la cual, tú debes escribir 10 palabras (independientes las unas de las otras), para definir lo que significa para ti (puedes utilizar sustantivos, adjetivos, verbos y adverbios).
                  </p>
                  <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex gap-4">
                    <AlertCircle className="text-orange-500 shrink-0" />
                    <p className="text-sm text-orange-800">
                      <strong>Nota:</strong> No puedes emplear preposiciones (antes, bajo, con, contra, de, desde, etc.), conjunciones (y, ni, pero, porque, aunque, etc.), artículos (el, los, las, un, unos, etc.) o cualquier otro tipo de partículas gramaticales.
                    </p>
                  </div>
                  <Button onClick={() => setPage(2)} className="w-full bg-[#A855F7] hover:bg-[#9333EA] h-14 rounded-2xl text-lg">
                    Comenzar ejercicio
                  </Button>
                </div>
              )}

              {/* PAGINA 2: EJERCICIO 1 (Inputs) */}
              {page === 2 && (
                <div className="space-y-6 text-center">
                  <p className="text-gray-500">Escribe al menos 5 y máximo 10 palabras de lo que es para ti...</p>
                  <h2 className="text-3xl font-black text-[#8B5CF6] tracking-widest uppercase">
                    Consulta/revisión ginecológica
                  </h2>
                  <div className="grid gap-3 max-w-sm mx-auto mt-8">
                    {words1.map((w, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 w-20 text-right">Palabra {i+1}:</span>
                        <Input 
                          value={w} 
                          onChange={(e) => {
                            const newWords = [...words1];
                            newWords[i] = e.target.value;
                            setWords1(newWords);
                          }}
                          className="rounded-xl border-gray-200 h-11 focus-visible:ring-[#8B5CF6]"
                        />
                      </div>
                    ))}
                  </div>
                  <Button 
                    disabled={!isValid(words1)} 
                    onClick={nextStep} 
                    className="w-full mt-8 bg-[#A855F7] h-14 rounded-2xl"
                  >
                    Continuar
                  </Button>
                </div>
              )}

              {/* PAGINA 3: JERARQUIZACIÓN EJERCICIO 1 */}
              {page === 3 && (
                <div className="space-y-6 text-center">
                   <div className="bg-gray-50 p-6 rounded-2xl text-left mb-6 border border-gray-100">
                    <p className="text-sm text-gray-600">
                      Debes asignar la parte más alta de la lista a la palabra más importante... la segunda posición a la que le sigue en importancia... y así sucesivamente.
                    </p>
                  </div>
                  <h2 className="text-xl font-bold text-[#8B5CF6] mb-4">Consulta/revisión ginecológica</h2>
                  
                  <Reorder.Group axis="y" values={ordered1} onReorder={setOrdered1} className="space-y-3">
                    {ordered1.map((item, index) => (
                      <Reorder.Item key={item} value={item}>
                        <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm cursor-grab active:cursor-grabbing">
                          <GripVertical className="text-gray-300" />
                          <span className="font-bold text-[#8B5CF6]">{index + 1}.</span>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>

                  <p className="text-xs text-gray-400 mt-4">Arrastra las palabras hacia arriba para indicar mayor importancia</p>
                  <Button onClick={nextStep} className="w-full mt-6 bg-[#A855F7] h-14 rounded-2xl">
                    Continuar al Ejercicio 2
                  </Button>
                </div>
              )}

              {/* PAGINA 4: INTRO EJERCICIO 2 */}
              {page === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Ejercicio 2</h2>
                  <p className="text-gray-600">
                    A continuación, se te presentará una frase estímulo, para la cual, tú debes escribir 10 palabras (independientes las unas de las otras), para definir lo que significa para ti.
                  </p>
                  <Button onClick={() => setPage(5)} className="w-full bg-[#A855F7] h-14 rounded-2xl">
                    Continuar
                  </Button>
                </div>
              )}

              {/* PAGINA 5: EJERCICIO 2 (Inputs) */}
              {page === 5 && (
                <div className="space-y-6 text-center">
                  <p className="text-gray-500">Escribe al menos 5 y máximo 10 palabras de lo que para ti es...</p>
                  <h2 className="text-3xl font-black text-[#8B5CF6] tracking-widest uppercase">
                    Violencia ginecológica
                  </h2>
                  <div className="grid gap-3 max-w-sm mx-auto mt-8">
                    {words2.map((w, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 w-20 text-right">Palabra {i+1}:</span>
                        <Input 
                          value={w} 
                          onChange={(e) => {
                            const newWords = [...words2];
                            newWords[i] = e.target.value;
                            setWords2(newWords);
                          }}
                          className="rounded-xl border-gray-200 h-11"
                        />
                      </div>
                    ))}
                  </div>
                  <Button disabled={!isValid(words2)} onClick={nextStep} className="w-full mt-8 bg-[#A855F7] h-14 rounded-2xl">
                    Continuar
                  </Button>
                </div>
              )}

              {/* PAGINA 6: JERARQUIZACIÓN EJERCICIO 2 Y FINAL */}
              {page === 6 && (
                <div className="space-y-6 text-center">
                  <div className="bg-gray-50 p-6 rounded-2xl text-left mb-6">
                    <p className="text-sm text-gray-600">
                      Ordena las palabras arrastrando hacia arriba las que mejor definan para ti la frase:
                    </p>
                  </div>
                  <h2 className="text-xl font-bold text-[#8B5CF6]">Violencia ginecológica</h2>
                  
                  <Reorder.Group axis="y" values={ordered2} onReorder={setOrdered2} className="space-y-3">
                    {ordered2.map((item, index) => (
                      <Reorder.Item key={item} value={item}>
                        <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm cursor-grab active:cursor-grabbing">
                          <GripVertical className="text-gray-300" />
                          <span className="font-bold text-[#8B5CF6]">{index + 1}.</span>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>

                  <Button 
                    onClick={handleSaveAndNext} 
                    disabled={isSaving}
                    className="w-full mt-10 bg-[#A855F7] h-14 rounded-2xl text-lg font-bold shadow-lg"
                  >
                    {isSaving ? <Loader2 className="animate-spin" /> : "Finalizar y continuar al siguiente Test"}
                  </Button>
                </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinalTest1;