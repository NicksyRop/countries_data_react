import axios from "axios";
import React, { useEffect, useState } from "react";

const DispalySearch = (props) => {
  return <div>{props.data}</div>;
};

const CountryDetails = (props) => {
  return <div></div>;
};
function App(props) {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCountries, setFilteredContries] = useState([]);

  const handleChange = (event) => {
    const val = event.target.value.toLowerCase();

    setSearch(val);

    const result = countries.filter((item) => {
      return Object.values(item.name.common)
        .join("")
        .toLowerCase()
        .includes(val);
    });

    setFilteredContries(result);

    console.log(filterCountries.length);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const searches = filterCountries.map((country, index) => (
    <li key={index}>{country.name.common}</li>
  ));

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "blue" }}>
        Countries Details App
      </h1>
      <label>Find Countries</label> <br />
      <input type="text" value={search} onChange={handleChange}></input> <br />
      {filterCountries == [] ? (
        <></>
      ) : filterCountries.length >= 10 ? (
        <h1>Too many matches , specify another filter</h1>
      ) : (
        <DispalySearch data={searches} />
      )}
      <CountryDetails />
    </div>
  );
}

export default App;
