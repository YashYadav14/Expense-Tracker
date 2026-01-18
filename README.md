# Expense Tracker

A full-stack expense tracking application built with React, Node.js, Express, and MongoDB. This application allows users to register, login, and manage their personal expenses with a clean, responsive UI.

## 🚀 Features

### Authentication
- User registration with email validation
- Secure login with JWT authentication
- Password hashing with bcrypt
- Protected routes and automatic token refresh

### Expense Management
- **Create** new expenses with amount, category, date, and optional notes
- **View** all expenses in a clean, organized list
- **Edit** existing expenses inline
- **Delete** expenses with confirmation
- **Summary Dashboard** showing:
  - Total expenses
  - Total expense count
  - Top spending category
  - Category-wise breakdown

### User Experience
- Responsive design (mobile, tablet, desktop)
- Clean, modern UI with Tailwind CSS
- Real-time updates after CRUD operations
- Error handling with user-friendly messages
- Loading states for better UX

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
expense-tracker/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Backend Express API
    ├── src/
    │   ├── config/         # Configuration files
    │   ├── controllers/     # Route controllers
    │   ├── middleware/      # Custom middleware
    │   ├── models/          # Mongoose models
    │   ├── routes/          # API routes
    │   └── utils/           # Utility functions
    ├── server.js            # Entry point
    └── package.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
   ```

### Running the Application

1. **Start MongoDB** (if using local installation)
   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   Server will run on `http://localhost:5000`

3. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Expenses (Protected - requires JWT token)
- `GET /api/expenses` - Get all user expenses
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Health Check
- `GET /api/health` - Server health check

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes with middleware
- User isolation (users can only access their own expenses)
- Input validation on both client and server
- CORS configuration
- Environment variables for sensitive data

## 🎨 UI/UX Features

- Responsive design for all screen sizes
- Card-based layout
- Subtle hover and focus states
- Loading indicators
- Error and success messages
- Clean, minimal design suitable for portfolio

## 🧪 Testing the Application

1. **Register a new account**
   - Navigate to Register page
   - Fill in name, email, and password (min 6 characters)
   - Submit to create account

2. **Login**
   - Use registered credentials
   - JWT token will be stored in localStorage

3. **Add Expenses**
   - Fill in amount, category, date, and optional note
   - Submit to add expense

4. **Manage Expenses**
   - Click "Edit" to modify an expense
   - Click "Delete" to remove an expense
   - View summary statistics at the top

## 📝 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing

## 🚀 Building for Production

### Frontend
```bash
cd client
npm run build
```
Build output will be in `client/dist`

### Backend
The backend is ready for production. Ensure:
- Environment variables are set correctly
- MongoDB connection is configured
- JWT_SECRET is a strong, random string

## 🤝 Contributing

This is a portfolio project. Feel free to fork and modify for your own use.

## 📄 License

ISC

## 👤 Author

Built as a portfolio project to demonstrate full-stack development skills.

---

**Note**: Make sure to change the `JWT_SECRET` in production to a strong, randomly generated string.
