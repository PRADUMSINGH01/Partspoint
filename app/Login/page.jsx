"use client";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log("Google sign-in clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light p-4 w-full absolute top-0 z-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary p-6">
          <h2 className="text-2xl font-heading font-bold text-light text-center">
            Welcome Back
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white border border-border text-neutral hover:bg-light font-heading font-medium py-2 px-4 rounded-md transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="mx-4 text-sm font-body text-neutral">or</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-body font-medium text-neutral mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-body"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-body font-medium text-neutral mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-body"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-accent focus:ring-accent border-border rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm font-body text-neutral"
              >
                Remember me
              </label>
            </div>

            <a
              href="#"
              className="text-sm font-body text-accent hover:text-secondary"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-secondary text-light font-heading font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Log In
          </button>
        </form>

        <div className="px-6 py-4 bg-light border-t border-border">
          <p className="text-sm font-body text-neutral text-center">
            Don't have an account?{" "}
            <a
              href="/Register"
              className="font-medium text-accent hover:text-secondary"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
