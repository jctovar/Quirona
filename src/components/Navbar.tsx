import { Link, useLocation } from "react-router-dom";
import  logo  from "../assets/logo.jpeg";
import { Button } from "./ui/button";
import { User, Menu, X } from "lucide-react";
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
    { to: "/quienes-somos", label: "Quiénes somos" },
    { to: "/preguntas", label: "Preguntas frecuentes" },
    { to: "/contenidos", label: "Contenidos" },
    { to: "/trabajos", label: "Trabajos" },
  ] : [
    { to: "/dashboard", label: "Página Principal" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo - Más grande */}
        <Link to="/" className="w-1/4 flex-shrink-0">
          <img src={logo} alt="Quirona Logo" className="h-20 w-auto" />
        </Link>

        {/* Menú Desktop */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm font-medium transition-quirona hover:text-primary ${
                isActive(item.to) ? "text-primary" : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline" className="transition-quirona">
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button className="gradient-primary transition-quirona hover:opacity-90">
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
