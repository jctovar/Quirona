import UserLayout from "./layouts/UserLayout";
import ResearcherLayout from "./layouts/ResearcherLayout";
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
import AdverseExperiencesTest from "./pages/AdverseExperiencesTest";
import GeneralHealthTest from "./pages/GeneralHealthTest";
import Derivacion from "./pages/Derivacion";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";  
import Apoyo from "./pages/Apoyo";
import Module1Story from "./pages/Module1Story";
import Module1Introduction from "./pages/Module1Introduction";
import Module1Quiz from "./pages/Module1Quiz";
import Module1Visit from "./pages/Module1Visit";
import Module1Game from "./pages/Module1Game";
import Module1Feedback from "./pages/Module1Feedback";
import Module1Closure from "./pages/Module1Closure";
import Module2Story from "./pages/Module2Story";
import Module2Quiz from "./pages/Module2Quiz";
import Module2Introduction from "./pages/Module2Introduction";  
import Module2Visit from "./pages/Module2Visit";
import Module2Game from "./pages/Module2Game";
import Module2Feedback from "./pages/Module2Feedback";
import Module2Game2 from "./pages/Module2Game2";
import Module2Closure from "./pages/Module2Closure";
import Module3Story from "./pages/Module3Story";
import Module3Introduction from "./pages/Module3Introduction";
import Module3Quiz from "./pages/Module3Quiz";
import Module3Visit from "./pages/Module3Visit";
import Module3Representation from "./pages/Module3Representation";
import Module3Game from "./pages/Module3Game";
import Module3Feedback from "./pages/Module3Feedback";
import Module3Closure from "./pages/Module3Closure";
import Module4Story from "./pages/Module4Story";
import Module4Introduction from "./pages/Module4Introduction";
import Module4Quiz from "./pages/Module4Quiz";
import Module4Visit from "./pages/Module4Visit";
import Module4Game from "./pages/Module4Game";
import Module4Feedback from "./pages/Module4Feedback";
import Module4Closure from "./pages/Module4Closure";
import FinalTest1 from "./pages/FinalTest1";
import FinalTest2 from "./pages/FinalTest2";
import FinalTest3 from "./pages/FinalTest3";
import NotFound from "./pages/NotFound";
import DashboardInvestigador from "./pages/DashboardInvestigador";
import ProfileInvestigador from "./pages/ProfileInvestigador";
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

            {/* RUTAS DE USUARIA */}
            <Route element={<UserLayout />}>
              <Route path="/initial-question" element={<InitialQuestion />} />
              <Route path="/pre-education" element={<PreEducation />} />
              <Route path="/initial-test" element={<InitialTest />} />
              <Route path="/semantic-network-test" element={<SemanticNetworkTest />} />
              <Route path="/anxiety-inventory" element={<AnxietyInventoryTest />} />
              <Route path="/assertiveness-scale" element={<AssertivenessScaleTest />} />
              <Route path="/adverse-experiences" element={<AdverseExperiencesTest />} />
              <Route path="/general-health" element={<GeneralHealthTest />} />
              <Route path="/derivacion" element={<Derivacion />} />
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/profile" element={<Profile />} />
              <Route path="/apoyo" element={<Apoyo />} />
              <Route path="/final-test-1" element={<FinalTest1 />} />
              <Route path="/final-test-2" element={<FinalTest2 />} />
              <Route path="/final-test-3" element={<FinalTest3 />} />

              {/* MÓDULOS */}
              <Route path="/module-1" element={<Module1Story />} />
              <Route path="/module-1-intro" element={<Module1Introduction />} />
              <Route path="/module-1-quiz" element={<Module1Quiz />} />
              <Route path="/module-1-visit" element={<Module1Visit />} />
              <Route path="/module-1-game" element={<Module1Game />} />
              <Route path="/module-1-feedback" element={<Module1Feedback />} />
              <Route path="/module-1-closure" element={<Module1Closure />} />

              <Route path="/module-2" element={<Module2Story />} />
              <Route path="/module-2-intro" element={<Module2Introduction />} />
              <Route path="/module-2-quiz" element={<Module2Quiz />} />
              <Route path="/module-2-visit" element={<Module2Visit />} />
              <Route path="/module-2-game" element={<Module2Game />} />
              <Route path="/module-2-feedback" element={<Module2Feedback />} />
              <Route path="/module-2-game-2" element={<Module2Game2 />} />
              <Route path="/module-2-closure" element={<Module2Closure />} />

              <Route path="/module-3" element={<Module3Story />} />
              <Route path="/module-3-intro" element={<Module3Introduction />} />
              <Route path="/module-3-quiz" element={<Module3Quiz />} />
              <Route path="/module-3-visit" element={<Module3Visit />} />
              <Route path="/module-3-representation" element={<Module3Representation />} />
              <Route path="/module-3-game" element={<Module3Game />} />
              <Route path="/module-3-feedback" element={<Module3Feedback />} />
              <Route path="/module-3-closure" element={<Module3Closure />} />

              <Route path="/module-4" element={<Module4Story />} />
              <Route path="/module-4-intro" element={<Module4Introduction />} />
              <Route path="/module-4-quiz" element={<Module4Quiz />} />
              <Route path="/module-4-visit" element={<Module4Visit />} />
              <Route path="/module-4-game" element={<Module4Game />} />
              <Route path="/module-4-feedback" element={<Module4Feedback />} />
              <Route path="/module-4-closure" element={<Module4Closure />} />
            </Route>

            {/* RUTAS DE INVESTIGADOR */}
            <Route path="/researcher" element={<ResearcherLayout />}>
              <Route path="perfilInvestigador" element={<DashboardInvestigador />} />
              <Route path="profileInvestigador" element={<ProfileInvestigador />} />
              <Route path="module-1" element={<Module1Story />} />
              <Route path="module-1-intro" element={<Module1Introduction />} />
              <Route path="module-1-quiz" element={<Module1Quiz />} />
              <Route path="module-1-visit" element={<Module1Visit />} />
              <Route path="module-1-game" element={<Module1Game />} />
              <Route path="module-1-feedback" element={<Module1Feedback />} />
              <Route path="module-1-closure" element={<Module1Closure />} />

              <Route path="module-2" element={<Module2Story />} />
              <Route path="module-2-intro" element={<Module2Introduction />} />
              <Route path="module-2-quiz" element={<Module2Quiz />} />
              <Route path="module-2-visit" element={<Module2Visit />} />
              <Route path="module-2-game" element={<Module2Game />} />
              <Route path="module-2-feedback" element={<Module2Feedback />} />
              <Route path="module-2-game-2" element={<Module2Game2 />} />
              <Route path="module-2-closure" element={<Module2Closure />} />

              <Route path="module-3" element={<Module3Story />} />
              <Route path="module-3-intro" element={<Module3Introduction />} />
              <Route path="module-3-quiz" element={<Module3Quiz />} />
              <Route path="module-3-visit" element={<Module3Visit />} />
              <Route path="module-3-representation" element={<Module3Representation />} />
              <Route path="module-3-game" element={<Module3Game />} />
              <Route path="module-3-feedback" element={<Module3Feedback />} />
              <Route path="module-3-closure" element={<Module3Closure />} />

              <Route path="module-4" element={<Module4Story />} />
              <Route path="module-4-intro" element={<Module4Introduction />} />
              <Route path="module-4-quiz" element={<Module4Quiz />} />
              <Route path="module-4-visit" element={<Module4Visit />} />
              <Route path="module-4-game" element={<Module4Game />} />
              <Route path="module-4-feedback" element={<Module4Feedback />} />
              <Route path="module-4-closure" element={<Module4Closure />} />              
            </Route>
            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </QueryClientProvider>
          );

export default App;
function isAllTestsCompleted() {
  throw new Error("Function not implemented.");
}

