import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Flower2 } from "lucide-react";
import logo from "../assets/logo.jpeg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";

const carouselItems = [
  {
    title: "Ginecología Preventiva",
    description: "Aprende sobre la importancia de las consultas preventivas y el autocuidado ginecológico para mantener tu salud.",
    icon: "💜",
  },
  {
    title: "Salud Sexual",
    description: "Información clara y confiable sobre salud sexual, métodos anticonceptivos y prevención de enfermedades.",
    icon: "🌸",
  },
  {
    title: "Bienestar Emocional",
    description: "Tu salud mental es importante. Descubre herramientas para cuidar tu bienestar emocional.",
    icon: "🧡",
  },
  {
    title: "Autocuidado",
    description: "Conoce prácticas de autocuidado que te ayudarán a mantener una vida saludable y equilibrada.",
    icon: "✨",
  },
  {
    title: "Derechos Reproductivos",
    description: "Conoce tus derechos en salud reproductiva y cómo ejercerlos de manera informada.",
    icon: "🦋",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Sección de Bienvenida */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Bienvenida a Quirona
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un espacio dedicado al bienestar, la educación y el empoderamiento de las mujeres. 
            Aquí encontrarás información confiable sobre salud ginecológica, derechos reproductivos 
            y herramientas para tomar decisiones informadas sobre tu cuerpo y tu salud.
          </p>
        </div>
      </section>

      {/* Carrusel Informativo */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="border-2 hover:shadow-quirona transition-all">
                      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[280px]">
                        <div className="text-6xl mb-4">{item.icon}</div>
                        <h3 className="text-2xl font-bold mb-3 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {item.title}
                        </h3>
                        <p className="text-center text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex gap-4 justify-center">
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
      </section>

      {/* Sección Instituciones Colaboradoras */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <img src={logo} alt="Quirona Logo" className="h-24 w-auto" />
            <p className="text-lg text-center md:text-left">
              <span className="font-semibold">Cuenta con el respaldo y colaboración de investigadoras e investigadores de las siguientes instituciones.</span>
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
              {[
                { id: 1, src: '/src/assets/escudoESCOM.png', alt: 'Institución 1' },
                { id: 2, src: '/src/assets/IPN-LOGO.png', alt: 'Institución 2' },
                { id: 3, src: '/src/assets/labpsit.png', alt: 'Institución 3' },
                { id: 4, src: '/src/assets/suayedlogo.png', alt: 'Institución 4' },
                { id: 5, src: '/src/assets/unamlogo.png', alt: 'Institución 5' },
              ].map((inst) => (
                <div
                  key={inst.id}
                  className="aspect-square bg-white rounded-lg shadow-md flex items-center justify-center p-4 hover:shadow-quirona transition-all"
                >
                  <img
                    src={inst.src}
                    alt={inst.alt}
                    className="w-24 h-24 object-contain"
                  />
                </div>
              ))}
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
