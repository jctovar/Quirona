import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de validación
    // 1. Validación de Frontend
    if (!formData.username || !formData.password) {
    toast.error("Por favor ingresa tu correo y contraseña.");
    return;
    }

    try {
        // 2. Llamada a Supabase Auth para iniciar sesión
        const { error } = await supabase.auth.signInWithPassword({
            email: formData.username, // Usa el campo 'username' como email
            password: formData.password,
        });

        if (error) {
            // Lanza el error para que el bloque 'catch' lo maneje.
            throw error; 
        }
        // 3. Éxito y Redirección
        toast.success("¡Bienvenida a QUIRONA!");
        setTimeout(() => navigate("/dashboard"), 1000);

    } catch (error: any) {
        // 4. Manejo de Errores de Autenticación
        // Usamos un mensaje genérico por seguridad
        let errorMessage = "Error en el inicio de sesión. Verifica tu correo y contraseña.";
        
        console.error("Supabase Login Error:", error.message);
        toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
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
                  <Label htmlFor="username">Usuario</Label>
                  <Input
                    id="usarname"
                    type="email"
                    placeholder="tu_email@ejemplo.com"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="text-right">
                  <Link to="/recover-password" className="text-sm text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <Button type="submit" className="w-full h-11 gradient-primary transition-quirona hover:opacity-90">
                  Iniciar sesión
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
