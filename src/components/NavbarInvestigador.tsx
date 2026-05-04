import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { User, Menu, Mail, Facebook, Instagram, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

interface NavbarInvestigadorProps {
  isAuthenticated?: boolean;
  username?: string;
  onLogout?: () => void;
}

export const NavbarInvestigador = ({ isAuthenticated = false, username, onLogout }: NavbarInvestigadorProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useState(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem("isAuthenticated");
      setAuth(saved === "true");
    }
  }, [isAuthenticated]);

  const isActive = (path: string) => location.pathname === path;

  // Menú del investigador
  const menuItems = auth ? [
    { to: "/researcher/perfilInvestigador", label: "Panel" },
  ] : [
    { to: "/quienes-somos", label: "¿Quiénes somos?" },
    { to: "/contenidos", label: "Contenidos" },
    { to: "/preguntas", label: "Preguntas frecuentes" },
    { to: "/blog", label: "Blog" },
    { to: "/trabajos", label: "Trabajos de investigación" },
  ];
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Barra superior teal */}
      <div className="bg-primary h-3"></div>
      
      {/* Contenedor principal del header */}
      <div className="bg-background border-b border-border">
        
        

        {/* Línea decorativa primary */}
        <div className="h-0.5 bg-primary"></div>

        {/* Fila principal: logo y navegación */}
        <div className={`container mx-auto px-4 py-2} flex items-center justify-between`}>
          {/* Logo grande */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Quirona Logo"
              className={ "h-24 md:h-40 w-40" }
            />
          </Link>

          {/* Menú Desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {auth ? (
              // Menú del investigador autenticado
              <>
                
                <Link
                  to="/researcher/perfilInvestigador"
                  className={`text-sm font-semibold uppercase tracking-wide transition-all hover:text-primary ${
                    isActive("/researcher/perfilInvestigador") ? "text-primary" : "text-foreground"
                  }`}
                >
                  Panel
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-sm font-semibold uppercase tracking-wide gap-1">
                      Módulos <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to="/researcher/module-1">Módulo 1: Ginecología preventiva</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/researcher/module-2">Módulo 2: Estándares de atención</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/researcher/module-3">Módulo 3: Violencia ginecológica</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/researcher/module-4">Módulo 4: Responder a violencia</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link
                  to="/researcher/profileInvestigador"
                  className={`text-sm font-semibold uppercase tracking-wide transition-all hover:text-primary ${
                    isActive("/researcher/profileInvestigador") ? "text-primary" : "text-foreground"
                  }`}
                >
                  Perfil
                </Link>
              </>
            ) : (
              // Menú no autenticado
              menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-semibold uppercase tracking-wide transition-all hover:text-primary ${
                    isActive(item.to) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))
            )}
            
           
          </div>

          {/* Menú Mobile - Hamburguesa */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                {auth ? (
                  // Menú mobile del investigador
                  <>
                    <Link
                      to="/researcher/perfilInvestigador"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-quirona hover:text-primary ${
                        isActive("/researcher/perfilInvestigador") ? "text-primary" : "text-foreground"
                      }`}
                    >
                      Panel
                    </Link>
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">MÓDULOS</p>
                      <div className="flex flex-col gap-2">
                        <Link to="/researcher/module-1" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">
                          Módulo 1
                        </Link>
                        <Link to="/researcher/module-2" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">
                          Módulo 2
                        </Link>
                        <Link to="/researcher/module-3" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">
                          Módulo 3
                        </Link>
                        <Link to="/researcher/module-4" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">
                          Módulo 4
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  // Menú mobile no autenticado
                  menuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-quirona hover:text-primary ${
                        isActive(item.to) ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))
                )}
    
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout?.();
                      }}
                    >
                      Cerrar sesión
                    </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};