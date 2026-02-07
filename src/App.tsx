import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuienesSomos from "./pages/QuienesSomos";
import Preguntas from "./pages/Preguntas";
import Contenidos from "./pages/Contenidos";
import Trabajos from "./pages/Trabajos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InitialQuestion from "./pages/InitialQuestion";
import PreEducation from "./pages/PreEducation";
import InitialTest from "./pages/InitialTest";
import SemanticNetworkTest from "./pages/SemanticNetworkTest";
import AnxietyInventoryTest from "./pages/AnxietyInventoryTest";
import AssertivenessScaleTest from "./pages/AssertivenessScaleTest";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Module1Story from "./pages/Module1Story";  
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/preguntas" element={<Preguntas />} />
          <Route path="/contenidos" element={<Contenidos />} />
          <Route path="/trabajos" element={<Trabajos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/initial-question" element={<InitialQuestion />} />
          <Route path="/pre-education" element={<PreEducation />} />
          <Route path="/initial-test" element={<InitialTest />} />
          <Route path="/semantic-network-test" element={<SemanticNetworkTest />} />
          <Route path="/anxiety-inventory" element={<AnxietyInventoryTest />} />
          <Route path="/assertiveness-scale" element={<AssertivenessScaleTest />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/module-1" element={<Module1Story />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
