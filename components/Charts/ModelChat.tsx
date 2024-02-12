"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE", "#FFA70B"],
  chart: {
    // events: {
    //   beforeMount: (chart) => {
    //     chart.windowResizeHandler();
    //   },
    // },
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "smooth",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    // xaxis: {
    //   lines: {
    //     show: true,
    //   },
    // },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE", "#FFA70B"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    // categories: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  tooltip: {
    x: {
      format: "dd MMM yyyy",
    },
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ModelChat = (props: any) => {
  const { categories, data, max } = props;

  if (
    !data ||
    data.length < 3 ||
    !data[0].name ||
    !data[1].name ||
    !data[2].name
  ) {
    console.error("Invalid data structure:", data);
    // Handle the invalid data case here (e.g., setting a default state or error handling)
  }

  const [state, setState] = useState<ChartOneState>({ series: [] });

  useEffect(() => {
    setState({
      series: [
        {
          name: data[0]?.name,
          data: data[0]?.data,
        },

        {
          name: data[1]?.name,
          data: data[1]?.data,
        },

        {
          name: data[2]?.name,
          data: data[2]?.data,
        },
      ],
    });
  }, [data]);

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };

  handleReset;

  // NextJS Requirement
  const isWindowAvailable = () => typeof window !== "undefined";

  if (!isWindowAvailable()) return <></>;

  const combineOption = (options: any): ApexOptions => {
    return {
      ...options,
      xaxis: {
        type: "category",
        categories: categories,
      },

      yaxis: {
        title: {
          style: {
            fontSize: "0px",
          },
        },
        min: 0,
        max: Math.ceil(max * 1.2),
      },
    };
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex flex-wrap w-full gap-3 sm:gap-5">
          <div className="flex min-w-60">
            <span className="flex items-center justify-center w-full h-4 mt-1 mr-2 border rounded-full max-w-4 border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">GPT-4 Turbo Usage</p>
            </div>
          </div>
          <div className="flex min-w-60">
            <span className="flex items-center justify-center w-full h-4 mt-1 mr-2 border rounded-full max-w-4 border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">
                GPT-3.5 Turbo Usage
              </p>
            </div>
          </div>
          <div className="flex min-w-60">
            <span className="flex items-center justify-center w-full h-4 mt-1 mr-2 border rounded-full border-warning max-w-4">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-warning"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-warning">Mistral-Medium Usage</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5 h-[355px] w-[105%]">
          <ReactApexChart
            options={combineOption(options)}
            series={state.series}
            type="area"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ModelChat;
