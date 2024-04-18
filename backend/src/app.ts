import express, { Request, Response } from "express";
import mongoose from "mongoose";
import fetch from "node-fetch";

const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  id: { type: Number, required: true },
  node_id: String,
  avatar_url: String,
  gravatar_id: String,
  url: String,
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url: String,
  starred_url: String,
  subscriptions_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: String,
  type: String,
  site_admin: Boolean,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  hireable: Boolean,
  bio: String,
  twitter_username: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  updated_at: Date,
  friends: [{ type: String }],
  deleted: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

const app = express();
app.use(express.json());

app.post("/users/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const existingUser = await User.findOne({ login: username });

  if (existingUser) {
    return res.json(existingUser);
  }

  const response = await fetch(`https://api.github.com/users/${username}`);
  const userData: any = await response.json();

  if (userData.message) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = new User({
    login: userData.login,
    id: userData.id,
    node_id: userData.node_id,
    avatar_url: userData.avatar_url,
    gravatar_id: userData.gravatar_id,
    url: userData.url,
    html_url: userData.html_url,
    followers_url: userData.followers_url,
    following_url: userData.following_url,
    gists_url: userData.gists_url,
    starred_url: userData.starred_url,
    subscriptions_url: userData.subscriptions_url,
    organizations_url: userData.organizations_url,
    repos_url: userData.repos_url,
    events_url: userData.events_url,
    received_events_url: userData.received_events_url,
    type: userData.type,
    site_admin: userData.site_admin,
    name: userData.name,
    company: userData.company,
    blog: userData.blog,
    location: userData.location,
    email: userData.email,
    hireable: userData.hireable,
    bio: userData.bio,
    twitter_username: userData.twitter_username,
    public_repos: userData.public_repos,
    public_gists: userData.public_gists,
    followers: userData.followers,
    following: userData.following,
    created_at: userData.created_at,
    updated_at: userData.updated_at,
  });

  await user.save();
  res.json(user);
});

app.post("/users/:username/friends", async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await User.findOne({ login: username });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const followersResponse = user.followers_url
    ? await fetch(user.followers_url)
    : null;
  const followingResponse = user.following_url
    ? await fetch(
        user.following_url?.substring(0, user.following_url.indexOf("{"))
      )
    : null;
    const followers: any = followersResponse?await followersResponse.json():[];
    const following: any = followingResponse?await followingResponse.json():[];
    if(followers.message)
      {
        return res.status(404).json({ error: "Followers "+followers.message });
      }
      if (following.message) {
        return res.status(404).json({ error: "Following " + following.message });
      }
let followingUserId: string[] = [];
console.log(following)
following.forEach((element: { login: string }) => {
  followingUserId.push(element.login);
});

const friends = followers.filter((follower: { login: string }) =>
  followingUserId.includes(follower.login)
);

user.friends = friends.map((friend: { login: string }) => friend.login);
user.save();
console.log(friends);

res.json(friends);
});

app.get("/users", async (req: Request, res: Response) => {
  const { username, location } = req.query;
  const query: any = {};

  if (username) {
    query.login = { $regex: username, $options: "i" };
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  const users = await User.find(query);
  res.json(users);
});

app.delete("/users/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await User.findOneAndUpdate(
    { login: username },
    { deleted: true },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.put("/users/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const { location, blog, bio } = req.body;
  const user = await User.findOneAndUpdate(
    { login: username },
    { location, blog, bio },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.get("/users/sorted", async (req: Request, res: Response) => {
  const { sortBy } = req.query;
  const users = await User.find({ deleted: false });
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
  mongoose.connect("mongodb://localhost:27017/newDB");
});

export default app;