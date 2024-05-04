import { useSearchParams } from "react-router-dom";
import "./index.scss";
import { useState } from "react";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 100,
    bedroom: searchParams.get("bedroom") || 1,
  });

  function handlechange(event) {
    setQuery({
      ...query,
      [event.target.name]: event.target.value,
    });
  }

  function handleFilter() {
    setSearchParams(query);
  }

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city") || "All"}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            value={query.city}
            onChange={handlechange}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={query.type}
            onChange={handlechange}
          >
            <option value="">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            name="property"
            id="property"
            value={query.property}
            onChange={handlechange}
          >
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            min={0}
            max={100000}
            id="minPrice"
            name="minPrice"
            placeholder="Any"
            value={query.minPrice}
            onChange={handlechange}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            min={0}
            max={100000}
            id="maxPrice"
            name="maxPrice"
            placeholder="Any"
            value={query.maxPrice}
            onChange={handlechange}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="number"
            min={0}
            max={100000}
            id="bedroom"
            name="bedroom"
            placeholder="Any"
            value={query.bedroom}
            onChange={handlechange}
          />
        </div>
        <button className="search-btn" onClick={handleFilter}>
          <img src="/search.png" alt="Search icon" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
