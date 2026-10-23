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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
 * Introducción del Módulo 3: conceptos de violencia ginecológica.
 * Marca `m3_intro` y avanza al quiz.
 */
const Module3Introduction = () => {
  const { goTo } = useRoleNavigation();
  const [isSaving, setIsSaving] = useState(false);

  /** Marca el paso y navega; el fallback evita bloquear la lectura. */
  const handleContinue = async () => {
    setIsSaving(true);
    try {
      await updateProgress("m3_intro");
      goTo("/module-3-quiz");
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      goTo("/module-3-quiz");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          {/* Intro card */}
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              <h1 className="text-3xl font-bold text-center mb-8 text-primary">Introducción</h1>
              <p className="text-lg text-muted-foreground mb-6">
                En este tercer módulo aprenderás que:
              </p>
              <ul className="space-y-4 text-foreground text-lg list-disc pl-6">
                <li>Qué es la violencia ginecológica y porque es una forma de violencia de género.</li>
                <li>Algunas creencias que facilitan el mal trato.</li>
                <li>Las formas de violencia ginecológica que son más frecuentes.</li>
              </ul>
            </CardContent>
          </Card>
          {/* ¿Habías escuchado de la violencia ginecológica? */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">¿Habías escuchado de la violencia ginecológica?</h2>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Quizás no sabías que algo así existía, o que se reconocía con un nombre a muchas de las experiencias negativas que han vivido mujeres de todas las edades en unidades de salud, clínicas, consultorios y hospitales, pero la violencia ginecológica es una forma de violencia de género, que ocurre en entornos de salud y que es cometida por el personal de salud. Sin embargo, es importante que sepas que no solo se trata de "malos médicos" o situaciones de las instituciones de salud que hacen las cosas “mal”, sino de muchas creencias y condiciones que refuerzan una idea en la sociedad de que "te tienes que aguantar".
                  </p>
                  <p>
                    Es muy importante hacer visible este tipo de violencia, primero, porque la atención ginecológica es de suma importancia para mantener tu salud a lo largo de la vida; y también porque algunas formas de violencia pueden dejar secuelas duraderas y heridas psicológicas profundas que pueden incluir ansiedad, sentimientos de culpa y depresión. Una de las consecuencias más críticas es que muchas mujeres que viven éste tipo de violencia desarrollan desconfianza y miedo a volver a experimentarla, lo que las lleva a evitar las consultas o postergar exámenes preventivos vitales por miedo a ser agredidas o humilladas nuevamente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* ¿Sabes por qué es tan importante el enfoque de género? */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">¿Qué es eso de prevenir?</h2>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Hay muchas personas que entienden que el enfoque de género tiene que ver sólo con las mujeres, con personas con diversidad sexual, o que solo se refiere a tener espacios reservados para mujeres. Incluso hay personas que le llaman "ideología de género" como si fueran creencias de gente rara.
                  </p>
                  <p>
                    En pocas palabras, el enfoque de género es como usar unos lentes especiales que nos permiten ver y entender cómo el haber nacido con genitales femeninos o genitales masculinos definió lo que se nos enseñó desde jóvenes: desde cómo vestirnos, lo que está bien decir, que nos debería gustar y en general como vivir nuestra vida.
                  </p>
                  <p>
                    Como mujer, eres libre de seguir estos aprendizajes según te haga sentir bien o de no seguirlos porque prefieres otras cosas que no se acercan al estereotipo de ser mujer. Tu puedes decidir vestirte con ropas que se consideran muy femeninas o muy masculinas, querer tener hijos o no querer tenerlos, ser delicada o ser muy ruda, o que te guste cualquier persona sin importar su sexo, la forma de su cuerpo o sus ideas. No obstante también existen estereotipos de género, que son ideas relacionadas a “cómo debe ser una mujer" y que pueden ser usadas por otras persona para cuestionarte, presionarte o tratarte de forma injusta por no cumplirlas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* Entonces ¿Por qué la violencia ginecológica es una violencia de género? */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">
                  Entonces ¿Por qué la violencia ginecológica es una violencia de género?
                </h2>
                <div className="space-y-4 text-foreground leading-relaxed mb-8">
                  <p>
                    Porque son acciones que no ocurren por accidente o por un error del personal de salud, sino que se basan en creencias arraigadas de cómo "debe ser una mujer", especialmente aquellas que tienen que ver con las decisiones que tomas sobre tu cuerpo. Además de ser un mal servicio, son el reflejo de las ideas culturales que intentan colocar a las mujeres en un lugar fijo, y que se aprovechan de una situación en la que una persona puede estar más vulnerable al buscar apoyo para cuidar su salud.
                  </p>
                  <p>
                    Muchas veces en una consulta médica se dan desequilibrios de poder. Por ejemplo: el personal de salud puede creer que por tener más conocimiento y formación, debes subordinarte a lo que te digan, porque "no sabes" lo que te pasa o lo que necesitas. Esto puede dar pie a que se ignoren tus dudas o tus necesidades, no tomar en cuenta tus opiniones, o que se decida por ti, sin respetar tu derecho a decidir sobre tu cuerpo.
                  </p>
                  <p>
                    Además el personal de salud pueden sentirse con el "derecho" de corregir o señalar cosas que no van con ese "ser una buena mujer", por ejemplo, habrá médicos que critiquen el tener una vida sexual activa a las mujeres jóvenes, criticar su aspecto o físico por no cumplir con un estereotipo de imagen femenina, o presionarlas con decidirse a tener hijos, por mencionar algunas formas de violencia ginecológica.
                  </p>
                  <p>
                    La violencia ginecológica daña especialmente a mujeres que pertenecen a grupos indígenas, afrodescendientes, migrantes, con identidad sexual diversa o con discapacidades. En los sistemas de salud se han apoyado tratos injustos a personas de estos grupos, y a las mujeres de los mismos se les ha quitado la autonomía sobre sus propios cuerpos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* Closing note */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <p className="text-foreground leading-relaxed">
                    Toma en cuenta que no todas ni todos los trabajadores de consultorios, clínicas y hospitales llevarán a cabo actos de violencia ginecológica. Muchos profesionales harán lo necesario para tu bienestar físico, mental y emocional, y además harán lo necesario para que te sientas segura y cómoda. Si aprendes a identificar los actos de violencia ginecológica podrás diferenciar los lugares donde tu bienestar, tus derechos y tu dignidad sean lo más importante de los espacios en los que no te cuidan, y esto te permitirá construir una relación de confianza con tu médico.</p>
                <div className="flex justify-center mt-10">
                  <Button
                  onClick={handleContinue}
                  disabled={isSaving}
                  className="gradient-primary text-white px-12 py-8 text-xl shadow-xl hover:scale-105 transition-transform"
                >
                  {isSaving ? <Loader2 className="animate-spin mr-2" /> : null}
                  Continuar al Quiz del Módulo
                  <ArrowRight className="ml-2 w-6 h-6" />
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
export default Module3Introduction;

