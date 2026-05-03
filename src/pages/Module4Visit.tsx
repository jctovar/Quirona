import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { updateProgress } from "@/lib/progressHelper";
import { Loader2 } from "lucide-react";
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
const Module4Visit = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [known, setKnown] = useState<Record<number, boolean>>({});

  const handleContinue = async () => {
  setIsSaving(true);
  try {
    // Marcamos m4_visit en la base de datos
    await updateProgress("m4_visit");
    navigate("/module-4-game");
  } catch (error) {
    console.error("Error al guardar progreso:", error);
    navigate("/module-4-game");
  } finally {
    setIsSaving(false);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          {/* Intro */}
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h1 className="text-3xl font-bold text-center mb-6 text-primary">
                    Auto-defensa basada en auto-empoderamiento: asertividad para cuidar tus límites
                </h1>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    En una consulta ginecológica tú no eres un “objeto de revisión”. Eres una persona con derechos, límites y voz. Una consulta de calidad se construye con diálogo, información clara y tu consentimiento a cada procedimiento que te vayan a realizar.  En el Código de Ética del Colegio Mexicano de Especialistas en Ginecología y Obstetricia, se plantea que la relación médico-paciente se basa en confianza y que las decisiones deben apoyarse en el diálogo y la información suficiente, veraz y comprensible, reconociendo tu autonomía y el consentimiento informado (un documento en el que se te informa todo lo que implica el proceso de consulta) y cuando eres menor de edad, el asentimiento informado (en este tú asientes que estás de acuerdo, y tu tutora firma el consentimiento informado).
                    </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    ¿Por qué a veces cuesta tanto “decir algo”?
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Aunque suene sencillo en teoría, en la vida real hay cosas que lo hacen difícil:
                  </p>
                  <ul className="space-y-4 text-foreground leading-relaxed list-disc pl-6">
                    <li>Desbalance de poder: en consulta, el personal de salud suele tener más control del espacio, del tiempo y del conocimiento. Esta “diferencia de poder” puede sentirse intimidante, especialmente en revisiones ginecológicas.</li>
                    <li>Congelarse: si algo se siente invasivo o amenazante, a veces el cuerpo no reacciona “hablando”, sino “apagándose” (quedarse callada, disociarse, congelarse).</li>
                    <li>Mandatos de género: a muchas mujeres nos educan con “no seas conflictiva”, “aguantate”, “pórtate bien”. Estos mensajes te llevan a callar incluso cuando sientes que algo no está bien.</li>
                  </ul>
                  <p>
                     Si alguna vez te quedaste callada, puede que hayas experimentado emociones de culpa o vergüenza. Quedarse callada no significa que “fallaste”, significa que tu cuerpo hizo lo que pudo con lo que tenía. Y justo por eso este módulo te brinda herramientas para que tu respuesta no dependa de la emoción que sientas en ese momento, sino de tener un plan.
                  </p>
                <h5 className="text-3xl font-bold text-center mb-6 text-primary">
                    Auto-defensa basada en auto-empoderamiento en consulta.
                </h5>
                 <p>
                    Aquí “auto-defensa” no es pelear. Es recuperar control con acciones concretas como:
                 </p>
                 <ul className="space-y-4 text-foreground leading-relaxed list-disc pl-6">
                    <li>Pedir información (para entender y decidir).</li>
                    <li>Poner límites (para sentirte segura).</li>
                    <li>Elegir continuar, pausar, cambiar o terminar la consulta.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    ¿Qué es asertividad?
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    La asertividad es una forma de hablar y actuar que te ayuda a cuidarte: decir lo que necesitas con claridad y respeto, sin minimizarte y sin agredir a la otra persona. Es el ese punto medio entre quedarte callada “para no incomodar” y explotar desde el enojo. Dicho de manera simple: ser asertiva es poder decir:
                  </p>
                  <p>
                    <strong>“Lo digo claro, lo pido concreto y sostengo mi límite.”</strong>
                  </p>
                  <p>
                    Ahora, la asertividad no es un “todo o nada”. Hay días en los que te sale una frase firme, directa, segura. Y hay días en los que sólo puedes decir algo chiquito, como “espere”, “me duele”, “necesito un momento” ¡Y eso también cuenta! A veces tu forma de poner un límite será una frase; otras veces será pedir ayuda; y otras será levantarte e irte. No tiene que verse “perfecta” para ser válida.
                  </p>
                  <p>
                    También hay que decirlo: hay situaciones donde hablar no se siente posible. Cuando una persona está asustada, es intimidada o está en riesgo, el cuerpo puede entrar en modo supervivencia: atacar, huir o congelarte. Esto significa que tu cuerpo se protege como puede.
                  </p>
                  <p>
                    En resumen: la asertividad no es ser fuerte todo el tiempo. Es aprender a cuidarte con palabras y acciones posibles para ti, en ese momento. <strong>La asertividad no se improvisa: se practica.</strong>
                  </p>
                 </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    La herramienta: “PAUSA”
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Cuando te sientas incomoda, usa este mini-guion (corto y directo):
                  </p>
                  <p>
                    P — Pide explicación
                    “Antes de seguir, explíqueme qué va a hacer y por qué.”</p>
                  <p>
                    A — Avisa lo que pasa en tu cuerpo
                    “Me duele / me incomoda / me siento invadida.”</p>
                  <p>   
                    U — Ubica tu límite
                    “Necesito que se detenga / que pause / que no continúe así.”</p>
                  <p>
                    S — Solicita una acción concreta
                    “Avíseme antes de tocarme” / “Cambie la forma” / “Necesito una sábana” / “Cierre la puerta”.</p>
                  <p>
                    A — Actúa si no te respetan
                    “Voy a terminar la consulta. Me retiro.”
                  </p>
                  <p>
                    Esto no es drama: <strong>es autocuidado.</strong>
                  </p>
                  <p><strong>Tip rápido: tu frase asertiva funciona mejor si trae (1) lo que pasa, (2) lo que necesitas, y (3) la acción</strong></p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    “Disco rayado”: la técnica para cuando te intentan minimizar
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    A veces lo más difícil no es decir la primera frase… sino sostenerla cuando te contestan con algo que te hace dudar. Porque puede pasar que tú digas “me duele” y la otra persona te responda: “ay, no es para tanto”, “es normal”, “aguántate tantito”, “así son estas revisiones”. Y justo ahí, muchas se van para atrás. No porque no quieran cuidarse, sino porque esas frases traen un mensaje escondido: “lo que sientes no importa”.
                  </p>
                  <p>
                    En esos momentos ayuda mucho algo sencillo: no explicar de más, no discutir, no justificarte. Solo repetir tu límite, clarito, como si lo volvieras a poner sobre la mesa
                  </p>
                  <p>
                    Por ejemplo, si te dicen “aguántate”, tú puedes responder: </p>
                  <p>
                    —“Entiendo, pero me duele. Necesito que se detenga.”</p>
                  <p>
                    Y si vuelven con “ya casi terminamos”, repites: </p>
                  <p>
                    —“No voy a continuar si me duele. Pausamos ahora.”
                  </p>
                  <p>
                    Suena simple, pero funciona porque te regresa a lo importante: tu cuerpo, tu límite y tu decisión. No se trata de convencer a nadie. Se trata de que te escuchen… y si no te escuchan, tú tengas claro qué sigue.
                  </p>
                 </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-6 text-primary">
                    Tu ruta después de la consulta: apoyo y niveles de denuncia.
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    A veces, lo más pesado no pasa solo durante la consulta, sino después. Sales, te subes al transporte, llegas a tu casa… y de pronto te cae el veinte. Te sientes rara, enojada, triste, confundida, o con una mezcla incómoda de culpa y vergüenza que hace que te preguntes: “¿de verdad estuvo mal lo que pasó?” o “¿y si estoy exagerando?”.
                  </p>
                  <p>
                    En ese momento es importante saber algo: denunciar no es una sola cosa. Muchas personas creen que “denunciar” significa ir directo a una institución y hacer un trámite largo. Pero, en la vida real, denunciar puede significar varias formas de señalar lo que pasó, buscar apoyo, dejar constancia o advertir a otras personas. Y tú puedes elegir qué tanto, cómo y cuándo, según tu seguridad y tu contexto.
                  </p>
                  <p>
                    No tienes que hacerlo perfecto, ni tienes que hacerlo todo. A veces el primer paso es simplemente no quedarte sola.
                  </p>
                  <p>
                    No le debes justicia a nadie. Si decides hablar, contarlo o denunciar, que sea por ti: por tu seguridad, tu bienestar, tu proceso. No por alguien más ni por presión ni obligación. 
                    Es válido arrepentirte o cambiar de plan. Puedes empezar y luego decidir parar. Puedes contar una parte y guardar otra. Puedes denunciar y luego decidir no seguir. Tu proceso es tuyo.
                  </p>
                 </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          {/* Closing */}
          <ScrollReveal>
            
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={handleContinue}
                    disabled={isSaving}
                    className="gradient-primary text-white px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="animate-spin mr-2" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        Continuar con la siguiente sección
                        <ArrowRight className="ml-2 w-6 h-6" />
                      </>
                    )}
                  </Button>
                </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};
export default Module4Visit;
