import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart, Shield, Users } from "lucide-react";

const Contenidos = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Nuestros contenidos</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explora nuestros módulos educativos diseñados especialmente para ti
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary transition-quirona hover:shadow-quirona">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Introducción a la ginecología preventiva</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conceptos básicos sobre salud ginecológica y la importancia de la prevención.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-quirona hover:shadow-quirona">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Estándares de atención</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conoce qué esperar de una consulta ginecológica de calidad y respetuosa.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-quirona hover:shadow-quirona">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Violencia ginecológica</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Identifica situaciones de violencia ginecológica y aprende a reconocer tus derechos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-quirona hover:shadow-quirona">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Respuestas ante la violencia</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Recursos y acciones que puedes tomar si experimentas violencia ginecológica.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 QUIRONA. Educación en salud ginecológica para adolescentes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contenidos;
