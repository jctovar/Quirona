import { getErrorMessage } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { PartyPopper, Loader2, ArrowRight } from "lucide-react";

const questions = [
  "Si quiero aprender habilidades para gestionar mejor mi vida, prefiero un terapeuta antes que una intervención psicológica online.",
  "Una intervención psicológica online puede ayudarme a reconocer los problemas que tengo que enfrentar.",
  "Una intervención psicológica online puede inspirarme para abordar mejor mis problemas.",
  "Creo que el concepto de intervenciones psicológicas online tiene sentido.",
  "Tengo la sensación de que una intervención psicológica online puede ayudarme.",
  "Es más probable que me mantenga motivada/o con un terapeuta que con una intervención psicológica online.",
  "En situaciones de crisis, un terapeuta puede ayudarme mejor que una intervención psicológica online."
];

const options = [
  { value: "1", label: "Totalmente en desacuerdo" },
  { value: "2", label: "En desacuerdo" },
  { value: "3", label: "Ni de acuerdo ni en desacuerdo" },
  { value: "4", label: "De acuerdo" },
  { value: "5", label: "Totalmente de acuerdo" }
];

const FinalTest3 = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const allAnswered = Object.keys(answers).length === questions.length;

  const handleSubmit = async () => {
    if (!allAnswered) {
      toast.error("Por favor, responde todas las afirmaciones.");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      // Guardamos resultados y marcamos como COMPLETADO TODO el proceso final
      const { error } = await supabase
        .from('final_evaluations')
        .upsert({
          id: user.id,
          test_3_results: answers,
          is_completed: true, // Marcamos el fin absoluto
          updated_at: new Date()
        });

      if (error) throw error;

      setIsFinished(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error("Error al guardar: " + getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Navbar isAuthenticated />
        <Card className="max-w-xl w-full border-2 shadow-quirona animate-in zoom-in duration-500">
          <CardContent className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-primary/10 p-4 rounded-full">
                <PartyPopper className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary">¡Muchísimas Felicidades!</h1>
            <p className="text-xl text-muted-foreground">
              Has completado exitosamente todas las etapas de la plataforma. 
              Tu compromiso con tu bienestar y aprendizaje es admirable.
            </p>
            <div className="pt-6">
              <Button 
                onClick={() => navigate("/dashboard")} 
                className="gradient-primary text-white px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform"
              >
                Regresar al Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated />
      <main className="container mx-auto pt-48 pb-16 px-4">
        <Card className="max-w-3xl mx-auto border-2 shadow-quirona">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl text-primary">
              Cuestionario 3: Adopción de Intervenciones Psicológicas en Línea (APOI)
            </CardTitle>
            <CardDescription className="text-base text-balance leading-relaxed">
              Las siguientes afirmaciones se refieren a las intervenciones psicológicas online. 
              Por favor, indique su valoración personal o expectativas hacia este tipo de intervenciones en general.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              {questions.map((text, index) => (
                <div key={index} className="p-6 rounded-2xl border bg-card/50 space-y-4 transition-all hover:border-primary/30">
                  <p className="font-medium text-foreground leading-snug">
                    <span className="text-primary font-bold mr-2">{index + 1}.</span>
                    {text}
                  </p>
                  <RadioGroup 
                    value={answers[index] || ""} 
                    onValueChange={(val) => setAnswers(prev => ({ ...prev, [index]: val }))}
                    className="grid grid-cols-1 gap-2"
                  >
                    {options.map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={opt.value} id={`q${index}-${opt.value}`} />
                        <Label htmlFor={`q${index}-${opt.value}`} className="flex-1 cursor-pointer text-sm">
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || isSaving}
              className="w-full gradient-primary text-white py-8 text-xl shadow-xl hover:scale-[1.02] transition-transform"
            >
              {isSaving ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Finalizar Evaluación y Plataforma"
              )}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FinalTest3;