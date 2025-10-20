import React from "react";
import Chart from "react-apexcharts";

export default function TopCategories() {
  const series = [1200000, 950000, 750000, 500000]; // valeurs par catégorie
  const labels = ["Informatique", "Fashion", "Informatiques", "Formation"];
  const colors = ["#F97316", "#FB923C", "#FDBA74", "#FED7AA"]; // couleurs associées

  const total = series.reduce((acc, val) => acc + val, 0);

  const options = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
        // tools: {
        //   download: true,
        //   selection: true,
        //   zoom: false,
        //   zoomin: false,
        //   zoomout: false,
        //   pan: false,
        //   reset: true,
        // },
      },
    },
    labels: labels,
    colors: colors,
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "78%",
          margin:2,
          labels: {
            show: true,
            total: {
              show: true,
              label: "Ventes Totales",
              fontSize: "13px",
              color: "#6B7280",
              formatter: () => `$${total}`,
            },
          },
        },
      },
    },
    stroke: {
      width: 0,
    },
  };

  return (
    <div className="bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800">Top Catégories</h2>
        <button className="text-xs text-gray-500 hover:text-gray-700">Toutes</button>
      </div>

      {/* Chart */}
      <div className="flex justify-center">
        <Chart options={options} series={series} type="donut" width={"93%"}/>
      </div>

      {/* Liste auto-générée */}
      <div className="mt-3 space-y-2">
        {labels.map((label, index) => (
          <div key={index} className="flex justify-between text-sm text-gray-700">
            <span className="flex items-center">
              <span
                className="w-3 h-3 rounded-sm mr-2"
                style={{ backgroundColor: colors[index] }}
              ></span>
              {label}
            </span>
            <span className="font-medium">
              ${series[index].toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
