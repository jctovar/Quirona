import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Module1Story = () => {
  const navigate = useNavigate();
  const [showQuestions, setShowQuestions] = useState(false);

  const handleContinue = () => {
    if (!showQuestions) {
      setShowQuestions(true);
    } else {
      // Navigate to the next section (placeholder for now)
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              {!showQuestions ? (
                <div className="prose prose-lg max-w-none">
                  <h1 className="text-3xl font-bold text-center mb-8 text-primary">
                    Ximena y su hermana Sofía
                  </h1>
                  
                  <div className="space-y-6 text-foreground leading-relaxed">
                    <p>
                      Ximena está preocupada, no se siente tan nerviosa desde hace mucho tiempo, ni cuando tuvo que hablar en frente de toda la escuela el año pasado. Le sudan las manos, y esta piense y piense en lo que le comentó su prima Rosanna.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – Ay no Ximena, a mi me fue bien mal, vas a tener que aguantarte que te examinen "ahí", a mi me dolió un montón.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – Mejor ni hubiera dicho nada, a lo mejor solo es un dolor de estómago.
                    </p>
                    
                    <p>
                      Ximena le comentó a su mamá que su periodo estaba llegando de manera irregular y con mucho dolor. Pensó que le iba a dar un tecito, pero en vez de eso, le puso unos trapos tibios para ver si así mejoraba, pero no le quitaron el dolor. Le hablo a Sofía, su hermana mayor, y le contó cómo se sentía.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – Ayer me sentí bien, ni me quise parar, creo que hasta pálida me puse.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – ¡Ay hermana! ya te hubiera llevado yo al ginecólogo.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – ¿¡Al ginecólogo!? ¿pero por qué o qué?
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – Pues para que te revise bien y vea por qué te duele.
                    </p>
                    
                    <p>
                      Al principio solo se quedó con duda, pero Ximena confía mucho en su hermana, ella estudia psicología en la UNAM y habla con muchos médicos y enfermeras que estudian con ella.
                    </p>
                    
                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-primary">
                      Se acerca la hora de la consulta.
                    </h2>
                    
                    <p>
                      Ximena siente una opresión en el pecho, empeoro la sensación de nervios cuando busco en internet "¿Que esperar en tu primera consulta ginecológica?" y leyó en una red social que tienen que introducir en su vulva un especulo o pato, que el médico le va a hacer varias preguntas sobre su sexualidad.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – ¡Pero si no tengo novio... o novia!
                    </p>
                    
                    <p>
                      Siente que el estómago se le sube al pecho y le empiezan a dar nauseas. Piensa en decirle a su hermana que mejor se queda en casa y se sigue poniendo los trapos de agua tibia. Y esperar a que se le pase.
                    </p>
                    
                    <p>
                      Antes de practicar su discurso, escucha a su hermana llegar.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – ¡Ya llegue Xime! ya vámonos.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – Hermana, oye, ¿y si mejor no vamos? Por favor.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – ¿Pero qué o por qué?
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – No quiero que me revisen ahorita, yo creo que me va a doler mucho.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – Xime, pero no, no te asustes ¿por qué dices eso? solo vamos a consulta.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – ¡No quiero! ¡me da mucho miedo! Tengo miedo que otra persona me vea desnuda y que me toque, mejor no vamos. Perdón por hacerte dar la vuelta.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – ¿¡Quién te dijo que te van a ver desnuda!?
                    </p>
                    
                    <p>
                      Sofía se aguanta un poco la risa, pero le enternece que su hermana está asustada y no quiere que le tenga miedo a la visita ginecológica.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – Vente, vamos por un helado, no vamos a ir hoy, quiero primero platicar contigo un montón de cosas. Me hiciste recordar que yo también me sentí así. Ven, un abrazo.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – Gracias hermana, perdón en serio.
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – No te preocupes, primero comemos algo rico, ¿vale?
                    </p>
                    
                    <p className="italic text-muted-foreground pl-4 border-l-4 border-primary/30">
                      – Vale, muchas gracias.
                    </p>
                    
                    <p>
                      Sofia, suelto un suspiro largo y pesado, se acuerda de tantas cosas que hubiera querido saber y sentirse más tranquila.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-8">
                  <h2 className="text-2xl font-bold text-primary">
                    Preguntas reflexivas:
                  </h2>
                  
                  <div className="space-y-6 text-lg">
                    <p className="text-foreground">
                      ¿De qué crees que van a hablar Sofía y Ximena?
                    </p>
                    
                    <p className="text-foreground">
                      ¿Qué será eso que le hubiera gustado saber a Sofía antes?
                    </p>
                    
                    <p className="text-foreground font-semibold text-primary">
                      ¿Tú qué piensas?
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center mt-10">
                <Button 
                  onClick={handleContinue}
                  className="gradient-primary text-white px-8 py-6 text-lg"
                >
                  {showQuestions ? "Continuar a la siguiente sección" : "Continuar"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Module1Story;
