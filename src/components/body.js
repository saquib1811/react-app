import { restaurantList } from "../constants";
import RestrauntCard from "./restrauntCard";
import { useState } from "react";

function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.data?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterData;
}

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [restraunts, setRestraunts] = useState(restaurantList);
  return (
    <>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            if (searchText.trim() == "") {
              setRestraunts(restaurantList);
            } else {
              const data = filterData(searchText, restraunts);
              setRestraunts(data);
            }
          }}
        >
          Search
        </button>
      </div>
      <div className="restraunt-list">
        {restraunts.map((restraunt) => {
          return <RestrauntCard {...restraunt.data} key={restraunt.data.id} />;
        })}
      </div>
    </>
  );
};

export default Body;
