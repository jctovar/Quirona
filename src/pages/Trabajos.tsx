import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, FileText, Building2 } from "lucide-react";
import unamLogo from "@/assets/unamlogo.png";
import ipnLogo from "@/assets/IPN-Logo.png";
import escudoESCOM from "@/assets/escudoESCOM.png";
import labpsitLogo from "@/assets/labpsit.png";
import suayedLogo from "@/assets/suayedlogo.png";

const Trabajos = () => {
  const trabajosEjemplo = [
    {
      title: "Trabajo de investigación 1",
      description: "Próximamente",
      type: "Tesis",
    },
    {
      title: "Trabajo de investigación 2",
      description: "Próximamente",
      type: "Artículo",
    },
    {
      title: "Trabajo de investigación 3",
      description: "Próximamente",
      type: "Ensayo",
    },
    {
      title: "Trabajo de investigación 4",
      description: "Próximamente",
      type: "Tesis",
    },
    {
      title: "Trabajo de investigación 5",
      description: "Próximamente",
      type: "Artículo",
    },
    {
      title: "Trabajo de investigación 6",
      description: "Próximamente",
      type: "Proyecto",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-96 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trabajo de investigación
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              El proyecto Quirona UNAM se basa en evidencia científica para sus programa a la vez que busca desarrollarla para promover el buen trato y el respecto a los derechos de mujeres, profesionales de la salud y de la población en general. En este espacio compartimos los trabajos académicos y de investigación realizados por el equipo de Quirona UNAM.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Sobre esta sección */}
            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🎓</span>
                  <CardTitle className="text-xl text-primary">Sobre esta sección</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Este espacio ha sido creado para promover el intercambio académico y la difusión de investigaciones relacionadas con salud ginecológica, derechos de las mujeres y educación en salud.
                </p>
              </CardContent>
            </Card>

            {/* Tipos de trabajo */}
            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">📄</span>
                  <CardTitle className="text-xl text-primary">Tipos de trabajo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Publicamos tesis, artículos de investigación, ensayos académicos y proyectos finales que contribuyan al conocimiento sobre violencia ginecológica, derechos reproductivos y educación en salud para adolescentes.
                </p>
              </CardContent>
            </Card>

            {/* Instituciones participantes */}
            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-8 h-8 text-primary" />
                  <CardTitle className="text-xl text-primary">Instituciones participantes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  El equipo de Quirona UNAM esta conformado por académicos y estudiantes de la FES Iztacala de la UNAM, la Escuela Superior de Computo del Instituto Politécnico Nacional y la Licenciatura en Psicología de la Unidad Lerma de la Universidad Autónoma Metropolitana.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trabajos Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Trabajos publicados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trabajosEjemplo.map((trabajo, index) => (
                <Card key={index} className="hover:shadow-lg transition-all border-muted">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {trabajo.type}
                      </span>
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{trabajo.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {trabajo.description}
                    </CardDescription>
                    <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Contenido próximamente</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/30">
        <div className="container mx-auto">
          {/* Logos institucionales */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <img src={unamLogo} alt="UNAM" className="h-16 object-contain" />
            <img src={suayedLogo} alt="SUAyED" className="h-16 object-contain" />
            <img src={labpsitLogo} alt="LABPSIT" className="h-16 object-contain" />
            <img src={ipnLogo} alt="IPN" className="h-16 object-contain" />
            <img src={escudoESCOM} alt="ESCOM" className="h-16 object-contain" />
          </div>

          {/* Dirección */}
          <p className="text-center text-muted-foreground mb-6">
            Av. de los Barrios No. 1, Los Reyes Iztacala, Tlalnepantla de Baz. Méx. 54090
          </p>

          {/* Enlaces */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a href="/aviso-privacidad" className="text-muted-foreground hover:text-primary transition-colors">
              Aviso de privacidad
            </a>
            <a href="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
              ¿Tienes dudas?
            </a>
            <a href="#redes" className="text-muted-foreground hover:text-primary transition-colors">
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

export default Trabajos;
