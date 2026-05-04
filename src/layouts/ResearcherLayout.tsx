import { Outlet } from "react-router-dom";
import { NavbarInvestigador }  from "@/components/NavbarInvestigador";

export default function ResearcherLayout() {
  return (
    <>
      <NavbarInvestigador />
      <Outlet />
    </>
  );
}