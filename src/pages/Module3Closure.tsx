import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const Module3Closure = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"questions" | "story">("questions");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({ fear: "", phrase: "", advice: "" });
  const [fontSizeClass, setFontSizeClass] = useState("text-base");

  const storyPages = [
    (
      <div>
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Resolución
        </h1>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            La puerta del consultorio se abre, y Cristina sale con paso pesado y veloz. Se le ve pálida y temblorosa.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            -¿Qué pasó hija, qué te dijo?
          </p>
          <p>
            Intentando mantener un tono serio, pero con lágrimas asomándose por sus ojos Cristina le pide a su mamá
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            -"Vámonos, mamá. Me siento muy mal."
          </p>
          <p>
            Mientras Cristina sale de la clínica, su madre se queda desconcertada, se acerca a pagar la consulta de manera rápida, mientras que la asistente se queda en silencio frente a lo que acaba de pasar.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Al llegar al auto, ve a Cristina sollozando. Pasan muchas cosas por su cabeza "¿le habrán dado malas noticias?¿le lastimo el estudio que le hicieron?¿la regañaron?"
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Cris, 'mija, con confianza puedes decirme lo que sea que haya pasado, podemos hablarlo ahorita o si quieres llegando a la casa, o cuando tú quieras. Me preocupa verte así, siempre puedes contar conmigo. Quiero que sepas que estoy para ti de manera incondicional mija y que te quiero con todo el alma.
          </p>
          <p>
            Cristina, controlando su llanto, le dice a su mamá.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Ay mami, estuvo horrible.
          </p>
          <p>
            Cristina llora más, se siente impotente y con un dolor muy hondo.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – El doctor me juzgó con sus preguntas. Me sentí muy incómoda. Y cuando me hizo el examen no tuvo cuidado, me lastimó mucho. Me sentí horrible.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            La mamá de Cristina la abraza con mucha seguridad, se queda en silencio unos minutos dejando que Cristina llore y saque lo que está sintiendo. Entre pausas de su llanto le comenta más detalles. Su mamá no la interrumpe ni busca hacer más preguntas, le da su espacio para hablar.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Mija, lamento no haber insistido en entrar– sus ojos se ponen vidriosos y su boca hace una mueca de enojo contenido, pero toma su tiempo para no reaccionar. Éste momento es para las emociones de Cristina.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            — Yo sé que eres muy lista y no tengo que decírtelo, pero aún así lo voy a decir: ésto de ninguna manera fue responsabilidad tuya. Los médicos son responsables de tu salud física y de que te sientas segura y respetada. Lo que te paso no está bien de ninguna manera. La falta es del doctor, y es él quien hizo mal, no tú.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Ya sé mami, gracias por recordármelo.
          </p>
          <p>
            Cristina y su mamá se quedan unos minutos más en el estacionamiento. Llegan a casa dónde la señora prepara la cena mientras Cristina se queda sola en su cuarto descansando. Después de cenar, y con una taza de té, la mamá de Cristina le comenta a ésta última algunas acciones concretas:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – No es obligación ni te tienes que sentir presionada. Date el tiempo necesario para decidirlo.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Gracias mami, pero no, ya decidí, esto no se va quedar así. Primero voy a avisarle a mis amigas que no se acerquen a ese doctor. También voy a poner una reseña responsable y clara en Internet.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Si estás de acuerdo, yo también puedo avisarle a todas mis amigas, para que le avisen a sus hijas. Igual no les comparto ningún detalle. También podemos investigar cómo ir a la Comisión de Arbitraje Médico, pero sólo si te sientes bien para hacerlo.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – No sé si quiero que otras personas se enteren ahorita mami.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Entiendo mija, lo que tú quieras está bien.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Gracias, sé que el que debería sentir vergüenza y culpa es él y no yo. Igual en unos días me siento más preparada para hablarlo con más personas.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           – De acuerdo mija, no hay nada que ocultar en ésto. Todas necesitamos de la salud y del cuidado médico. Tú sabes que no todos los médicos son así, por eso es muy valiente que quieras hablar, porque ayuda a separar a los médicos responsables de los irresponsables.
          </p>
          <p>
            Cristina, aún afectada, pero con mucho afecto y conmovida, abraza a su mamá.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Gracias por creerme.
          </p>
        </div>
      </div>
    ),
    ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          {phase === "questions" ? (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 space-y-8">
                <h1 className="text-3xl font-bold text-center text-primary">
                  Ahora regresemos al caso de Cristina
                </h1>
                <p className="text-center text-lg text-muted-foreground">
                  Antes de eso, te pedimos respondas las siguientes preguntas:
                </p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                     ¿Qué nuevo conocimiento te llevas de este módulo?
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[120px]"
                      value={answers.fear}
                      onChange={(e) => setAnswers({ ...answers, fear: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      ¿Qué crees que pueda hacer Cristian al salir de su consulta?
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[120px]"
                      value={answers.phrase}
                      onChange={(e) => setAnswers({ ...answers, phrase: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      ¿Cómo puede ayudarte a tí el conocimiento de lo que puede pasar y lo que no debe pasar en una consulta ginecológica?
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      className="min-h-[120px]"
                      value={answers.advice}
                      onChange={(e) => setAnswers({ ...answers, advice: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => setPhase("story")}
                    className="gradient-primary text-white px-8 py-6 text-lg"
                  >
                    Continuar
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12">
                {/* accessibility controls */}
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
                <div className={`prose prose-lg max-w-none ${fontSizeClass}`}>
                  <div key={page} className="transition-transform duration-300">
                    {storyPages[page]}
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
                        onClick={() => setPage((p) => Math.min(p + 1, storyPages.length - 1))}
                        disabled={page === storyPages.length - 1}
                      >
                        Siguiente
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Página {page + 1} / {storyPages.length}
                    </div>
                  </div>
                </div>

                {/* show finish button only on last page */}
                {page === storyPages.length - 1 && (
                  <div className="flex justify-center mt-10">
                    <Button
                      onClick={() => navigate("/dashboard")}
                      className="gradient-primary text-white px-8 py-6 text-lg"
                    >
                      Finalizar módulo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
export default Module3Closure;
