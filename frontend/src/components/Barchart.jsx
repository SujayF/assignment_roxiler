import React, { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

function Barchart() {
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5100/api/chartdata/${selectedMonth}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }
        const result = await response.json();
        console.log(result); // Log the data to the console
        setChartData(result);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    if (selectedMonth) {
      fetchData();
    }
  }, [selectedMonth]);

  return (
    <div className='bar flex' >
      <h1>Bar Chart</h1>

      <hr style={{ width: '100%', borderTop: '1px solid #292323', borderColor: '#292323' }} />



      <select className="dropdown flex" value={selectedMonth} onChange={handleMonthChange}>
        <option value="" disabled hidden>
          Select a Month
        </option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(2023, i, 1).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>

      <BarChart width={600} height={600} data={chartData}>
        <Bar dataKey="count" fill="#990303" />
        <CartesianGrid stroke="#292323" />
        <XAxis dataKey="priceRange" />
        <YAxis />
      </BarChart>
    </div>
  );
}

export default Barchart;
