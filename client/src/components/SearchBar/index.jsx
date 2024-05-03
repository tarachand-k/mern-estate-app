import { useState } from "react";
import "./index.scss";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  function switchType(type) {
    setQuery((curr) => {
      return { ...curr, type };
    });
  }

  function setValue(event, key) {
    setQuery((curr) => {
      return { ...curr, [key]: event.target.value };
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
          name="location"
          placeholder="City Location"
          value={query.location}
          onChange={(event) => setValue(event, "location")}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000}
          placeholder="Min Price"
          value={query.minPrice}
          onChange={(event) => setValue(event, "minPrice")}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000}
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={(event) => setValue(event, "maxPrice")}
        />

        <button>
          <img src="/search.png" alt="search icon" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
