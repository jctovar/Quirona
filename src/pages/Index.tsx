import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import escudoESCOM from "../assets/escudoESCOM.png";
import ipnLogo from "../assets/IPN-Logo.png";
import labpsit from "../assets/labpsit.png";
import suayedlogo from "../assets/suayedlogo.png";
import unamlogo from "../assets/unamlogo.png";
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
    title: "Nueva actualización",
    description: "Hemos añadido nuevos módulos sobre salud ginecológica preventiva para todas las usuarias.",
    icon: "🆕",
  },
  {
    title: "Próximo webinar",
    description: "Únete a nuestro próximo webinar sobre derechos reproductivos el próximo mes.",
    icon: "📅",
  },
  {
    title: "Nuevos recursos",
    description: "Explora nuestra nueva biblioteca de recursos sobre violencia obstétrica.",
    icon: "📚",
  },
  {
    title: "Comunidad activa",
    description: "Más de 500 profesionales de la salud se han unido a nuestra plataforma.",
    icon: "👩‍⚕️",
  },
  {
    title: "Investigación",
    description: "Publicamos nuevos hallazgos sobre prevención de violencia ginecológica.",
    icon: "🔬",
  },
];

const institutions = [
  { id: 1, src: escudoESCOM, alt: 'ESCOM' },
  { id: 2, src: ipnLogo, alt: 'IPN' },
  { id: 3, src: labpsit, alt: 'LABPSIT' },
  { id: 4, src: suayedlogo, alt: 'SUAYED' },
  { id: 5, src: unamlogo, alt: 'UNAM' },
];

const scrollToVideo = () => {
  const videoSection = document.getElementById('video-section');
  if (videoSection) {
    videoSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Carrusel de actualizaciones - debajo del header */}
      <section className="pt-44 md:pt-48 pb-8 px-4 bg-muted/30">
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
                    <Card className="border-2 border-primary/20 hover:shadow-quirona transition-all">
                      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[200px]">
                        <div className="text-5xl mb-3">{item.icon}</div>
                        <h3 className="text-xl font-bold mb-2 text-center text-primary">
                          {item.title}
                        </h3>
                        <p className="text-center text-muted-foreground text-sm">
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

      {/* Sección de Bienvenida Principal */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Te damos la bienvenida a Quirona UNAM
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Esta plataforma está diseñada para que mujeres y profesionales de la salud, así como población general, 
              participen en la prevención y atención a la violencia ginecológica, así como de la violencia obstétrica 
              a través de diversas tecnologías.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <Button size="lg" className="gradient-primary text-lg px-8 transition-quirona hover:opacity-90 w-full sm:w-auto">
                  Comenzar ahora
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 border-primary text-primary hover:bg-primary/10"
                onClick={scrollToVideo}
              >
                Conoce más
              </Button>
            </div>
          </div>

          {/* Texto adicional */}
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Quirona UNAM es el puente que usa la tecnología y la ciencia para abrir conversaciones necesarias 
              con parteras, dulas, mujeres, ginecólogos, obstetras y todos los profesionales de la salud. 
              Es un espacio para cuidarnos, para crecer juntos, para encontrar, incluso, lugares donde poder llorar 
              y entender que llorar no es malo. Al contrario, es humano y necesario.
            </p>
          </div>

          {/* Espacio para video del proyecto */}
          <div id="video-section" className="max-w-4xl mx-auto">
            <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-muted-foreground text-lg font-medium">Video del proyecto</p>
                <p className="text-muted-foreground text-sm">(Espacio reservado para el video)</p>
              </div>
            </div>
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
            {institutions.map((inst) => (
              <div
                key={inst.id}
                className="aspect-square bg-background rounded-lg shadow-md flex items-center justify-center p-4 hover:shadow-quirona transition-all"
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
      <footer className="py-12 px-4 border-t bg-muted/20">
        <div className="container mx-auto">
          {/* Dirección */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Av. de los Barrios No. 1, Los Reyes Iztacala, Tlalnepantla de Baz. Méx. 54090
            </p>
          </div>

          {/* Enlaces */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="#" className="text-primary hover:underline font-medium">
              Aviso de privacidad
            </a>
            <a href="#" className="text-primary hover:underline font-medium">
              ¿Tienes dudas?
            </a>
            <a href="#" className="text-primary hover:underline font-medium">
              Redes sociales
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 QUIRONA UNAM. Educación en salud ginecológica.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
