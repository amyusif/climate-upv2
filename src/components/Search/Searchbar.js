import React, { useState } from "react";
import "./Search.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { Geo_Api_Option, GEO_URL } from "../../Api/Api";

const Searchbar = ({ onHandleChange }) => {
  const [search, setSearch] = useState(null);

  const handleChange = (searchData) => {
    setSearch(searchData);
    onHandleChange(searchData);
  };
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_URL}?namePrefix=${inputValue}`,
      Geo_Api_Option
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          })),
        };
      });
  };

  return (
    <div className="search">
    <div className="search-container"> 
    <AsyncPaginate
      value={search}
      placeholder="Seach for a city"
      onChange={handleChange}
      loadOptions={loadOptions}
      debounceTimeout={600}
    />
    </div>
    </div>
  );
};

export default Searchbar;
