import React from "react";
import "./RepoDetails.css"
import BackButton from "./BackButton";
import {
  useLocation,
} from "react-router-dom";
const RepoDetails: React.FC = () => {
  const location = useLocation();
  console.log(location);
  const description = location.state?.description || "";
  return (
    <div className="repo-details">
      {description ? (
        <div>
          <h1>Description</h1>
          <p className="description">{description}</p>
        </div>
      ) : (
        <p>No Description</p>
      )}
      <BackButton />
    </div>
  );
};
export default RepoDetails