# 💬 RTChatApp - Real-Time Chat Application

A modern, full-stack real-time chat application built with React, Node.js, Socket.io, and MongoDB. Features include user authentication, friend system, direct messaging, group chats, and real-time notifications.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based authentication with refresh tokens
- 👥 **Friend System** - Send/accept/decline friend requests
- 💬 **Direct Messaging** - Real-time one-on-one conversations
- 👨‍👩‍👧‍👦 **Group Chats** - Create and manage group conversations
- ⚡ **Real-time Updates** - Instant message delivery via Socket.io
- 🔔 **Notifications** - Real-time friend request and message notifications
- 🖼️ **User Profiles** - Avatar support with Cloudinary integration
- 📱 **Responsive Design** - Mobile-friendly UI with TailwindCSS
- 🔍 **User Search** - Find and add friends by username
- 📄 **Pagination** - Efficient message loading with cursor-based pagination
- 🎨 **Dark/Light Theme** - Theme switching support
- 😊 **Emoji Picker** - Express yourself with emojis

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Router** - Navigation
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Emoji Mart** - Emoji picker

### Backend

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.io** - Real-time engine
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Swagger** - API documentation
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** >= 18.0.0
- **MongoDB** >= 5.0 (local or MongoDB Atlas)
- **npm** or **yarn** package manager

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd RTChatApp
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5001
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/rtchatapp

# JWT Secrets
ACCESS_TOKEN_SECRET=your-access-token-secret-here
REFRESH_TOKEN_SECRET=your-refresh-token-secret-here

# Cloudinary (Optional - for avatar uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

### 4. Run the Application

**Start Backend Server:**

```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:5001`

**Start Frontend Dev Server:**

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 📁 Project Structure

```
RTChatApp/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   ├── middlewares/      # Custom middlewares
│   │   ├── socket/           # Socket.io configuration
│   │   ├── libs/             # Database connection
│   │   ├── utils/            # Helper functions
│   │   ├── swagger.json      # API documentation
│   │   └── server.js         # Entry point
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   │   ├── auth/        # Authentication components
    │   │   ├── chat/        # Chat-related components
    │   │   ├── sidebar/     # Sidebar components
    │   │   └── ui/          # Reusable UI components
    │   ├── pages/           # Page components
    │   ├── stores/          # Zustand stores
    │   ├── services/        # API service layer
    │   ├── types/           # TypeScript types
    │   ├── hooks/           # Custom React hooks
    │   ├── lib/             # Utility functions
    │   ├── App.tsx          # Root component
    │   └── main.tsx         # Entry point
    ├── package.json
    └── .env
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/signout` - Logout user
- `POST /api/auth/refresh` - Refresh access token

### Users

- `GET /api/users/me` - Get current user profile
- `GET /api/users/search?username=xxx` - Search user by username

### Friends

- `POST /api/friends/requests` - Send friend request
- `GET /api/friends/requests` - Get received friend requests
- `POST /api/friends/requests/:requestId/accept` - Accept friend request
- `POST /api/friends/requests/:requestId/decline` - Decline friend request
- `GET /api/friends` - Get all friends

### Messages

- `POST /api/messages/direct` - Send direct message
- `POST /api/messages/group` - Send group message

### Conversations

- `GET /api/conversations` - Get all conversations
- `GET /api/conversations/:conversationId/messages` - Get conversation messages
- `PATCH /api/conversations/:conversationId/seen` - Mark conversation as seen

### Upload Avatar

- `POST /api/users/uploadAvatar` - Upload user avatar (multipart/form-data, field name: `file`)

### API Documentation

Visit `http://localhost:5001/api-docs` for interactive Swagger documentation.

## 🔄 Real-Time Events (Socket.io)

### Client → Server

- `join-conversation` - Join a conversation room

### Server → Client

- `new-message` - New message received
- `read-message` - Conversation read state updated
- `new-group` - New group created
- `friend-request-received` - New friend request
- `friend-request-accepted` - Friend request accepted
- `online-users` - List of online users

### Socket Authentication

Socket connection is authenticated via `auth.token` (access token) during the Socket.io handshake.

## 🏗️ Architecture

### Frontend Architecture

