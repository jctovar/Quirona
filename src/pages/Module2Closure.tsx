import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const Module2Closure = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"questions" | "story">("questions");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({ fear: "", phrase: "", advice: "" });
  const [fontSizeClass, setFontSizeClass] = useState("text-base");

  const storyPages = [
    (
      <div>
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
      <div>
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
      <Navbar isAuthenticated />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
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
                      Si tu fueras la amiga de Maricela ¿Cuál sería la primera alerta que le harías ver?
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
                      Como amiga de Maricela ¿Qué consejo le darías?
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
                      Si tu estuvieras en el papel de Maricela ¿Qué es lo que harías?
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
                    onClick={() => setPhase("story")}
                    className="gradient-primary text-white px-8 py-6 text-lg"
                  >
                    Continuar
                    <ArrowRight className="ml-2 w-5 h-5" />
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
                      onClick={() => navigate("/dashboard")}
                      className="gradient-primary text-white px-8 py-6 text-lg"
                    >
                      Finalizar módulo
                      <ArrowRight className="ml-2 w-5 h-5" />
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
