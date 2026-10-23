import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { updateProgress } from "@/lib/progressHelper";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

/** Revela el contenido al entrar al viewport (animación de lectura). */
const ScrollReveal = ({ children, className = "" }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};
/**
 * Paso informativo del Módulo 3 sobre mandatos de género.
 * Marca `m3_visit` y continúa con la representación.
 */
const Module3Visit = () => {
  const { goTo } = useRoleNavigation();
  const [isSaving, setIsSaving] = useState(false);

  /** Marca el paso y avanza; el fallback evita bloquear la lectura. */
  const handleContinue = async () => {
    setIsSaving(true);
    try {
      await updateProgress("m3_visit");
      goTo("/module-3-representation");
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      goTo("/module-3-representation");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          {/* Intro */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h1 className="text-3xl font-bold text-center mb-6 text-primary">
                  Los mandatos internos
                </h1>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Puede que durante tu vida, hayas escuchado algunas reglas no escritas sobre cómo debes conducirte como mujer. Muchas de estas reglas están muy arraigadas en nuestra cultura, y enseñan a las mujeres que la subordinación, el sacrificio y la docilidad son comportamientos "femeninos". El no cuestionarte estas reglas te pone en mayor riesgo de aceptar malos tratos y prácticas violentas que están normalizadas en la atención ginecológica.
                    A continuación encontrarás algunas de esas reglas no escritas, a las que llamaremos “mandatos de género”, la idea es que no solo te des cuenta si tu apoyas internamente estos mandatos, sino que puedas cuestionarlos e incluso intercambiarlos por otras ideas que te ayuden a vivir con bienestar.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* Section title */}
          {/* Two Column Layout */}
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Informative Text */}
              <div className="space-y-6">
                <Card className="border-2 shadow-quirona h-full">
                  <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 text-foreground leading-relaxed">
                      <p>
                        Desde pequeñas, se enseña a las mujeres a ser obedientes y a no cuestionar la autoridad. Algunos servicios de salud esperan que como paciente seas dócil, que no hagas preguntas "difíciles" y que no incomodes al profesional. A esto se le llama infantilización a la idea de que debes comportarte como una niña buena, que no incomodes y obedezcas.</p>
                      <p>
                        Pregúntate ¿Soy mala paciente si pregunto cosas que debo saber para cuidarme y que además es mi derecho saber?  
                      </p>
                       <p>
                        Cambiemoslo por: Puedo ser mejor paciente si hago equipo con mi médico y hablamos de mi caso como dos profesionales que quieren el mismo objetivo.      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - List of Examples/Points */}
              <div className="space-y-4">
                <Card className="border-2 shadow-quirona h-full shadow-none h-full bg-muted/20">
                  <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 text-foreground leading-relaxed">
                    <h3 className="text-xl font-bold text-primary px-4">
                        Ejemplos de frases relacionadas al mandato
                    </h3>
                     <br /><br />
                      <p className="text-base italic text-muted-foreground">
                        "Cuando una mujer se pone de intensa con preguntas, cae mal"
                      </p>
                    <br /><br />
                      <p className="text-base italic text-muted-foreground">
                        "Toda histérica pidiendo que la atienda, todas estamos esperando"
                      </p>
                      <br />
                     <p className="text-base italic text-muted-foreground">
                        "¿Qué tal que pregunto algo y me trata peor" 
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Informative Text */}
              <div className="space-y-6">
                <Card className="border-2 shadow-quirona h-full shadow-none h-full bg-muted/20">
                  <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 text-foreground leading-relaxed">
                      <br />
                      <p className="text-base italic text-muted-foreground">
                        "Una verdadera mujer da a luz con parto natural y con dolor"
                      </p>
                    <br /><br />
                      <p className="text-base italic text-muted-foreground">
                        "Si de verdad amas a alguien, debes soportar los dolores y los malos ratos"
                      </p>
                      <br />
                     <p className="text-base italic text-muted-foreground">
                        "Aguántate, cuando estabas teniendo relaciones sexuales no gritabas así ¿verdad?" 
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - List of Examples/Points */}
              <div className="space-y-4">
                <Card className="border-2 shadow-quirona h-full">
                  <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 text-foreground leading-relaxed">
                      <p>
                        Muchas películas, novelas y canciones vinculan a la feminidad con la capacidad de soportar el dolor. Con frecuencia el personal de salud justifica la falta de anestesia o tratos bruscos con la idea de que "sufrir es parte de ser mujer", lo que provoca que las mujeres dejen de confiar en su propio sentir y acepten el dolor como algo inevitable.
                      </p>
                      <p>
                        Pregúntate: ¿A quién le beneficia que yo aguante el dolor? ¿De qué manera me beneficia que me duela más de lo que es necesario?
                      </p>
                      <p>
                        Cambiemoslo por: Sufrir no es parte de ser mujer, mi tolerancia al dolor no me define como persona.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollReveal>   

          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Informative Text */}
              <div className="space-y-6">
                <Card className="border-2 shadow-quirona h-full">
                  <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 text-foreground leading-relaxed">
                      <p>
                        Se asume que el cuerpo de la mujer tiene como función principal la reproducción. Ésto lleva a que, en el sistema de salud, las decisiones de las mujeres que no desean tener hijos sean cuestionadas o directamente negadas (como el acceso a la ligadura de trompas). Ésto es negarle sus derechos.
                      </p>
                      <p>
                        Pregúntate: ¿Yo también pienso que estoy en este mundo sólo para tener hijos?  
                      </p>
                       <p>
                        Cambiemoslo por: Es mi decisión si quiero tener hijos o no, aunque otras personas piensen distinto, el simple hecho de vivir ya es un motivo para ser querida y respetada.      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - List of Examples/Points */}
              <div className="space-y-4">
                <Card className="border-2 shadow-quirona h-full shadow-none h-full bg-muted/20">
                  <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 text-foreground leading-relaxed"><br />
                      <p className="text-base italic text-muted-foreground">
                        "Es la ley de la vida ser madre"
                      </p>
                    <br /><br /><br />
                      <p className="text-base italic text-muted-foreground">
                        "Las mujeres que no quieren tener hijos están mal y son egoísta"
                      </p>
                      <br /><br />
                     <p className="text-base italic text-muted-foreground">
                        "Si no tienes hijos ¿Quién te va a cuidar cuando seas grande?” 
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollReveal>  

          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Informative Text */}
              <div className="space-y-6">
                <Card className="border-2 shadow-quirona h-full shadow-none h-full bg-muted/20">
                  <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 text-foreground leading-relaxed">
                      <br /><br />
                      <p className="text-base italic text-muted-foreground">
                        "Esto le pasó por no venir antes, es su culpa"
                      </p>
                    <br /><br />
                      <p className="text-base italic text-muted-foreground">
                        "¿No has ido a consulta? ¡No te importa tu salud!
                      </p>
                      <br /><br />
                     <p className="text-base italic text-muted-foreground">
                        "Tienes que ir a consulta, no importa que te de pena o miedo" 
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - List of Examples/Points */}
              <div className="space-y-4">
                <Card className="border-2 shadow-quirona h-full">
                  <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 text-foreground leading-relaxed">
                      <p>
                        Asistir a revisiones ginecológicas anuales se ha convertido en una nueva obligación. Si una mujer no asiste o posterga un examen, se le hace sentir culpable e irresponsable por su salud. Bajo esta idea, el maltrato es el "precio a pagar" por ser una mujer irresponsable.
                      </p>
                      <p>
                        Pregúntate: ¿Habrá razones económicas, de anteriores experiencias feas o de desconocimiento que harían que tardará en ir al ginecólogo? ¿Cuáles son las razones por las que no he ido al ginecólogo? (razones económicas, desconocimiento, experiencias negativas anteriores, etc.) 
                      </p>
                      <p>
                        Cambiemoslo por: Ir al ginecólogo no es una obligación, sino un compromiso y un acto de cariño conmigo misma. Si he tardado o no he ido, es por una buena razón y espero que el personal de salud lo comprenda.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollReveal>  

          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Informative Text */}
              <div className="space-y-6">
                <Card className="border-2 shadow-quirona h-full">
                  <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 text-foreground leading-relaxed">
                      <p>
                        Un número importante de ginecólogos y ginecólogas suele asumir que todas las pacientes son heterosexuales y cisgénero. Las personas de la diversidad sexual pueden sufrir violencia psicológica y/o juicios morales, lo que las lleva a ocultar su identidad o a abandonar por completo el sistema de salud para protegerse.</p>
                      <p>
                        Pregúntate: ¿No sería más fácil que el médico haga las preguntas necesarias para conocerme mejor? ¿Por qué mi orientación sexual afectaría su conocimiento?  
                      </p>
                       <p>
                        Cambiemoslo por: Mi cuerpo y mis deseos son míos, y necesito un profesional de la salud que entienda eso.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - List of Examples/Points */}
              <div className="space-y-4">
                <Card className="border-2 shadow-quirona h-full shadow-none h-full bg-muted/20">
                  <CardContent className="p-8 md:p-12 ">
                    <div className="space-y-4 text-foreground leading-relaxed">
                     <br />
                      <p className="text-base italic text-muted-foreground">
                        "¿Cómo es que tienes vida sexual activa sin penetración?"
                      </p>
                    <br /><br />
                      <p className="text-base italic text-muted-foreground">
                        "No te puedo atender, solo atiendo a mujeres que quieren ser mujeres"
                      </p>
                      <br /><br />
                     <p className="text-base italic text-muted-foreground">
                        "Ya no voy al ginecólogo desde que me dijo que necesitaba un hombre que me hiciera mujer" 
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollReveal>

          {/* Closing */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Estos mandatos de género están detrás de muchas formas de violencia ginecológica. Es importante que comprendas que aunque muchas personas estén de acuerdo con estos mandatos, seas tú u otras personas cercanas, ninguna justifica la violencia hacia ti.
                  </p>
                </div>
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={handleContinue}
                    disabled={isSaving}
                    className="gradient-primary text-white px-12 py-8 text-xl shadow-xl hover:scale-105 transition-transform"
                  >
                    {isSaving ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <>
                        Continuar con la siguiente sección
                        <ArrowRight className="ml-2 w-6 h-6" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};
export default Module3Visit;
