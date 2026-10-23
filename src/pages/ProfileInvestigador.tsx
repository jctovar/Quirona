import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Settings, Mail, Lock } from "lucide-react";

const ProfileInvestigador = () => {
  const navigate = useNavigate();

  // Datos simulados
  const [researcher, setResearcher] = useState({
    username: "Investigador",
    email: "investigador@ejemplo.com",
  });

  const [formData, setFormData] = useState({
    email: researcher.email,
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

    setResearcher({ ...researcher, email: formData.email });
    toast.success("Correo actualizado correctamente");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    toast.success("Contraseña actualizada correctamente");

    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">


      <div className="pt-48 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Perfil del Investigador</h1>
            <p className="text-muted-foreground">
              Administra tu cuenta y credenciales
            </p>
          </div>

          <div className="space-y-6">

            {/* Información */}
            <Card className="shadow-quirona border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Información del perfil</CardTitle>
                    <CardDescription>Datos básicos del investigador</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Nombre</Label>
                  <p className="font-medium mt-1">{researcher.username}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Correo</Label>
                  <p className="font-medium mt-1">{researcher.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Cambiar correo */}
            <Card className="shadow-quirona border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Cambiar correo</CardTitle>
                    <CardDescription>Actualiza tu correo electrónico</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleUpdateEmail} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Nuevo correo</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <Button type="submit" className="gradient-primary">
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
                    <CardDescription>Actualiza tu contraseña</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div>
                    <Label>Contraseña actual</Label>
                    <Input
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, currentPassword: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>Nueva contraseña</Label>
                    <Input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, newPassword: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>Confirmar contraseña</Label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                    />
                  </div>

                  <Button type="submit" className="gradient-primary">
                    Actualizar contraseña
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Logout */}
            <Card className="border-2 border-destructive/20">
              <CardContent className="pt-6 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Cerrar sesión</h3>
                  <p className="text-sm text-muted-foreground">
                    Sal de tu cuenta
                  </p>
                </div>

                <Button variant="destructive" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInvestigador;