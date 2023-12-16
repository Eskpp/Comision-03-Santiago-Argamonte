import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { PostFormPage } from "./pages/PostFormPage";
import { PostProvider } from "./context/PostContext";

export const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/add-comment" element={<ProfilePage />} />
              <Route path="/post/:id" element={<PostFormPage />} />
              <Route path="/add-post" element={<PostFormPage />} />
            </Route>
          </Routes>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
};
