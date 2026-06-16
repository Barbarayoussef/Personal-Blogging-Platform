# Personal Blogging Platform API

A RESTful API for a personal blogging platform that allows users to register, log in, and manage their own blog posts.

---

## Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express.js v5
- **Database**: MongoDB via Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Password Hashing**: bcrypt

---

## Database Choice

**MongoDB** was chosen for its flexible document model and ease of use with Node.js via Mongoose. For a blogging platform where posts and users are the primary entities, MongoDB's schema-per-model approach (enforced through Mongoose) provides the right balance between flexibility and structure. The One-to-Many relationship between users and posts is handled via an `authorId` reference field on each post.

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally or a MongoDB Atlas connection string

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/personal-blogging-platform.git
   cd personal-blogging-platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example config/.env
   ```

   Then open `config/.env` and fill in your values:

   ```
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/personal-blogging-platform
   USER_SIGNATURE=your_jwt_secret_key_here
   SALT_ROUNDS=10
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

The server will start on `http://localhost:3000`.

---

## API Endpoints

### Auth

| Method | Endpoint         | Access | Description              |
| ------ | ---------------- | ------ | ------------------------ |
| POST   | `/auth/register` | Public | Register a new user      |
| POST   | `/auth/login`    | Public | Log in and receive a JWT |

#### POST `/auth/register`

Request body:

```json
{
  "name": "Barbara Youssef",
  "email": "barbara@example.com",
  "password": "Password1",
  "confirmPassword": "Password1"
}
```

Response `201`:

```json
{ "message": "user created successfully" }
```

---

#### POST `/auth/login`

Request body:

```json
{
  "email": "barbara@example.com",
  "password": "Password1"
}
```

Response `200`:

```json
{
  "message": "login successful",
  "accessToken": "<jwt>",
  "refreshToken": "<jwt>"
}
```

---

### Posts

Protected routes require the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

| Method | Endpoint     | Access                 | Description             |
| ------ | ------------ | ---------------------- | ----------------------- |
| GET    | `/posts`     | Public                 | Retrieve all blog posts |
| POST   | `/posts`     | Protected              | Create a new post       |
| PUT    | `/posts/:id` | Protected (owner only) | Update a post           |
| DELETE | `/posts/:id` | Protected (owner only) | Delete a post           |

#### GET `/posts`

Response `200`:

```json
{
  "message": "posts retrieved successfully",
  "posts": [...]
}
```

---

#### POST `/posts`

Request body:

```json
{
  "title": "My First Post",
  "content": "This is the content of my first blog post."
}
```

Response `201`:

```json
{
  "message": "post created successfully",
  "post": { ... }
}
```

---

#### PUT `/posts/:id`

Request body (all fields optional):

```json
{
  "title": "Updated Title",
  "content": "Updated content."
}
```

Response `200`:

```json
{
  "message": "post updated successfully",
  "post": { ... }
}
```

---

#### DELETE `/posts/:id`

Response `200`:

```json
{ "message": "post deleted successfully" }
```

---

## Error Responses

All errors follow this format:

```json
{ "message": "description of the error" }
```

| Status Code | Meaning                                 |
| ----------- | --------------------------------------- |
| 400         | Bad request / validation error          |
| 401         | Unauthorized (missing or invalid token) |
| 403         | Forbidden (not the post owner)          |
| 404         | Resource not found                      |
| 500         | Internal server error                   |

---

## 🚀 Live Deployment

This API is fully deployed and accessible in production.

- **Live Demo Link**: `https://personal-blogging-platform-production-2747.up.railway.app`

### Production Environment Variables Used

- `PORT` (Dynamically assigned by Railway)
- `MONGO_URL` (Hosted via MongoDB Atlas Cloud Cluster)
- `USER_SIGNATURE` (Secure JWT secret)
- `SALT_ROUNDS` (Bcrypt hashing difficulty)

---

## Folder Structure

```
├── config/
│   └── .env
├── src/
│   ├── database/
│   │   ├── connection.js
│   │   └── models/
│   │       ├── user.model.js
│   │       └── post.model.js
│   ├── middleware/
│   │   ├── authenticate.js
│   │   └── authorize.js
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   └── post/
│   │       ├── post.controller.js
│   │       ├── post.service.js
│   │       └── post.validation.js
│   ├── utils/
│   │   └── validation.js
│   └── app.controller.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
