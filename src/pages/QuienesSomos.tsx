import { Navbar } from "@/components/Navbar";
import { Users } from "lucide-react";

const QuienesSomos = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Quiénes somos</h1>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-full aspect-square gradient-secondary rounded-2xl shadow-quirona flex items-center justify-center">
                  <Users className="w-24 h-24 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  QUIRONA es una plataforma educativa creada con el propósito de empoderar a 
                  mujeres adolescentes con información clara y accesible sobre sus derechos en 
                  la atención ginecológica. Nuestro objetivo es prevenir la violencia ginecológica 
                  mediante la educación, brindando herramientas para reconocer prácticas inadecuadas 
                  y promover una atención de calidad basada en el respeto y la dignidad.
                </p>
              </div>
            </div>
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

export default QuienesSomos;
