import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useRoleNavigation from "@/hooks/useRoleNavigation";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/supabaseClient";
import { updateProgress } from "@/lib/progressHelper";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import UserNavbarWrapper from "@/components/UserNavbarWrapper";

const Module4Closure = () => {
  const { goTo } = useRoleNavigation();
  const [isSaving, setIsSaving] = useState(false);
  const [phase, setPhase] = useState<"questions" | "story">("questions");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({ 
    fear: "", 
    phrase: "", 
    response_no_exp: "", 
    response_pain: "" 
  });
  const [fontSizeClass, setFontSizeClass] = useState("text-base");

  const handleFinishQuestions = async () => {
    // Validación básica
    if (Object.values(answers).some(a => !a.trim())) {
      toast.error("Por favor, comparte tus reflexiones en todos los campos.");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('module_4_responses')
          .upsert({
            id: user.id,
            closure_answers: answers, // Guardamos las 4 respuestas abiertas
            updated_at: new Date()
          });
      }
      setPhase("story");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error:", error);
      setPhase("story");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCompleteModule = async () => {
    setIsSaving(true);
    try {
      await updateProgress("m4_closure");
      toast.success("¡Felicidades! Has completado el programa formativo.");
      goTo("/dashboard");
    } catch {
      goTo("/dashboard");
    } finally {
      setIsSaving(false);
    }
  };

  const storyPages = [
    (
      <div>
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Resolución
        </h1>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Fernanda tomó aire...
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Entré y sentí que todo iba rapidísimo. Nadie me explicó qué iban a hacer, y yo nomás asentía. Y hoy pienso: “¿por qué no pregunté?” Si pudiera volver, lo primero que diría sería:
          </p>
          <p>
            Valeria chasqueó la lengua, molesta.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Eso deberían decirlo ellos, no tener que pedirlo tú. 
          </p>
          <p>
            Fernanda siguió, con una risa nerviosa que no era risa.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Luego me apuraron: “ya cámbiate”. Yo traía pena y obedecí. Y ahora sé que se vale decir: “Voy a tomarme un momento. Necesito privacidad y tiempo; no continuaré con prisa.”
          </p>
          <p>
            Daniela se mordió el labio.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —¿Y te dieron bata o algo? 
          </p>
          <p>
            Fernanda negó.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Casi nada. Y yo me sentí súper expuesta. Neta, si esto le sirve a la Dani del
            futuro: se vale pedirlo así, tal cual:
            “Para continuar necesito una bata o sábana para cubrirme, por favor.” 
          </p>
          <p>
            Mariana asintió despacio.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Es básico. La privacidad no es un lujo.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Fernanda bajó la voz:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Y después… empezaron a tocar sin avisar. Ahí mi cuerpo se apagó. Me quedé congelada. Si pudiera volver, diría: “Espere. Quiero que me pregunte antes de tocarme y yo le confirmo cuando esté lista.”
          </p>
          <p>
            Daniela abrió los ojos, apretando el popote. 
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Qué horrible…
          </p>
          <p>
            Fernanda apretó la servilleta entre los dedos.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Y lo feo vino después. Salí y me dio vergüenza, como si yo hubiera hecho algo mal. También sentí culpa por no haber dicho nada. Me repetía: “¿por qué no me defendí?”
          </p>
          <p>
            Daniela la miró con empatía.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Fer… qué fuerte.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Mariana intervino, suave:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Eso que sentiste nos pasa a muchas. No es que te “faltara carácter”. A veces el cuerpo entra en modo supervivencia.
          </p>
          <p>
            Fernanda asintió, con los ojos brillosos.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Sí… pero igual siento que me quedé callada.
          </p>
          <p>
            Valeria se inclinó un poquito, como para aterrizar algo importante.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —Oye, pero espera… sí pusiste un límite, Fer. 
           <p>
            Fernanda parpadeó.
           </p>
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —¿Cómo?
          </p>
          <p>
            Valeria habló rápido, pero con cariño:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Porque tu cuerpo te estaba diciendo “no” y tú… sí lo escuchaste. Y aunque sea difícil verlo así, saliste de ahí. Y neta, sé que no fue nada fácil, pero lo hiciste. Para mí eso es de valientes. Tú eres una crack, Fer.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Fernanda bajó la mirada, como si le diera pena aceptarlo. Valeria sonrió:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Y te juro que te entiendo… a mí también me cuesta reconocer cuando pongo un límite. Porque toda la vida es como: “no seas conflictiva”, “no hagas show”, “aguántate”. Pero eso no es ser conflictiva. Eso es… respetarte. Es decir: “hasta aquí”. Y ya.
          </p>
          <p>
            Mariana asintió.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Exacto. A veces la defensa no se ve perfecta, pero se ve así: escucharte y parar.
          </p>
          <p>
            Fernanda respiró hondo, se sintió como si dejará ir un peso.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —Nunca lo había pensado así…
           <p>
            Daniela se quedó callada unos segundos, guardándose esa idea.
           </p>
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Me ayuda un montón escucharlo… aunque también me asusta. Valeria le apretó la mano.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Y también hay veces donde sí hablas desde el principio y… te cambia el sabor con el que sales.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —¿A ti te pasó? —preguntó Daniela. 
          </p>
          <p>
            Valeria asintió.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Sí. Me tocó una doctora medio seria, pero yo ya iba decidida a preguntar. Cuando me dijo cosas súper técnicas, yo le dije: “Necesito que me diga qué está viendo y qué significa en palabras claras.”
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —¿Y sí te explicó? —preguntó Daniela.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Sí. Y con eso mi ansiedad bajó un buen. Y luego, antes de que empezara cualquier cosa, pedí esto: “Necesito que me avise antes de tocarme y que me explique cada paso.” 
          </p>
          <p>
            Fernanda la miró con alivio.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
          —Eso ya cambia todo.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            Valeria siguió, con cara de “me temblaba por dentro, pero lo hice”: —Y hubo un comentario que no era necesario… como medio juicioso. Yo traía el corazón a mil, pero lo dije: “Ese comentario no es apropiado ni necesario para mi atención. Le pido que se enfoque en lo clínico.”
          </p>
          <p>
            Daniela soltó una risita nerviosa.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —¿No se enojó?
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Se quedó callada un segundo… y siguió más profesional. Y yo salí pensando: “Ok, fue incómodo, pero me cuidé”. No salí con culpa. Salí más tranquila.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Daniela bajó la vista a su vaso, como si acomodara algo por dentro.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Quiero eso… salir sintiendo que me elegí.
          </p>
          <p>
            Mariana tomó aire. Su tono cambió tantito: se notaba que esa historia era más pesada.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Y también existe la parte donde sí dices las cosas… y aun así no te respetan. Y ahí toca subir el límite de verdad.
          </p>
          <p>
            Daniela levantó la mirada.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
          —¿Te pasó?
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Sí —dijo Mariana—. Desde el inicio, cero privacidad. Entraban y salían como si nada. Yo dije: “Necesito que cierren la puerta y que nadie entre sin mi consentimiento.” 
          </p>
          <p>
            Fernanda frunció el ceño.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —Qué coraje… 
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           Mariana continuó: —Y ya en la exploración, me empezó a doler. Yo dije que parara. Lo dije claro varias veces. Pero no me hizo caso. Y ahí, Dani… ahí supe que mi límite era hasta aquí. Subí la voz, sin insultar, pero firme: “No vas a seguir. Me siento mal, no estoy a gusto. Esta consulta la vamos a terminar. Me retiro.”
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            La mesa se quedó en silencio un segundo, aunque el café siguiera con su ruido normal.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Me bajé de la camilla, me vestí temblando y me fui —remató Mariana—. Me dio miedo, sí. Pero también sentí alivio. Porque no me traicioné. 
          </p>
          <p>
            Valeria asintió fuerte.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Eso es autodefensa. Y también es una salida súper válida. 
          </p>
          <p>
            Fernanda miró a Daniela con cuidado.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
          —Y si en algún momento te sientes rebasada, también se vale decir algo como: “Me siento muy alterada. Voy a detener la consulta y la retomaré cuando me sienta lista.”
          </p>
          <p>
            Daniela sacó su celular y abrió las notas. Esta vez no le temblaban tanto los dedos.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            —Ok… entonces yo quiero llegar con frases listas. Así, como plan A, plan B. Las dijo bajito, como ensayo: —“Antes de iniciar, necesito que me explique qué va a hacer y por qué, paso por paso.” —“Necesito que me avise antes de tocarme y que me explique cada paso.” —Y si algo se siente mal: “Me siento muy alterada. Voy a detener la consulta y la retomaré cuando me sienta lista.” —Y si de plano no me respetan: “No vamos a seguir… esta consulta la vamos a terminar. Me retiro.” 
          </p>
          <p>
            Valeria sonrió.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —¡Eso!. No es ir a pelear. Es ir a cuidarte. 
          </p>
          <p>
            Fernanda la miró con ternura.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —Y si un día te congelas… tampoco te culpes. Pero qué bueno que hoy ya tienes un plan.
          </p>
          <p>
            Mariana levantó su vaso.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —Por tu cita… y porque tu voz también cuenta.
          </p>
          <p>
            —Por tu cita… y porque tu voz también cuenta.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           —Por mi voz. Y por saber que si algo se siente mal… tengo derecho de parar.
          </p>
        </div>
      </div>
    ),
    ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <UserNavbarWrapper />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          {phase === "questions" ? (
            <Card className="border-2 shadow-quirona">
              <CardContent className="p-8 md:p-12 space-y-8">
                <h1 className="text-3xl font-bold text-center text-primary">
                  Ahora regresemos con nuestras protagonistas
                </h1>
                <p className="text-center text-lg text-muted-foreground">
                  Regresamos a la conversación de Daniela y sus amigas. Pero antes,  contesta con calma. No hay respuestas “perfectas”: la idea es practicar cómo te cuidarías tú.
                </p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                     Si tú fueras Daniela, ¿Qué te preocuparia más: un diagnóstico… o cómo te van a tratar? ¿Por qué?
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
                      Si aparece vergüenza o miedo a “quedar mal”, ¿Qué frase interna crees que se activaría en ti? ¿Qué te gustaría responderte para cuidarte?
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
                      Si el personal empieza un examen ginecológico sin explicarte, ¿Qué dirías tú? (Escribe una frase concreta.)
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      value={answers.response_no_exp}
                      onChange={(e) => setAnswers({ ...answers, response_no_exp: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      Si sientes dolor y te dicen “es normal, aguántate”, ¿Qué harías tú? ¿Qué frase usarías?
                    </Label>
                    <Textarea
                      placeholder="Escribe tu respuesta aquí..."
                      value={answers.response_pain}
                      onChange={(e) => setAnswers({ ...answers, response_pain: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleFinishQuestions}
                    disabled={isSaving}
                    className="gradient-primary text-white px-8 py-6 text-lg"
                  >
                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : "Continuar"}
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
                      onClick={handleCompleteModule}
                      disabled={isSaving}
                      className="gradient-primary text-white px-8 py-6 text-lg"
                    >
                      {isSaving ? <Loader2 className="animate-spin mr-2" /> : "Finalizar módulo"}
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
export default Module4Closure;
