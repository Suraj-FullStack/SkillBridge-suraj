import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/Loginpage";
import Register from "./pages/auth/Register";
import LandingPage from "./pages/jobs/Landingpage";
import CreateJob from "./pages/admin/CreateJob";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import Header from "./components/layout/Header";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/admin/jobs/create"
            element={
              <ProtectedRoute requiredRole="Admin">
                <CreateJob />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;