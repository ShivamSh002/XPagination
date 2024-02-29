import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(response.data);
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const slicedData = data.slice(startIndex, endIndex);

    return slicedData.map((entry, index) => (
      <tr key={index}>
        <td> {entry.id} </td> <td> {entry.name} </td> <td> {entry.email} </td>{" "}
        <td> {entry.role} </td>{" "}
      </tr>
    ));
  };

  return (
    <div className="wrapper">
      {" "}
      {error && <div> Error: {error} </div>}{" "}
      <div className="head">
        {" "}
        <h1> Employee Data Table </h1>{" "}
      </div>{" "}
      <div className="table">
        {" "}
        <table>
          <thead>
            <tr>
              <th> ID </th> <th> Username </th> <th> Email </th> <th> Role </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody> {renderData()} </tbody>{" "}
        </table>{" "}
      </div>{" "}
      <div className="btn">
        <button onClick={handleClickPrevious}> Previous </button>{" "}
        <button> {currentPage} </button>{" "}
        <button onClick={handleClickNext}> Next </button>{" "}
      </div>{" "}
    </div>
  );
};

export default App;
