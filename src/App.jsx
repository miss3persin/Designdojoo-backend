import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegistrationForm from "./components/RegistrationForm";
import ConfirmationPage from "./components/ConfirmationPage";
import Merch from "./pages/Merch"; // âœ… FIXED
import Terms from "./pages/Terms";
import SalesPage from "./pages/SalesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cohort3-scholarship" element={<LandingPage />} />
        <Route path="/apply" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/shop" element={<Merch />} /> {/* âœ… NEW */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/sales" element={<SalesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
