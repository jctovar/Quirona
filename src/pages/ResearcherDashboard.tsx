import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  CheckCircle, 
  Download, 
  Search,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface ResearcherUser {
  id: string;
  username: string | null;
  created_at: string | null;
}

const ResearcherDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [researcherName, setResearcherName] = useState("Investigador");
  const [stats, setStats] = useState({ totalUsers: 0, totalModulesCompleted: 0 });
  const [userList, setUserList] = useState<ResearcherUser[]>([]);

  useEffect(() => {
    const checkRoleAndFetchData = async () => {
      try {
        setLoading(true);

        // 1. Validar Sesión y Rol
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { navigate("/"); return; }

        const { data: profile } = await supabase
          .from('profiles')
          .select('username, role')
          .eq('id', user.id)
          .single();

        if (profile?.role !== 'researcher') {
          toast.error("Acceso denegado. Esta sección es solo para investigadores.");
          navigate("/dashboard");
          return;
        }
        setResearcherName(profile.username || "Investigador");

        // 2. Obtener Estadísticas Globales
        // Contar usuarias (solo las que tienen rol 'user')
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'user');

        // Suma total de módulos terminados por todas las usuarias
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('m1_closure, m2_closure, m3_closure, m4_closure');

        const totalCompleted = progressData?.reduce((acc, curr) => {
          let count = 0;
          if (curr.m1_closure) count++;
          if (curr.m2_closure) count++;
          if (curr.m3_closure) count++;
          if (curr.m4_closure) count++;
          return acc + count;
        }, 0);

        // 3. Lista de usuarias para la tabla
        const { data: users } = await supabase
          .from('profiles')
          .select('id, username, created_at')
          .eq('role', 'user')
          .order('created_at', { ascending: false });

        setStats({ 
          totalUsers: userCount || 0, 
          totalModulesCompleted: totalCompleted || 0 
        });
        setUserList(users || []);

      } catch (error) {
        console.error("Error en Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    checkRoleAndFetchData();
    const checkResearcherAccess = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { navigate("/"); return; }

        const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

        // Si es una usuaria normal, no tiene nada que hacer aquí
        if (profile?.role !== 'researcher') {
        toast.error("No tienes permisos para acceder a esta sección.");
        navigate("/dashboard");
        }
    };
    checkResearcherAccess();
  }, [navigate]);

  // Función para exportar a CSV (Excel)
  const handleExportCSV = async () => {
    try {
      const [progressResult, profilesResult] = await Promise.all([
        supabase
          .from('user_progress')
          .select('id, progress_percentage, m1_closure, m2_closure, m3_closure, m4_closure'),
        supabase
          .from('profiles')
          .select('id, username')
          .eq('role', 'user'),
      ]);

      if (progressResult.error) throw progressResult.error;
      if (profilesResult.error) throw profilesResult.error;

      const names = new Map(
        (profilesResult.data ?? []).map((profile) => [profile.id, profile.username]),
      );

      const headers = "Nombre,Progreso %,M1,M2,M3,M4\n";
      const rows = (progressResult.data ?? []).map(r => (
        `${names.get(r.id) ?? "Sin nombre"},${r.progress_percentage},${r.m1_closure ? 'Si':'No'},${r.m2_closure ? 'Si':'No'},${r.m3_closure ? 'Si':'No'},${r.m4_closure ? 'Si':'No'}`
      )).join("\n");

      const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "reporte_investigacion.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      toast.error("Error al generar el reporte");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar isAuthenticated username={researcherName} />

      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-10">
          
          {/* 1. BIENVENIDA */}
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              ¡Bienvenido, {researcherName}!
            </h1>
            <p className="text-xl text-muted-foreground">Panel de gestión e investigación de la plataforma.</p>
          </div>

          {/* 2. FICHAS DE RESUMEN */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 shadow-quirona bg-card">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                  <Users className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Usuarias registradas</p>
                  <p className="text-4xl font-bold">{stats.totalUsers}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-quirona bg-card">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="p-4 bg-green-100 rounded-2xl text-green-600">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Módulos completados (Suma)</p>
                  <p className="text-4xl font-bold">{stats.totalModulesCompleted}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 4. ACCIONES (Excel) */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button onClick={handleExportCSV} className="gradient-primary text-white px-6 py-6 h-auto">
              <Download className="mr-2 w-5 h-5" /> Descargar reporte Excel
            </Button>
          </div>

          {/* 3. LISTA DE USUARIAS */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Search className="w-6 h-6 text-primary" /> Detalle por usuaria
            </h2>
            <div className="grid gap-4">
              {userList.map((user) => (
                <Card key={user.id} className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div>
                      <h3 className="text-lg font-bold">{user.username}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.created_at
                          ? `Registro: ${new Date(user.created_at).toLocaleDateString("es-MX")}`
                          : "Sin fecha de registro"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResearcherDashboard;