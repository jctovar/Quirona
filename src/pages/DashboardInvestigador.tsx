import { useState, useEffect } from "react";
import { NavbarInvestigador } from "@/components/NavbarInvestigador";
import { MessageSquare, Mail, Download, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Comment {
  id?: number;
  userId?: string;
  userName: string;
  comment: string;
  date: string;
  createdAt?: string;
}

interface TestDownload {
  id: number;
  name: string;
  module: string;
  description: string;
}

interface Statistic {
  name: string;
  value: string;
}

const DashboardInvestigador = () => {
  const navigate = useNavigate();
  const [username] = useState("Investigador");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estadísticas
  const statistics: Statistic[] = [
    { name: "Usuarias registradas", value: "245" },
    { name: "Módulos completados", value: "892" },
  ];

  // Tests disponibles para descargar
  const testsDownload: TestDownload[] = [
    { id: 1, name: "Test de Salud General", module: "Inicial", description: "Evaluación de salud general y bienestar" },
    { id: 2, name: "Inventario de Ansiedad", module: "Inicial", description: "Medición de niveles de ansiedad" },
    { id: 3, name: "Escala de Asertividad", module: "Inicial", description: "Evaluación de habilidades asertivas" },
    { id: 4, name: "Test de Experiencias Adversas", module: "Inicial", description: "Registro de eventos adversos" },
    { id: 5, name: "Red Semántica", module: "Inicial", description: "Análisis de redes semánticas conceptuales" },
  ];

  const handleDownloadTest = (testName: string) => {
    toast.success(`Descargando ${testName}...`);

  };

  useEffect(() => {

    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setIsLoading(true);

      const mockComments: Comment[] = [
        {
          id: 1,
          userName: "María G.",
          comment: "El módulo 2 me ayudó mucho a entender mis derechos.",
          date: "25/04/2026",
          createdAt: "2026-04-25T10:30:00Z",
        },
        {
          id: 2,
          userName: "Ana L.",
          comment: "Gracias por este espacio de aprendizaje.",
          date: "24/04/2026",
          createdAt: "2026-04-24T15:45:00Z",
        },
        {
          id: 3,
          userName: "Sofia R.",
          comment: "Sugiero más ejemplos en el módulo 3.",
          date: "23/04/2026",
          createdAt: "2026-04-23T09:15:00Z",
        },
      ];
      setComments(mockComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              ¡Bienvenido, {username}!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Panel de investigación. Consulta estadísticas, descarga tests y revisa el buzón de usuarias.
            </p>
          </div>

          {/* Estadísticas rápidas */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-quirona border-2 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{stat.name}</span>
                  </div>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Descargas de Tests */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-card rounded-2xl p-8 shadow-quirona border-2">
              <div className="flex items-center gap-3 mb-6">
                <Download className="h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold">Descargar Tests</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Descarga los datos en formato Excel de los tests iniciales que responden las usuarias al comenzar los módulos.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testsDownload.map((test) => (
                  <div key={test.id} className="bg-muted/30 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold mb-2">{test.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {test.module}
                      </span>
                      <button
                        onClick={() => handleDownloadTest(test.name)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-lg transition-colors"
                        title={`Descargar ${test.name}`}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buzón de usuarias - Sección principal */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-quirona border-2">
              <div className="flex items-center gap-3 mb-8">
                <Mail className="h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold">Buzón de Usuarias</h2>
              </div>

              {/* Comentarios */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <p className="text-muted-foreground">Cargando comentarios...</p>
                  </div>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl hover:shadow-md transition-shadow">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">
                          {comment.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <span className="font-medium">{comment.userName}</span>
                          <span className="text-sm text-muted-foreground flex-shrink-0">{comment.date}</span>
                        </div>
                        <p className="text-muted-foreground break-words">{comment.comment}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MessageSquare className="h-12 w-12 text-muted/40 mb-4" />
                    <p className="text-muted-foreground">No hay comentarios en el buzón aún</p>
                  </div>
                )}
              </div>

              {/* Botón para cargar más o recargar */}
              <button
                onClick={fetchComments}
                disabled={isLoading}
                className="mt-8 w-full btn-secondary py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? "Cargando..." : "Recargar comentarios"}
              </button>
            </div>
                </div>
              </div>
            </div>
          </div>
  );
};

export default DashboardInvestigador;
