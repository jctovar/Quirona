import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { User, Menu, Mail, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const menuItems = !isAuthenticated ? [
    { to: "/quienes-somos", label: "¿Quiénes somos?" },
    { to: "/contenidos", label: "Contenidos" },
    { to: "/preguntas", label: "Preguntas frecuentes" },
    { to: "/trabajos", label: "Trabajos de investigación" },
  ] : [
    { to: "/dashboard", label: "Página Principal" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Barra superior teal */}
      <div className="bg-primary h-3"></div>
      
      {/* Contenedor principal del header */}
      <div className="bg-background border-b border-border">
        {/* Fila superior: email y redes sociales */}
        <div className="container mx-auto px-4 py-2 flex items-center justify-between border-b border-border/50">
          <div className="flex items-center gap-2 text-primary">
            <Mail className="w-4 h-4" />
            <a href="mailto:quirona@iztacala.unam.mx" className="text-lg font-medium hover:underline">
              quirona@iztacala.unam.mx
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-primary mr-2">SÍGUENOS</span>
            <a href="#" className="text-primary hover:opacity-80 transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-primary hover:opacity-80 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Línea decorativa primary */}
        <div className="h-0.5 bg-primary"></div>

        {/* Fila principal: logo y navegación */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo grande */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Quirona Logo" className="h-40 md:h-45 w-auto" />
          </Link>

          {/* Menú Desktop */}
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
            
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-sm font-semibold uppercase tracking-wide">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="gradient-primary text-sm font-semibold uppercase tracking-wide transition-quirona hover:opacity-90">
                    Registrarse
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <User className="w-4 h-4" />
                    {username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Configuración</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="text-destructive">
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                {menuItems.map((item) => (
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
                ))}
                
                {!isAuthenticated ? (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full transition-quirona">
                        Iniciar sesión
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full gradient-primary transition-quirona hover:opacity-90">
                        Registrarse
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Configuración
                      </Button>
                    </Link>
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
                  </>
                )}

                {/* Redes sociales en móvil */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <a href="#" className="text-primary hover:opacity-80">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-primary hover:opacity-80">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
