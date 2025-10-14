import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";

export default function DashAdmin() {
  const monthlySales = [
    { month: "Jan", sales: 1200 },
    { month: "Fév", sales: 1800 },
    { month: "Mar", sales: 1600 },
    { month: "Avr", sales: 2400 },
    { month: "Mai", sales: 2200 },
    { month: "Juin", sales: 3000 },
  ];

  const userGrowth = [
    { month: "Jan", users: 200 },
    { month: "Fév", users: 350 },
    { month: "Mar", users: 500 },
    { month: "Avr", users: 800 },
    { month: "Mai", users: 900 },
    { month: "Juin", users: 1100 },
  ];

  const categoryData = [
    { name: "Vêtements", value: 45 },
    { name: "Accessoires", value: 25 },
    { name: "Électronique", value: 20 },
    { name: "Maison", value: 10 },
  ];

  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">
          Vue d’ensemble des statistiques et performances globales
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Utilisateurs"
          value="1 245"
          trend="+12%"
          color="bg-blue-500/10 text-blue-600"
        />
        <StatCard
          icon={<Package className="w-6 h-6" />}
          label="Produits"
          value="320"
          trend="+8%"
          color="bg-green-500/10 text-green-600"
        />
        <StatCard
          icon={<ShoppingCart className="w-6 h-6" />}
          label="Commandes"
          value="87"
          trend="-3%"
          color="bg-yellow-500/10 text-yellow-600"
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6" />}
          label="Revenus"
          value="15 430 €"
          trend="+24%"
          color="bg-indigo-500/10 text-indigo-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Ventes */}
        <div className="col-span-2 bg-white rounded-[6px] p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
            Ventes mensuelles
            <span className="text-sm text-gray-400 font-normal">+18% ce semestre</span>
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlySales}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Croissance utilisateurs */}
        <div className="bg-white rounded-[6px] p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
            Croissance des utilisateurs
            <span className="text-sm text-gray-400 font-normal">+5% ce mois</span>
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={userGrowth}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Répartition & Activités */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Pie chart */}
        <div className="bg-white rounded-[6px] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
          <h2 className="font-semibold text-gray-800 mb-4">
            Répartition des produits
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2 w-full text-sm">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex justify-between px-4 text-gray-600">
                <span>{cat.name}</span>
                <span className="font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activités récentes */}
        <div className="col-span-2 bg-white rounded-[6px] p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="font-semibold text-gray-800 mb-4">Activités récentes</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 bg-gray-50 text-left">
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
                <th className="p-3">Utilisateur</th>
                <th className="p-3 text-right">Statut</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "13 Oct 2025", action: "Ajout produit", user: "Admin A", status: "Succès" },
                { date: "12 Oct 2025", action: "Suppression user", user: "Admin B", status: "Succès" },
                { date: "10 Oct 2025", action: "Maj stock", user: "Admin A", status: "Succès" },
                { date: "9 Oct 2025", action: "Connexion échouée", user: "Admin C", status: "Erreur" },
              ].map((log, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="p-3 text-gray-700">{log.date}</td>
                  <td className="p-3 text-gray-700">{log.action}</td>
                  <td className="p-3 text-gray-700">{log.user}</td>
                  <td className="p-3 text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.status === "Succès"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ✅ Carte Statistique modernisée */
function StatCard({ icon, label, value, trend, color }) {
  return (
    <div className="bg-white rounded-[6px] px-6 py-10 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2.5">
          <p className="text-gray-500 text-sm">{label}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      </div>
      <span
        className={`absolute bottom-1.5 right-4 text-sm font-medium ${
          trend.startsWith("+") ? "text-green-600" : "text-red-500"
        }`}
      >
        {trend}
      </span>
    </div>
  );
}
