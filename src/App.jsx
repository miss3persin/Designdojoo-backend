import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegistrationForm from "./components/RegistrationForm";
import ConfirmationPage from "./components/ConfirmationPage";
import Merch from "./pages/Merch"; // ✅ FIXED
import Terms from "./pages/Terms";
<<<<<<< HEAD

=======
import SalesPage from "./pages/SalesPage";
>>>>>>> 5368999 (Initial commit)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/cohort3-scholarship" element={<LandingPage />} />
        <Route path="/apply" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/shop" element={<Merch />} /> {/* ✅ NEW */}
        <Route path="/terms" element={<Terms />} />
<<<<<<< HEAD
=======
        <Route path="/sales" element={<SalesPage />} />
>>>>>>> 5368999 (Initial commit)
      </Routes>
    </BrowserRouter>
  );
}

export default App;
