import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Settings, Mail, Lock } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [username] = useState("Usuario"); // Simulated
  const [formData, setFormData] = useState({
    email: "usuario@ejemplo.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleLogout = () => {
    toast.success("Sesión cerrada correctamente");
    setTimeout(() => navigate("/"), 1000);
  };

  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Correo electrónico actualizado");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    toast.success("Contraseña actualizada correctamente");
    setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar 
        isAuthenticated 
        username={username}
        onLogout={handleLogout}
      />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Configuración</h1>
            <p className="text-muted-foreground">Administra tu cuenta y preferencias</p>
          </div>

          <div className="space-y-6">
            {/* Información de la cuenta */}
            <Card className="shadow-quirona border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Información de la cuenta</CardTitle>
                    <CardDescription>Tu información personal en QUIRONA</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Nombre de usuario</Label>
                    <p className="font-medium mt-1">{username}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Correo electrónico</Label>
                    <p className="font-medium mt-1">{formData.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actualizar correo */}
            <Card className="shadow-quirona border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Cambiar correo electrónico</CardTitle>
                    <CardDescription>Actualiza tu correo de contacto</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateEmail} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Nuevo correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nuevo.correo@ejemplo.com"
                    />
                  </div>
                  <Button type="submit" className="gradient-primary transition-quirona hover:opacity-90">
                    Actualizar correo
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Cambiar contraseña */}
            <Card className="shadow-quirona border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Cambiar contraseña</CardTitle>
                    <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña actual</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      placeholder="Tu contraseña actual"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva contraseña</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      placeholder="Tu nueva contraseña"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirma tu nueva contraseña"
                    />
                  </div>
                  <Button type="submit" className="gradient-primary transition-quirona hover:opacity-90">
                    Actualizar contraseña
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Cerrar sesión */}
            <Card className="shadow-quirona border-2 border-destructive/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Cerrar sesión</h3>
                    <p className="text-sm text-muted-foreground">
                      Sal de tu cuenta de manera segura
                    </p>
                  </div>
                  <Button variant="destructive" onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
