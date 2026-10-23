import { getErrorMessage } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { TestMenu } from "@/components/TestMenu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/supabaseClient"; 
import { toast } from "sonner"; 

const InitialQuestion = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false); // Estado para el bloqueo

  const handleAnswer = async (hasExperience: boolean) => {
    setIsUpdating(true); // Empezamos a cargar

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ has_experience: hasExperience })
          .eq('id', user.id);

        if (error) throw error;
      }

      if (hasExperience) {
        navigate("/initial-test");
      } else {
        navigate("/pre-education");
      }
    } catch (error) {
      toast.error("Error al guardar: " + getErrorMessage(error));
    } finally {
      setIsUpdating(false); // Terminamos de cargar (pase lo que pase)
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
      
      <div className="pt-48 pb-16 px-4">
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
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* BOTÓN SÍ: Aquí agregamos el disabled */}
                <Button
                  onClick={() => handleAnswer(true)}
                  disabled={isUpdating} 
                  variant="outline"
                  className="h-auto py-8 flex-col gap-4 hover:border-primary hover:bg-primary/5 transition-quirona"
                  size="lg"
                >
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                  <div>
                    <div className="font-bold text-lg">Sí, he tenido</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      {isUpdating ? "Guardando..." : "Comenzar con evaluación inicial"}
                    </div>
                  </div>
                </Button>

                {/* BOTÓN NO: Aquí también */}
                <Button
                  onClick={() => handleAnswer(false)}
                  disabled={isUpdating}
                  variant="outline"
                  className="h-auto py-8 flex-col gap-4 hover:border-secondary hover:bg-secondary/5 transition-quirona"
                  size="lg"
                >
                  <XCircle className="w-12 h-12 text-secondary" />
                  <div>
                    <div className="font-bold text-lg">No, aún no</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      {isUpdating ? "Guardando..." : "Ver contenido preparatorio"}
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InitialQuestion;