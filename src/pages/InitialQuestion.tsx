import { Navbar } from "@/components/Navbar";
import { TestMenu } from "@/components/TestMenu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";

const InitialQuestion = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);

  const handleAnswer = (hasExperience: boolean) => {
    if (hasExperience) {
      navigate("/initial-test");
    } else {
      navigate("/pre-education");
    }
  };

  if (showMenu) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Navbar isAuthenticated />
        <TestMenu onStart={() => setShowMenu(false)} />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      
      <div className="pt-96 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-quirona border-2">
            <CardHeader className="text-center">
              <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤔</span>
              </div>
              <CardTitle className="text-3xl font-bold">Una pregunta importante</CardTitle>
              <CardDescription className="text-base">
                Para personalizar tu experiencia de aprendizaje
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-muted/50 rounded-xl">
                <p className="text-xl font-semibold mb-2">
                  ¿Has tenido alguna experiencia con una consulta ginecológica?
                </p>
                <p className="text-muted-foreground">
                  Tu respuesta nos ayudará a ofrecerte el contenido más adecuado para ti
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={() => handleAnswer(true)}
                  variant="outline"
                  className="h-auto py-8 flex-col gap-4 hover:border-primary hover:bg-primary/5 transition-quirona"
                  size="lg"
                >
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                  <div>
                    <div className="font-bold text-lg">Sí, he tenido</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      Comenzar con evaluación inicial
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleAnswer(false)}
                  variant="outline"
                  className="h-auto py-8 flex-col gap-4 hover:border-secondary hover:bg-secondary/5 transition-quirona"
                  size="lg"
                >
                  <XCircle className="w-12 h-12 text-secondary" />
                  <div>
                    <div className="font-bold text-lg">No, aún no</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      Ver contenido preparatorio
                    </div>
                  </div>
                </Button>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                No hay respuestas correctas o incorrectas, ambas opciones son válidas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InitialQuestion;
