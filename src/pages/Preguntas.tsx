import { Navbar } from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ipnLogo from "@/assets/IPN-Logo.png";
import escudoESCOM from "@/assets/escudoESCOM.png";
import labpsit from "@/assets/labpsit.png";
import suayedlogo from "@/assets/suayedlogo.png";
import unamlogo from "@/assets/unamlogo.png";

const Preguntas = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-96 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-4">Preguntas frecuentes</h1>
          <p className="text-center text-muted-foreground mb-12">
            Encuentra respuestas a las preguntas más comunes sobre Quirona UNAM.
          </p>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Qué es Quirona UNAM?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Es una plataforma educativa en salud mental dirigida a prevenir la violencia ginecológica y la violencia obstétrica. Comprende un grupo de programas o intervenciones psicoeducativas que buscan otorgar información científica y confiable para usuarias de servicios de salud, así como profesionales de la salud que laboran en los mismos, puedan reconocer las conductas asociadas a estas violencias de género y evitar reproducirlas o ser parte de ellas. Este proyecto es desarrollado en el Laboratorio de Psicología e Innovación Tecnológica (LABPSIIT) de la Facultad de Estudios Superiores Iztacala, en la Universidad Nacional Autónoma de México.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Qué es la violencia ginecológica?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">
                  La violencia ginecológica es una forma de violencia de género que ocurre en entornos de atención ginecológica, ejercida por personal de salud (médicos, matronas, enfermeras). Incluye prácticas que refuerzan una relación jerárquica donde el personal de salud se siente con derecho a ocultar información, hacer comentarios irónicos, humillar, regañar o infantilizar a las pacientes, ignorando sus deseos y preferencias sobre el tratamiento e invalidando sus síntomas.
                </p>
                <p>
                  También abarca acciones como criticar las prácticas sexuales o el cuerpo de las pacientes, realizar procedimientos intencionadamente dolorosos, y cualquier forma de abuso y violencia sexual, como la obligación de desnudarse sin justificación, tocamientos inapropiados o violación. Esta violencia provoca consecuencias físicas, psicológicas y sexuales inmediatas y a largo plazo en quienes la sufren (Cardenas et al., 2024).
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Qué es la violencia obstétrica?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                La violencia obstétrica es una forma de violencia de género que se manifiesta como cualquier maltrato o atención deficiente que vive una mujer durante el parto, basada en la desigualdad de género y agravada por problemas sociales y fallas en el sistema de salud. Se manifiesta cuando el personal de salud somete a una mujer embarazada a revisiones o procedimientos innecesarios y dolorosos; cuando se hacen comentarios ofensivos o humillantes, le niegan la atención, realiza intervenciones sin su consentimiento (como una cesárea o colocar un DIU), o la presionan, ignoran o abandonan. También incluye la falta de apoyo emocional y empatía, tratar su cuerpo como un simple objeto sin considerar su intimidad, y no respetar sus preferencias. Estas prácticas dañan su dignidad, privacidad y salud física y mental, con consecuencias graves para ella y su bebé (Ferrão et al., 2025).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Qué es la violencia de género?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">
                  La violencia de género es cualquier maltrato (físico, psicológico, sexual, económico o digital) que ocurre porque una persona no cumple con las "reglas" o roles que la sociedad espera según su género. Nace de ideas dañinas y profundas, como el machismo, la homofobia y la transfobia, que consideran que solo existen dos formas "correctas" de ser hombre o mujer. Aunque afecta desproporcionadamente a las mujeres, razón por la cual la ley mexicana las protege de forma prioritaria (Congreso General de los Estados Unidos Mexicanos, 2007), también perjudica a cualquier persona atacada por su identidad u orientación sexual, como las personas LGBTQ+ o los hombres agredidos por no ajustarse al estereotipo del "hombre fuerte".
                </p>
                <p>
                  Esta definición no resta importancia a la lucha contra la violencia hacia las mujeres, sino que permite combatir el problema desde su raíz común. Si solo atendemos una de sus manifestaciones sin cuestionar las ideas de superioridad y odio que la causan, no lograremos erradicar todas las formas en que este mal lastima a las personas por ser quienes son (Graaff, 2021).
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Qué puedo encontrar en esta plataforma?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                El proyecto Quirona UNAM está conformado por diferentes programas psicoeducativos. Uno de ellos está dirigido a adolescentes que requieren de orientación sobre ginecología y sus derechos como usuarias de estos servicios para evitar ser víctimas de la violencia ginecológica. También contamos con un programa dirigido a estudiantes de medicina y enfermería que les sensibiliza a las causas y consecuencias de la violencia obstétrica, además de brindarles estrategias para evitar reproducirla. La plataforma está en constante crecimiento, y en ella podrás encontrar un blog con los avances del proyecto, artículos de divulgación sobre la salud integral de las mujeres y las formas en que los diferentes miembros de una comunidad pueden promoverla.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿La plataforma es gratuita?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                ¡Sí! Los programas de psicoeducación son completamente gratuitos y puedes realizarlos a tu tiempo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Qué necesito para participar de los programas de Quirona UNAM?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Necesitarás acceso a un equipo electrónico, como una computadora personal o un teléfono inteligente con conexión a internet. También requerirás de un correo electrónico para registrar tu cuenta. En caso de que seas menor de 18 años, también requerirás correos de al menos uno de tus padres o tutores, esto con el fin de que estén de acuerdo que recibas la información que puede proporcionarte Quirona UNAM. No se compartirán con ellos tus respuestas ni lo que compartas en la plataforma.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Qué datos me solicitan para participar de los programas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Para poder conocer a las personas que participan de los programas e identificar sus necesidades y perfiles, al iniciar un programa en la plataforma se te solicitan algunos datos demográficos (por ejemplo edad, sexo, orientación sexual y características de tu vivienda), así como datos de tu historia de vida, tu salud física y mental. Estos datos nos son invaluables para determinar si los programas desarrollados en el proyecto están alcanzando los resultados deseados. Toda tu información se guarda de manera confidencial y puedes estar segura/o que tus datos sensibles no se comparten con nadie. Tus respuestas nos ayudarán a realizar investigación que apoye el crecimiento del proyecto Quirona UNAM.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                Si soy menor de edad ¿puedo registrarme?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">
                  Sí puedes registrarte con un correo electrónico personal. Al mismo tiempo, requerirás compartir el correo electrónico de al menos uno de tus padres o tutores. Debido a que la información en Quirona UNAM toca temas sensibles como la sexualidad, los derechos reproductivos, la violencia hacia mujeres, hombres y otras identidades sexuales, es importante que las personas responsables de ti puedan estar de acuerdo en que recibas esta información.
                </p>
                <p>
                  Si quieres saber qué recibirán tus padres o tutores en su correo electrónico puede dar click aquí.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                Soy profesional de la salud ¿puedo registrarme?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                ¡Por supuesto! Quirona UNAM tiene un programa psicoeducativo para sensibilizar a estudiantes de medicina y enfermería sobre la violencia ginecológica y la violencia obstétrica, sus causas y efectos. Si ya eres graduado de alguna licenciatura en medicina o enfermería nos gustaría mucho contar con tu participación.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Mis datos están seguros?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutamente. Toda tu información personal y progreso en la plataforma están protegidos y son confidenciales. Cumplimos con todas las normativas de protección de datos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Puedo acceder desde mi teléfono móvil?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sí, la plataforma está optimizada para dispositivos móviles, tablets y computadoras. Puedes acceder desde cualquier dispositivo con conexión a internet.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-left font-semibold">
                ¿Me pueden apoyar si necesito ayuda urgente?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">
                  Por el momento no contamos con un servicio de apoyo psicológico en línea y al momento. Sin embargo, puedes encontrar en este espacio y en los espacios de los programas un botón para solicitar apoyo a través de líneas telefónicas de Asociaciones Civiles, y de la Secretaría de Salud que funcionan las 24 horas del día.
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Líneas de apoyo disponibles:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Línea del Consejo Ciudadano:</strong> 55 5533 5533</li>
                    <li><strong>Línea de la Vida:</strong> 800 911 2000</li>
                    <li><strong>SAPTEL:</strong> 55 5259 8121</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/30">
        <div className="container mx-auto">
          {/* Logos institucionales */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <img src={unamlogo} alt="UNAM" className="h-16 object-contain" />
            <img src={suayedlogo} alt="SUAYED" className="h-16 object-contain" />
            <img src={labpsit} alt="LABPSIT" className="h-16 object-contain" />
            <img src={ipnLogo} alt="IPN" className="h-16 object-contain" />
            <img src={escudoESCOM} alt="ESCOM" className="h-16 object-contain" />
          </div>

          {/* Dirección */}
          <p className="text-center text-muted-foreground mb-6">
            Av. de los Barrios No. 1, Los Reyes Iztacala, Tlalnepantla de Baz. Méx. 54090
          </p>

          {/* Enlaces */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Aviso de privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              ¿Tienes dudas?
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Redes sociales
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-muted-foreground">
            © 2025 QUIRONA UNAM. Educación en salud ginecológica.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Preguntas;
