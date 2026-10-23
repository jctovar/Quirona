import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight } from "lucide-react";
import { updateProgress } from "@/lib/progressHelper";
import { Loader2 } from "lucide-react";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";
/**
 * Historia introductoria del Módulo 4.
 *
 * Cierra el arco narrativo del programa y marca `m4_story` antes de la
 * introducción.
 */
const Module4Story = () => {
  const { goTo } = useRoleNavigation();
  const [isSaving, setIsSaving] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [page, setPage] = useState(0);

  // Escala tipográfica elegida por la persona (accesibilidad).
  const [fontSizeClass, setFontSizeClass] = useState("text-base");

  const pages = [
    (
      <div>
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Daniela 
        </h1>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            El café olía a canela y pan caliente. En la mesa junto a la ventana, Daniela le daba vueltas al popote sin darse cuenta. Tenía el ceño fruncido y la mirada perdida, como si estuviera viendo una escena en su cabeza. Valeria la observó un rato, hasta que ya no aguantó.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Dani… ¿estás bien? Te ves bien preocupada.
          </p>
          <p>
            Daniela intentó sonreír, sin mucho éxito.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Sí… o sea, sí. Solo ando pensando.
          </p>
          <p>
            Fernanda dejó su pan en el plato.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
          —¿Pensando en qué? ¿Te pasó algo?
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Daniela negó, pero sus manos siguieron inquietas.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —No. Es que… tengo cita la próxima semana. 
          </p> 
          <p>
            Mariana levantó las cejas.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —¿Con la gine?  
          </p>
          <p>Daniela asintió. Valeria se enderezó de inmediato, con esa cara de “ya entendí”.</p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Ay, no… ¿te da miedo que te encuentren algo? O sea… ¿un mal diagnóstico? ¿Que te digan que tienes quistes, algo raro, no sé?
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Fernanda se sumó, con preocupación real.
          </p> 
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Sí, amiga. ¿Te duele algo? ¿Te sientes mal?
          </p>
          <p>
            Daniela respiró hondo. Se quedó callada un segundo y luego soltó:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —O sea… sí me da nervio que me digan algo que no esperaba, obvio. Pero… no es eso.
          </p>
          <p>
            Las tres se quedaron en pausa, mirándola. Daniela bajó la voz, como si le diera pena decirlo en voz alta:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Lo que más me asusta es la consulta. Que me traten feo, Que me apuren. Que me duela. Me da miedo sentirme invadida, ¿saben?
          </p>
          <p>
            Valeria exhaló, como si de pronto todo tuviera sentido.
          </p>
        </div>
      </div>
    ),

    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Oh… ya. Es otro tipo de miedo. 
          </p>
          <p>
            Fernanda asintió, seria.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Sí… ese miedo sí lo conozco.
          </p>
          <p>
            Mariana habló con calma, como quien pone una mano en el hombro sin tocar:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —No estás exagerando. Y qué bueno que lo estás diciendo antes. Eso se puede preparar… como traer frases listas, porque cuando una se asusta, la mente se queda en blanco.
          </p>
          <p>
            Daniela apretó el vaso con ambas manos.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Sí. Necesito eso.
          </p>
          <p>
            Fernanda se acomodó en la silla. Se notaba que estaba decidiendo si contar o no.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Mira… yo te lo digo porque a mí me pasó. Y no quiero que te pase igual.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —¿Qué te pasó? —preguntó Daniela, bajito. 
          </p>
          <p>
            Fernanda tomó aire.
          </p>
        </div>
      </div>
    ),
  ];

  /** Marca `m4_story` al final o avanza a la siguiente página. */
  const handleContinue = async () => {
    if (showQuestions) {
      setIsSaving(true);
      try {
        await updateProgress("m4_story");
        goTo("/module-4-intro");
      } catch (error) {
        console.error("Error al guardar progreso:", error);
        goTo("/module-4-intro");
      } finally {
        setIsSaving(false);
      }
      return;
    }
    
    if (page < pages.length - 1) {
      setPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Mejor UX
    } else {
      setShowQuestions(true);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Mejor UX
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />

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
                    <p className="text-foreground">Cuando piensas en una consulta ginecológica, ¿qué te inquieta más?</p>

                    <p className="text-foreground">¿Qué crees que le vaya a platicar Fernanda a Daniela?</p>

                    <p className="text-foreground font-semibold text-primary">Si en la consulta te sientes incómoda, ¿qué harías ante esa incomodidad?</p>
                  </div>
                </div>
              )}

              {/* show continue button only on last page or when questions visible */}
              {(!showQuestions && page === pages.length - 1) || showQuestions ? (
                <div className="flex justify-center mt-10">
                  <Button 
                    onClick={handleContinue} 
                    disabled={isSaving} // Se desactiva si está guardando
                    className="gradient-primary text-white px-8 py-6 text-lg"
                  >
                    {isSaving && <Loader2 className="animate-spin mr-2" />}
                    {showQuestions ? "Continuar a la siguiente sección" : "Ver preguntas"}
                    {!isSaving && <ArrowRight className="ml-2 w-5 h-5" />}
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Module4Story;
