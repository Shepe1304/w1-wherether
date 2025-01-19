import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import MapComponent from "./MapComponent";

const LandingPage = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("Select a country");
  const [countryCode, setCountryCode] = useState("");
  const [countryLat, setCountryLat] = useState("");
  const [countryLng, setCountryLng] = useState("");

  useEffect(() => {
    fetch("/assets/countries.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch csv file.");
        }
        return response.text();
      })
      .then((csvText) => {
        const result = Papa.parse(csvText, { header: true });
        setCountries(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.value === "Select a country") {
      setCountryName(e.target.value);
    }

    countries.forEach((country) => {
      if (country.name === e.target.value) {
        setCountryName(country.name);
        setCountryCode(country.country);
        setCountryLat(country.latitude);
        setCountryLng(country.longitude);
      }
    });
  };

  return (
    <div>
      <select name="" id="" onChange={handleChange}>
        <option value="Select a country">Select a country</option>
        {countries.map((country) => {
          return <option value={country.name}>{country.name}</option>;
        })}
      </select>
      {countryName != "Select a country" ? (
        <MapComponent
          countryName={countryName}
          countryCode={countryCode}
          countryLat={countryLat}
          countryLng={countryLng}
        />
      ) : null}
    </div>
  );
};

export default LandingPage;
