import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  isAuthenticated?: boolean;
  username?: string;
  onLogout?: () => void;
}

export const Navbar = ({ isAuthenticated = false, username, onLogout }: NavbarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                to="/quienes-somos"
                className={`text-sm font-medium transition-quirona hover:text-primary ${
                  isActive("/quienes-somos") ? "text-primary" : "text-foreground"
                }`}
              >
                Quiénes somos
              </Link>
              <Link
                to="/preguntas"
                className={`text-sm font-medium transition-quirona hover:text-primary ${
                  isActive("/preguntas") ? "text-primary" : "text-foreground"
                }`}
              >
                Preguntas frecuentes
              </Link>
              <Link
                to="/contenidos"
                className={`text-sm font-medium transition-quirona hover:text-primary ${
                  isActive("/contenidos") ? "text-primary" : "text-foreground"
                }`}
              >
                Contenidos
              </Link>
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
            <>
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-quirona hover:text-primary ${
                  isActive("/dashboard") ? "text-primary" : "text-foreground"
                }`}
              >
                Página Principal
              </Link>
              
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
