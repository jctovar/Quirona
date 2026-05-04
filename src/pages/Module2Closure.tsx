import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/supabaseClient"; // Importación necesaria
import { updateProgress } from "@/lib/progressHelper"; // Importación necesaria
import { toast } from "sonner";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";
const Module2Closure = () => {
  const { goTo } = useRoleNavigation();
  const [phase, setPhase] = useState<"questions" | "story">("questions");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({ fear: "", phrase: "", advice: "" });
  const [fontSizeClass, setFontSizeClass] = useState("text-base");
  const [isSaving, setIsSaving] = useState(false);

  // --- FUNCIÓN 1: GUARDAR REFLEXIONES ---
  const handleSaveQuestions = async () => {
    // Verificamos que no envíen campos vacíos
    if (!answers.fear.trim() || !answers.phrase.trim() || !answers.advice.trim()) {
      toast.error("Por favor, responde todas las preguntas para continuar.");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      const { error } = await supabase
        .from('module_2_responses')
        .upsert({
          id: user.id,
          closure_answers: answers,
          updated_at: new Date()
        });

      if (error) throw error;

      setPhase("story");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Hubo un error al guardar tus respuestas.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- FUNCIÓN 2: FINALIZAR MÓDULO ---
  const handleFinalizeModule = async () => {
    setIsSaving(true);
    try {
      // Marcamos el paso final del módulo 2
      await updateProgress("m2_closure");
      
      toast.success("¡Módulo 2 completado con éxito!");
      goTo("/dashboard");
    } catch (error) {
      console.error("Error al finalizar:", error);
      goTo("/dashboard");
    } finally {
      setIsSaving(false);
    }
  };

  const storyPages = [
    (
      <div className="animate-in fade-in duration-700">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Resolución
        </h1>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Maricela terminó su relato con un suspiro, mientras sus amigas la escuchaban con atención. Mariana tomó la palabra y dijo:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            - Lo importante es que ahora sabes que no estabas obligada. En un examen ginecológico puede haber molestia, pero nunca debe haber dolor ni falta de privacidad.
          </p>
          <p>
            Fernanda añadió:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Y tampoco deben imponer procedimientos sin tu consentimiento. Eso es una bandera roja. Siempre tienes derecho a preguntar, detener el examen o pedir que alguien te acompañe.
          </p>
        </div>
      </div>
    ),
    (
      <div className="animate-in fade-in duration-700">
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Maricela asintió, un poco más tranquila, y concluyó:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Creo que lo que aprendí hoy es que mi voz también cuenta en el consultorio. No se trata solo de mi salud física y mi seguridad, sino también de cómo me siento. Eso es mi salud emocional.
          </p>
          <p>
            Las tres amigas se miraron con complicidad, sabiendo que aquella conversación había sido más que un desahogo: había sido un recordatorio de que toda mujer tiene derecho a ser escuchada, respetada y cuidada en cada consulta médica.
          </p>
        </div>
      </div>
    ),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3xl"> {/* Ajustado a 3xl */}
          {phase === "questions" ? (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 space-y-8">
                <h1 className="text-3xl font-bold text-center text-primary">
                  Ahora regresemos con nuestra protagonista
                </h1>
                <p className="text-center text-lg text-muted-foreground">
                  Pero antes, reflexiona y responde estas preguntas:
                </p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      Si tú fueras la amiga de Maricela ¿Cuál sería la primera alerta que le harías ver?
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[120px] border-muted focus:ring-primary"
                      value={answers.fear}
                      onChange={(e) => setAnswers({ ...answers, fear: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      Como amiga de Maricela ¿Qué consejo le darías?
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[120px] border-muted focus:ring-primary"
                      value={answers.phrase}
                      onChange={(e) => setAnswers({ ...answers, phrase: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      Si tú estuvieras en el papel de Maricela ¿Qué es lo que harías?
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[120px] border-muted focus:ring-primary"
                      value={answers.advice}
                      onChange={(e) => setAnswers({ ...answers, advice: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleSaveQuestions}
                    disabled={isSaving}
                    className="gradient-primary text-white px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
                  >
                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : null}
                    Continuar a la historia
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex justify-between items-center border-b pb-4">
                  <div className="flex items-center space-x-2">
                    <label htmlFor="font-size" className="text-sm font-medium text-muted-foreground">
                      Tamaño de letra:
                    </label>
                    <select
                      id="font-size"
                      value={fontSizeClass}
                      onChange={(e) => setFontSizeClass(e.target.value)}
                      className="border rounded px-2 py-1 text-sm bg-background"
                    >
                      <option value="text-base">Normal</option>
                      <option value="text-lg">Grande</option>
                      <option value="text-xl">Muy grande</option>
                    </select>
                  </div>
                  <CheckCircle2 className="text-primary w-6 h-6" />
                </div>
                <div className={`prose prose-pink max-w-none ${fontSizeClass}`}>
                  <div key={page}>
                    {storyPages[page]}
                  </div>

                  <div className="flex items-center justify-between mt-12 pt-6 border-t">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPage((p) => Math.max(0, p - 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={page === 0}
                        className="mr-3"
                      >
                        Anterior
                      </Button>

                      <Button
                        onClick={() => {
                          setPage((p) => Math.min(p + 1, storyPages.length - 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={page === storyPages.length - 1}
                      >
                        Siguiente
                      </Button>
                    </div>

                    <div className="text-sm font-medium text-muted-foreground">
                      Página {page + 1} de {storyPages.length}
                    </div>
                  </div>
                </div>

                {page === storyPages.length - 1 && (
                  <div className="flex justify-center mt-12 animate-in slide-in-from-bottom-4 duration-1000">
                    <Button
                      onClick={handleFinalizeModule}
                      disabled={isSaving}
                      className="gradient-primary text-white px-12 py-8 text-xl shadow-xl hover:scale-105 transition-transform"
                    >
                      {isSaving ? <Loader2 className="animate-spin mr-2" /> : null}
                      Finalizar Módulo 2
                      <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Module2Closure;