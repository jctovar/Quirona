import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { User, Menu, Mail, Facebook, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

interface NavbarProps {
  isAuthenticated?: boolean;
  username?: string;
  onLogout?: () => void;
}

export const Navbar = ({ isAuthenticated = false, username, onLogout }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useState(isAuthenticated);

  // 🔥 Detectar sesión REAL
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuth(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔥 Detectar tipo de usuario (temporal por ruta)
  const isResearcher = location.pathname.startsWith("/researcher");

  const role = !auth
    ? "guest"
    : isResearcher
    ? "researcher"
    : "user";

  const isActive = (path: string) => location.pathname === path;

  // 🔥 MENÚ DINÁMICO
  const menuItems =
  role === "guest"
    ? [
        { to: "/quienes-somos", label: "¿Quiénes somos?" },
        { to: "/contenidos", label: "Contenidos" },
        { to: "/preguntas", label: "Preguntas frecuentes" },
        { to: "/blog", label: "Blog" },
        { to: "/trabajos", label: "Trabajos de investigación" },
      ]
    : role === "user"
    ? [
        { to: "/dashboard", label: "Página Principal" },
      ]
    : [
        { to: "/researcher/perfilInvestigador", label: "Panel" },

        { to: "/researcher/module-1", label: "Módulo 1" },
        { to: "/researcher/module-2", label: "Módulo 2" },
        { to: "/researcher/module-3", label: "Módulo 3" },
        { to: "/researcher/module-4", label: "Módulo 4" },

        { to: "/researcher/profileInvestigador", label: "Perfil" },
      ];
  // 🔥 LOGOUT REAL
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuth(false);
    onLogout?.();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-primary h-3"></div>

      <div className="bg-background border-b border-border">
        
        {/* SOLO VISITANTE */}
        {role === "guest" && (
          <div className="container mx-auto px-4 py-2 flex items-center justify-between border-b border-border/50">
            <div className="flex items-center gap-2 text-primary">
              <Mail className="w-4 h-4" />
              <a href="mailto:quirona@iztacala.unam.mx" className="text-lg font-medium hover:underline">
                quirona@iztacala.unam.mx
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-primary mr-2">SÍGUENOS</span>
              <Facebook className="w-5 h-5" />
              <Instagram className="w-5 h-5" />
            </div>
          </div>
        )}

        <div className="h-0.5 bg-primary"></div>

        <div className={`container mx-auto px-4 ${auth ? "py-2" : "py-4"} flex items-center justify-between`}>
          
          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Quirona Logo"
              className={auth ? "h-24 md:h-40 w-40" : "h-56 md:h-90 w-90"}
            />
          </Link>

          {/* DESKTOP */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-semibold uppercase tracking-wide transition-all hover:text-primary ${
                  isActive(item.to) ? "text-primary" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* BOTONES DERECHA */}
            {role === "guest" ? (
              <>
                <Link to="/login">
                  <Button variant="ghost">Iniciar sesión</Button>
                </Link>
                <Link to="/register">
                  <Button className="gradient-primary">Registrarse</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <User className="w-4 h-4" />
                    {role === "researcher" ? "Investigador" : username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      to={
                        role === "researcher"
                          ? "/researcher/profileInvestigador"
                          : "/profile"
                      }
                    >
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* MOBILE */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {role === "guest" ? (
                  <>
                    <Link to="/login">
                      <Button className="w-full">Iniciar sesión</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full gradient-primary">Registrarse</Button>
                    </Link>
                  </>
                ) : (
                  <Button onClick={handleLogout} variant="destructive">
                    Cerrar sesión
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};