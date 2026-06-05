"use client";

import Image from "next/image";


// Gravity Icons — inline SVG equivalents
const BriefcaseSearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <circle cx="11" cy="13" r="3" />
    <path d="m13.5 15.5 2 2" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="9" rx="1" />
    <rect x="10" y="7" width="4" height="14" rx="1" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>
);

const UserSearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="8" r="4" />
    <path d="M2 20c0-4 3.6-7 8-7" />
    <circle cx="18" cy="17" r="3" />
    <path d="m20.5 19.5 1.5 1.5" />
  </svg>
);

const StarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const stats = [
  {
    icon: <BriefcaseSearchIcon />,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: <BarChartIcon />,
    value: "12K",
    label: "Companies",
  },
  {
    icon: <UserSearchIcon />,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: <StarIcon />,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function StatsSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Globe background image */}
      <div className="relative w-full flex items-end justify-center" style={{ minHeight: "420px" }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 w-full h-full" style={{ 
            backgroundImage: "url(/images/globe.png)"
        }} >
          
          {/* Bottom fade so cards blend in */}
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black" />
        </div>

        {/* Headline text over globe */}
        <div className="relative z-10 text-center pb-12 px-4">
          <p className="text-white/90 text-xl sm:text-2xl md:text-3xl font-light leading-snug max-w-xl mx-auto">
            Assisting over{" "}
            <strong className="font-bold text-white">15,000 job seekers</strong>{" "}
            find their dream positions.
          </p>
        </div>
      </div>

      {/* Stats cards — overlap the globe bottom */}
      <div className="relative z-10 -mt-2 px-4 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#111111] border border-white/6 rounded-2xl shadow-xl"
            >
              <div className="p-5 sm:p-6 flex flex-col gap-4">
                {/* Icon */}
                <div className="text-white/60">
                  {stat.icon}
                </div>

                {/* Value */}
                <p className="text-white text-4xl sm:text-5xl font-bold tracking-tight leading-none">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-white/50 text-sm font-normal">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}