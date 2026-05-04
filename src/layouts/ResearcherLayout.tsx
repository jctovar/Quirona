import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const ResearcherLayout = () => {
  return (
    <>
      {/* 🔥 IMPORTANTE */}
      <Navbar isAuthenticated username="Investigador" />
      <Outlet />
    </>
  );
};

export default ResearcherLayout;