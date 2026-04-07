import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient"; // 1. Importamos la conexión

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado para deshabilitar el botón mientras carga
  const [formData, setFormData] = useState({
    username: "", // Usaremos este campo como el email
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 2. Función convertida a ASYNC para esperar la respuesta de Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de Frontend
    if (!formData.username || !formData.password) {
      toast.error("Por favor ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    // 3. LLAMADA REAL A SUPABASE
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.username, // Pasamos el 'username' del estado como email
      password: formData.password,
    });

    if (error) {
      // Manejo de errores comunes
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

    // 4. Si llegamos aquí, el inicio de sesión fue exitoso
    if (data.user) {
      toast.success("¡Bienvenida de nuevo a QUIRONA!");
      // Quitamos el localStorage manual, Supabase gestiona la sesión por nosotros
      setTimeout(() => navigate("/initial-question"), 1000);
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

                <div className="text-right">
                  <Link to="/recover-password" className="text-sm text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
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
                  <Link to="/Register" className="text-primary hover:underline font-medium">
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