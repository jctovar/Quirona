import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight } from "lucide-react";
import { updateProgress } from "@/lib/progressHelper";
import { Loader2 } from "lucide-react";
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
 * Paso de representación del Módulo 3: traduce los mandatos de género a
 * situaciones cotidianas antes del juego de clasificación.
 */
const Module3Representation = () => {
  const { goTo } = useRoleNavigation();
  const [isSaving, setIsSaving] = useState(false);

  /** Marca `m3_representation` y avanza al juego. */
  const handleContinue = async () => {
    setIsSaving(true);
    try {
      await updateProgress("m3_representation");
      goTo("/module-3-game");
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      goTo("/module-3-game");
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
                    Representación
                </h1>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    La violencia ginecológica toma muchas formas. Poder identificarlas te permitirá decidir a quienes confiarle tu salud y a quienes no. Para recordarlas de manera más fácil, las vamos a clasificar en tres grandes grupos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    Grupo 1: Violencias psicológicas y de subordinación.
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p className="text-base italic text-muted-foreground">
                    “Cuando te quieren hacer menos en la consulta”
                  </p>
                  <p>
                    Estas incluyen todas las formas en que se busca que aceptes sin cuestionar la superioridad del personal de salud y que des por buena su opinión sobre tu vida. Estas pueden terminar en anular tu autonomía, la importancia de tu opinión y afectar tu autoestima.
                  </p>
                  <ul className="space-y-4 text-foreground leading-relaxed list-disc pl-6">
                    <li>Negarte un anticonceptivo porque quieres "andar de loca".</li>
                    <li>Se burla de tu cuerpo, tu peso o la coloración de tus genitales.</li>
                    <li>Se refiere a ti como "mujer de moral distraída", "tonta" o "lencha" si eres lesbiana.</li>
                    <li>Te grita para que te apures o para que aceptes un procedimiento.</li>
                    <li>Te dice que "es un desperdicio" o algo similar cuando le comentas que no quieres tener hijos.</li>
                    <li>Le dice a tus papás o a tu pareja cosas que no querías compartir.</li>
                    <li>Te regaña por no haber ido a consulta antes.</li>
                    <li>Evita que alguien te acompañe durante la consulta.</li>
                    <li>Al pedirle que te explique algo te dice "que no vas a entender"</li>
                    <li>No considera tu opinión si quieres más estudios para saber tu diagnóstico.</li>
                    <li>Te juzga por tener cualquier cantidad de parejas sexuales.</li>
                    <li>Comenta cosas como "lo bueno es que ya no te va a doler tanto porque ya tuviste relaciones sexuales".</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                   Grupo 2: Violencias hacia tu cuerpo
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p className="text-base italic text-muted-foreground">
                    “En vez de ayudarte, te lastiman”
                  </p>
                  <p>
                    Éstas violencias son las acciones o negaciones a procedimientos y/o medicación  que en lugar de hacerte sentir mejor, buscan limitar tus acciones o imponer una visión de lo que debe ser una buena mujer.
                  </p>
                  <ul className="space-y-4 text-foreground leading-relaxed list-disc pl-6">
                    <li>No te da un tratamiento para un dolor intenso en tu periodo, porque puedes aguantarlo.</li>
                    <li>Avisarte que tiene que realizar un examen pélvico y no querer decirte porqué es necesario.</li>
                    <li>Realizar el examen pélvico con brusquedad.</li>
                    <li>Realizar un examen pélvico aún cuando no hay una razón clara para hacerlo</li>
                    <li>Revisar tus mamas sin cuidado o buscando generarte dolor innecesario.</li>
                    <li>Aplica un ultrasonido con brusquedad.</li>
                    <li>Abrir tus piernas con fuerza y sin avisarte.</li>
                    <li>Te jala o te sujeta de manera agresiva para que no te muevas durante un examen.</li>
                    <li>Te empuja para apresurarte o te avienta la bata para que te cambies.</li>
                    <li>Te receta fármacos para eliminar el sangrado menstrual sin aclarártelo.</li>
                    <li>Te receta anticonceptivos porque opina que personas de tu "raza" o posición económica "son irresponsables".</li>
                  </ul>
                 </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    Grupo 3: Violencias sexuales y contra la intimidad
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p className="text-base italic text-muted-foreground">
                    “Cuando cruzan límites graves que dañan tu dignidad e integridad”
                  </p>
                  <p>
                    Este grupo implica las acciones más graves en contra de tu dignidad y tus derechos a la salud mental, física y el derecho a la privacidad. Aunque parecen similares a las violencias hacia tu cuerpo, en realidad van más allá. Se ejercen por la creencia de que no vas a decir nada por vergüenza o culpa, o que no vas a reaccionar por el desconocimiento del proceso de una consulta ginecológica, por tu edad o por tu condición de raza u orientación sexual.
                  </p>
                  <ul className="space-y-4 text-foreground leading-relaxed list-disc pl-6">
                    <li>Te hace comentarios inapropiados sobre lo “guapa” que eres o lo “bonito” de tu cuerpo.</li>
                    <li>Cuando hay terceras personas que no autorizaste que estuvieran durante tu consulta.</li>
                    <li>Deja tu cuerpo expuesto para otras personas.</li>
                    <li>Introduce sus dedos en tu vagina sin decirte que lo haría.</li>
                    <li>Ignora activamente tus peticiones de detenerse o tus expresiones de dolor.</li>
                    <li>Toca tu clítoris sin que te haya avisado o explicado que lo haría.</li>
                    <li>Toca tus pechos de manera intencional y justifica que fue accidental.</li>
                    <li>Toca tus glúteos o piernas sin necesidad.</li>
                    <li>Te obliga a desnudarte sin explicarte porqué es necesario.</li>
                    <li>No te da un espacio o las condiciones para desnudarte de manera privada.</li>
                    <li>Toma fotos de tus genitales o de tu cuerpo sin tu consentimiento.</li>
                    <li>Te obliga a tener actos sexuales.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
    
          {/* Closing */}
        <ScrollReveal>
                    <Card className="border-2 shadow-quirona">
                      <CardContent className="p-8 md:p-12">
                        <div className="space-y-4 text-foreground leading-relaxed">
                          <p>
                            <strong>Ninguno de estos actos es justificable de ninguna manera, es decir, no hay razón válida alguna para que se te trate de esta manera.</strong>Algunas personas podrían intentar justificarlas pidiendo comprensión para el personal de salud, ya que son profesionales que constantemente están bajo presión y cansancio. Esto tampoco exime su responsabilidad profesional, ya que el mal trato que ellos puedan recibir,<strong>no debe depositarse en el paciente.</strong>
                          </p>
                        </div>
                        <div className="flex justify-center mt-10">
                          <Button
                            onClick={handleContinue}
                            disabled={isSaving}
                            className="gradient-primary text-white px-8 py-5 text-lg"
                          >
                            {isSaving ? (
                              <Loader2 className="animate-spin mr-2" />
                            ) : (
                              <>
                                Continuar
                                <ArrowRight className="ml-2 w-5 h-5" />
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
export default Module3Representation;
