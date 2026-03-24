import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const correctAnswers: Record<number, { text: string; violenceType: string }> = {
  1: { text: 'El médico revisa tus resultados y comenta en tono de desaprobación: "Con tantas parejas, no me sorprende que tengas esta infección; deberías tener más respeto por ti misma".', violenceType: "Violencias psicológicas y de subordinación" },
  2: { text: 'Al solicitar una ligadura de trompas, la doctora te responde "Es un desperdicio; eres joven y vas a cambiar de opinión porque tu destino natural es ser madre".', violenceType: "Violencias psicológicas y de subordinación" },
  3: { text: 'Al llamarte, escuchas que el doctor comenta a la enfermera entre risas: "No atiendo gorditas, es una pérdida de tiempo porque no se cuidan".', violenceType: "Violencias psicológicas y de subordinación" },
  4: { text: 'Acudes por cólicos intensos y discapacitantes, la ginecóloga te niega el medicamento que ya has tomado antes, diciéndote: "No exageres, ese dolor es normal y no amerita medicina".', violenceType: "Violencias hacia tu cuerpo" },
  5: { text: 'El ginecólogo introduce el espéculo de forma rápida sin pedirte que te relajes. Le comentas que te dolió mucho. Responde: "Fue rápido, ¡ya! ¡no pasa nada!"', violenceType: "Violencias hacia tu cuerpo" },
  6: { text: 'Al saber que vienes de una zona de población indígena, te presiona para ponerte un DIU ahora mismo, con la justificación de "luego tienen chamacos que ni siquiera pueden mantener".', violenceType: "Violencias hacia tu cuerpo" },
  7: { text: 'Mientras realiza un examen de mamas, el doctor dice: "Qué cuerpo tan bonito tienes, seguro tu pareja te lo dice todo el tiempo".', violenceType: "Violencias sexuales y contra la intimidad" },
  8: { text: 'La ginecóloga manipula tu clítoris durante un examen de rutina sin haber explicado previamente el procedimiento, ni solicitado tu consentimiento para ese contacto específico.', violenceType: "Violencias sexuales y contra la intimidad" },
  9: { text: 'El ginecólogo utiliza su celular para tomar fotografías de tus genitales alegando que son "para su registro clínico personal", sin haberte pedido autorización previa.', violenceType: "Violencias sexuales y contra la intimidad" },
  10: { text: 'El médico familiar te envía a casa con una infección grave. Te comenta "el hospital ahorita no tiene camas disponibles ni personal suficiente para monitorearte".', violenceType: "No es violencia ginecológica" },
  11: { text: 'El ginecólogo te hace esperar a ti y a otras pacientes 2 horas en la sala de espera sin avisarte previamente.', violenceType: "No es violencia ginecológica" },
  12: { text: 'Intentas explicar un dolor agudo en tu lengua materna y el personal médico te ignora o te habla con impaciencia por no hablar español, sin ofrecer asistencia lingüística.', violenceType: "No es violencia ginecológica" },
  13: { text: 'Solicitas tu expediente para una segunda opinión y la ginecóloga te dice que "se extravió".', violenceType: "No es violencia ginecológica" },
  14: { text: 'El consultorio no está lo suficientemente equipado. La ginecóloga te pide que esperes en bata en un pasillo donde transitan otras personas.', violenceType: "No es violencia ginecológica" },
};
const Module3Feedback = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <Card className="border-2 shadow-quirona mb-8">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h1 className="text-3xl font-bold text-primary">Retroalimentación</h1>
              <p className="text-lg text-muted-foreground">
                A continuación encontrarás las respuestas correctas para identificar situaciones de violencia ginecológica.
              </p>
              <Button
                onClick={() => navigate("/module-3-closure")}
                className="gradient-primary text-white px-8 py-5 text-lg"
              >
                Continuar
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Correct answers in two columns */}
          <Card className="border-2 shadow-quirona">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                Respuestas correctas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(correctAnswers).map(([id, answer]) => (
                  <div key={id} className="border rounded-lg p-4 bg-muted/20">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="font-medium text-foreground">
                        {answer.text}
                      </div>
                      <div className="text-sm font-semibold text-primary bg-primary/10 px-3 py-2 rounded">
                        {answer.violenceType}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Module3Feedback;
