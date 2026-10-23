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
const Module2Visit = () => {
  const { goTo } = useRoleNavigation();
  const [isSaving, setIsSaving] = useState(false);

  // --- FUNCIÓN DE PROGRESO ---
  const handleContinue = async () => {
    setIsSaving(true);
    try {
      // Marcamos la cuarta parte del Módulo 2 (m2_visit)
      await updateProgress("m2_visit");
      goTo("/module-2-game");
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      goTo("/module-2-game");
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
                    Validar tus emociones y ejercer tu autonomía
                </h1>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    ¿Te ha pasado que en alguna situación comienzas a sentir una sensación de asco o desagrado?¿Cómo sabes que estás sintiendo desagrado? ¿Qué cambia en tu cuerpo cuando pasa esto? Saber  qué esperar en un examen ginecológico, así cómo diferenciar entre molestia y dolor, te permitirá apoyarte de tus emociones y sensaciones para diferenciar entre situaciones que son seguras y situaciones que atentan contra tu salud. Tus emociones son poderosas aliadas para cuidar tu bienestar y seguridad.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    1. Molestia vs Dolor
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Durante el examen, el personal médico puede presionar suavemente el abdomen para revisar útero y ovarios. Esto puede sentirse raro o incómodo, pero <strong>no debe doler.</strong>
                  </p>
                  <p>
                    Si algo duele, <strong>voz alta.</strong> El personal de salud debe detenerse, ajustar la técnica o investigar la causa.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    2. Sensaciones
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Son señales de tu cuerpo que puedes identificar en un punto del mismo,  expresarlas durante tu consulta es positivo aún cuando no puedas nombrarlas claramente.
                  </p>
                  <ul className="space-y-4 text-foreground leading-relaxed list-disc pl-6">
                    <li>Ruborización en tu rostro.</li>
                    <li>Hormigueo en tu cuerpo.</li>
                    <li>Corazón o latido acelerado.</li>
                    <li>Sudoración en las manos.</li>
                    <li>Te cuesta trabajo respirar.</li>
                    <li>Sensación de vacío en el estómago.</li>
                  </ul>
                 </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    3. Atiende a las señales de tu cuerpo.
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    No es exageración si sientes mucha incomodidad o <strong>que algo está mal</strong>. Es normal sentir vergüenza, nervios o un grado de incomodidad. Valora junto con el personal de salud que condición del espacio podría provocar estas sensaciones o si proviene de la actitud y el trato recibido.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    4. Preparación previa
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Antes de la cita:.
                  </p>
                  <ul className="space-y-4 text-foreground leading-relaxed list-disc pl-6">
                    <li><strong>Comparte experiencias pasadas:</strong>Si alguna vez tuviste una mala experiencia (ejemplo: el espéculo te lastimó), considera decirlo al inicio para que el personal lo tenga en cuenta y pueda ser cuidadoso.  tenga más cuidado.</li>
                    <li><strong>Haz una lista de dudas</strong>Llevar tus preguntas anotadas puede ayudarte a sentirte más tranquila.</li>
                  </ul>
                 </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* Closing */}
          <ScrollReveal>
            
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={handleContinue}
                    disabled={isSaving}
                    className="gradient-primary text-white px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
                  >
                    {isSaving ? (
                      <Loader2 className="mr-2 animate-spin" />
                    ) : (
                      "Continuar con la siguiente sección"
                    )}
                    {!isSaving && <ArrowRight className="ml-2 w-6 h-6" />}
                  </Button>
                </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};
export default Module2Visit;
