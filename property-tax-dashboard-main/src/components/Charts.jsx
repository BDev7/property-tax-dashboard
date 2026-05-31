import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Charts({ data, filteredData, tenant }) {
  const grouped = {};

  data.forEach((item) => {
    if (!grouped[item.tenant]) {
      grouped[item.tenant] = 0;
    }

    grouped[item.tenant] += item.collection_inr;
  });

  const chartData = Object.keys(grouped).map((city) => ({
    city,
    collection: grouped[city],
  }));

  const approved = filteredData.filter(
  (item) => item.status === "Approved"
).length;

const rejected = filteredData.filter(
  (item) => item.status === "Rejected"
).length;

const pending = filteredData.filter(
  (item) => item.status === "Pending"
).length;

const pieData = [
  { name: "Approved", value: approved },
  { name: "Rejected", value: rejected },
  { name: "Pending", value: pending },
];

const COLORS = [
  "#16a34a",
  "#dc2626",
  "#eab308",
];

  return (
  <div className="space-y-8">

    {/* PIE CHART */}
    <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold tracking-wide mb-4">
        Property Status Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
  formatter={(value) => [`₹${value.toFixed(2)}`, "Collection"]}
/>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* BAR CHART */}
    <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold tracking-wide mb-4">
        Total Collection Per City
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip
  formatter={(value) => [`₹${value.toFixed(2)}`, "Collection"]}
/>
          <Bar
            dataKey="collection"
            fill="#2563eb"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

    

  </div>
);
}

export default Charts;