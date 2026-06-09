import StatCard from "./StatCard";

export default function DashboardStats({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((item) => (
                <StatCard
                    key={item.id}
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                />
            ))}
        </div>
    );
}