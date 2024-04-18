import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Followers.css"
import BackButton from "./BackButton";

interface Follower {
  login: string;
  avatar_url: string;
}

interface User {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  repos_url: string;
  followers_url: string;
}

const Followers: React.FC<{ user: User | null }> = ({ user }) => {
  const [followers, setFollowers] = useState<Follower[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (user && user.followers_url) {
        try {
          const response = await axios.get(user.followers_url);
          setFollowers(response.data);
        } catch (error) {
          console.error("Error fetching followers:", error);
        }
      }
    };

    fetchFollowers();
  }, [user]);

  return (
    <div className="followers-container">
    <div className="follower-header">
      <h2>Followers</h2>
      <BackButton />
    </div>
      {followers.length === 0 ? (
        <p>No followers found.</p>
      ) : (
        <div className="follower-grid">
          {followers.map((follower) => (
            <div className="follower-info" key={follower.login}>
              <img
                src={follower.avatar_url}
                alt={`${follower.login}'s avatar`}
              />
              <Link to={`/repoList?username=${follower.login}`}>
                {follower.login}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Followers;
