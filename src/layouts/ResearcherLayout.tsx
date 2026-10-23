import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

/**
 * Layout del recorrido de investigación.
 *
 * Comparte el Navbar común; la ruta `/researcher/*` hace que el Navbar muestre
 * el menú de investigación y que `useRoleNavigation` conserve el prefijo.
 */
const ResearcherLayout = () => {
  return (
    <>
      <Navbar isAuthenticated username="Investigador" />
      <Outlet />
    </>
  );
};

export default ResearcherLayout;