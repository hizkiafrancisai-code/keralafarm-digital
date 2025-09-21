import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import ClimateSmartPredictions from "./pages/features/ClimateSmartPredictions";
import CropCalendar from "./pages/features/CropCalendar";
import CropDiseaseDetection from "./pages/features/CropDiseaseDetection";
import VoiceBasedQueries from "./pages/features/VoiceBasedQueries";
import MarketIntelligence from "./pages/features/MarketIntelligence";
import EmergencySOS from "./pages/features/EmergencySOS";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/login" element={<Login />} />
            <Route path="/features/climate-smart-predictions" element={<ClimateSmartPredictions />} />
            <Route path="/features/ai-microplastic-detector" element={<CropDiseaseDetection />} />
            <Route path="/features/voice-based-queries" element={<VoiceBasedQueries />} />
            <Route path="/features/crop-disease-detection" element={<CropDiseaseDetection />} />
            <Route path="/features/crop-calendar" element={<CropCalendar />} />
            <Route path="/features/smart-insurance-connector" element={<CropCalendar />} />
            <Route path="/features/emergency-sos-system" element={<EmergencySOS />} />
            <Route path="/features/market-intelligence" element={<MarketIntelligence />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
