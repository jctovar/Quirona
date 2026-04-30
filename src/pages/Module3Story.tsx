import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { updateProgress } from "@/lib/progressHelper";

const Module3Story = () => {
  const navigate = useNavigate();
  const [showQuestions, setShowQuestions] = useState(false);
  const [page, setPage] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // user preferences for accessibility
  const [fontSizeClass, setFontSizeClass] = useState("text-base");

  const pages = [
    (
      <div>
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Cristina
        </h1>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Paciente Cristina… paciente Cristina
          </p>
          <p>
            La asistente del ginecólogo se asoma sobre el escritorio en el que está tomando notas. Cristina se levanta de su asiento en la sala de espera. Está acompañada de su mamá quién está algo adormilada después de esperar 40 minutos para ser atendidas.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – Mamá, ya me toca.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – ¡Por fin! Vamos hija.
          </p>
          <p>
            Las dos se acercan al escritorio. La asistente confirma su nombre y edad, le pide que se siente en una silla al lado de ella para tomar sus signos vitales. Su mamá le sonríe, mientras ella regresa la sonrisa con algo de nerviosismo. No es su primera vez en una revisión ginecológica, sin embargo, el doctor que le atendía se encuentra en otro estado de la República. El día de hoy están en la consulta del recomendado por su anterior ginecólogo buscando respuesta al dolor menstrual que tiene desde hace meses.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           – Pasa con el doctor– le indica la asistente.
          </p> 
          <p>
            La mamá de Cristina junto con ella se pone en marcha, la asistente le llama la atención a Cristina.
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           – Tienes que pasar sola. Ya eres mayor de edad. 
          </p>
          <p>
            Por un momento Cristina y su mamá se quedan viendo, no saben bien qué decir. Cristina siente un poco de ansiedad e inseguridad, preferiría que su mamá entre con ella, pero considera que es cierto 
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            – "Ya estoy grande, y qué pena si mi mamá escucha lo que hice en el viaje". 
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
           Le dice a su mamá que está bien, que ella pasa sola. Su mamá asiente, aunque no queda del todo convencida, no recuerda claramente sus visitas anteriores, y no está segura si puede acompañar a su hija.  
          </p>
          <p>
           El consultorio es un espacio pequeño con lo suficiente para moverse, aunque Cristina siente que hay menos luz de lo que debería. El doctor se presenta rápidamente y le pide que tome asiento. Empieza una serie de preguntas para su historia clínica. No voltea la mirada a Cristina, mantiene sus ojos en el monitor de la computadora.
          </p>
          <p>
          Cristina piensa <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">– "Seguro debe concentrarse en escribir lo que le digo ¿o no querrá verme?".</p>
          </p> 
          <p>
            Las preguntas sobre el inicio de su vida sexual, el número de parejas, y su orientación sexual son formuladas con frialdad. Cristina percibe una clara mueca de desaprobación cuando responde el número de parejas sexuales en su vida. Una emoción súbita de incomodidad se le clava en el pecho y el cuello.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           – "¿Por mi edad esperaba que fuera virgen? pero bueno, supongo que es mejor que le de el dato real ¿o no?
          </p> 
          <p>
            Después de algunas preguntas, el doctor le pide que le comente por qué vino el día de hoy a la consulta. Cristina empieza a narrar lo que ella considera importante para entender su malestar, su tono al hablar es nervioso pero con ánimo de compartir lo que ha pasado en los últimos meses:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           – El año pasado fui de vacaciones a Oaxaca, llegué sintiéndome bien y preparada para mucho esfuerzo físico, porque fuimos de excursión de escalada. Empezó mi periodo como tenía contemplado, he sido regular por muchos años, pero al segundo día empezó a ser más doloroso. Estuve así durante una semana, y pues participé en las excursiones, y me sentí muy bien con ánimo, aunque traía mucha molestia física. Y ya regresando a mi casa le comente a una amiga que...
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
            –¡Pero a ver, en concreto ¿Qué es lo que te duele?! </p><p>El médico hace un aspaviento con algo de frustración, pidiéndole que sea concreta. Cristina se guarda sus palabras, siente un bajón de ánimo al cortar su narración, pero prefiere ir al punto.
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           – "Mejor no le doy muchas vueltas".
          </p> 
          <p>
            Señala su abdomen y contesta que antes su periodo no dolía tanto.
            El doctor le señala el espacio para cambiarse, y le indica que tiene que quitarse la ropa de la cintura hacia abajo y ponerse la bata con la abertura hacia atrás.
          </p>
          <p>
            El espacio para cambiarse está en la esquina con una cortina delgada. Cristina pasa detrás de ésta y se da cuenta que no cierra del todo. Tímidamente pero con una sonrisa comenta:
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           – "¿No cierra bien verdad?
          </p>
        </div>
      </div>
    ),
    (
      <div>
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            El doctor responde con sarcasmo
          </p>
          <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
           – "Te voy a ver de todos modos ¿sí? por favor, apúrate y pasa a la cama de exploración".
          </p> 
          <p>
            Cristina siente una profunda incredulidad, quedándose muda al no saber cómo interpretar lo que escucho.
          </p>
          <p>
            El doctor le avisa a Cristina que tiene que hacer un examen pélvico. Cristina siente un espasmo en su estómago, se siente intimidada y se guarda las ganas de decir algo. El ánimo que traía ya no está. En su cabeza se repite el pensamiento "no pasa nada", pero el miedo no se va.
          </p>
        </div>
      </div>
    ),
  ];

  const handleContinue = async () => {
    if (showQuestions) {
      setIsSaving(true);
      try {
        // Marcamos m3_story en la base de datos
        await updateProgress("m3_story");
        navigate("/module-3-intro");
      } catch (error) {
        console.error("Error al guardar progreso:", error);
        navigate("/module-3-intro");
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (page < pages.length - 1) {
      setPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowQuestions(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />

      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3x2">
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              {/* accessibility controls */}
              {!showQuestions && (
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
              )}
              {!showQuestions ? (
                <div className={`prose prose-lg max-w-none ${fontSizeClass}`}>
                  <div key={page} className="transition-transform duration-300">
                    {pages[page]}
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
                        onClick={() => setPage((p) => Math.min(p + 1, pages.length - 1))}
                        disabled={page === pages.length - 1}
                      >
                        Siguiente
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Página {page + 1} / {pages.length}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`text-center space-y-8 ${fontSizeClass}`}>
                  <h2 className="text-2xl font-bold text-primary">
                    Preguntas reflexivas:
                  </h2>

                  <div className="space-y-6 text-lg">
                    <p className="text-foreground">En éste momento, ¿la incomodidad, el miedo y la incredulidad que siente Cristina son su responsabilidad por ser demasiado sensible?</p>

                    <p className="text-foreground font-semibold text-primary">¿Es responsabilidad del ginecólogo o la ginecóloga que la atiende que ella esté sintiéndose así?</p>

                  </div>
                </div>
              )}

              {((page === pages.length - 1) || showQuestions) && (
                <div className="flex justify-center mt-10">
                  <Button 
                    onClick={handleContinue} 
                    disabled={isSaving}
                    className="gradient-primary text-white px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
                  >
                    {isSaving ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : null}
                    {showQuestions ? "Continuar a la siguiente sección" : "Ver reflexiones"}
                    {!isSaving && <ArrowRight className="ml-2 w-6 h-6" />}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Module3Story;
