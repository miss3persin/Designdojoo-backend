import { Link } from "react-router-dom";
import useSlots from "../hooks/useSlots";
import {
  Layers,
  Users,
  Megaphone,
  Rocket
} from "lucide-react";


function TimelineItem({
  side,
  subtitle,
  title,
  description,
  highlight,
  icon: Icon,
}) {
  const isLeft = side === "left";

  return (
    <div className="relative flex w-full">
      {/* Left Side */}
      <div className={`w-1/2 ${isLeft ? "pr-10 flex justify-end" : ""}`}>
        {isLeft && (
          <div
            className={`w-[420px] rounded-xl p-6 shadow-sm border ${
              highlight
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-gray-900 border-gray-200"
            }`}
          >
            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                highlight ? "bg-white/10" : "bg-red-50"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  highlight ? "text-white" : "text-red-600"
                }`}
              />
            </div>

            <p
              className={`text-xs font-semibold mb-2 ${
                highlight ? "text-red-200" : "text-red-600"
              }`}
            >
              {subtitle}
            </p>
            <h4 className="font-bold text-lg mb-2">{title}</h4>
            <p
              className={`text-sm leading-relaxed ${
                highlight ? "text-red-100" : "text-gray-600"
              }`}
            >
              {description}
            </p>
          </div>
        )}
      </div>

      {/* Center Dot */}
      <div className="relative flex flex-col items-center">
        <span className="w-3 h-3 bg-red-600 rounded-full z-10" />
      </div>

      {/* Right Side */}
      <div className={`w-1/2 ${!isLeft ? "pl-10 flex justify-start" : ""}`}>
        {!isLeft && (
          <div className="w-[420px] bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-red-600" />
            </div>

            <p className="text-xs font-semibold text-red-600 mb-2">
              {subtitle}
            </p>
            <h4 className="font-bold text-lg mb-2">{title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


function JourneyTimeline() {
  const { slotsLeft, errorMessage } = useSlots(15);
  return (
    <section className="bg-white py-24 px-6">

      <div className="max-w-6xl mx-auto relative">

        {/* Top Pills */}
        <div className="flex flex-col items-center mb-14">
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-4 py-1 rounded-full mb-3">
  ⏱ Only {slotsLeft} Slots Left
</span>

          {errorMessage ? (
            <p className="text-xs text-gray-500 -mt-2 mb-3">{errorMessage}</p>
          ) : null}


          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-4 py-1 rounded-full">
            8-Week Intensive Program
          </span>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-center">
            Your Journey to <span className="text-red-600">Career Launch</span>
          </h2>

          <p className="mt-4 max-w-xl text-center text-gray-600 text-sm">
            A carefully structured program designed to transform you from learner
            to professional in just 8 weeks.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-y-20">


          {/* Center vertical line */}
<div className="absolute left-1/2 top-0 h-full w-px bg-gray-200 -translate-x-1/2" />


          {/* Weeks 1–2 */}
<TimelineItem
  side="right"
  subtitle="WEEKS 1–2"
  title="The Bootcamp Refresher"
  description="UI Track & Product Management Track separate learning. Master the fundamentals with structured curriculum."
  icon={Layers}
/>

{/* Weeks 3–5 (RED CARD) */}
<TimelineItem
  side="left"
  subtitle="WEEKS 3–5"
  title="The Accountability Sprints"
  description="UI Designers paired with Product Managers. 3 projects in 3 weeks. Your PM manages the timeline; your UI Designer delivers."
  highlight
  icon={Users}
/>

{/* Weeks 6–7 */}
<TimelineItem
  side="right"
  subtitle="WEEKS 6–7"
  title="The Branding Overhaul"
  description="Social media optimization, CV restructuring, and client acquisition scripts. Become visible."
  icon={Megaphone}
/>

{/* Week 8 */}
<TimelineItem
  side="left"
  subtitle="WEEK 8"
  title="The Agency Launch"
  description="Go-to-market strategy. DesignDojoo acts as the agency; you get the gigs. Start earning."
  icon={Rocket}
/>

        </div>

        {/* Apply Button */}
        <div className="mt-20 flex justify-center md:justify-start md:pl-[52%]">

          <Link
            to="/apply"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold w-[320px] py-3 rounded-lg shadow-sm text-center"

          >
            Apply Now
          </Link>
        </div>

      </div>
    </section>
  );
}

export default JourneyTimeline;
