import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import unamlogo from "@/assets/unamlogo.png";
import suayedlogo from "@/assets/suayedlogo.png";
import labpsit from "@/assets/labpsit.png";
import ipnLogo from "@/assets/IPN-Logo.png";
import escudoESCOM from "@/assets/escudoESCOM.png";

const teamMembers = [
  { name: "Mtro. Javier Dario Ríos Castillo" },
  { name: "Dra. Lorena Alejandra Flores Plata" },
  { name: "Lic. Samantha Rossenbaum" },
  { name: "Dr. Jose Alfredo Jiménez Benitez" },
  { name: "Lic. Nazli Dhanae Leyva Ortiz" },
  { name: "Lic. Luz Mireya García García" },
  { name: "Lic. Emilio Arturo Fonseca Sánchez" },
];

const institutions = [
  { id: 1, src: unamlogo, alt: "UNAM" },
  { id: 2, src: suayedlogo, alt: "SUAyED" },
  { id: 3, src: labpsit, alt: "LabPsit" },
  { id: 4, src: ipnLogo, alt: "IPN" },
  { id: 5, src: escudoESCOM, alt: "ESCOM" },
];

const QuienesSomos = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Navigation Buttons */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => scrollToSection("mision")}
              variant="outline"
              className="px-8 py-3 text-lg font-semibold border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Misión
            </Button>
            <Button 
              onClick={() => scrollToSection("vision")}
              variant="outline"
              className="px-8 py-3 text-lg font-semibold border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Visión
            </Button>
            <Button 
              onClick={() => scrollToSection("enfoque")}
              variant="outline"
              className="px-8 py-3 text-lg font-semibold border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Enfoque
            </Button>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
              Quirona UNAM: Donde la herida se convierte en luz.
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
              <p>
                Todo comenzó con una quietud incómoda, con una verdad que susurraba en las conversaciones cotidianas. Amigas, compañera y seres queridos comenzaron a transitar el camino de la maternidad. Si bien los relatos llenos de alegría no faltaban, también empecé a escucharon coro de voces que hablaban de vulnerabilidad, de miedo, de una angustia profunda durante su atención ginecológica y obstétrica. Eran historias fragmentadas, pero con un eco demasiado familiar.
              </p>
              
              <p>
                El punto de quiebre, el momento que encendió una chispa en mi conciencia, fue la experiencia de una compañera muy cercana. En una institución pública, no solo perdió a su hijo, sino que también enfrentó una histerectomía, un duelo sobre otro duelo. Escuchar su relato, y el de su pareja, fue como presenciar una herida abierta en el alma. Fue una experiencia que genuinamente resonó en lo más hondo de mi ser. Ya no podía ni quería ser un espectador. Con una pregunta empece a buscar los senderos de este camino ¿por qué? ¿por qué a tantas mujeres?
              </p>
              
              <p>
                Decidí escuchar con mayor atención e intención. Empecé a hablar, a abrir diálogos, y descubrí con estremecimiento que esto no era una excepción, sino una regla silenciosa. Al volver la mirada hacia mi propia familia, me di cuenta de que mi madre y mi hermana también habían cargado con el peso de este maltrato en momentos que deberían haber sido de apoyo y cuidado. Eran momentos donde intensas emociones humanas se entrelazan: la esperanza, el miedo, el dolor, el anhelo de que todo salga bien.
              </p>
              
              <p>
                Al adentrarme en la investigación, descubrí la amplitud escalofriante del problema y, a la vez, la esperanza: había otros profesionales, investigadores maravillosos, empezando a abordar este tema. Supe entonces que no podía permitir que todo este dolor simplemente entrara al mundo y se quedara ahí, sin sanar, sin contención. Algo dentro de mí gritaba: "¡Basta!". Este dolor que quita el aire, que resuena en tu centro y te hace pensar que no puede haber tanto sufrimiento en el mundo… tenía que poner un dique. Tenía que hacer algo para evitar que más dolor ingresara, en un mundo que ya de por sí lleva demasiado.
              </p>
              
              <p>
                Fue en una conversación con la doctora Lorena Flores Plata donde todo cobró sentido y nombre: le compartí mi fascinación por el mito de Quirón, el sanador de la mitología griega, maestro de Aquiles y experto en artes curativas. Quirón, el sabio centauro que fue herido por una flecha envenenada. Al ser un semidiós inmortal, no podía morir, pero tampoco podía dejar de sufrir. Fue esa herida eterna la que forjó en él una convicción profunda: aliviar el sufrimiento de los demás. A pesar de su propio dolor, su propósito era evitar el de otros.
              </p>
              
              <p>
                En ese momento atrapamos algo de la esencia que une a tantos y tantas terapeutas, psicólogas y profesionales de la salud: la capacidad de transformar nuestro propio dolor, o el dolor que presenciamos, en un motor de compasión y acción. Es la idea de que el dolor, por muy desgarrador que sea, también es un motor que nos impulsa a cuidar, a mejorar, a construir una comunidad más grande y más solidaria. Parecía que el poeta persa Rumi nos hablo a través de los siglos con su sabiduría: "La herida es por donde la luz entra en tí".
              </p>
              
              <p>
                Cómo profesionales de la salud, rechazamos la idea fría de que debemos ser meros "ecos" impersonales del sufrimiento ajeno protegidos por una barrera emocional que, desde quién nos relata su historia, puede sentirse como falta de respeto a las emociones de quien confía en nosotros. Al contrario, queremos ser un refugio, un lugar donde las experiencias se escuchen, se tallen en la memoria colectiva como los cuentos de nuestros ancestros en las paredes de una cueva o en un papiro sagrado.
              </p>
              
              <p>
                Después de esta reflexión, expresé una última inquietud: no me sentía cómodo con que un proyecto dirigido a mujeres estuviera representado por una figura masculina como Quirón. La respuesta de la Dra. Lorena fue simple, brillante y directa: "¿Y por qué no le pones Quirona? Solo le cambiamos una letra. Una 'A' al final".
              </p>
              
              <p>
                Ese pequeño cambio lo acomodo todo para mí: se trataba de honrar las sensibilidades, de adaptar el conocimiento sin abandonar su esencia, de hacerlo nuestro. No importa si hay que pintarlo de violeta o añadirle una 'A'; lo crucial es salvar el propósito. Quirona UNAM nació así: como un proyecto que quiere ser una respuesta de corazón a corazón, de sistema nervioso a sistema nervioso.
              </p>
              
              <p>
                Quirona UNAM existe para recordarnos que, a veces, es a través de nuestras heridas más profundas que encontramos la fuerza para iluminar el camino de los demás. Y en ese acto, todos sanamos.
              </p>
              
              <p className="text-right font-semibold mt-8">
                Javier D. Ríos Castillo, Octubre 2025.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Nuestro Equipo</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.slice(0, 3).map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-primary/50" />
                  </div>
                  <p className="text-center font-medium text-foreground">{member.name}</p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {teamMembers.slice(3, 6).map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-primary/50" />
                  </div>
                  <p className="text-center font-medium text-foreground">{member.name}</p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 justify-items-center">
              <div className="md:col-start-2">
                {teamMembers.slice(6).map((member, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                      <User className="w-16 h-16 text-primary/50" />
                    </div>
                    <p className="text-center font-medium text-foreground">{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión Section */}
      <section id="mision" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Misión</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Desarrollar estrategias psicoeducativas para la prevención de la violencia ginecológica y obstétrica que con base en la integración de investigación científica y conocimientos comunitarios, que apunten a proteger la integridad física y emocional de las mujeres mexicanas.
            </p>
          </div>
        </div>
      </section>

      {/* Visión Section */}
      <section id="vision" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Visión</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-8">
              Ser referentes nacionales e internacionales en la capacitación y prevención de la violencia ginecológica y violencia obstétrica, generando recursos y formación de alto perfil profesional, producto de la sensibilidad a la cultura, las necesidades de la población así como la integración entre evidencia científica y práctica comunitaria.
            </p>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-primary">Nuestros Valores</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {["Respeto", "Apertura", "Igualdad", "Paciencia", "Compasión"].map((valor) => (
                  <span 
                    key={valor}
                    className="px-6 py-3 bg-primary/10 text-primary font-semibold rounded-full border border-primary/30"
                  >
                    {valor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enfoque Section */}
      <section id="enfoque" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Nuestro Enfoque</h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Usamos investigación cuantitativa y cualitativa para desarrollar estrategias preventivas, sea a través de psicoeducación a población general, como capacitación en habilidades sociales y desarrollo emocional para profesionales.
              </p>
              
              <p>
                Nos basamos en la integración de evidencia de investigación científica como de el reconocimiento de los saberes culturales tradicionales para desarrollar intervenciones con enfoque comunitario.
              </p>
              
              <p>
                Nos apoyamos en la tecnología y los TICs como herramientas democratizadoras del conocimiento y que respeten tiempos, motivación y preparación de las personas para acercarse a ellos.
              </p>
              
              <p>
                Nuestras intervenciones se sustentan en un proceso de desarrollo reiterativo y de acumulación de evidencia: haciendo uso de pruebas de concepto, design thinking como estrategia para integrar necesidades de la población y creación de teoría de cambio para cada una de nuestros programa.
              </p>
              
              <p>
                La evaluación de nuestras intervenciones y recursos tiene componentes transversales enfocados en la experiencia del usuario, y longitudinales enfocados en el efecto, eficacia y efectividad de la intervención según su etapa de desarrollo.
              </p>
              
              <p>
                Buscamos colaboración con profesionales de todas las ramas de la salud, con un acercamiento colaborativo y no confrontacional. A su vez, dirigimos estrategias de comunicación para acercar a los profesionales con la población general en dispositivos horizontales que invitan al dialogo y al reconocimiento de la humanidad de ambas partes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instituciones Colaboradoras */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {institutions.map((inst) => (
              <div
                key={inst.id}
                className="aspect-square bg-background rounded-lg shadow-md flex items-center justify-center p-4 hover:shadow-lg transition-all"
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

export default QuienesSomos;
