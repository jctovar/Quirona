import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PlayCircle, Heart, Stethoscope, Users, HandHeart } from "lucide-react";
import bienvenidaVideo from "@/assets/bienvenidaQuirona.mp4";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/supabaseClient"; // supabase
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type RegistrationStep = 'selection' | 'video' | 'form';

const programs = [
  {
    id: 'adolescentes',
    title: 'Prevención de Violencia Ginecológica',
    description: 'Para adolescentes y mujeres jóvenes',
    icon: Heart,
    available: true,
  },
  {
    id: 'profesionales',
    title: 'Sensibilización sobre violencias de género',
    description: 'Para estudiantes de enfermería y medicina',
    icon: Stethoscope,
    available: false,
  },
  {
    id: 'padres',
    title: 'Orientación a padres y madres de familia',
    description: 'Para padres de familia',
    icon: Users,
    available: false,
  },
  {
    id: 'apoyo',
    title: 'Capacitación para grupos de apoyo comunitario',
    description: 'Para dulas, matronas, parteras y profesionales',
    icon: HandHeart,
    available: false,
  },
];

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<RegistrationStep>('selection');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    nationality: "",
    curp: "",
    email: "",
    tutorEmail1: "",
    tutorEmail2: "",
    password: "",
    confirmPassword: "",
  });

  const handleProgramSelect = (programId: string) => {
    if (programId === 'adolescentes') {
      setStep('video');
      toast.success("¡Programa seleccionado! Ahora mira el video de bienvenida");
    } else {
      toast.info("Este programa estará disponible próximamente");
    }
  };

  const handleVideoWatched = () => {
    setStep('form');
    toast.success("¡Excelente! Ahora completa tu registro");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedPrivacy) {
      toast.error("Debes aceptar el aviso de privacidad");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    // ENVIAMOS TODO EN UN SOLO PASO
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        // Estos datos viajan "escondidos" y el Trigger los atrapa
        data: {
          username: formData.username,
          nationality: formData.nationality,
          tutorEmail1: formData.tutorEmail1,
          tutorEmail2: formData.tutorEmail2,
        }
      }
    });

    if (error) {
      toast.error("Error: " + error.message);
    } else {
      toast.success("¡Registro iniciado! Revisa tu correo para confirmar tu cuenta.");
      setTimeout(() => navigate("/Login"), 3000);
    }
  };

  const handleAcceptPrivacy = () => {
    setAcceptedPrivacy(true);
    setPrivacyDialogOpen(false);
    toast.success("Aviso de privacidad aceptado");
  };

  // Paso 1: Selección de programa
  if (step === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Navbar />
        
        <div className="pt-96 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="shadow-quirona border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Registro a nuestra plataforma de programas</CardTitle>
                <CardDescription className="text-base mt-4">
                  Para iniciar, es importante que conozcas{" "}
                  <Link 
                    to="/contenidos" 
                    className="text-primary font-semibold hover:underline"
                  >
                    nuestros contenidos
                  </Link>
                  , una vez identificado el programa que más te interesa, selecciónalo de entre los programas disponibles.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {programs.map((program) => {
                    const IconComponent = program.icon;
                    return (
                      <button
                        key={program.id}
                        onClick={() => handleProgramSelect(program.id)}
                        className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                          program.available
                            ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10 hover:shadow-lg hover:scale-[1.02] cursor-pointer'
                            : 'border-muted bg-muted/30 opacity-60 cursor-not-allowed grayscale'
                        }`}
                        disabled={!program.available}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            program.available 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            <IconComponent className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold text-lg mb-1 ${
                              program.available ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {program.title}
                            </h3>
                            <p className={`text-sm ${
                              program.available ? 'text-muted-foreground' : 'text-muted-foreground/70'
                            }`}>
                              {program.description}
                            </p>
                            {!program.available && (
                              <span className="inline-block mt-2 text-xs bg-muted px-2 py-1 rounded">
                                Próximamente
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="text-center text-sm text-muted-foreground pt-4">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Inicia sesión aquí
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Paso 2: Video de bienvenida
  if (step === 'video') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Navbar />
        
        <div className="pt-96 pb-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="shadow-quirona border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Bienvenida a Quirona UNAM</CardTitle>
                <CardDescription className="text-base">
                  Antes de comenzar, mira este breve video informativo sobre violencia ginecológica
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="rounded-lg overflow-hidden bg-black">
                  <video 
                    controls 
                    className="w-full max-h-[500px]"
                    controlsList="nodownload"
                  >
                    <source src={bienvenidaVideo} type="video/mp4" />
                    Tu navegador no soporta el elemento de video
                  </video>
                </div>

                <Button 
                  onClick={handleVideoWatched}
                  className="w-full gradient-primary transition-quirona hover:opacity-90"
                  size="lg"
                >
                  He visto el video, continuar con el registro
                </Button>

                <Button 
                  variant="ghost"
                  onClick={() => setStep('selection')}
                  className="w-full"
                >
                  ← Volver a selección de programa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Paso 3: Formulario de registro
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      
      <div className="pt-96 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-quirona border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Crear tu cuenta</CardTitle>
              <CardDescription className="text-base">
                Completa el formulario para unirte a QUIRONA
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Nombre de usuario *</Label>
                    <Input
                      id="username"
                      placeholder="Elige tu nombre de usuario"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nacionalidad *</Label>
                    <Input
                      id="nationality"
                      placeholder="Tu nacionalidad"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    />
                  </div>
                </div>

                

                <div className="space-y-2">
                  <Label htmlFor="email">Tu correo electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu.email@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tutorEmail1">Correo de tutor 1 *</Label>
                  <Input
                    id="tutorEmail1"
                    type="email"
                    placeholder="tutor1@ejemplo.com"
                    value={formData.tutorEmail1}
                    onChange={(e) => setFormData({ ...formData, tutorEmail1: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tutorEmail2">Correo de tutor 2 (opcional)</Label>
                  <Input
                    id="tutorEmail2"
                    type="email"
                    placeholder="tutor2@ejemplo.com"
                    value={formData.tutorEmail2}
                    onChange={(e) => setFormData({ ...formData, tutorEmail2: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Crea una contraseña"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirma tu contraseña"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>

                {/* Aviso de privacidad */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={acceptedPrivacy}
                      onCheckedChange={(checked) => setAcceptedPrivacy(checked as boolean)}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <label htmlFor="privacy" className="text-muted-foreground cursor-pointer">
                        He leído y acepto el{" "}
                        <Dialog open={privacyDialogOpen} onOpenChange={setPrivacyDialogOpen}>
                          <DialogTrigger asChild>
                            <button 
                              type="button"
                              className="text-primary font-semibold hover:underline"
                            >
                              Aviso de Privacidad
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold text-primary">
                                Aviso de Privacidad
                              </DialogTitle>
                              <DialogDescription>
                                Universidad Nacional Autónoma de México - Facultad de Estudios Superiores Iztacala
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh] pr-4">
                              <div className="space-y-6 text-sm text-muted-foreground">
                                <p>
                                  La Facultad de Estudios Superiores Iztacala (FESI) de la Universidad Nacional Autónoma de México (UNAM), ubicada en Avenida de los Barrios No. 1, colonia Los Reyes Ixtacala, Tlalnepantla de Baz, Estado de México, C.P. 54090 y es responsable del tratamiento de sus datos personales. Recopilamos sus datos personales a través de los mecanismos remotos de comunicación electrónica, utilizando la página web y/o aplicación del proyecto "Quirona UNAM: plataforma psicoeducativa para la prevención de violencia ginecológica y violencia obstétrica". Los datos que podemos solicitar, y que no se consideran sensibles según la Ley General de Protección de Datos Personales en Posesón de Sujetos Obligados, son los siguientes:
                                </p>
                                
                                <ul className="list-disc pl-5 space-y-1">
                                  <li>Identificativos</li>
                                  <li>Contacto</li>
                                  <li>De emergencia</li>
                                </ul>

                                <p>
                                  Además de los datos personales mencionados anteriormente, para las finalidades informadas en el presente Aviso de Privacidad, también se recopilarán los siguientes datos personales considerados sensibles y que, por lo tanto, requieren de una especial protección:
                                </p>

                                <p className="font-semibold text-foreground">
                                  Datos relativos a la salud mental: modo de vida, cuidado de la salud y psico-emocional.
                                </p>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Los datos personales que recopilamos de usted serán utilizados para las siguientes finalidades:</h4>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>Difundir conocimientos científicos, culturales, tecnológicos y profesionales.</li>
                                    <li>Contactar a familiares o terceros en casos de emergencia.</li>
                                    <li>Atender a la comunidad universitaria a través de programas de prevención de accidentes, de nutrición, de ayuda psicológica y la aplicación y/o revisión de exámenes médicos, cuando lo solicite.</li>
                                    <li>Elaborar expedientes únicos personales.</li>
                                    <li>Acreditar su identidad.</li>
                                    <li>Enviar notificaciones y hacer seguimiento respecto a los resultados obtenidos en la intervención.</li>
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Transferencias de datos personales</h4>
                                  <p>
                                    No se transferirán sus datos personales sin previo consentimiento del titular, salvo para cumplir con las obligaciones establecidas en el artículo 22 de la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados. Los artículos 6º, Base A, fracciones II y III, y 16, segundo párrafo, de la Constitución Política de los Estados Unidos Mexicanos; el 3º, fracción XXXIII, 16, 17, 18, 20, 21, 22, 23, 26, 27 y 28 de la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados, así como los numerales del 5 al 19 de los Lineamientos para la Protección de Datos Personales en Posesión de la Universidad Nacional Autónoma de México, publicados en la Gaceta UNAM el 25 de febrero de 2019.
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Ejercicio de derechos ARCOP (Acceso, rectificación, cancelación, oposición y portabilidad al uso de sus datos personales)</h4>
                                  <p>
                                    Tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
                                  </p>
                                  <p className="mt-2">
                                    Para ejercer sus derechos de acceso, rectificación, cancelación y oposición puede acudir a la Unidad de Transparencia de la Universidad Nacional Autónoma de México, con domicilio en lado Norponiente del Circuito Estadio Olímpico sin número, a un costado del Anexo de la Facultad de Filosofía y Letras, Ciudad Universitaria, Alcaldía Coyoacán, C.P. 04510, Ciudad de México, o bien por medio de la Plataforma Nacional de Transparencia: <a href="http://www.plataformadetransparencia.org.mx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.plataformadetransparencia.org.mx</a>
                                  </p>
                                  <p className="mt-2">
                                    La determinación adoptada, se le comunicará en un plazo máximo de veinte días hábiles contados desde la fecha en que se recibió la solicitud, a efecto de que, si resulta procedente, haga efectiva la misma dentro de los quince días hábiles siguientes a que se comunique la respuesta.
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Revocación del consentimiento</h4>
                                  <p>
                                    Puede revocar el consentimiento que, en su caso, nos haya otorgado para el tratamiento de sus datos personales. Sin embargo, es importante que tenga en cuenta que no en todos los casos atenderemos o concluyamos su solicitud de forma inmediata, ya que es posible que por alguna obligación legal requeriremos seguir tratando sus datos personales. Asimismo, usted deberá considerar que, para ciertos fines, la revocación de su consentimiento implicará que no le podamos seguir prestando el servicio del sistema en línea que nos solicitó, o la conclusión de su relación con nosotros.
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Ejercicio de su Derecho a la Portabilidad de Datos Personales</h4>
                                  <p>
                                    Esta área universitaria actualmente no cuenta con formatos estructurados y comúnmente utilizados para la portabilidad de datos personales, en términos de lo dispuesto en el artículo 6 de los Lineamientos que establecen los parámetros, modalidades y procedimientos para la portabilidad de datos personales, por lo que no es posible, por el momento, ejercer la portabilidad de datos personales.
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Cookies</h4>
                                  <p>
                                    Las cookies son archivos con una pequeña cantidad de datos que se utilizan comúnmente como identificadores únicos anónimos. Estos se envían a su navegador desde los sitios web que visita y se almacenan en la memoria interna de su dispositivo.
                                  </p>
                                  <p className="mt-2">
                                    Este Servicio no utiliza estas "cookies" de forma explícita. Sin embargo, la aplicación puede usar código y bibliotecas de terceros que usan "cookies" para recopilar información y mejorar sus servicios. Tiene la opción de aceptar o rechazar estas cookies y saber cuándo se envía una cookie a su dispositivo. Si elige rechazar nuestras cookies, es posible que no pueda utilizar algunas partes de este Servicio.
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Proveedores de servicio</h4>
                                  <p>Es posible que empleemos a empresas e individuos de terceros debido a las siguientes razones:</p>
                                  <ul className="list-disc pl-5 space-y-1 mt-2">
                                    <li>Para facilitar nuestro Servicio;</li>
                                    <li>Para proporcionar el Servicio en nuestro nombre;</li>
                                    <li>Para realizar servicios relacionados con el Servicio; o</li>
                                    <li>Para ayudarnos a analizar cómo se utiliza nuestro Servicio.</li>
                                  </ul>
                                  <p className="mt-2">
                                    Queremos informar a los usuarios de este Servicio que estos terceros tienen acceso a su Información personal. El motivo es realizar las tareas que se les asignan en nuestro nombre. Sin embargo, están obligados a no divulgar ni utilizar la información para ningún otro fin.
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Seguridad</h4>
                                  <p>
                                    Valoramos su confianza al proporcionarnos su información personal, por lo que nos esforzamos por utilizar medios comercialmente aceptables para protegerla. Pero recuerde que ningún método de transmisión por Internet, o método de almacenamiento electrónico es 100% seguro y confiable, y no podemos garantizar su seguridad absoluta.
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Enlaces a otros sitios</h4>
                                  <p>
                                    Este Servicio puede contener enlaces a otros sitios. Si hace clic en un enlace de un tercero, será dirigido a ese sitio. Tenga en cuenta que estos sitios externos no son operados por nosotros. Por lo tanto, le recomendamos encarecidamente que revise la Política de privacidad de estos sitios web. No tenemos control ni asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios o servicios de terceros.
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Cambios a esta Política de privacidad</h4>
                                  <p>
                                    Es importante tener en cuenta que este aviso de privacidad puede sufrir modificaciones o actualizaciones, las cuales estarán disponibles en el sitio web del Proyecto en la sección de Aviso de Privacidad. Se recomienda consultar el Aviso de Privacidad Integral al menos semestralmente para estar actualizado sobre las condiciones y términos del mismo.
                                  </p>
                                  <p className="mt-2">
                                    También se invita a los usuarios a consultar el aviso de privacidad de la Facultad de Estudios Superiores Iztacala:{" "}
                                    <a href="https://www.iztacala.unam.mx/ap.php" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                      https://www.iztacala.unam.mx/ap.php
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </ScrollArea>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                              <Button 
                                variant="outline" 
                                onClick={() => setPrivacyDialogOpen(false)}
                              >
                                Cerrar
                              </Button>
                              <Button 
                                onClick={handleAcceptPrivacy}
                                className="gradient-primary"
                              >
                                Aceptar Aviso de Privacidad
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </label>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-primary transition-quirona hover:opacity-90"
                  size="lg"
                  disabled={!acceptedPrivacy}
                >
                  Crear cuenta
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Inicia sesión aquí
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
