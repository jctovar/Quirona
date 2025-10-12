import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PlayCircle } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    nationality: "",
    curp: "",
    email: "",
    tutorEmail1: "",
    tutorEmail2: "",
    password: "",
    confirmPassword: "",
  });

  const handleVideoWatched = () => {
    setShowVideo(false);
    toast.success("¡Excelente! Ahora completa tu registro");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.username || !formData.email || !formData.password || !formData.tutorEmail1) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    toast.success("¡Registro exitoso! Redirigiendo...");
    setTimeout(() => navigate("/initial-question"), 1500);
  };

  if (showVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Navbar />
        
        <div className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="shadow-quirona border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Bienvenida a QUIRONA</CardTitle>
                <CardDescription className="text-base">
                  Antes de comenzar, mira este breve video informativo sobre violencia ginecológica
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <PlayCircle className="w-20 h-20 mx-auto text-primary" />
                    <p className="text-muted-foreground">Video informativo sobre violencia ginecológica</p>
                    <p className="text-sm text-muted-foreground">(Aquí se mostraría el video educativo)</p>
                  </div>
                </div>

                <Button 
                  onClick={handleVideoWatched}
                  className="w-full gradient-primary transition-quirona hover:opacity-90"
                  size="lg"
                >
                  He visto el video, continuar con el registro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-quirona border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Crear tu cuenta</CardTitle>
              <CardDescription className="text-base">
                Completa el formulario para unirte a QUIRONA
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Nombre de usuario *</Label>
                    <Input
                      id="username"
                      placeholder="Elige tu nombre de usuario"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nacionalidad *</Label>
                    <Input
                      id="nationality"
                      placeholder="Tu nacionalidad"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="curp">CURP *</Label>
                  <Input
                    id="curp"
                    placeholder="Tu CURP"
                    value={formData.curp}
                    onChange={(e) => setFormData({ ...formData, curp: e.target.value.toUpperCase() })}
                    maxLength={18}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Tu correo electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu.email@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tutorEmail1">Correo de tutor 1 *</Label>
                  <Input
                    id="tutorEmail1"
                    type="email"
                    placeholder="tutor1@ejemplo.com"
                    value={formData.tutorEmail1}
                    onChange={(e) => setFormData({ ...formData, tutorEmail1: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tutorEmail2">Correo de tutor 2 (opcional)</Label>
                  <Input
                    id="tutorEmail2"
                    type="email"
                    placeholder="tutor2@ejemplo.com"
                    value={formData.tutorEmail2}
                    onChange={(e) => setFormData({ ...formData, tutorEmail2: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Crea una contraseña"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirma tu contraseña"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-primary transition-quirona hover:opacity-90"
                  size="lg"
                >
                  Crear cuenta
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Inicia sesión aquí
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

export default Register;
