import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight, BookOpen, Heart, Shield, MessageCircle, Smartphone, Loader2} from "lucide-react";
import { updateProgress } from "@/lib/progressHelper";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
const myths = [
  {
    icon: Heart,
    title: 'Lavado de manos',
    text: 'Es obligatorio que el médico se lave las manos (o use gel antibacterial) frente a ti antes de iniciar el examen.',
  },
  {
    icon: BookOpen,
    title: 'Explicación paso a paso',
    text: 'El médico debe narrar lo que hará a continuación durante el examen físico (por ejemplo, "ahora voy a palpar tu abdomen", "voy a tocar aquí para tomar la muestra").',
  },
  {
    icon: Shield,
    title: 'Presencia de acompañante',
    text: 'Debes ser informada de tu derecho a tener una enfermera o persona de confianza presente durante el examen, y puedes solicitarlo.',
  },
];
const Module2Introduction = () => {
  const { goTo } = useRoleNavigation();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleContinue = async () => {
    setIsSaving(true);
    try {
      // Marcamos m2_intro en la tabla de progreso
      await updateProgress("m2_intro");
      goTo("/module-2-quiz");
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      goTo("/module-2-quiz");
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
                Es muy importante que todo consultorio en donde se haga un chequeo ginecológico cumpla con los requisitos establecidos por las normas mexicanas. La infraestructura de un consultorio ginecológico debería estar diseñada para proteger tu integridad física y emocional, garantizando que la atención se realice en un entorno de confianza y seguridad.
                En este primer módulo aprenderás que:
              </p>
              <ul className="space-y-4 text-foreground text-lg list-disc pl-6">
                <li>Algunas de los procedimientos que un médico debe seguir para brindarte atención.</li>
                <li>Algunas de las características relacionadas a una consulta ginecológica que priorice tu bienestar, seguridad y derechos.</li>
                <li>Validar tus emociones respecto a cómo te sientes con la atención recibida</li>
              </ul>
            </CardContent>
          </Card>
          {/* Condiciones básicas que debe tener un Consultorio Ginecológico. */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">Condiciones básicas que debe tener un Consultorio Ginecológico.</h2>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Un espacio físico adecuado no lo es todo, pero es parte fundamental para garantizar tu privacidad, comodidad y seguridad.
                  </p>
                  <p>
                    Un consultorio donde se realiza un chequeo ginecológico debe tener al menos dos o tres áreas separadas:
                  </p>
                  <p>
                    Zona de Entrevista: Un espacio tranquilo para la conversación, donde puedas compartir información relevante sobre tu salud, a la que el personal de salud llama historia clínica, o bien donde puedes externar tus preocupaciones en general. En este espacio, sea en un archivero o en una computadora, debe guardarse tu información de manera segura.
                  </p>
                  <p>
                    Zona de Exploración: Un área específica para el examen físico, que debe incluir una mesa ginecológica con estribos y estar delimitada por una cortina o biombo para brindarte la mayor privacidad al cambiarte y durante el examen.
                  </p>
                  <p>
                    Zona para cambiarte: Es imprescindible que exista un espacio cómodo y completamente privado para que puedas colocarte una bata. En caso de que el consultorio no esté equipado, el personal a cargo debe brindarte el espacio y tiempo necesario para cambiarte.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* Elementos para tu Privacidad y Dignidad */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">Elementos para tu Privacidad y Dignidad</h2>
                <ul className="space-y-4 text-foreground text-lg list-disc pl-6">
                <li>Deben proporcionarte una bata y sábanas o cobijas para cubrirte.</li>
                <li>Sólo la zona que se está examinando debe estar descubierta, y por el menor tiempo posible.</li>
                <li>La presencia de un acompañante o testigo, como una enfermera, es una práctica recomendada para tu seguridad y la del médico.</li>
                <h2 className="text-2xl font-bold mb-6 text-primary">Higiene y prevención</h2>
                <li>Debe haber un lavabo con jabón y toallas desechables dentro o muy cerca del área de exploración, para que el personal se lave las manos antes y después de atenderte.</li>
              </ul>
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* Procedimientos que el Médico y el Personal Deben Seguir */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">
                    Procedimientos que el Médico y el Personal Deben Seguir
                </h2>
                <div className="space-y-4 text-foreground leading-relaxed mb-8">
                  <p>
                    Estas son prácticas profesionales estándar que debes esperar durante tu atención.
                  </p>
                  <p>
                    <strong>Ética y confidencialidad</strong>El médico o la médico está obligado al secreto profesional. Lo que hables en consulta y los hallazgos médicos no pueden ser compartido con nadie más. En caso de ser menor de edad, el tratamiento de la información puede ser diferente. Tu consentimiento es fundamental. Ningún procedimiento (especialmente el tacto) debe realizarse sin tu permiso y sin una explicación previa.
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>
          {/* 5 myths */}
          {myths.map((myth, index) => (
            <ScrollReveal key={index}>
              <Card className="border-2 shadow-quirona">
                <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">
                    Protocolos de atención
                </h2>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <myth.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
                      {index + 1}. {myth.title}
                    </h3>
                  </div>
                  <p className="text-foreground leading-relaxed mb-6">{myth.text}</p>
                  
                </CardContent>
              </Card>
            </ScrollReveal>
            
          ))}
          {/* Tus sentimientos de incomodidad, nervios o incluso desconfianza son válidos */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">
                    Tus sentimientos de incomodidad, nervios o incluso desconfianza son válidos
                </h2>
                <div className="space-y-4 text-foreground leading-relaxed mb-8">
                  <p>
                    Como pudimos verlo en los puntos anteriores, existen aspectos básicos que deben ser respetados en un chequeo ginecológico, es muy importante que sepas que <strong>¡no son negociables!</strong> independientemente de si la institución a donde acudes es pública o privada.
                  </p>
                  <p>
                    Es importante que sepas que el cumplimiento de cualquiera de los aspectos antes mencionados es tu derecho y puedes solicitar que se cumplan en todo momento.
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
                  Durante tu visita ginecológica pueden surgir sensaciones desconocidas o de incomodidad. Lo cuál puede ser una respuesta natural, y lo más recomendable es no ignorarlas, por el contrario, puedes explorarlas e incluso externar cómo te sientes. 
                </p>
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={handleContinue}
                    disabled={isSaving}
                    className="gradient-primary text-white px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Guardando progreso...
                      </>
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
export default Module2Introduction;
