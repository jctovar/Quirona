import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

/**
 * Inicio de sesión con Supabase.
 *
 * Flujo:
 * 1. Validar que correo y contraseña no estén vacíos.
 * 2. Autenticar con `signInWithPassword`.
 * 3. Consultar el rol en `profiles`.
 * 4. Redirigir al panel de investigación o al inicio del recorrido de usuaria.
 *
 * Si la consulta del perfil falla, se prioriza no bloquear a la persona y se
 * envía al flujo de usuaria.
 */
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "", // El campo se llama username por legado, pero contiene el email.
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación local para evitar una petición innecesaria a Supabase.
    if (!formData.username || !formData.password) {
      toast.error("Por favor ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.username,
      password: formData.password,
    });

    if (error) {
      // Supabase devuelve mensajes distintos para correo sin confirmar y para
      // credenciales inválidas; se traducen para no mostrar texto técnico.
      if (error.message === "Email not confirmed") {
        toast.error("Por favor, confirma tu correo electrónico para poder entrar.");
      } else if (error.message === "Invalid login credentials") {
        toast.error("El correo o la contraseña son incorrectos.");
      } else {
        toast.error(error.message);
      }
      setLoading(false);
      return;
    }

    if (data.user) {
      try {
        // El rol vive en `profiles`, no en los metadatos de Auth. La RLS
        // permite leer la propia fila.
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        if (profile?.role === 'researcher') {
          toast.success("¡Bienvenido al panel de investigación!");
          // Pequeña pausa para que el toast sea visible antes de navegar.
          setTimeout(() => navigate("/researcher-dashboard"), 1000);
        } else {
          toast.success("¡Bienvenida de nuevo a QUIRONA!");
          setTimeout(() => navigate("/initial-question"), 1000);
        }

      } catch (err) {
        console.error("Error al obtener el perfil:", err);
        // Ante un fallo de perfil se evita dejar a la persona en el login.
        navigate("/initial-question");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      
      <div className="pt-96 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-quirona border-2">
            <CardHeader className="space-y-1 text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">👋</span>
              </div>
              <CardTitle className="text-3xl font-bold">Bienvenida de nuevo</CardTitle>
              <CardDescription className="text-base">
                Ingresa tus credenciales para continuar tu aprendizaje
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Correo electrónico</Label>
                  <Input
                    id="username"
                    type="email"
                    placeholder="tu_email@ejemplo.com"
                    value={formData.username}
                    onChange={handleChange}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Tu contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-11"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading} // Evita múltiples clics
                  className="w-full h-11 gradient-primary transition-quirona hover:opacity-90"
                >
                  {loading ? "Verificando..." : "Iniciar sesión"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                  <Link to="/register" className="text-primary hover:underline font-medium">
                    Regístrate aquí
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;