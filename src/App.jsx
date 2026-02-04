import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Play from "./pages/Play";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./hooks/useAuth";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-midnight text-white">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route
              path="/play/:id"
              element={
                <ProtectedRoute>
                  <Play />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;
