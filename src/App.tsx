import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SeriesCatalog from "./pages/SeriesCatalog";
import SeriesCatalog3730 from "./pages/SeriesCatalog3730";
import SeriesCatalog3530 from "./pages/SeriesCatalog3530";
import SeriesCatalog4530 from "./pages/SeriesCatalog4530";
import SeriesCatalog6010 from "./pages/SeriesCatalog6010";
import SwitchesCatalog from "./pages/SwitchesCatalog";
import ModelIDS3530_24P_6X from "./pages/ModelIDS3530_24P_6X";
import Partners from "./pages/Partners";
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
          <Route path="/partners" element={<Partners />} />
          <Route
            path="/products/switches/ids3730"
            element={<SeriesCatalog3730 />}
          />
          <Route
            path="/products/switches/ids3530"
            element={<SeriesCatalog3530 />}
          />
          <Route
            path="/products/switches/ids4530"
            element={<SeriesCatalog4530 />}
          />
          <Route
            path="/products/switches/ids6010"
            element={<SeriesCatalog6010 />}
          />
          <Route
            path="/models/ids3530-24p-6x"
            element={<ModelIDS3530_24P_6X />}
          />
          <Route
            path="/products/switches/ids3530/24p-6x"
            element={<ModelIDS3530_24P_6X />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/switches" element={<SwitchesCatalog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
