import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Home from "./pages/Home.tsx";
import Onboard from "./pages/Onboard.tsx";
import Connect from "./pages/Connect.tsx";
import AcademicRecord from "./pages/AcademicRecord.tsx";
import Profile from "./pages/Profile.tsx";
import Opps from "./pages/Opps.tsx";
import AppLayout from "./components/layout/AppLayout.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user && !user.role && location.pathname !== "/app/onboard") {
    return <Navigate to="/app/onboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="pulse" element={<Navigate to="/app" replace />} />
      <Route path="onboard" element={<Onboard />} />
      <Route path="connect" element={<Connect />} />
      <Route path="academic-record" element={<AcademicRecord />} />
      <Route path="academic" element={<Navigate to="/app/academic-record" replace />} />
      <Route path="study" element={<Navigate to="/app/academic-record" replace />} />
      <Route path="profile" element={<Profile />} />
      <Route path="opps" element={<Opps />} />
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
