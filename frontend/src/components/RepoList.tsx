import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RepoList.css";
import { useLocation, useNavigate } from "react-router-dom";

interface Repo {
  id: number;
  name: string;
  description: string;
}

const RepoList: React.FC<{ reposUrl: string }> = ({ reposUrl }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userQuery = queryParams.get("username");
  const navigate = useNavigate();

  useEffect(() => {
    let url = reposUrl;
    if (userQuery) {
      url = `https://api.github.com/users/${userQuery}/repos`;
    }

    if (url) {
      (async function getRepos() {
        try {
          const response = await axios.get(url);
          setRepos(response.data);
        } catch (error) {
          console.error("Error fetching repositories:", error);
        }
      })();
    }
  }, [reposUrl, userQuery]);

  const handleRepoClick = (repoName: string, description: string) => {
    navigate(`/repos/${repoName}`, { state: { description } });
  };

  // Ensure that repos is always an array before attempting to map over it
  if (!Array.isArray(repos)) {
    return <div>No repositories found.</div>;
  }

  return (
    <>
      <div className="repo-list">
        {repos.length !== 0 ? <h2>Repositories</h2> : ""}
        <div className="repo-grid">
          {repos.map((repo) => (
            <div
              className="repo-item"
              key={repo.id}
              onClick={() => handleRepoClick(repo.name, repo.description)}
            >
              {repo.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RepoList;
