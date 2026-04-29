import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader, Loader2} from "lucide-react";
import { updateProgress } from "@/lib/progressHelper";

const Module2Story = () => {
  const navigate = useNavigate();
  const [showQuestions, setShowQuestions] = useState(false);
  const [page, setPage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // user preferences for accessibility
  const [fontSizeClass, setFontSizeClass] = useState("text-base");

  const pages = [
    (
      <div>
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Maricela y sus amigas
        </h1>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Durante una reunión de amigas en un café, Mariana y Fernanda esperaban a Maricela, su mejor amiga de la preparatoria, quien ya llevaba casi media hora de retraso, algo poco común en ella.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Qué raro que no llegue Maricela, ¿ya le llamaste?
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —No te preocupes, Mary. ¿Todo bien?
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
          —Sí, todo bien. Solo que tuve cita con el doctor para darle seguimiento a una infección que tuve, y me mandaron a prevención, me obligaron a hacerme un Papanicolau. Por eso me retrasé.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —¿¡Qué!? ¿Cómo qué te obligaron?
          </p> 
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —Sí, se llevaron mi carnet y me dijeron que me lo entregarían en prevención después de un chequeo. Así que tuve que quedarme. Ahí verificaron que tenía todas mis vacunas y, como no había registro de un Papanicolau, me lo aplicaron después de hacerme unas preguntas algo incómodas.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —¿Cómo crees? ¿Y qué más pasó?
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Pues la enfermera me dijo que tenía que hacerme el Papanicolau. Me dio una bata y me indicó que me descubriera de la cintura hacia abajo, que después regresaría al consultorio para realizar el procedimiento. Ni siquiera tuve tiempo de pensarlo, cuando ya había vuelto… y pues ya amiga, ¿Qué podía hacer?
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Mucho, amiga. Realmente pudiste negarte al procedimiento. ¿Cómo te sentiste al respecto?
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —La verdad, muy tensa. Como te digo, no hubo tiempo ni para pensarlo. Me palpitaba muy fuerte el corazón y comencé a sudar frío. Además, sentí que el consultorio no tenía mucha privacidad: la puerta estaba abierta y se escuchaba muy cerca la conversación de los enfermeros. Pensé que en cualquier momento alguien entraría, y me dio mucha pena.
          </p>
          <p>
            Mariana y Fernanda se miraron entre ellas, con un gesto que mostraba desaprobación por la situación, pero a la vez empatía por su amiga. Después de pedir un café para Maricela, empezaron una conversación una plática que toda mujer debería de tener con alguien de su confianza antes de asistir a una consulta ginecológica…
          </p>
        </div>
      </div>
    ),
  ];

  const completeActivity = async () => {
    setIsProcessing(true);
    try {
      // Llamamos al helper para marcar m2_story
      // El helper recalculará automáticamente el % basado en los 30 pasos totales
      await updateProgress("m2_story");
      navigate("/module-2-intro");
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      // Navegamos de todos modos para no bloquear a la usuaria
      navigate("/module-2-intro");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinue = () => {
    if (showQuestions) {
      completeActivity();
      return;
    }
    if (page < pages.length - 1) {
      setPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowQuestions(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />

      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              {/* accessibility controls */}
              {!showQuestions && (
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
              )}
              {!showQuestions ? (
                <div className={`prose prose-lg max-w-none ${fontSizeClass}`}>
                  <div key={page} className="transition-transform duration-300">
                    {pages[page]}
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
                        onClick={() => setPage((p) => Math.min(p + 1, pages.length - 1))}
                        disabled={page === pages.length - 1}
                      >
                        Siguiente
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Página {page + 1} / {pages.length}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`text-center space-y-8 ${fontSizeClass}`}>
                  <h2 className="text-2xl font-bold text-primary">
                    Preguntas reflexivas:
                  </h2>

                  <div className="space-y-6 text-lg">
                    <p className="text-foreground">¿Piensas que Marcela pudo hacer algo más?</p>

                    <p className="text-foreground">¿Tú qué hubieras hecho?</p>

                    <p className="text-foreground">¿Tú sabes identificar cuando algo no te gusta?</p>

                    <p className="text-foreground font-semibold text-primary">¿Que sientes físicamente cuando algo no te gusta?</p>
                  </div>
                </div>
              )}

              {((!showQuestions && page === pages.length - 1) || showQuestions) && (
                <div className="flex justify-center mt-12">
                  <Button 
                    onClick={handleContinue} 
                    disabled={isProcessing}
                    className="gradient-primary text-white px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
                  >
                    {isProcessing ? (
                      <Loader2 className="mr-2 animate-spin" />
                    ) : (
                      showQuestions ? "Continuar al Módulo 2" : "Ver preguntas"
                    )}
                    {!isProcessing && <ArrowRight className="ml-2 w-6 h-6" />}
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
export default Module2Story;
