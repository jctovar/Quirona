import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Award } from "lucide-react";

const Trabajos = () => {
  const trabajosEjemplo = [
    {
      title: "Ejemplo de trabajo 1",
      description: "Este espacio se llenará con proyectos y diseños realizados por otras personas.",
      icon: FileText,
    },
    {
      title: "Ejemplo de trabajo 2",
      description: "Este espacio se llenará con proyectos y diseños realizados por otras personas.",
      icon: Users,
    },
    {
      title: "Ejemplo de trabajo 3",
      description: "Este espacio se llenará con proyectos y diseños realizados por otras personas.",
      icon: Award,
    },
    {
      title: "Ejemplo de trabajo 4",
      description: "Este espacio se llenará con proyectos y diseños realizados por otras personas.",
      icon: FileText,
    },
    {
      title: "Ejemplo de trabajo 5",
      description: "Este espacio se llenará con proyectos y diseños realizados por otras personas.",
      icon: Users,
    },
    {
      title: "Ejemplo de trabajo 6",
      description: "Este espacio se llenará con proyectos y diseños realizados por otras personas.",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trabajos
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explora proyectos y diseños realizados por nuestra comunidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trabajosEjemplo.map((trabajo, index) => (
              <Card key={index} className="hover:shadow-quirona transition-all">
                <CardHeader>
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mb-4">
                    <trabajo.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{trabajo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {trabajo.description}
                  </CardDescription>
                  <div className="mt-4 h-32 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">Imagen o contenido</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

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

export default Trabajos;
