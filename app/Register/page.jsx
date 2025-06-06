"use client";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log({ name, email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light p-4 w-full absolute top-0 z-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary p-6">
          <h2 className="text-2xl font-heading font-bold text-light text-center">
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-body font-medium text-neutral mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-body"
              required
            />
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-body font-medium text-neutral mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-body"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-secondary text-light font-heading font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="px-6 py-4 bg-light border-t border-border">
          <p className="text-sm font-body text-neutral text-center">
            Already have an account?{" "}
            <a
              href="/Login"
              className="font-medium text-accent hover:text-secondary"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
