import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ModuleCard } from "@/components/ModuleCard";
import { BookOpen, Shield, Heart, Users, Loader2, ArrowRight, CheckCircle, MessageSquare, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

/**
 * Espejo de la fila de `user_progress`.
 *
 * Cada bandera representa un paso completado; `progress_percentage` lo calcula
 * un trigger de PostgreSQL a partir de estas columnas. Los nombres deben
 * coincidir exactamente con los que usa `updateProgress`.
 */
interface ProgressRecord {
  progress_percentage: number | null;
  m1_story: boolean | null;
  m1_intro: boolean | null;
  m1_quiz: boolean | null;
  m1_visit: boolean | null;
  m1_game: boolean | null;
  m1_feedback: boolean | null;
  m1_closure: boolean | null;
  m2_story: boolean | null;
  m2_intro: boolean | null;
  m2_quiz1: boolean | null;
  m2_visit: boolean | null;
  m2_game: boolean | null;
  m2_feedback: boolean | null;
  m2_quiz2: boolean | null;
  m2_closure: boolean | null;
  m3_story: boolean | null;
  m3_intro: boolean | null;
  m3_quiz: boolean | null;
  m3_visit: boolean | null;
  m3_representation: boolean | null;
  m3_game: boolean | null;
  m3_feedback: boolean | null;
  m3_closure: boolean | null;
  m4_story: boolean | null;
  m4_intro: boolean | null;
  m4_quiz: boolean | null;
  m4_visit: boolean | null;
  m4_game: boolean | null;
  m4_feedback: boolean | null;
  m4_closure: boolean | null;
}

/**
 * Panel principal de la usuaria.
 *
 * Responsabilidades:
 * - Expulsar a las cuentas de investigación hacia su panel.
 * - Cargar el nombre y el progreso desde Supabase.
 * - Calcular en qué paso debe reanudar cada módulo.
 * - Desbloquear los módulos en cascada (el cierre del anterior es requisito).
 * - Mostrar las evaluaciones finales cuando los cuatro módulos están cerrados.
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Usuario");
  const [overallProgress, setOverallProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [progressRecord, setProgressRecord] = useState<ProgressRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Guardia de acceso: las cuentas de investigación no deben ver el panel
    // de usuaria, aunque lleguen a la ruta escribiéndola a mano.
    const checkUserAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/"); return; }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'researcher') {
        navigate("/researcher-dashboard");
      }
    };
    checkUserAccess();

    const fetchUserData = async () => {
      try {
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/");
          return;
        }

        // El nombre visible vive en `profiles`; si el trigger de registro aún
        // no lo creó, se usan los metadatos de Auth como respaldo.
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        if (profile?.username) {
          setUsername(profile.username);
        } else {
          setUsername(user.user_metadata?.full_name || user.email?.split('@')[0] || "Usuario");
        }

        // Se traen todas las banderas porque el cálculo de reanudación y los
        // candados de los módulos necesitan el detalle completo.
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('id', user.id)
          .single();

        if (progressData) {
          setProgressRecord(progressData);
          setOverallProgress(progressData.progress_percentage || 0);
        }

      } catch (error) {
        console.error("Error en la carga del Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  /**
   * Devuelve la primera pantalla pendiente del módulo.
   *
   * El orden de las comprobaciones debe coincidir con el recorrido real de
   * `App.tsx`: historia (`/module-N`) → introducción → quiz → visita → juego →
   * feedback → cierre. Si no hay fila de progreso, se empieza por la historia.
   */
  const getResumeRoute = (moduleNum: number) => {
    if (!progressRecord) return `/module-${moduleNum}`;

    const p = progressRecord;
    if (moduleNum === 1) {
      if (!p.m1_story) return '/module-1';
      if (!p.m1_intro) return '/module-1-intro';
      if (!p.m1_quiz) return '/module-1-quiz';
      if (!p.m1_visit) return '/module-1-visit';
      if (!p.m1_game) return '/module-1-game';
      if (!p.m1_feedback) return '/module-1-feedback';
      if (!p.m1_closure) return '/module-1-closure';
      return '/module-1';
    }
    if (moduleNum === 2) {
      if (!p.m2_story) return '/module-2';
      if (!p.m2_intro) return '/module-2-intro';
      // El módulo 2 tiene dos quizzes: el inicial y el de refuerzo posterior
      // al feedback. Sus rutas no son simétricas (`quiz` y `game-2`).
      if (!p.m2_quiz1) return '/module-2-quiz';
      if (!p.m2_visit) return '/module-2-visit';
      if (!p.m2_game) return '/module-2-game';
      if (!p.m2_feedback) return '/module-2-feedback';
      if (!p.m2_quiz2) return '/module-2-game-2';
      if (!p.m2_closure) return '/module-2-closure';
      return '/module-2';
    }
    if (moduleNum === 3) {
      if (!p.m3_story) return '/module-3';
      if (!p.m3_intro) return '/module-3-intro';
      if (!p.m3_quiz) return '/module-3-quiz';
      if (!p.m3_visit) return '/module-3-visit';
      if (!p.m3_representation) return '/module-3-representation';
      if (!p.m3_game) return '/module-3-game';
      if (!p.m3_feedback) return '/module-3-feedback';
      if (!p.m3_closure) return '/module-3-closure';
      return '/module-3';
    }
    if (moduleNum === 4) {
      if (!p.m4_story) return '/module-4';
      if (!p.m4_intro) return '/module-4-intro';
      if (!p.m4_quiz) return '/module-4-quiz';
      if (!p.m4_visit) return '/module-4-visit';
      if (!p.m4_game) return '/module-4-game';
      if (!p.m4_feedback) return '/module-4-feedback';
      if (!p.m4_closure) return '/module-4-closure';
      return '/module-4';
    }
    return `/module-${moduleNum}-story`;
  };

  /** Cierra la sesión de Supabase y vuelve a la portada. */
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast.success("Sesión cerrada correctamente");
      navigate("/");
    } else {
      toast.error("Error al cerrar sesión");
    }
  };

  /**
   * Envía una sugerencia anónima al buzón de investigación.
   *
   * `user_id` se obtiene de la sesión, no de un campo del formulario, para que
   * la RLS pueda asociar el mensaje a la cuenta autenticada.
   */
  const sendSuggestion = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Tu sesión expiró. Vuelve a iniciar sesión.");
      return;
    }

    const { error } = await supabase
      .from('suggestions')
      .insert([{ user_id: user.id, message: suggestion }]);

    if (!error) {
      toast.success("¡Gracias! Tu mensaje ha sido enviado a los investigadores.");
      setSuggestion("");
      setIsModalOpen(false);
    } else {
      toast.error("No se pudo enviar la sugerencia. Inténtalo de nuevo.");
    }
  };

  /**
   * Gestiona el clic en una tarjeta de módulo.
   *
   * Desbloqueo en cascada:
   * - Módulo 1: siempre disponible.
   * - Módulos 2 a 4: requieren el cierre del módulo inmediatamente anterior.
   */
  const handleModuleClick = (index: number) => {
    const moduleNum = index + 1;
    const unlockRequirements = [
      true,
      progressRecord?.m1_closure === true,
      progressRecord?.m2_closure === true,
      progressRecord?.m3_closure === true,
    ];
    const isUnlocked = unlockRequirements[moduleNum - 1] ?? false;

    if (isUnlocked) {
      navigate(getResumeRoute(moduleNum));
    } else {
      toast.warning("Este módulo está bloqueado. Debes completar el anterior primero.");
    }
  };

  // Metadatos de las tarjetas. Los campos `isUnlocked` e `isCompleted` solo
  // controlan la presentación; la validación definitiva se repite en
  // `handleModuleClick` antes de navegar.
  const modules = [
    {
      title: "Ginecología preventiva",
      description: "Aprende los conceptos básicos sobre salud ginecológica y la importancia de la prevención en tu bienestar.",
      author: "Javier Darío Ríos Castillo",
      icon: BookOpen,
      isUnlocked: true,
      isCompleted: progressRecord?.m1_closure === true,
    },
    {
      title: "Estándares de atención en consulta ginecológica",
      description: "Conoce qué esperar de una consulta ginecológica de calidad, respetuosa y centrada en tus necesidades.",
      author: "Aline Gonzalez Castro",
      icon: Shield,
      isUnlocked: progressRecord?.m1_closure === true,
      isCompleted: progressRecord?.m2_closure === true,
    },
    {
      title: "¿Qué es la violencia ginecológica?",
      description: "Identifica situaciones de violencia ginecológica y aprende a reconocer tus derechos como paciente.",
      author: "Javier Darío Ríos Castillo",
      icon: Heart,
      isUnlocked: progressRecord?.m2_closure === true,
      isCompleted: progressRecord?.m3_closure === true,
    },
    {
      title: "Responder a la violencia ginecológica",
      description: "Descubre los recursos y acciones que puedes tomar si experimentas violencia ginecológica.",
      author: "Alfonso Mendoza",
      icon: Users,
      isUnlocked: progressRecord?.m3_closure === true,
      isCompleted: progressRecord?.m4_closure === true,
    },
  ];

  // Las evaluaciones finales se habilitan únicamente al cerrar el módulo 4.
  const allModulesCompleted = progressRecord?.m4_closure === true;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated username={username} onLogout={handleLogout} />
      
      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto">
          {/* Bienvenida */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              ¡Hola, {username}!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bienvenida a tu espacio de aprendizaje. Explora los módulos educativos y 
              avanza a tu propio ritmo.  
            </p>
            <br></br>
            <Button onClick={() => setIsModalOpen(true)} variant="outline" className="mb-4">
              <MessageSquare className="mr-2 w-4 h-4" /> Buzón de sugerencias
            </Button>
          </div>

          {/* Grid de Módulos */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Módulos educativos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <div key={index} className={!module.isUnlocked ? "opacity-60 grayscale-[0.5]" : ""}>
                  <ModuleCard
                    title={module.title}
                    description={module.description}
                    author={module.author}
                    icon={module.icon}
                    onClick={() => handleModuleClick(index)}
                  />
                  {!module.isUnlocked && (
                    <div className="flex items-center gap-2 mt-2 ml-2 text-xs text-muted-foreground font-medium">
                      <Lock className="w-3 h-3" /> Contenido bloqueado
                    </div>
                  )}
                  {module.isCompleted && (
                    <div className="flex items-center gap-2 mt-2 ml-2 text-xs text-green-600 font-medium">
                      <CheckCircle className="w-3 h-3" /> Módulo completado
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PROGRESO GENERAL */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-card rounded-2xl p-8 shadow-quirona border-2">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xl font-bold">Tu progreso general</h3>
                <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
              </div>
              <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden border">
                <div 
                  className="h-full gradient-primary transition-all duration-1000 ease-out" 
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4 italic">
                {overallProgress === 0 
                  ? "Comienza tu primer módulo para ver tu progreso aquí." 
                  : overallProgress >= 100 
                  ? "¡Felicidades! Has completado todos los módulos."
                  : "Sigue así, estás cada vez más cerca de completar tu formación."}
              </p>
            </div>
          </div>


          {/* BUZÓN */}
          {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Buzón de sugerencias</h3>
                <Textarea 
                  placeholder="Escribe aquí tus dudas o comentarios para los investigadores..."
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  className="min-h-[150px]"
                />
                <div className="flex gap-2">
                  <Button onClick={() => setIsModalOpen(false)} variant="ghost" className="flex-1">Cancelar</Button>
                  <Button onClick={sendSuggestion} className="flex-1 gradient-primary text-white">Enviar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}


          {/* TEST FINAL */}
          {allModulesCompleted && (
            <div className="max-w-6xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="bg-primary text-white p-1 rounded-lg">✨</span>
                Etapa Final: Evaluaciones de Cierre
              </h2>
              <Card className="border-2 border-primary/30 shadow-xl bg-gradient-to-r from-primary/5 to-transparent">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-primary">¡Felicidades por completar los 4 módulos!</h3>
                      <p className="text-muted-foreground max-w-md">
                        Has recorrido todo el programa formativo. Ahora, te invitamos a realizar 3 breves ejercicios finales para consolidar lo aprendido.
                      </p>
                    </div>
                    <Button 
                      onClick={() => navigate("/final-test-1")}
                      className="gradient-primary text-white px-10 py-7 text-lg shadow-lg hover:scale-105 transition-transform shrink-0"
                    >
                      Comenzar Evaluaciones
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;