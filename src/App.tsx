import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MoodTracker from "./pages/MoodTracker";
import Journal from "./pages/Journal";
import Breathing from "./pages/Breathing";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import Routines from "./pages/Routines";
import Habits from "./pages/Habits";
import Help from "./pages/Help";
import Community from "./pages/Community";
import Learn from "./pages/Learn";
import Exercises from "./pages/Exercises";
import Professionals from "./pages/Professionals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Initialize theme on app load
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('haven_theme') || 'calm';
  const savedDarkMode = localStorage.getItem('haven_dark_mode') === 'true';
  
  if (savedTheme !== 'calm') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  
  if (savedDarkMode) {
    document.documentElement.classList.add('dark');
  }
};

initializeTheme();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/help" element={<Help />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/community" element={<Community />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
