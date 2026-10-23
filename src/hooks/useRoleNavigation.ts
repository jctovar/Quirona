import { useLocation, useNavigate } from "react-router-dom";
import type { NavigateOptions } from "react-router-dom";

/**
 * Navegación consciente del rol.
 *
 * Las mismas pantallas de módulos se montan en dos ramas de rutas:
 * - `/module-*` para las usuarias.
 * - `/researcher/module-*` para el recorrido de revisión del investigador.
 *
 * `goTo` conserva el prefijo de la rama actual para que los botones internos
 * de cada módulo no expulsen al investigador de su propio recorrido.
 */
export default function useRoleNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // La pertenencia a la rama de investigación se deduce de la URL. Es la
  // misma convención que usa `Navbar` para mostrar su menú.
  const isResearcher = location.pathname.startsWith("/researcher");

  const goTo = (path: string, options?: NavigateOptions) => {
    navigate(isResearcher ? `/researcher${path}` : path, options);
  };

  return { goTo, isResearcher };
}