# MERN + TypeScript + Tailwind CSS v4 Boilerplate

A production-ready, highly secure full-stack boilerplate designed to kickstart modern web applications with strict type safety, sliding-session JWT authentication, and lightning-fast developer compilation times.

---

## ✨ Features

* **End-to-End Type Safety:** Fully typed frontend and backend configurations using TypeScript.
* **Sliding Session JWT Auth:** Secure access and refresh token authentication using `httpOnly`, `secure`, and `sameSite` cookies with refresh token rotation.
* **Multi-Device Session Tracking:** Tracks user-agent data, allowing users to view and revoke active sessions on other devices.
* **Email Verification & Password Reset:** Complete email verification and password reset flows with token expiration and rate limiting.
* **Zod Request Validation:** Integrated validation schemas for incoming requests to prevent malformed data.
* **Resend Integration:** Structured and styled email templates powered by the Resend client.

---

## 🛠 Tech Stack

* **Frontend:** [React 19](https://react.dev/), [Vite 8](https://vite.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
* **Backend:** [Node.js](https://nodejs.org/), [Express 5](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/)
* **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/)
* **Security:** [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (JWTs), [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (Password Hashing)
* **Validation:** [Zod](https://zod.dev/)
* **Email Service:** [Resend API](https://resend.com/)

---

## 📂 Project Structure

```text
mern-jwt-auth/
├── backend/
│   ├── src/
│   │   ├── config/             # DB and API client integrations (Mongoose, Resend)
│   │   ├── constants/          # App constants, environments, and HTTP codes
│   │   ├── controllers/        # Request controllers and schema validation
│   │   ├── middleware/         # Auth verification and global error handlers
│   │   ├── models/             # Mongoose schemas, hooks, and instance methods
│   │   ├── routes/             # Express API routing declarations
│   │   ├── services/           # Business logic (creating accounts, sessions, mailers)
│   │   ├── utils/              # Cryptography, tokens, and general helper functions
│   │   ├── app.d.ts            # Global Express Request type augmentations
│   │   └── index.ts            # Entry point for the backend server
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/                    # React views, components, and assets
│   ├── index.html
│   ├── vite.config.ts          # Vite configuration with Tailwind CSS v4 compiler
│   ├── package.json
│   └── tsconfig.json
│
└── .gitignore                  # Project-wide Git exclusion rules
```

---

## 🚀 Getting Started

### Step 1: Clone the repository and install dependencies
```bash
# Clone the repository
git clone https://github.com/yourusername/mern-jwt-auth.git
cd mern-jwt-auth

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Set up environment variables
Follow the configuration guide in the **Environment Variables** section below to create `.env` files for both the backend and frontend.

### Step 3: Run the application
Run the dev servers for both components concurrently or in separate terminals to start building.

---

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
NODE_ENV=development
PORT=4004
APP_ORIGIN=http://localhost:5173
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/your_database_name

JWT_SECRET=your_super_secret_access_token_key
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key

EMAIL_SENDER=onboarding@resend.dev
RESEND_API_KEY=re_your_resend_api_key
```

### Frontend Configuration (`frontend/.env`)
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:4004
```

---

## 📜 Available Scripts

### Backend Scripts (run inside `backend/`)
* **`npm run dev`**: Starts the development server using `tsx watch` for hot-reloading.
* **`npm run build`**: Compiles the TypeScript code to plain JavaScript in the `dist/` directory.
* **`npm run start`**: Runs the compiled backend server from the build directory.

### Frontend Scripts (run inside `frontend/`)
* **`npm run dev`**: Launches the Vite development server.
* **`npm run build`**: Compiles the TS code and builds the production-optimized static bundle.
* **`npm run preview`**: Serves the built production assets locally for testing.

---

## 🔐 Authentication Flow

1. **User Registers/Logs in:** The controller validates inputs using Zod. The password is hashed using bcrypt via Mongoose pre-save hooks.
2. **Token Generation:** The server generates a short-lived `accessToken` (15m) and a long-lived `refreshToken` (30d).
3. **Cookie Delivery:** Tokens are returned via HTTP-only, secure, same-site cookies (`accessToken` and `refreshToken`).
4. **Session Verification:** The `authenticate` middleware checks the access token. If it is expired, the client makes a request to `/auth/refresh` using the refresh token to rotate keys and issue a new access token without forcing the user to log in again.
5. **Session Revocation:** Logging out deletes the session from MongoDB and clears the cookies on the client side.

---

## 📌 Roadmap

- [ ] Set up user roles and permissions (RBAC).
- [ ] Implement OAuth2 Social Logins (Google, GitHub).
- [ ] Add Jest / Supertest suite for backend integration tests.
- [ ] Add React Router v7 navigation and React Query for state caching on the frontend.
- [ ] Implement dark/light mode toggle via Tailwind v4 variables.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open a Pull Request or report bugs via issues.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
