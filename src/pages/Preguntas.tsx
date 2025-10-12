import { Navbar } from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Preguntas = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-4">Preguntas frecuentes</h1>
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

export default Preguntas;
