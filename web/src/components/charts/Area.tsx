import ReactApexChart from "react-apexcharts";

export default function AreaChart({
  series,
}: {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
}) {
  const s = [
    {
      data: [
        { x: "2022-12-01T00:00:00+10:00", y: 2 },
        { x: "2022-12-12T00:00:00+10:00", y: 1 },
        { x: "2022-12-29T00:00:00+10:00", y: 3 },
        { x: "2022-12-30T00:00:00+10:00", y: 1 },
        { x: "2022-12-31T00:00:00+10:00", y: 11 },
      ],
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    labels: [],
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  return (
    <>
      hi
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </>
  );
}
