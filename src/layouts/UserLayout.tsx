import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

/**
 * Layout de las rutas de usuaria: Navbar común + página activa.
 *
 * Las páginas no repiten el Navbar; lo heredan de aquí.
 */
export default function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}