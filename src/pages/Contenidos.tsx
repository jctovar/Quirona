import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BookOpen, Heart, Shield, Users, ChevronDown, GraduationCap, Baby, HandHeart } from "lucide-react";
import { useState } from "react";
import ipnLogo from "@/assets/IPN-Logo.png";
import unamLogo from "@/assets/unamlogo.png";
import escomLogo from "@/assets/escudoESCOM.png";
import suayedLogo from "@/assets/suayedlogo.png";
import labpsitLogo from "@/assets/labpsit.png";

const Contenidos = () => {
  const [openProgram1, setOpenProgram1] = useState(false);
  const [openProgram2, setOpenProgram2] = useState(false);
  const [openProgram3, setOpenProgram3] = useState(false);
  const [openProgram4, setOpenProgram4] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-4">Programas y contenidos</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
            Explora nuestros programas y módulos educativos diseñados para brindarte información confiable sobre salud ginecológica y obstétrica que te permitirá proteger tus derechos ante posibles violencias.
          </p>
          
          <div className="space-y-8">
            {/* Programa 1 - Prevención de Violencia Ginecológica */}
            <Collapsible open={openProgram1} onOpenChange={setOpenProgram1}>
              <Card className="border-2 hover:border-primary transition-quirona">
                <CollapsibleTrigger className="w-full text-left">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">Programa "Prevención de Violencia Ginecológica"</CardTitle>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openProgram1 ? 'rotate-180' : ''}`} />
                        </div>
                        <CardDescription className="mt-2 text-base">
                          Dirigido a adolescentes y mujeres jóvenes. Aquí aprenderás la importancia de la ginecología en tu salud así como los estándares de atención que debes recibir como usuaria de servicios. Identificarás no solo condiciones que vulneren tu integridad y tu derecho a un buen trato en una consulta ginecológica, también aprenderás estrategias emocionales para responder de manera asertiva y contundente ante la violencia ginecológica.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <Card className="bg-muted/50 border">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">1. Introducción a la ginecología preventiva</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Aprende los conceptos de salud ginecológica y la importancia de cuidado preventivo para tu bienestar. En este módulo hablamos sobre la importancia de consultas preventivas en ginecología.
                          </CardDescription>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/50 border">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">2. Estándares de atención</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Conoce los estándares y protocolos que deben seguirse en una consulta ginecológica de calidad y respetuosa. Aprende que esperar, cuáles deben ser las condiciones de un consultorio ginecológico, cómo debe ser el trato y cuáles son las buenas prácticas médicas.
                          </CardDescription>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/50 border">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Heart className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">3. Violencia ginecológica</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Conoce e identifica cuáles son las principales formas en que se expresa la violencia ginecológica durante una consulta médica, sea a través de comentarios, falta de información, maltrato físico, actitudes hostiles o malas condiciones del espacio dónde recibas atención ginecológica.
                          </CardDescription>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/50 border">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">4. Respuesta ante la violencia ginecológica</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Aprenderás como al identificar tus reacciones físicas y emocionales puedes comunicarte de manera asertiva, señalar la violencia ginecológica y detener la atención si esta esta generando en tu una experiencia emocionalmente displacentera. En este módulo de cierre, cuestionaremos si la consulta ginecológica debe de ser molesta o dolorosa.
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Programa 2 - Sensibilización sobre violencias de género */}
            <Collapsible open={openProgram2} onOpenChange={setOpenProgram2}>
              <Card className="border-2 hover:border-primary transition-quirona">
                <CollapsibleTrigger className="w-full text-left">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">Programa "Sensibilización sobre violencias de género en el sector salud"</CardTitle>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openProgram2 ? 'rotate-180' : ''}`} />
                        </div>
                        <CardDescription className="mt-2 text-base">
                          Dirigido a estudiantes de enfermería y medicina de pregrado. En este programa compartiremos reflexiones sobre las condiciones del sector salud y las costumbres y hábitos que conducen a que los profesionales de la salud reproduzcan conductas y discursos facilitadores de la violencia ginecológica y violencia obstétrica. Desarrollarás estrategias de resistencia frente a la institucionalización, lo que te permitirá conducirte de manera empática, respetuosa y comprometida con la salud de las mujeres a tu cuidado.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="mt-4 p-8 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center">
                      <p className="text-muted-foreground italic">Espacio reservado para los temas a tratar en este programa</p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Programa 3 - Orientación a padres */}
            <Collapsible open={openProgram3} onOpenChange={setOpenProgram3}>
              <Card className="border-2 hover:border-primary transition-quirona">
                <CollapsibleTrigger className="w-full text-left">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">Programa "Orientación a padres y madres de familia sobre salud"</CardTitle>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openProgram3 ? 'rotate-180' : ''}`} />
                        </div>
                        <CardDescription className="mt-2 text-base">
                          Dirigido a padres de familia de cualquier sexo y orientación sexual. Este es un espacio para reflexionar sobre los elementos emocionales, intelectuales y sociales que moldean nuestras prácticas sexuales. ¿Cómo hablo sobre pornografía con mis hijos varones? ¿Cómo abordo con mi hija la presión que ejerce sobre ella su pareja para tener relaciones sexuales? ¿Cómo enseño a mis hijos a tener responsabilidad afectiva? son algunas de las cuestiones que desarrollamos en este curso/taller.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="mt-4 p-8 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center">
                      <p className="text-muted-foreground italic">Espacio reservado para los temas a tratar en este programa</p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Programa 4 - Capacitación para grupos de apoyo */}
            <Collapsible open={openProgram4} onOpenChange={setOpenProgram4}>
              <Card className="border-2 hover:border-primary transition-quirona">
                <CollapsibleTrigger className="w-full text-left">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <HandHeart className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">Programa "Capacitación para grupos de apoyo comunitario para mujeres que han vivido violencia obstétrica"</CardTitle>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openProgram4 ? 'rotate-180' : ''}`} />
                        </div>
                        <CardDescription className="mt-2 text-base">
                          Dirigido a dulas, matronas, parteras, y profesionales de la salud mental. En este curso se brindarán recursos de atención y contención emocional para dar atención a mujeres que han vivido violencia obstétrica y otras formas de maltrato durante su embarazo. Este programa busca generar diversas células de apoyo comunitario en diferentes localidades de la Zona Metropolitana de la Ciudad de México.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="mt-4 p-8 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center">
                      <p className="text-muted-foreground italic">Espacio reservado para los temas a tratar en este programa</p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <img src={unamLogo} alt="UNAM" className="h-16 object-contain" />
            <img src={suayedLogo} alt="SUAyED" className="h-16 object-contain" />
            <img src={labpsitLogo} alt="LABPSIIT" className="h-16 object-contain" />
            <img src={ipnLogo} alt="IPN" className="h-16 object-contain" />
            <img src={escomLogo} alt="ESCOM" className="h-16 object-contain" />
          </div>
          
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              Av. de los Barrios No. 1, Los Reyes Iztacala, Tlalnepantla de Baz. Méx. 54090
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Aviso de privacidad
            </a>
            <a href="/preguntas" className="text-muted-foreground hover:text-primary transition-colors">
              ¿Tienes dudas?
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Redes sociales
            </a>
          </div>
          
          <p className="text-center text-muted-foreground">
            © 2025 QUIRONA UNAM. Educación en salud ginecológica.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contenidos;
