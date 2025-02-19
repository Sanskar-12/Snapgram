import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninForm from "./auth/form/SigninForm";
import SignupForm from "./auth/form/SignupForm";
import Home from "./root/pages/Home";
import AuthLayout from "./auth/AuthLayout";
import RootLayout from "./root/RootLayout";

const App = () => {
  return (
    <Router>
      <main className="flex h-screen">
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
