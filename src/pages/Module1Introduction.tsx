import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Heart, Shield, MessageCircle, Smartphone } from "lucide-react";
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
    title: '"Va al ginecólogo por tener una vida sexual irresponsable"',
    text: 'Las enfermedades ginecológicas se han asociado con tener muchas y variadas parejas sexuales, empezar la vida sexual a temprana edad, la falta de higiene y la irresponsabilidad. A esto se le llama estigma ginecológico, ya que en vez de promover un estilo de vida saludable ha provocado que muchas mujeres no busquen ayuda o no hablen de sus enfermedades por miedo a ser señaladas. Las enfermedades ginecológicas no son exclusivas de ningún tipo de mujer.',
  },
  {
    icon: MessageCircle,
    title: '"Que exagerada eres, a mi también me duele y no dejo de hacer mis cosas"',
    text: 'Muchas mujeres son etiquetadas como "exageradas" cuando comparten con familiares y parejas sus malestares menstruales, convenciéndolas de ocultar su dolor para evitar ser ridiculizadas o sentir que no son tomadas en serio. A menudo madres u otras mujeres que fueron educadas bajo la misma idea, son quienes aconsejan no ir a la consulta ginecológica al considerar que los malestares menstruales son parte de ser mujer.',
  },
  {
    icon: Shield,
    title: '"Eso no es cosas de señoritas"',
    text: 'Existe el temor a recibir un trato brusco o juicios morales por parte de la familia, las amistades e incluso de los profesionales de la salud por hablar de la salud sexual, especialmente si se es joven y soltera. Aún existe la falsa creencia de que la primera visita al ginecólogo o ginecóloga debe ocurrir sólo cuando se inicia la vida sexual o a una edad avanzada (18-21 años).',
  },
  {
    icon: Smartphone,
    title: '"¿Hay un remedio casero para esto en TikTok o en Facebook?"',
    text: 'En plataformas de redes sociales, los algoritmos priorizan el contenido que genera interacción (likes y compartidos), no la veracidad de la información. Esto facilita que se difundan información falsa o consejos engañosos que no tienen base científica. Al intentar curarte con un remedio casero, puedes "enmascarar" los síntomas de algo serio.',
  },
  {
    icon: BookOpen,
    title: '"Si apenas digo algo, todo el mundo se va a enterar"',
    text: 'La principal preocupación de las mujeres jóvenes es que su privacidad no sea respetada frente a sus padres o tutores. Esto influye en que eviten asistir a atención preventiva para que no se les cuestione sobre su actividad sexual. Es importante conocer que algunas clínicas ofrecen servicios preventivos gratuitos, asesoría en métodos anticonceptivos o vacunas contra el VPH sin necesidad de asistir acompañada de padres o tutores. También puedes acercarte a ferias de salud sexual que se hacen en escuelas para recibir mayor información.',
  },
];
const Module1Introduction = () => {
  const navigate = useNavigate();
  const [heardMyths, setHeardMyths] = useState<Record<number, boolean>>({});
  const toggleMyth = (index: number) => {
    setHeardMyths((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      <div className="pt-96 pb-16 px-4">
        <div className="container mx-auto max-w-3xl space-y-12">
          {/* Intro card */}
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              <h1 className="text-3xl font-bold text-center mb-8 text-primary">Introducción</h1>
              <p className="text-lg text-muted-foreground mb-6">
                En este primer módulo aprenderás que:
              </p>
              <ul className="space-y-4 text-foreground text-lg list-disc pl-6">
                <li>La ginecología es el campo y especialidad que se enfoca en la salud de las mujeres.</li>
                <li>Por qué es importante acercarse a los servicios de ginecología a lo largo de la vida.</li>
                <li>Algunas creencias que pueden alejar a las mujeres de una consulta ginecológica.</li>
              </ul>
            </CardContent>
          </Card>
          {/* ¿Sabes qué es la ginecología? */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">¿Sabes qué es la ginecología?</h2>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    La ginecología es la especialidad de la medicina que se encarga de cuidar de la salud de las mujeres y personas con órganos femeninos (vagina, útero, ovarios y mamas) desde que son bebés hasta cuando son ancianas. Con esta descripción parecería que la ginecología está muy limitada a tratar a las mujeres cuando tienen problemas de salud, sin embargo, desde hace unos años, los ginecólogos y las ginecólogas ya no solo se dedican a tratar enfermedades, también pueden promover el bienestar y la calidad de vida de la mujer en todas sus etapas, con un enfoque respetuoso, integral y centrado en la paciente.
                  </p>
                  <p>
                    Los especialistas en esta rama de la medicina pueden apoyarte en mantener tu salud física, mental y social a través de estrategias de prevención (antes de que aparezcan los problemas) y con equipos de apoyo como otros profesionales, tu familia, tu escuela y tu comunidad.
                  </p>
                </div>
                <img
                  
                  alt="Ginecología integrativa: mujer joven, niña y mujer mayor rodeadas de profesionales de la salud"
                  className="w-full rounded-xl mt-6 shadow-md"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* ¿Qué es eso de prevenir? */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">¿Qué es eso de prevenir?</h2>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Parece una palabra muy común, pero cuando hablamos de salud, es importante que sepas que prevenir es lo más importante para mantener tu salud durante toda la vida. La prevención te ayudará a evitar enfermedades complejas, o en caso de que llegues a tenerlas, no vivir las consecuencias más graves de las mismas. La prevención no es solo "no estar enferma", sino tomar medidas ahora para evitar problemas en el futuro y asegurarse de que tu cuerpo funcione y que te sientas bien por mucho tiempo.
                  </p>
                  <p>
                    ¡Pero no hay que vivirlo con miedo o pesadez! Las actividades preventivas pueden ser muy interesantes y placenteras, y pueden traerte muchas cosas buenas, entre ellas, tener mucha seguridad con tu cuerpo, saber qué cosas necesitas para tener una vida saludable y la confianza para explorar lo que te gusta. Se trata de hacer y pedir lo que necesitas para seguir viviendo bien, en lugar de esperar a que algo te duela para ir al médico.
                  </p>
                  <p>
                    La rama de la ginecología que te orienta en esta forma de vivir es la <strong>ginecología preventiva</strong>, que se trata de conocimientos y prácticas útiles para mantener tu salud y llevar tu desarrollo físico con la mejor salud posible. Es decir, que desde este momento hasta cuando seas una mujer mayor, tu calidad de vida sea la mejor.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* ¿Por qué muchas mujeres no asisten? */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-primary">
                  ¿Por qué muchas mujeres no asisten a la consulta ginecológica?
                </h2>
                <div className="space-y-4 text-foreground leading-relaxed mb-8">
                  <p>
                    Incluso cuando hay síntomas como dolor pélvico de mucho tiempo o sangrados anormales, muchas mujeres en México evitan la consulta ginecológica, esto es preocupante debido a que muchas afecciones que pueden ser tratadas de manera efectiva, tienden a complicarse por falta de apoyo médico.
                  </p>
                  <p>
                    Esto no quiere decir que las mujeres no quieran cuidar su salud o que no sepan cómo ir a una consulta ginecológica, sin embargo, existen barreras que están basadas en creencias erróneas. Queremos comentar contigo 5 de estas creencias erróneas para que no afecten tu salud y tu vida:
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
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <myth.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
                      {index + 1}. {myth.title}
                    </h3>
                  </div>
                  <p className="text-foreground leading-relaxed mb-6">{myth.text}</p>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
                    <Switch
                      id={`myth-${index}`}
                      checked={heardMyths[index] || false}
                      onCheckedChange={() => toggleMyth(index)}
                    />
                    <Label htmlFor={`myth-${index}`} className="text-sm font-medium cursor-pointer">
                      {heardMyths[index] ? "Sí la he escuchado" : "No la he escuchado"}
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
          {/* Closing note */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <p className="text-foreground leading-relaxed">
                  Existen otras barreras que pueden estar más allá del control de una persona, como el que haya pocos servicios de ginecología gratuitos y que al mismo tiempo estén saturados. Por el momento quédate con la idea de no dejarte llevar por estas creencias, ya que ponen en riesgo tu salud y tu derecho a una vida libre de violencia.
                </p>
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={() => navigate("/module-1-quiz")}
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
export default Module1Introduction;