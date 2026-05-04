import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight, Loader2, BookCheck} from "lucide-react";
import { supabase } from "@/supabaseClient"; // Importamos supabase
import { updateProgress } from "@/lib/progressHelper";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";

const Module1Closure = () => {
  const { goTo } = useRoleNavigation();
  const [phase, setPhase] = useState<"questions" | "story">("questions");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({ fear: "", phrase: "", advice: "" });
  const [fontSizeClass, setFontSizeClass] = useState("text-base");
  const [isSaving, setIsSaving] = useState(false);

  const storyPages = [
    (
      <div>
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Ximena y Sofía: Resolución
        </h1>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            –...y por eso hermanita, no es necesario que te hagan una revisión de tus partes íntimas en la primera consulta.
          </p>
          <p>
            Sofía se estira en su silla después de acabarse su helado doble de queso con zarzamora, y haber hablado de todo lo que ella se enteró después de mucho tiempo sobre cómo es una primera consulta ginecológica.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Eso sí, nunca olvides que lo más importante para la salud es prevenir, y eso empieza no solo con tus elecciones, sino también con la información que recibes.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – ¡Ay hermana! jejejeje (risa) pues yo qué iba a saber si nunca de los nunca nos platican de esto en la escuela. Ayer me la pasé viendo en mi teléfono reels de "ChikChok" sobre remedios caseros para dolores menstruales, y no sé qué tantos tés y hierbas te recomiendan. Hasta vi uno de usar ajo para tratar las infecciones vaginales.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Aguas con eso Xime, esas publicaciones no son serias, y menos se van a hacer responsables si te pasa algo así.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Oye, ¿y a ti te tomó mucho tiempo empezar a ir al ginecólogo?
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – ¡Uy sí hermana! Ojalá no hubiera sido así, pero yo empecé a ir solo cuando una infección me tumbó por varios días. ¿Ves que mi mamá siempre nos dice que es mejor ir al médico? De ahí lo aprendí: por hacerle caso a mi tía, yo también pensaba que era normal que mi period doliera. Me dijo que era por estar haciendo más ejercicio, y no fui al médico. Yo tenía como 19 años.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – De algo me acuerdo.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – De ahí también aprendí que no es raro que a las mujeres se nos juzgue por querer saber más sobre su cuerpo y el sexo. Pero eso no es malo, más bien, la gente que tiene telarañas en la cabeza espera que no preguntemos y no conozcamos de esos temas. Es por eso que te quiero llevar con esta ginecóloga, aparte de que es bien linda, te deja hacer las preguntas que tú quieras, porque sabe que sentir confianza es bien importante para cuando una va a la consulta.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Ahora sí ya quiero ir, pero entonces lo de Rosanna ¿por qué le habrá dolido tanto?
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Pues no sé hermana, la verdad es que por lo que te contó, no la trataron bien, eso puede pasar, a mí me pasó. Por eso es súper importante que sepas que es normal que pase y que no es normal que pase en una consulta ginecológica, cómo debe comportarse el médico o la médica, y que tengan las condiciones adecuadas.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Me imagino que a donde vamos está bien ¿verdad?
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – ¡Claro! pero igual te cuento después sobre qué debes esperar de una consulta ginecológica respetuosa y de calidad. Y ya vámonos porque mi mamá ya me llamó...
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – ¿Le digo de lo que pasó y de lo que platicamos?
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Sí, no te preocupes, ella ya sabe también.
          </p>
        </div>
      </div>
    ),
  ];

// --- FUNCIÓN 1: GUARDAR RESPUESTAS ABIERTAS ---
  const handleSaveAnswers = async () => {
    // Validación: que al menos hayan escrito algo
    if (!answers.fear.trim() || !answers.phrase.trim() || !answers.advice.trim()) {
      toast.error("Por favor, comparte tus reflexiones antes de continuar.");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      const { error } = await supabase
        .from('module_1_responses')
        .upsert({
          id: user.id,
          closure_answers: answers, // Guardamos el objeto con las 3 respuestas
          updated_at: new Date()
        });

      if (error) throw error;

      setPhase("story"); // Pasamos a la historia final
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      console.error("Error al guardar cierre:", error);
      toast.error("Hubo un error al guardar tus respuestas.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- FUNCIÓN 2: FINALIZAR MÓDULO Y ACTUALIZAR PROGRESO ---
  const handleFinalizeModule = async () => {
    setIsSaving(true);
    try {
      // Marcamos la última parte del Módulo 1 (m1_closure)
      // El helper recalculará el % y lo subirá al 25% (o 28% si es exacto)
      await updateProgress("m1_closure");
      
      toast.success("¡Felicidades! Has completado el Módulo 1.");
      goTo("/dashboard");
    } catch (error) {
      console.error("Error al finalizar módulo:", error);
      goTo("/dashboard");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          {phase === "questions" ? (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 space-y-8">
                <h1 className="text-3xl font-bold text-center text-primary">
                  Regresemos con Ximena y Sofía
                </h1>
                <p className="text-center text-lg text-muted-foreground">
                  Veamos cómo fueron las cosas, pero antes, ayúdanos a responder estas preguntas:
                </p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      ¿Hay algún miedo o duda que pudiste resolver en este módulo? Si es así, ¿cuál era tu miedo o duda?
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[120px]"
                      value={answers.fear}
                      onChange={(e) => setAnswers({ ...answers, fear: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      ¿Has escuchado alguna frase o creencia que hace que las mujeres tengan dudas o miedos de ir a la consulta ginecológica?
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[120px]"
                      value={answers.phrase}
                      onChange={(e) => setAnswers({ ...answers, phrase: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      Si fueras la hermana de Ximena, ¿qué le compartirías de lo que sabes ahora, o de lo que sabías antes de este módulo?
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[120px]"
                      value={answers.advice}
                      onChange={(e) => setAnswers({ ...answers, advice: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleSaveAnswers}
                    disabled={isSaving}
                    className="gradient-primary text-white px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
                  >
                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : null}
                    Continuar
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                {/* accessibility controls */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <label htmlFor="font-size" className="text-sm">
                      Tamaño de letra:
                    </label>
                    <select
                      id="font-size"
                      value={fontSizeClass}
                      onChange={(e) => setFontSizeClass(e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="text-base">Normal</option>
                      <option value="text-lg">Grande</option>
                      <option value="text-xl">Muy grande</option>
                    </select>
                  </div>
                </div>
                <div className={`prose prose-lg max-w-none ${fontSizeClass}`}>
                  <div key={page} className="transition-transform duration-300">
                    {storyPages[page]}
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center">
                      <Button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="mr-3"
                      >
                        Anterior
                      </Button>

                      <Button
                        onClick={() => setPage((p) => Math.min(p + 1, storyPages.length - 1))}
                        disabled={page === storyPages.length - 1}
                      >
                        Siguiente
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Página {page + 1} / {storyPages.length}
                    </div>
                  </div>
                </div>

                {/* show finish button only on last page */}
                {page === storyPages.length - 1 && (
                  <div className="flex justify-center mt-10">
                    <Button
                      onClick={handleFinalizeModule}
                      disabled={isSaving}
                      className="gradient-primary text-white px-12 py-8 text-xl shadow-xl hover:scale-105 transition-transform"
                    >
                      {isSaving ? <Loader2 className="animate-spin mr-2" /> : null}
                      Finalizar Módulo 1
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
export default Module1Closure;
