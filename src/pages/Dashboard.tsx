import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ModuleCard } from "@/components/ModuleCard";
import { BookOpen, Shield, Heart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username] = useState("Usuario"); // Simulated username

  const handleLogout = () => {
    toast.success("Sesión cerrada correctamente");
    setTimeout(() => navigate("/"), 1000);
  };

  const handleModuleClick = (moduleName: string, moduleIndex: number) => {
    if (moduleIndex === 0) {
      navigate("/module-1");
    } else if (moduleIndex === 1) {
      navigate("/module-2");
    }else if (moduleIndex === 2) {
      navigate("/module-3");
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
      author:"Javier Darío Ríos Castillo",
      icon: Heart,
    },
    {
      title: "Respuestas ante la violencia ginecológica",
      description: "Descubre los recursos y acciones que puedes tomar si experimentas violencia ginecológica.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar 
        isAuthenticated 
        username={username}
        onLogout={handleLogout}
      />
      
      <div className="pt-96 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              ¡Hola, {username}!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bienvenida a tu espacio de aprendizaje. Explora los módulos educativos y 
              avanza a tu propio ritmo.
            </p>
          </div>

          {/* Módulos */}
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

          {/* Progress section (placeholder) */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-card rounded-2xl p-8 shadow-quirona border-2">
              <h3 className="text-xl font-bold mb-4">Tu progreso</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-primary w-0 transition-all duration-500" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">0%</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Comienza tu primer módulo para empezar tu aprendizaje
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
