import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Conoce tus derechos en salud ginecológica
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Una plataforma educativa diseñada para empoderarte con información sobre 
                violencia ginecológica y estándares de atención en salud.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="gradient-primary text-lg px-8 transition-quirona hover:opacity-90">
                    Comenzar ahora
                  </Button>
                </Link>
                <Link to="/quienes-somos">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Conocer más
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-full aspect-square max-w-md mx-auto gradient-hero rounded-3xl shadow-quirona flex items-center justify-center">
                <Heart className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default Index;