```
Component (UI)
    ↓
Store (State Management - Zustand)
    ↓
Service (API Layer)
    ↓
Backend API
```

**Layers:**

- **Components**: React UI components
- **Stores**: Global state management with Zustand
- **Services**: Pure API calls, stateless HTTP requests
- **Types**: TypeScript interfaces and types

### Backend Architecture

```
Client Request
    ↓
Routes
    ↓
Middlewares (Auth, Validation)
    ↓
Controllers
    ↓
Models (Mongoose)
    ↓
MongoDB
```

## 🗄️ Database Schema

### User

```javascript
{
  userName: String(unique, lowercase);
  hashedPassword: String;
  email: String(unique, lowercase);
  displayName: String;
  avatarUrl: String;
  avatarId: String;
  bio: String;
  phone: String;
}
```

### FriendRequest

```javascript
{
  from: ObjectId (ref: User)
  to: ObjectId (ref: User)
  message: String
  createdAt: Date
}
```

### Friend

```javascript
{
  userA: ObjectId (ref: User)
  userB: ObjectId (ref: User)
  createdAt: Date
}
```

### Message

```javascript
{
  conversationId: ObjectId (ref: Conversation)
  senderId: ObjectId (ref: User)
  content: String
  imgUrl: String
  createdAt: Date
}
```

### Conversation

```javascript
{
  type: "direct" | "group"
  participants: [{ userId: ObjectId (ref: User), joinedAt: Date }]
  group: { name: String, createdBy: ObjectId (ref: User) }?
  lastMessageAt: Date
  lastMessage: { _id: String, content: String, senderId: ObjectId, createdAt: Date } | null
  unreadCounts: Map<userId, number>
  seenBy: [ObjectId] (ref: User)
}
```

### Session

```javascript
{
  userId: ObjectId (ref: User)
  refreshToken: String
  expiresAt: Date
}
```

## 🔒 Authentication Flow

1. **Sign Up**: User registers → Password hashed with bcrypt → User created
2. **Sign In**: Credentials validated → Access token (JWT, 30min) + Refresh token (14 days) issued
3. **Protected Routes**: Access token verified via middleware
4. **Token Refresh**: When access token expires, refresh token used to get new access token
5. **Sign Out**: Session deleted from database

## 🧪 Development

### Code Style

- Frontend: ESLint with TypeScript rules
- Backend: ES modules syntax
- Use consistent naming conventions

### Available Scripts

**Backend:**

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

**Frontend:**

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🐛 Common Issues

### Git warning: "LF will be replaced by CRLF"

This is a Git line-ending warning on Windows. It does not block your code from running.

- If you want Git to keep Windows line endings in your working tree: `git config --global core.autocrlf true`
- If you want Git to keep LF everywhere: `git config --global core.autocrlf input`

### Port Already in Use

```bash
# Kill process on port 5001 (backend)
npx kill-port 5001

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### MongoDB Connection Error

- Ensure MongoDB is running locally or check your MongoDB Atlas connection string
- Verify `MONGODB_URI` in `.env` file

### CORS Errors

- Verify `CLIENT_URL` in backend `.env` matches your frontend URL
- Check CORS configuration in `server.js`

### Socket.io Connection Issues

- Ensure `VITE_SOCKET_URL` in frontend `.env` is correct
- Check that Socket.io middleware is properly configured

### Refresh token cookie not set in local dev (HTTP)

The backend sets the refresh token cookie with `secure: true` and `sameSite: "none"`, which requires HTTPS.
For local HTTP development you can either run over HTTPS or adjust cookie settings in `backend/src/controllers/authController.js`.

## 📝 Todo / Roadmap

- [ ] Voice/Video calling
- [ ] File sharing
- [ ] Message reactions
- [ ] Message editing/deletion
- [ ] Typing indicators
- [ ] Read receipts
- [ ] User presence (online/offline/away)
- [ ] Message search
- [ ] Block/unblock users
- [ ] Report users
- [ ] Admin dashboard
- [ ] Rate limiting
- [ ] End-to-end encryption

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Cowsaymoo1

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) - Real-time engine
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://zustand.docs.pmnd.rs/) - State management

---

Made with ❤️ using React and Node.js
