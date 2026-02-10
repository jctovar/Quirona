import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Heart, Shield } from "lucide-react";

const recursos = [
  { nombre: "Línea de Mujeres", telefono: "55 5658 1111", horario: "24 horas" },
  { nombre: "Línea de la Vida", telefono: "800 911 2000", horario: "24 horas" },
  { nombre: "Línea del Consejo Ciudadano", telefono: "55 5533 5533", horario: "24 horas" },
  { nombre: "Línea sin Violencia Estado de México", telefono: "800 108 4053", horario: "24 horas" },
  { nombre: "Locatel", telefono: "55 5658 1111", horario: "24 horas" },
  { nombre: "LineaUNAM", telefono: "55 5025 0855", horario: "24 horas" },
  { nombre: "Centros de Integración Juvenil Contigo (CIJ Contigo)", telefono: "800 911 2000", horario: "24 horas" },
  { nombre: "Instituto Jalisciense de Salud Mental y Adicciones", telefono: "33 3833 3838", horario: "Lunes a viernes" },
];

const Derivacion = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      <main className="container mx-auto pt-32 pb-8 px-4">
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
                    <p className="text-sm text-muted-foreground">{r.horario}</p>
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
                Tu bienestar es lo más importante. Estas líneas están disponibles para brindarte apoyo profesional.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Derivacion;
