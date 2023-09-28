import { swiggyUrl } from "../constants";
import RestrauntCard from "./restrauntCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterData;
}

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestraunts, setallRestraunts] = useState([]);
  const [filteredRestraunts, setfilteredRestraunts] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  useEffect(() => {
    getRestraunts();
  }, []);

  async function getRestraunts() {
    try {
      const response = await fetch(swiggyUrl);
      const json = await response.json();
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }
      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);
      setallRestraunts(resData);
      setfilteredRestraunts(resData);
    } catch (e) {
      console.log(e);
    }
  }
  async function SearchData(text,restraunts){
    if(text !== ''){
      if(restraunts.length === 0){
        setErrMessage("No Restraunts Found.")
      }else{
        const data = filterData(searchText, allRestraunts);
        setfilteredRestraunts(data);
      }
    }else{
      setErrMessage("")
      setfilteredRestraunts(restraunts);
    }
  }
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
            const data = filterData(searchText, allRestraunts);
            setfilteredRestraunts(data);
          }}
        >
          Search
        </button>
      </div>
      {errMessage && <div className="error-container">{errMessage}</div>}
      {(filteredRestraunts.length == 0) ? (<Shimmer/>) :(<div className="restaurant-list">
        {filteredRestraunts.map((restraunt) => {
          return <RestrauntCard {...restraunt.info} key={restraunt.info.id} />;
        })}
      </div>) }
      
    </>
  );
};

export default Body;
