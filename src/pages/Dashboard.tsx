import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ModuleCard } from "@/components/ModuleCard";
import { BookOpen, Shield, Heart, Users, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Usuario");
  const [overallProgress, setOverallProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // 1. Obtener el usuario actual
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          navigate("/");
          return;
        }

        // Intentar obtener el nombre del usuario desde metadata
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || "Usuario";
        setUsername(name);

        // 2. Consultar el progreso en la tabla user_progress
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('progress_percentage')
          .eq('id', user.id)
          .single();

        if (progressError && progressError.code !== 'PGRST116') {
          console.error("Error al obtener progreso:", progressError);
        }

        // 3. Actualizar el estado con el porcentaje real de la base de datos
        if (progressData) {
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast.success("Sesión cerrada correctamente");
      navigate("/");
    } else {
      toast.error("Error al cerrar sesión");
    }
  };

  const handleModuleClick = (moduleName: string, moduleIndex: number) => {
    const routes = ["/module-1", "/module-2", "/module-3", "/module-4"];
    if (routes[moduleIndex]) {
      navigate(routes[moduleIndex]);
    } else {
      toast.info(`Módulo: ${moduleName} (próximamente disponible)`);
    }
  };

  const modules = [
    {
      title: "Ginecología preventiva",
      description: "Aprende los conceptos básicos sobre salud ginecológica y la importancia de la prevención en tu bienestar.",
      author: "Javier Darío Ríos Castillo",
      icon: BookOpen,
    },
    {
      title: "Estándares de atención en consulta ginecológica",
      description: "Conoce qué esperar de una consulta ginecológica de calidad, respetuosa y centrada en tus necesidades.",
      author: "Aline Gonzalez Castro",
      icon: Shield,
    },
    {
      title: "¿Qué es la violencia ginecológica?",
      description: "Identifica situaciones de violencia ginecológica y aprende a reconocer tus derechos como paciente.",
      author: "Javier Darío Ríos Castillo",
      icon: Heart,
    },
    {
      title: "Responder a la violencia ginecológica",
      description: "Descubre los recursos y acciones que puedes tomar si experimentas violencia ginecológica.",
      author: "Alfonso Mendoza",
      icon: Users,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar 
        isAuthenticated 
        username={username}
        onLogout={handleLogout}
      />
      
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
          </div>

          {/* Grid de Módulos */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Módulos educativos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <ModuleCard
                  key={index}
                  title={module.title}
                  description={module.description}
                  author={module.author}
                  icon={module.icon}
                  onClick={() => handleModuleClick(module.title, index)}
                />
              ))}
            </div>
          </div>

          {/* SECCIÓN DE PROGRESO CONECTADA */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-card rounded-2xl p-8 shadow-quirona border-2">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xl font-bold">Tu progreso general</h3>
                <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
              </div>
              
              <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden border">
                {/* IMPORTANTE: Se eliminó la clase 'w-0' para que el style 
                  tenga control total sobre el ancho 
                */}
                <div 
                  className="h-full gradient-primary transition-all duration-1000 ease-out" 
                  style={{ width: `${overallProgress}%` }}
                />
              </div>

              <p className="text-sm text-muted-foreground mt-4 italic">
                {overallProgress === 0 
                  ? "Comienza tu primer módulo para ver tu progreso aquí." 
                  : overallProgress === 100 
                  ? "¡Felicidades! Has completado todos los módulos."
                  : "Sigue así, estás cada vez más cerca de completar tu formación."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;