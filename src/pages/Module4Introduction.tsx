import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Heart, Shield, MessageCircle, Smartphone} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
const Module4Introduction = () => {
  const navigate = useNavigate();
  const [heardMyths, setHeardMyths] = useState<Record<number, boolean>>({});
  const toggleMyth = (index: number) => {
    setHeardMyths((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          {/* Intro card */}
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              <h1 className="text-3xl font-bold text-center mb-8 text-primary">Introducción</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Si alguna de las anteriores preguntas te dejó con un “no sé”, este módulo te dará herramientas para responder con asertividad y cuidar tus límites. Además aprenderás:
              </p>
              <ul className="space-y-4 text-foreground text-lg list-disc pl-6">
                <li>Tienes derecho a una consulta donde tu bienestar sea prioridad.</li>
                <li>Puedes pedir información clara y consentimiento como parte normal de la consulta, no como “favor”.</li>
                <li>La asertividad no es ser conflictiva, es comunicarte con firmeza y respeto</li>
                <li>Si algo pasa, no estás sola: hay redes de apoyo y también rutas de denuncia por niveles.</li>
              </ul>
            </CardContent>
          </Card>
          {/* Del “identificar” al “responder” */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">Del “identificar” al “responder”</h2>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p className="text-lg  mb-6">
                    En el módulo anterior hablamos sobre violencia ginecológica: cómo puede verse en una consulta y por qué no debe normalizarse. Ahora vamos al siguiente paso: ¿qué haces si te pasa a ti?
                  </p>
                  <p className="text-lg  mb-6">
                    Este módulo está centrado en la auto-defensa basada en el auto-empoderamiento, que es una serie de estrategias para cuidarte y tomar decisiones en el momento.
                  </p>
                  <p className="text-lg  mb-6">
                    Poner límites no es ser conflictiva, es tener acuerdos y reglas personales que protegen tu bienestar y promueven el respeto hacia ti.
                  </p>
                  <h5 className="text-xl font-semibold text-primary mt-6">¿Sabes qué es responder a la violencia ginecológica?</h5>
                  <p className="text-lg  mb-6"  >
                    Responder a la violencia ginecológica significa protegerte y recuperar control cuando una consulta deja de ser respetuosa: cuando no te explican, te presionan, te minimizan, te infantilizan, te lastiman o ignoran tus límites.
                  </p>
                  <p className="text-lg  mb-6">
                    Responder no es “pelear” ni “hacer show”: es cuidarte con acciones concretas, por ejemplo pedir información, poner límites cómo detener la exploración o terminar la consulta si lo deseas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* Contarlo, ayuda */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">Contarlo, ayuda</h2>
                <p className="text-lg  mb-6"  >
                    Después de una experiencia así, también puedes elegir contarlo, buscar apoyo o denunciar, siempre priorizando tu seguridad. Una forma sencilla de ubicar opciones para contarlo es pensar en tres niveles:
                </p>
                <ul className="space-y-4 text-foreground text-lg list-disc pl-6">
                <li>Redes personales de apoyo: como tu familia, amigas/os, pareja y alguien de confianza. </li>
                <li>Denuncia pública: compartir tu experiencia en redes sociales siempre cuidando tu privacidad y seguridad</li>
                <li>Denuncia ante instancias oficiales como Arbitraje Médico (CONAMED):. Esta es una forma gratuita y sin ir a juicio de resolver un conflicto entre un paciente y un servicio de salud, la Comisión Nacional de Arbitraje Médico busca conciliar y llegar a un acuerdo.</li>
              </ul>
              </CardContent>
            </Card>
          </ScrollReveal>
          
          {/* Closing note */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={() => navigate("/module-4-quiz")}
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
export default Module4Introduction;
