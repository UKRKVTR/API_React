import React, { useState, useEffect } from "react";
import "./style.css";
const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://zpspace.com.ua/api/airdata")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((err) => console.error("Error fetching data :>>", err));
  }, []);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);

    if (newFilter.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (entry) =>
          entry.kind_of_smell &&
          entry.kind_of_smell.trim().toLowerCase() ===
            newFilter.trim().toLowerCase()
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="table-container">
      <div className="filter-container">
        <label>
          Фільтр:
          <select value={filter} onChange={handleFilterChange}>
            <option value=" ">Всі</option>
            <option value="Хімія">Хімія</option>
            <option value="Горілий пластик">Горілий пластик</option>
            <option value="Металургійний гар">Металургійний гар</option>
          </select>
        </label>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Timestamp</th>
              <th>Wind Speed</th>
              <th>Kind of Smell</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, index) => (
              <tr key={`${entry.userId}_${index}`}>
                <td>{entry.userId}</td>
                <td>{entry.timestamp}</td>
                <td>{`${entry.windSpeed} km/h`}</td>
                <td>{entry.kind_of_smell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
