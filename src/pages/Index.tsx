import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { BookOpen, Heart, Shield, Users } from "lucide-react";

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
                <a href="#quienes-somos">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Conocer más
                  </Button>
                </a>
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

      {/* Quiénes somos */}
      <section id="quienes-somos" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Quiénes somos</h2>
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

      {/* Contenidos */}
      <section id="contenidos" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Nuestros contenidos</h2>
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

      {/* Preguntas frecuentes */}
      <section id="preguntas" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-4">Preguntas frecuentes</h2>
          <p className="text-center text-muted-foreground mb-12">
            Resolvemos las dudas más comunes sobre nuestra plataforma
          </p>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Qué es QUIRONA?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                QUIRONA es una plataforma educativa digital diseñada para adolescentes que 
                proporciona información sobre violencia ginecológica, estándares de atención 
                en salud y derechos en la atención médica.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Por qué necesito correos de tutores para registrarme?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Los correos de tutores son importantes para mantenerlos informados sobre tu 
                participación en la plataforma y garantizar un acompañamiento responsable en tu 
                proceso de aprendizaje sobre salud ginecológica.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Qué encontraré en los módulos educativos?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Los módulos incluyen videos educativos, lecturas, actividades interactivas y 
                evaluaciones sobre temas como ginecología preventiva, estándares de atención, 
                violencia ginecológica y cómo responder ante ella.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Es segura mi información personal?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sí, toda tu información personal está protegida y se maneja con total 
                confidencialidad. Solo se utiliza para mejorar tu experiencia educativa en la 
                plataforma.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Puedo acceder a la plataforma desde mi celular?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sí, QUIRONA está diseñada para funcionar perfectamente en celulares, tabletas y 
                computadoras, permitiéndote aprender desde cualquier dispositivo.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
