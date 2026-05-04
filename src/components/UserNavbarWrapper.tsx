import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export default function UserNavbarWrapper() {
  const location = useLocation();
  const isResearcher = location.pathname.startsWith("/researcher");

  if (isResearcher) return null;

  return <Navbar />;
}