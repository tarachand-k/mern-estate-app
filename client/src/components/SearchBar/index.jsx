import { Link } from "react-router-dom";
import { useState } from "react";
import "./index.scss";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  function switchType(type) {
    setQuery((curr) => {
      return { ...curr, type };
    });
  }

  function handleChange(event) {
    setQuery((curr) => {
      return { ...curr, [event.target.name]: event.target.value };
    });
  }

  return (
    <div className="search-bar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : undefined}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="City"
          placeholder="City Location"
          value={query.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000}
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000}
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleChange}
        />
        <Link
          to={`/listings?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <img src="/search.png" alt="search icon" />
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
