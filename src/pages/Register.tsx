import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PlayCircle, Heart, Stethoscope, Users, HandHeart } from "lucide-react";

type RegistrationStep = 'selection' | 'video' | 'form';

const programs = [
  {
    id: 'adolescentes',
    title: 'Prevención de Violencia Ginecológica',
    description: 'Para adolescentes y mujeres jóvenes',
    icon: Heart,
    available: true,
  },
  {
    id: 'profesionales',
    title: 'Sensibilización sobre violencias de género',
    description: 'Para estudiantes de enfermería y medicina',
    icon: Stethoscope,
    available: false,
  },
  {
    id: 'padres',
    title: 'Orientación a padres y madres de familia',
    description: 'Para padres de familia',
    icon: Users,
    available: false,
  },
  {
    id: 'apoyo',
    title: 'Capacitación para grupos de apoyo comunitario',
    description: 'Para dulas, matronas, parteras y profesionales',
    icon: HandHeart,
    available: false,
  },
];

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<RegistrationStep>('selection');
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

  const handleProgramSelect = (programId: string) => {
    if (programId === 'adolescentes') {
      setStep('video');
      toast.success("¡Programa seleccionado! Ahora mira el video de bienvenida");
    } else {
      toast.info("Este programa estará disponible próximamente");
    }
  };

  const handleVideoWatched = () => {
    setStep('form');
    toast.success("¡Excelente! Ahora completa tu registro");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    
    console.log("Datos de registro listos:", formData);
    
    toast.success("¡Registro exitoso! Redirigiendo a la verificación de email. (Simulación)");
    
    setTimeout(() => navigate("/Login"), 1500); 
  };

  // Paso 1: Selección de programa
  if (step === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Navbar />
        
        <div className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="shadow-quirona border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Registro a nuestra plataforma de programas</CardTitle>
                <CardDescription className="text-base mt-4">
                  Para iniciar, es importante que conozcas{" "}
                  <Link 
                    to="/contenidos" 
                    className="text-primary font-semibold hover:underline"
                  >
                    nuestros contenidos
                  </Link>
                  , una vez identificado el programa que más te interesa, selecciónalo de entre los programas disponibles.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {programs.map((program) => {
                    const IconComponent = program.icon;
                    return (
                      <button
                        key={program.id}
                        onClick={() => handleProgramSelect(program.id)}
                        className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                          program.available
                            ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10 hover:shadow-lg hover:scale-[1.02] cursor-pointer'
                            : 'border-muted bg-muted/30 opacity-60 cursor-not-allowed grayscale'
                        }`}
                        disabled={!program.available}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            program.available 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            <IconComponent className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold text-lg mb-1 ${
                              program.available ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {program.title}
                            </h3>
                            <p className={`text-sm ${
                              program.available ? 'text-muted-foreground' : 'text-muted-foreground/70'
                            }`}>
                              {program.description}
                            </p>
                            {!program.available && (
                              <span className="inline-block mt-2 text-xs bg-muted px-2 py-1 rounded">
                                Próximamente
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="text-center text-sm text-muted-foreground pt-4">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Inicia sesión aquí
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Paso 2: Video de bienvenida
  if (step === 'video') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Navbar />
        
        <div className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="shadow-quirona border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Bienvenida a Quirona UNAM</CardTitle>
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

                <Button 
                  variant="ghost"
                  onClick={() => setStep('selection')}
                  className="w-full"
                >
                  ← Volver a selección de programa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Paso 3: Formulario de registro
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
