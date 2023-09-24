import { imageUrl } from "../constants";
const RestrauntCard = ({
  name,
  cloudinaryImageId,
  avgRating,
  costForTwoString,
  cuisines,
  lastMileTravelString,
}) => (
  <div className="card">
    <img src={imageUrl + cloudinaryImageId} />
    <div className="ratings">
      <p>{name}</p>
      <p style={avgRating > 3 ? { color: "green" } : { color: "red" }}>
        {avgRating}
      </p>
    </div>
    <p>{costForTwoString}</p>
    <p>{cuisines.join(", ")}</p>
    <p>{lastMileTravelString} minutes</p>
  </div>
);

export default RestrauntCard;
