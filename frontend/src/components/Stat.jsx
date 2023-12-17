
import React, { useState, useEffect } from "react";



function Stat() {
  const [monthlyStatistics, setMonthlyStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  });
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(3); // Change the initial value to ""

  useEffect(() => {
    const fetchMonthlyStatistics = async () => {
      try {
        if (!selectedMonth) {
          return; // Do not make a request if the month is not selected
        }

        const response = await fetch(`http://localhost:5100/api/monthlydata/${selectedMonth}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch monthly statistics');
        }

        const data = await response.json();
        setMonthlyStatistics(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMonthlyStatistics();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedMonth(selectedValue);
  };

  return (
    <div className="stat">
      <h1>Monthly Statistics</h1>
      <hr style={{ width: '100%', borderTop: '1px solid #292323', borderColor: '#292323' }} />

      <select className="dropdown" value={selectedMonth} onChange={handleMonthChange}>
       
        <option value="" disabled hidden>
          Select a Month
        </option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(2023, i, 1).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>



      <div className="card flex">
        {error && <p>Error: {error}</p>}
        <div className="statistics flex">
          <p>Total Sale: {monthlyStatistics.totalSaleAmount.toFixed(2)}</p>
          <p>Total Sold Item: {monthlyStatistics.totalSoldItems.toFixed(2)}</p>
          <p>Total not Sold Items: {monthlyStatistics.totalUnsoldItems.toFixed(2)}</p>
        </div>
      </div>




    </div>
  );
}

export default Stat;


