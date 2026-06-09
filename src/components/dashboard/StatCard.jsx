"use client";

export default function StatCard({
    title,
    value,
    icon,
    description,
    className = "",
}) {
    return (
        <div
            className={`
        bg-[#111216]
        border border-white/10
        rounded-2xl
        p-5
        transition-all
        hover:border-white/20
        hover:bg-[#14161b]
        ${className}
      `}
        >
            <div className="flex flex-col gap-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/80">
                    {icon}
                </div>

                <div>
                    <p className="text-sm text-white/50">{title}</p>

                    <h3 className="mt-2 text-3xl font-semibold text-white">
                        {value}
                    </h3>

                    {description && (
                        <p className="mt-1 text-xs text-white/40">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}