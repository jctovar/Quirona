import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Heart, Shield, Facebook } from "lucide-react";
const recursos = [
  { nombre: "Línea de Mujeres 079", informacion: "El 079 es el número del Gobierno de México que ofrece atención a la población las 24 horas del día, los 365 días del año. Uno de los programas principales que ofrece el 079 es la Línea Bienestar para las Mujeres, diseñada para brindar atención y orientación jurídica y psicológica a distancia. Este servicio está dirigido a mujeres que se encuentran en situaciones de violencia de cualquier tipo, proporcionando apoyo integral de manera segura y confidencia", telefono: "079 (opción 1)", redessociales: { facebook: "FB: @mujeresgobmx", instagram: " Instagram: @mujeresgobmx", tiktok: "TikTok: @mujeresgobmx", web:"Web: www.gob.mx/mujeres"} },
  { nombre: "Línea de la Vida", informacion:"La línea de la vida es un espacio de orientación telefónica especializado en salud mental y adicciones, está disponible para ti y para quien lo necesite las 24 horas del día, los 365 días del año. También atiende y apoya a personas con riesgo suicida y en situaciones de violencia.", telefono: "800 911 2000", redessociales: { facebook: "FB: @LaLineadeLaVidamx", instagram: "X: LineaDe_LaVida", web: "Web: www.gob.mx/lineadelavida"} },
  { nombre: "Línea del Consejo Ciudadano", informacion: "Una vida libre de violencia, en el hogar, en el trabajo, en el ciberespacio y en el espacio público, es derecho de todas las niñas, mujeres y adultas mayores. Además de atención jurídica y psicológica con Perspectiva de Género, te ofrecemos “Acompañamiento violeta” para ayudarte a denunciar y apoyar tu proceso de empoderamiento. Brinda apoyo inmediato jurídico y psicológico, 24/7 , también tiene terapia virtual y presencial de 9 a 12 sesiones. Apoyo legal con una de abogada que puede acompañarte al MP para iniciar tu denuncia. Canaliza a instituciones aliadas, como la SSC, la FGJ, Semujeres, el DIF, Conavim y Sibiso. Todos los servicios son gratuitos", telefono: "55 5533 5533", redessociales: { web:"Web: https://www.consejociudadanomx.org/asi-te-ayudamos/mujeres"} },
  { nombre: "Línea sin Violencia Estado de México", informacion:"Brinda atención a través de la línea telefónica a mujeres, sus hijas e hijos en situación de violencia de género, en cualquiera de sus modalidades y tipos, proporcionando intervención en crisis, apoyo psicológico y asesoría jurídica de primer contacto. Atención oportuna y confidencial vía telefónica a personas en situación de violencia de género, enfocándose en sus necesidades específicas, ya sean psicológicas, jurídicas, informativas y/o de canalización a otras instancias de apoyo. Vinculando con servicios de emergencia en caso de requerirlo, así como a las Brigadas de Seguimiento y los Refugios para Mujeres sus Hijas e Hijos en Situación de Violencia. Funciona 24 horas del día, 365 días del año.", telefono: "800 108 4053", redessociales: { web:"Web: https://semujeres.edomex.gob.mx/linea_atencion_por_violencia"}},
  { nombre: "Locatel", informacion:"El servicio psicológico de LOCATEL es una línea de apoyo que te orienta y acompaña para tu bienestar emocional y social, a fin de ayudar a que te sientas mejor y encuentres las habilidades que te fortalezcan emocionalmente.  Durante una asesoría psicológica puedes contar con el apoyo de profesionales de la salud mental, ya sea en una sola ocasión, para tratar de entender las ideas y emociones que te llegan a sobrepasar durante el día a día o en situaciones de crisis, o mediante el servicio de psicología con seguimiento, para desarrollar habilidades y estrategias para lograr los cambios en tu proyecto de vida.También cuenta con servicio de Línea Prevención del Suicidio ue es un servicio de apoyo emocional para las personas que, derivado de una tristeza profunda, estrés o cualquier afectación emocional, han pensado en quitarse la vida.", telefono: "55 5658 1111, *133", redessociales: { web:"Web: https://311locatel.cdmx.gob.mx/psicologia.xhtml}" }},
  { nombre: "LineaUNAM", informacion:"La Línea de Atención Psicológica, Línea UNAM, es una opción gratuita de vanguardia que ofrece un servicio de atención inmediata en una modalidad a distancia. El servicio esta abierta al público en general. De lunes a viernes de 9:00am a 6:00pm", telefono: "55 5025 0855", redessociales: { facebook: "FB: @papdunam", instagram:"Instagram: @papdunam", web:"Web: www.misaludunam.mx/"} },
  { nombre: "Centros de Integración Juvenil Contigo (CIJ Contigo)", informacion:"Es un servicio de orientación y apoyo psicológico en línea atendido por equipos de especialistas en adicciones, se ofrecen primeros auxilios psicológicos e información sobre la institución a la población en general. Se motiva a las personas usarías a continuar su atención en alguna de las unidades operativas. La atención que se ofrece es anónima y confidencial. El servicio es de 8:30am a 10:00pm.", telefono: "55 4555 1212", redessociales: { facebook: "FB: @CIJ.OFICIAL", web:"Web: https://www.cij.gob.mx/cijcontigo/"} },
  { nombre: "Instituto Jalisciense de Salud Mental y Adicciones", informacion:"Los psicólogos que atienden la línea telefónica tienen como objetivo apoyar a los usuarios a dar pasos concretos para enfrentar la crisis, ayudándolos a controlar sus sentimientos y a comenzar el proceso de solución de sus problemas, esto a través de intervenciones psicológicas breves (primeros auxilios psicológicos) y de la canalización de los servicios de salud mental. Es un servicio totalmente gratuito confidencial y personalizado.Brinda atención a cualquier persona que lo solicite, sin importar su edad, sexo, condición social o económica. Puedes marcar de cualquier parte de la república mexicana.", telefono: "800 227 4747", redessociales: { web:"Web: https://salme.jalisco.gob.mx/servicio-de-intervencion-en-crisis" } },
];
const Derivacion = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      <main className="container mx-auto pt-64 pb-8 px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-primary">
              ¡Agradecemos sinceramente tus respuestas!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Después de revisar cuidadosamente tus evaluaciones, hemos llegado a la conclusión de que
                requieres una atención más especializada y personalizada, que va más allá del alcance de
                QuironaUNAM. Por lo que te recomendamos te pongas en contacto con alguno de los siguientes
                números telefónicos de orientación o que busques la ayuda de un profesional en salud mental.
                Ellos podrán brindarte el apoyo terapéutico adecuado y personalizado que necesitas en este momento.
              </p>
              <p className="text-primary font-semibold text-lg text-center">
                ¡No dudes en pedir ayuda!
              </p>
            </div>
            <div className="grid gap-3">
              {recursos.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{r.nombre}</p>
                    <p className="text-sm text-muted-foreground">{r.informacion}</p>
                    <p className="text-sm text-muted-foreground">{r.redessociales?.facebook}</p>
                    <p className="text-sm text-muted-foreground">{r.redessociales?.instagram}</p>
                    <p className="text-sm text-muted-foreground">{r.redessociales?.tiktok}</p>
                    <p className="text-sm text-muted-foreground">{r.redessociales?.web}</p> 
                  </div>
                  <a
                    href={`tel:${r.telefono.replace(/\s/g, "")}`}
                    className="text-primary font-bold hover:underline"
                  >
                    {r.telefono}
                  </a>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <Shield className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Tu bienestar es lo más importante. Estas líneas están disponibles para brindarte apoyo profesional. ¡No dudes en pedir ayuda!
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
export default Derivacion;