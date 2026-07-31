import React from "react";
import {
  Globe,
  Users,
  Film,
  Clapperboard,
} from "lucide-react";

const OverView = ({ data }) => {
  const stats = [
    {
      name: "Tổng quốc gia",
      value: data?.totalCountry ?? 0,
      icon: Globe,
      color: "bg-red-500",
    },
    {
      name: "Tổng thể loại",
      value: data?.totalGenre ?? 0,
      icon: Clapperboard,
      color: "bg-blue-500",
    },
    {
      name: "Tổng phim",
      value: data?.totalMovie ?? 0,
      icon: Film,
      color: "bg-green-500",
    },
    {
      name: "Tổng người dùng",
      value: data?.totalUser ?? 0,
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow transition hover:border-red-500"
          >
            <div>
              <p className="text-sm text-zinc-400">{item.name}</p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                {item.value}
              </h2>
            </div>

            <div className={`${item.color} rounded-xl p-3`}>
              <Icon size={24} className="text-white" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OverView;