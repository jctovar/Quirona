import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpen, PlayCircle } from "lucide-react";

const PreEducation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="shadow-quirona border-2">
            <CardHeader className="text-center">
              <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold">Preparación inicial</CardTitle>
              <CardDescription className="text-base">
                Información importante antes de tu primera consulta ginecológica
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <PlayCircle className="w-20 h-20 mx-auto text-primary" />
                  <p className="text-muted-foreground font-medium">
                    Video: Preparándote para tu primera consulta ginecológica
                  </p>
                  <p className="text-sm text-muted-foreground">(Material educativo preparatorio)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-muted/50 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm">1</span>
                    ¿Qué es una consulta ginecológica?
                  </h3>
                  <p className="text-muted-foreground">
                    Es una cita médica especializada para cuidar tu salud reproductiva y prevenir 
                    enfermedades. Es un espacio seguro donde puedes hacer preguntas sobre tu cuerpo.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm">2</span>
                    ¿Cuándo deberías tener tu primera consulta?
                  </h3>
                  <p className="text-muted-foreground">
                    Se recomienda la primera consulta ginecológica entre los 13 y 15 años, o cuando 
                    comiences tu vida sexual activa. No hay edad "incorrecta" para cuidar tu salud.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm">3</span>
                    ¿Qué puedes esperar en la consulta?
                  </h3>
                  <p className="text-muted-foreground">
                    Una conversación respetuosa, un examen físico solo si es necesario y siempre con 
                    tu consentimiento, y orientación sobre salud reproductiva y prevención.
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => navigate("/initial-test")}
                className="w-full gradient-primary transition-quirona hover:opacity-90"
                size="lg"
              >
                Continuar al test inicial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PreEducation;
