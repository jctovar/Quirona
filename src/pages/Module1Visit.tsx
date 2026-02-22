import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

const visitPoints = [
  "Tú puedes asistir a tu primera consulta ginecológica sin necesidad de presentar síntomas o alguna molestia. Esta primera consulta puede centrarse en tu historia clínica, por ejemplo, identificar si tienes antecedentes familiares de enfermedades como cáncer o hipertensión, también pueden evaluar si necesitas vacunas importantes como la del Virus del Papiloma Humano (VPH) o refuerzos de otras inmunizaciones. O incluso empezar a reflexionar sobre tu plan de vida reproductiva.",
  "La médica o el médico te hará preguntas sobre tus periodos menstruales, actividades sexuales (si las hay) y el uso de alcohol o tabaco. Dar respuestas honestas es clave para que recibas la mejor atención, aunque algunos temas parezcan difíciles de compartir como situaciones de violencia física o abuso.",
  "¡Sea en la primera, segunda o enésima consulta ginecológica, siempre puedes hacer preguntas! Estas pueden ser acerca de tu cuerpo, tu crecimiento y las relaciones sexuales. También puedes hacer preguntas para conocer mejor a tu médico y también sobre qué esperar en futuras consultas.",
  "Es un mito común que siempre te harán un examen pélvico interno; en realidad, no suele ser necesario en la primera visita a menos que tengas problemas específicos como dolor insoportable o sangrados anormales. Lo que sí es frecuente es un chequeo general de peso, altura y presión arterial, y a veces una revisión visual externa de tu vulva si se considera necesaria para el diagnóstico.",
  "Tienes derecho a hablar con tu médico de forma privada y confidencial. Aunque vayas acompañada por un conocido o un familiar, las ginecólogas y los ginecólogos suelen ofrecer un tiempo a solas para que puedas expresar dudas que quizás te den pena comentar frente a tus acompañantes.",
  "¡Puedes hablar de otras dudas o inquietudes sobre tu salud integral! No dudes en hablar sobre el acné, los cólicos fuertes, el uso de anticonceptivos, prevenir infecciones (ITS) o incluso, si te has sentido triste o con mucha ansiedad.",
];

const Module1Visit = () => {
  const navigate = useNavigate();
  const [known, setKnown] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />

      <div className="pt-96 pb-16 px-4">
        <div className="container mx-auto max-w-3xl space-y-12">
          {/* Intro */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h1 className="text-3xl font-bold text-center mb-6 text-primary">
                  La primera visita al consultorio ginecológico
                </h1>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    La primera visita al ginecólogo es un paso fundamental para el cuidado de tu salud y se recomienda que ocurra entre los 13 y 15 años de edad. Es completamente normal sentirse nerviosa o ansiosa antes de ir, pero debes saber que el objetivo principal es brindarte información, educación y herramientas preventivas para que crezcas de forma saludable.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Section title */}
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-center text-primary">
              Seis puntos que debes conocer sobre esta primera consulta ginecológica:
            </h2>
          </ScrollReveal>

          {/* 6 points */}
          {visitPoints.map((point, index) => (
            <ScrollReveal key={index}>
              <Card className="border-2 shadow-quirona">
                <CardContent className="p-8 md:p-12">
                  <p className="text-foreground leading-relaxed mb-6">
                    <span className="font-bold text-primary text-lg">{index + 1}. </span>
                    {point}
                  </p>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
                    <Checkbox
                      id={`known-${index}`}
                      checked={known[index] || false}
                      onCheckedChange={(checked) =>
                        setKnown((prev) => ({ ...prev, [index]: !!checked }))
                      }
                    />
                    <Label htmlFor={`known-${index}`} className="text-sm font-medium cursor-pointer">
                      Ya conocía esta información
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}

          {/* Closing */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Tu primera visita ginecológica es como una clase individual con una experta o experto dónde tu salud es el tema principal y entender el funcionamiento de tu propio cuerpo. No es necesario asistir porque algo esté "mal", sino para aprender a mantener todo funcionando de la mejor manera posible.
                  </p>
                  <p className="font-semibold text-primary">
                    La mejor consulta se siente como un trabajo de equipo, en la que las dos personas (tú y tu médico) están buscando la misma meta: tu bienestar y tu seguridad.
                  </p>
                </div>
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={() => navigate("/module-1-game")}
                    className="gradient-primary text-white px-8 py-6 text-lg"
                  >
                    Continuar con la siguiente sección
                    <ArrowRight className="ml-2 w-5 h-5" />
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

export default Module1Visit;
