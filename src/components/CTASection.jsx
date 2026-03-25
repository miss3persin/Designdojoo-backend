import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSlots from "../hooks/useSlots";

function CTASection() {
  const navigate = useNavigate();
  const { slotsLeft, errorMessage } = useSlots(15);

const whatsappMessage = encodeURIComponent(
  "Hello DesignDojoo team 👋\nI'm interested in the Product Experience Scholarship and would like more details."
);



  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center text-white">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What’s Stopping You Right Now?
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-red-100 max-w-2xl mx-auto mb-10">
          Don’t let another week go by stuck in tutorial hell. Join a community
          of accountability partners and launch your career in just 8 weeks.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {/* Apply Button */}
          <button
            onClick={() => navigate("/apply")}
            className="flex items-center gap-2 bg-white text-red-600 font-semibold px-6 py-3 rounded-lg hover:bg-red-50 transition"
          >
            Apply for Scholarship
            <ArrowRight size={18} />
          </button>

          {/* WhatsApp Button */}
          <a
  href={`https://wa.me/2349162682043?text=${whatsappMessage}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition"
>
  Chat on WhatsApp
</a>


        </div>

        {/* Small Text */}
        <p className="text-xs text-red-100">
          Limited spots available — only {slotsLeft} {slotsLeft === 1 ? "slot" : "slots"} left.
        </p>
        {errorMessage ? <p className="mt-2 text-xs text-red-100">{errorMessage}</p> : null}
      </div>
    </section>
  );
}

export default CTASection;
