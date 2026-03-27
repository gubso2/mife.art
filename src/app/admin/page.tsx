"use client";

import { useState, type FormEvent } from "react";

type View = "login" | "upload";
type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function AdminPage() {
  const [view, setView] = useState<View>("login");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadMessage, setUploadMessage] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setView("upload");
    } else {
      setLoginError("Invalid password");
    }
  }

  async function handleUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploadStatus("uploading");
    setUploadMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setUploadStatus("success");
        setUploadMessage(
          "Artwork published! The site will update in about 1-2 minutes."
        );
        form.reset();
      } else {
        const data = await res.json();
        setUploadStatus("error");
        setUploadMessage(data.error || "Upload failed");
      }
    } catch {
      setUploadStatus("error");
      setUploadMessage("Network error. Please try again.");
    }
  }

  if (view === "login") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          <h1 className="text-2xl font-semibold uppercase tracking-wider text-center">
            Admin
          </h1>
          <div>
            <label
              htmlFor="password"
              className="block text-xs uppercase tracking-wider font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
              required
            />
          </div>
          {loginError && (
            <p className="text-sm text-red-700">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-foreground text-white text-sm uppercase tracking-wider px-8 py-3 hover:bg-foreground/90 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-16">
      <h1 className="text-2xl font-semibold uppercase tracking-wider mb-8">
        Add Artwork
      </h1>

      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
            placeholder="e.g. Ocean Constellation"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
              Price (AUD) *
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
              placeholder="e.g. 590"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
              Dimensions
            </label>
            <input
              type="text"
              name="dimensions"
              className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
              placeholder="e.g. 90 x 90 cm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
            Medium
          </label>
          <input
            type="text"
            name="medium"
            className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
            placeholder="e.g. Acrylic on canvas"
            defaultValue="Acrylic on canvas"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-vertical"
            placeholder="A short description of the artwork..."
          />
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              value="true"
              className="w-4 h-4"
            />
            <span className="text-xs uppercase tracking-wider font-semibold">
              Show in Featured section on homepage
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
              Room Mockup Image (Far) *
            </label>
            <input
              type="file"
              name="farImage"
              accept="image/*"
              required
              className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:border file:border-border file:text-xs file:uppercase file:tracking-wider file:bg-white file:text-foreground file:cursor-pointer hover:file:bg-gray-50"
            />
            <p className="text-xs text-muted mt-1">
              The artwork shown in a room setting
            </p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
              Close-up Image (Detail)
            </label>
            <input
              type="file"
              name="closeImage"
              accept="image/*"
              className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:border file:border-border file:text-xs file:uppercase file:tracking-wider file:bg-white file:text-foreground file:cursor-pointer hover:file:bg-gray-50"
            />
            <p className="text-xs text-muted mt-1">
              A close-up of the texture/detail
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={uploadStatus === "uploading"}
          className="w-full bg-foreground text-white text-sm uppercase tracking-wider px-8 py-3 hover:bg-foreground/90 transition-colors disabled:opacity-50"
        >
          {uploadStatus === "uploading" ? "Publishing..." : "Publish Artwork"}
        </button>

        {uploadStatus === "success" && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm">
            {uploadMessage}
          </div>
        )}
        {uploadStatus === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
            {uploadMessage}
          </div>
        )}
      </form>
    </div>
  );
}
