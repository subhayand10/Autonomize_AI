import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Followers from "./components/Followers";
import RepoList from "./components/RepoList";
import RepoDetails from "./components/RepoDetails";


interface User {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  repos_url: string;
  followers_url: string;
}

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [reposUrl, setReposUrl] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async (username: string) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUser(username);
    setReposUrl(`https://api.github.com/users/${username}/repos`);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>GitHub Repository Viewer</h1>
        </header>
        <Routes>
          <Route path="/repos/:repoName" element={<RepoDetails />} />
          <Route path="/repoList" element={<RepoList reposUrl={reposUrl} />} />
          <Route path="/followers" element={<Followers user={user} />} />
          <Route
            path="/"
            element={
              <>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button type="submit">Search</button>
                </form>
                <UserInfo user={user} />
                <div className="followers-link-container">
                  {user && (
                    <Link to="/followers" className="followers-link">
                      View Followers
                    </Link>
                  )}
                </div>
                <RepoList reposUrl={reposUrl} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const UserInfo: React.FC<{ user: User | null }> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-info">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
      <div>
        <h2>{user.login}</h2>
        <p>Public Repositories: {user.public_repos}</p>
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
      </div>
    </div>
  );
};



export default App;
