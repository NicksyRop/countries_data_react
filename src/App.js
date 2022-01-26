import axios from "axios";
import React, { useEffect, useState } from "react";

function App(props) {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCountries, setFilteredContries] = useState([]);

  const handleChange = (event) => {
    const val = event.target.value.toLowerCase();

    setSearch(val);
    let result = [];

    result = countries.filter((data) => {
      return data.name.comon.search(val) != -1;
    });

    setFilteredContries(result);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "blue" }}>
        Countries Details App
      </h1>
      <label>Find Countries</label> <br />
      <input type="text" value={search} onChange={handleChange}></input> <br />
      {filterCountries.map((country) => (
        <li key={country.name}>{country.name} </li>
      ))}
    </div>
  );
}

export default App;
