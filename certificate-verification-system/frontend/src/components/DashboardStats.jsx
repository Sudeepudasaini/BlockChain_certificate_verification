// Dashboard Statistics Component - shows key metrics
// Used in university dashboard

import React from "react";
import { Award, FileCheck, CheckCircle, TrendingUp } from "lucide-react";

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Issued",
      value: stats.totalIssued,
      icon: Award,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Pending",
      value: stats.totalPending,
      icon: FileCheck,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Total Verifications",
      value: stats.totalVerifications,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Verification Rate",
      value: stats.totalIssued > 0 
        ? ((stats.totalVerifications / stats.totalIssued) * 100).toFixed(1) + "%"
        : "0%",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-full`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
