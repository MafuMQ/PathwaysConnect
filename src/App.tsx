import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Connect from "./pages/Connect.tsx";
import Vault from "./pages/Vault.tsx";
import Spark from "./pages/Spark.tsx";
import Pulse from "./pages/Pulse.tsx";
import Societies from "./pages/Societies.tsx";
import Bazaar from "./pages/Bazaar.tsx";
import Cubicle from "./pages/Cubicle.tsx";
import GradDesk from "./pages/GradDesk.tsx";
import Profile from "./pages/Profile.tsx";
import Messages from "./pages/Messages.tsx";
import AppLayout from "./components/layout/AppLayout.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route index element={<Dashboard />} />
      <Route path="connect" element={<Connect />} />
      <Route path="vault" element={<Vault />} />
      <Route path="spark" element={<Spark />} />
      <Route path="pulse" element={<Pulse />} />
      <Route path="societies" element={<Societies />} />
      <Route path="bazaar" element={<Bazaar />} />
      <Route path="cubicle" element={<Cubicle />} />
      <Route path="graddesk" element={<GradDesk />} />
      <Route path="profile" element={<Profile />} />
      <Route path="messages" element={<Messages />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
