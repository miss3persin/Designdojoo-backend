import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";



function RegistrationForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    social_handle: "",
    city: "",
    country: "",
    portfolio: "",
    track: "",
    referral: "",
    blocker: "",
    accountability: "",
    commitment: ""
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    console.log("FORM DATA BEING SENT:", form);

    // 1️⃣ Save to Supabase
    const { error: supabaseError } = await supabase
      .from("applications")
      .insert([form]);

    if (supabaseError) {
      throw supabaseError;
    }

    // 2️⃣ Slot reduction (local demo logic)
    let slots = Number(localStorage.getItem("slotsLeft")) || 15;

    if (slots <= 1) {
      localStorage.setItem("slotsLeft", 15);
    } else {
      localStorage.setItem("slotsLeft", slots - 1);
    }

    // 3️⃣ Navigate only after success
    navigate("/confirmation");

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  

  

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
        {/* Back to Home */}
<button
  onClick={() => navigate("/")}
  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4"
>
  ← Back to Home
</button>

        
        {/* Header */}
<div className="bg-[#0B0F14] text-white rounded-xl p-6 mb-8">
  <div className="flex items-center gap-2 text-sm text-red-500 mb-2">
    <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
    <span>Takes ~3 minutes</span>
  </div>

  <h1 className="text-xl font-semibold">
    The DesignDojoo Product Launchpad
  </h1>

  <p className="text-sm text-gray-300 mt-1">
    Stop Learning Alone. Start Building Together.
  </p>
</div>
<p className="text-sm text-gray-700 mb-4">
  Welcome! Here’s the reality: We have <strong>limited scholarship spots</strong> for this
  8-week cohort. This is not just a course; it’s a hands-on, high-intensity career
  accelerator.
</p>

<p className="text-sm text-gray-700 mb-4">
  We need to ensure we’re bringing together the right mix of UI Designers and
  Product Managers who are ready to be accountable, do the work, and launch
  their careers.
</p>

<p className="text-sm font-semibold text-black mb-6">
  We prioritize authenticity over perfection.
</p>

<hr className="border-gray-200 mb-8" />

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Personal Details */}
          <h3 className="font-semibold text-lg">Personal Details</h3>

          <div>
  <label className="block text-sm font-medium mb-2">
    Full Name <span className="text-red-600">*</span>
  </label>
  <input
    name="full_name"
    onChange={handleChange}
    className="input"
    placeholder="John Doe"
    required
  />
</div>


          <div>
  <label className="block text-sm font-medium mb-2">
    Portfolio / LinkedIn Profile (Optional) <span className="text-red-600">*</span>
  </label>
  <input
    name="portfolio"
    onChange={handleChange}
    className="input"
    placeholder="https://linkedin.com/in/yourprofile"
    
  />
</div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium mb-2">
      City <span className="text-red-600">*</span>
    </label>
    <input
      name="city"
      onChange={handleChange}
      className="input"
      placeholder="Lagos"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      Country <span className="text-red-600">*</span>
    </label>
    <input
      name="country"
      onChange={handleChange}
      className="input"
      placeholder="Nigeria"
      required
    />
  </div>
</div>


          {/* Contact Info */}
          <h3 className="font-semibold text-lg pt-4">Contact Info</h3>

          <div>
  <label className="block text-sm font-medium mb-2">
    Email Address <span className="text-red-600">*</span>
  </label>
  <input
    name="email"
    type="email"
    onChange={handleChange}
    className="input"
    placeholder="john@example.com"
    required
  />
</div>


          <div>
  <label className="block text-sm font-medium mb-2">
    Phone Number (WhatsApp) <span className="text-red-600">*</span>
  </label>
  <input
    name="phone"
    onChange={handleChange}
    className="input"
    placeholder="+234..."
    required
  />
</div>

<div>
  <label className="block text-sm font-medium mb-2">
    Social Media Handle (Twitter / IG / LinkedIn){" "}
    <span className="text-red-600">*</span>
  </label>

  <input
    name="social_handle"
    onChange={handleChange}
    className="input"
    placeholder="@yourhandle"
    required
  />

  <p className="text-xs text-gray-500 mt-1">
    Following us on social media is required for your application to be processed.
  </p>
</div>



          {/* Track */}
          <div>
  <label className="block text-sm font-medium mb-3">
    Select Track <span className="text-red-600">*</span>
  </label>

  <div className="space-y-3">
    {[
      "Combined Scholarship (UI/UX + PM) – 8 Weeks",
      "UI/UX Design Only – 8 Weeks",
      "Product Management Only – 8 Weeks",
    ].map((option) => (
      <label
        key={option}
        className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer"
      >
        <input
          type="radio"
          name="track"
          value={option}
          onChange={handleChange}
          required
        />
        <span className="text-sm">{option}</span>
      </label>
    ))}
  </div>
</div>


          {/* Referral */}
          <div>
            <label className="block text-sm font-medium mb-2">
              How did you hear about us?
            </label>

            <select
              name="referral"
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select an option</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>WhatsApp</option>
              <option>Friend</option>
              <option>Aligntraits</option>
              <option>Others</option>
            </select>
          </div>

          {/* Qualifying Questions */}
<div className="pt-6">
  <h3 className="font-semibold text-lg mb-1">
    Qualifying Questions
  </h3>

  <p className="text-sm text-gray-600 mb-6">
    Answer honestly. We prioritize authenticity over perfection.
  </p>

  {/* Blocker */}
  <div className="mb-6">
    <label className="block text-sm font-semibold text-black mb-2">
      What is the <span className="uppercase">ONE</span> thing blocking your career growth right now?
      <span className="text-red-600"> *</span>
    </label>

    <p className="text-xs text-gray-500 mb-2">
      e.g. lack of portfolio, inconsistency, no real experience
    </p>

    <textarea
      name="blocker"
      onChange={handleChange}
      className="input min-h-[120px]"
      placeholder="Be specific about your biggest obstacle..."
      required
    />
  </div>

  {/* Accountability */}
  <div className="mb-6">
    <label className="block text-sm font-semibold text-black mb-2">
      Why do you need an accountability partner right now?
      <span className="text-red-600"> *</span>
    </label>

    <textarea
      name="accountability"
      onChange={handleChange}
      className="input min-h-[120px]"
      placeholder="Tell us why working with a partner would help you..."
      required
    />
  </div>
</div>


          {/* Commitment */}
<div>
  <label className="block text-sm font-medium mb-2">
    Commitment Pledge: Can you dedicate 10–15 hrs/week for the next 8 weeks?{" "}
    <span className="text-red-600">*</span>
  </label>

  <select
    name="commitment"
    onChange={handleChange}
    className="input"
    required
  >
    <option value="">Select your commitment</option>
    <option>Yes, I can commit</option>
    <option>Tight schedule, but I will try</option>
    <option>No, I can’t commit</option>
  </select>
</div>



          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">
  By submitting, you agree to our{" "}
 <Link to="/terms" className="text-red-600 underline">
  Terms of Service
</Link>{" "}
  and{" "}
  <span className="underline cursor-pointer hover:text-gray-700">
    Privacy Policy
  </span>.
</p>


        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
