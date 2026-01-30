import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const habitColors = {
  water: "#8884d8",
  sleep: "#82ca9d",
  workouts: "#ff7300",
  meditation: "#ff1493",
  healthyEating: "#32cd32",
  reading: "#ff4500",
  screenTime: "#1e90ff"
};

const ProgressChart = ({ data, habits }) => {
  // Remove duplicate dates for Bar Chart
  const uniqueData = Object.values(
    data.reduce((acc, entry) => {
      acc[entry.date] = entry; // Keep only the latest entry per date
      return acc;
    }, {})
  );

  return (
    <div className="progress-chart">
      <h2 className="chart-title">Line Chart</h2>
      
      {/* Line Chart for trends */}
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        {habits.map((habit) => (
          <Line key={habit} type="linear" dataKey={habit} stroke={habitColors[habit]} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
      
      <h2 className="chart-title">Bar Chart</h2>
      
      {/* Bar Chart for comparisons (removing duplicate dates) */}
      <BarChart width={600} height={300} data={uniqueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        {habits.map((habit) => (
          <Bar key={habit} dataKey={habit} fill={habitColors[habit]} />
        ))}
      </BarChart>
    </div>
  );
};

export default ProgressChart;
