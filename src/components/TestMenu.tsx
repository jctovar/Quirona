import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loadTestProgress } from "@/lib/testProgress";

interface TestInfo {
  id: string;
  title: string;
  path: string;
  small?: string;
}

const tests: TestInfo[] = [
  { id: "initial-test", title: "Test inicial", path: "/initial-test" },
  { id: "semantic-network", title: "Red semántica", path: "/semantic-network-test"},
  { id: "anxiety", title: "Inventario de ansiedad", path: "/anxiety-inventory"},
  { id: "assertiveness", title: "Escala de asertividad", path: "/assertiveness-scale"},
  { id: "adverse-experiences", title: "Experiencias adversas", path: "/adverse-experiences"},
  { id: "general-health", title: "Salud general", path: "/general-health"},

  
];

interface TestMenuProps {
  currentTest?: string;
  onStart?: () => void;
}

export const TestMenu = ({ onStart }: TestMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(loadTestProgress());
  }, []);

  const goTo = (test: TestInfo) => {
    if (location.pathname === test.path) {
      onStart?.();
    } else {
      navigate(test.path);
    }
  };

  const allCompleted = tests.every((test) => progress[test.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="shadow-quirona border-2">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Menú de tests</h1>
                <p className="text-muted-foreground">Selecciona el cuestionario que quieras hacer. Luego de completar uno, vuelve aquí para continuar con el siguiente.</p>
              </div>

              <div className="grid gap-3">
                {tests.map((test) => {
                  const completed = progress[test.id];
                  return (
                    <div
                      key={test.id}
                      className={`w-full rounded-xl border p-4 transition-all ${
                        location.pathname === test.path
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold">{test.title}</p>
                          <p className="text-sm text-muted-foreground">{test.small}</p>
                          <span className={`text-xs font-semibold uppercase px-2 py-1 rounded-full ${completed ? "bg-emerald-100 text-emerald-700" : "bg-muted/40 text-muted-foreground"}`}>
                            {completed ? "Completado" : "Pendiente"}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="min-w-[112px]"
                          onClick={() => goTo(test)}
                        >
                          Iniciar
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="gradient-primary text-white px-8 py-3 text-base"
                  disabled={!allCompleted}
                >
                  ¡Todo listo! Ir a los módulos
                </Button>
                {!allCompleted && (
                  <p className="text-xs text-muted-foreground text-center">Completa todos los tests para desbloquear el acceso a los módulos.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
