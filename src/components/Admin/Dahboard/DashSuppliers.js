import React, { useEffect } from "react";
import { Calendar02Icon, GraduateMaleIcon, NewReleasesIcon, NewsIcon } from "hugeicons-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvenement } from "../../../store/slices/evenements.slice";
import TopCategories from "../../chart/TopCategories";
import ReactApexChart from "react-apexcharts";
import { FiClipboard, FiDollarSign, FiPackage, FiUsers } from "react-icons/fi";
import moment from "moment";
import { FaExchangeAlt } from "react-icons/fa";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Components/table";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../Components/dropdown-menu";
// import { FaChevronDown, FaEdit, FaTrash } from "react-icons/fa";
// import { Button } from "@headlessui/react";

export default function DashSuppliers() {
  const data = [
    {
      title: 'Clients',
      date: '',
      nbre: '100',
      symb: '65%',
      icon: <FiUsers size={40} />,
      color: 'blue-600'
    },
    {
      title: 'Ventes',
      date: '',
      nbre: '$2950',
      symb: '80%',
      icon: <FiDollarSign size={40} />,
      color: 'secondary text-opacity-80'
    },
    {
      title: 'Commandes',
      date: '',
      nbre: '105',
      symb: '80%',
      icon: <FiClipboard size={40} />,
      color: 'green-500'
    },
    {
      title: 'Produits',
      date: '',
      nbre: '27',
      symb: '50%',
      icon: <FiPackage size={40} />,
      color: 'primary'
    },
  ]

  // const dispatch = useDispatch();
  // const { Evenements } = useSelector((state) => state.evenements);
  // useEffect(() => {
  //   dispatch(getAllEvenement());
  // }, [dispatch]);

  const [state, setState] = React.useState({
    series: [
      {
        name: "Ventes",
        data: [28, 29, 33, 36, 32, 32, 33, 40, 38, 38, 28, 15],
      },
      {
        name: "Revenue",
        data: [12, 11, 14, 18, 17, 13, 13, 40, 38, 38, 28, 27.95],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false },
        toolbar: { show: false },
        fontFamily: 'Inter, sans-serif',
      },
      colors: ["#6366F1", "#10B981"],
      stroke: {
        curve: "smooth",
        width: 3,
      },
      markers: {
        size: 4,
        hover: { size: 6 },
      },
      grid: {
        borderColor: "#E5E7EB",
        row: { colors: ["#F9FAFB", "transparent"], opacity: 0.5 },
      },
      dataLabels: { enabled: false },
      title: {
        // text: "Average High & Low Temperature",
        align: "left",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          color: "#111827",
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        axisBorder: { show: true, color: "#E5E7EB" },
        axisTicks: { show: true, color: "#E5E7EB" },
        labels: { style: { colors: "#6B7280" } },
        title: {
          // text: "Month",
          style: { color: "#6B7280", fontWeight: 500 },
        },
      },
      yaxis: {
        min: 5,
        max: 40,
        labels: { style: { colors: "#6B7280" } },
        title: { text: "", style: { color: "#6B7280", fontWeight: 500 } },
      },
      legend: {
        enabled: false,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "11px",
        fontWeight: 500,
        labels: { colors: ["#6366F1", "#10B981"] },
        markers: { width: 11, height: 11, radius: 6, marginTop: 20 },
        itemMargin: { horizontal: 20, vertical: 0 },
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        style: {
          fontSize: "13px",
          fontFamily: "Inter, sans-serif",
        },
        marker: {
          show: true,
        },
        x: {
          show: true,
          format: "MMM",
        },
        y: {
          formatter: (val) => `$${val}`,
        },
        fixed: {
          enabled: false,
          position: "topRight",
        },
        background: {
          borderRadius: 8,
          borderWidth: 0,
          color: "rgba(17, 24, 39, 0.9)",
          dropShadow: {
            enabled: true,
            top: 2,
            left: 2,
            blur: 8,
            opacity: 0.3,
          },
        },
        xaxis: {
          show: true,
          style: {
            fontSize: "12px",
            fontWeight: 500,
            color: "#F9FAFB",
          },
        },
        yaxis: {
          show: true,
          title: {
            formatter: (seriesName) => seriesName,
            style: { fontWeight: 600, color: "#F9FAFB" },
          },
          style: { fontSize: "13px", color: "#F9FAFB" },
        },
      }
    },
  });



  return (
    (<div className="flex flex-col gap-6 ">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex w-full md:w-2/3 flex-col gap-5">
          <div className="flex flex-col px-6 pt-4 pb-16 rounded-[7px] shadow-sm border border-opacity-10 bg-white">
            <h2 className="m-0 text-[1.3rem] md:text-[1.55rem] font-bold text-primary mb-3">Bienvenue Maxime Tsafack</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {data?.map((x, index) =>
              <div key={index} className={`px-5 relative overflow-hidden pt-4 pb-12 bg-white shadow-sm flex flex-col gap-3.5 rounded-[7px]`}>
                <div className={`absolute bottom-0 left-0 w-full h-[.2rem] bg-${x.color} bg-opacity-10`} />
                <div className={`absolute bottom-0 left-0 w-[${x.symb}] h-[.2rem] bg-${x.color} bg-opacity-75`} />
                <div className="flex flex-col gap-0.5 w-full relative">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg text-black/75 font-bold">{x.title}</h3>
                    <span className="text-[.8rem]">{x.date}</span>
                  </div>
                  <p className={`text-[1.6rem] text-${x.color} font-semibold`}>{x.nbre} </p>
                  <div className={`absolute w-[46px] text-${x.color} top-2 -right-0 h-[46px] flex items-center justify-center p-2 rounded-[7px] bg-black/10 opacity-85 border-secondary`}>{x?.icon}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/3 rounded-[7px] overflow-hidden shadow-sm">
          <TopCategories />
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-[7px] pb-5">
        <div className="flex w-full py-4 px-3.5 md:px-7 justify-between border-b">
          <h3 className="text-[1rem] md:text-[1.25rem] text-black/75 font-bold">Statistique de ventes</h3>
          <div className="py-1 cursor-pointer bg-gray-50 font-semibold whitespace-nowrap text-gray-600 flex items-center gap-3 px-5 text-[1rem] md:text-[.8rem] border border-black/70 rounded-[50px]">
            <span>{moment(Date.now()).format("DD/MM/YYYY")}</span> <FaExchangeAlt /> <span>{moment(Date.now()).format("DD/MM/YYYY")}</span>
          </div>
        </div>
        <div className="px-3.5 py-1 md:px-7">
          <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
        </div>
      </div>
    </div>)
  );
}
