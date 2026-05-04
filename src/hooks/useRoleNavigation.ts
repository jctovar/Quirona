import { useLocation, useNavigate } from "react-router-dom";
import { NavigateOptions } from "react-router-dom";
export default function useRoleNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isResearcher = location.pathname.startsWith("/researcher");

const goTo = (path: string, options?: NavigateOptions) => {
  navigate(isResearcher ? `/researcher${path}` : path, options);
};

  return { goTo, isResearcher };
}