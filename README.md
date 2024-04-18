<h1>GitHub Uses Finder</h1>

<h2>Backend API</h2>
deployed Url: https://autonomize-ai-af0q.onrender.com
<h3>Render free instance will spin down with inactivity, which can delay requests by 50 seconds or more.</h3>

## Endpoints

### 1. Get Homepage

- **Method:** GET
- **URL:** `/`
- **Response Content-Type:** HTML
- **Response Body:** HTML content for the homepage with the title "Github API"

### 2. Add User to DB

- **Method:** POST
- **URL:** `/users/:username`
- **Parameters:** 
  - `username`: String (Path parameter)
- **Request Body:** None
- **Response Content-Type:** application/json
- **Response Body:** JSON object representing the user data or an error message if the user is not found.

### 3. Add Friends

- **Method:** POST
- **URL:** `/users/:username/friends`
- **Parameters:** 
  - `username`: String (Path parameter)
- **Request Body:** None
- **Response Content-Type:** application/json
- **Response Body:** JSON array representing the friends of the user or an error message if the user or their followers/following are not found.

### 4. Get Users

- **Method:** GET
- **URL:** `/users`
- **Query Parameters:**
  - `username`: String (Optional)
  - `location`: String (Optional)
- **Response Content-Type:** application/json
- **Response Body:** JSON array representing the list of users based on the provided query parameters.

### 5. Delete User

- **Method:** DELETE
- **URL:** `/users/:username`
- **Parameters:** 
  - `username`: String (Path parameter)
- **Request Body:** None
- **Response Content-Type:** application/json
- **Response Body:** JSON object representing the deleted user or an error message if the user is not found.

### 6. Update User

- **Method:** PUT
- **URL:** `/users/:username`
- **Parameters:** 
  - `username`: String (Path parameter)
- **Request Body:**
  - `location`: String (Optional)
  - `blog`: String (Optional)
  - `bio`: String (Optional)
- **Response Content-Type:** application/json
- **Response Body:** JSON object representing the updated user or an error message if the user is not found.

### 7. Get Sorted Users

- **Method:** GET
- **URL:** `/users/sorted`
- **Response Content-Type:** application/json
- **Response Body:** JSON array representing the sorted list of users.

<h2>Frontend</h2>
deployed Url: https://autonomize-ai-x2aj.vercel.app/
