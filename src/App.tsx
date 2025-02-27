import {  Routes, Route } from "react-router-dom";
import SigninForm from "./auth/form/SigninForm";
import SignupForm from "./auth/form/SignupForm";
import Home from "./root/pages/Home";
import AuthLayout from "./auth/AuthLayout";
import RootLayout from "./root/RootLayout";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
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
        <Toaster />
      </main>
  );
};

export default App;
