"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { ImageIcon, Lock } from "lucide-react";
import Image from "next/image";

import Header from "@/components/Header";
import About from "@/components/About";
import Loading from "@/components/Loading";
import Story from "@/components/Profile/Story";
import { AnimatePresence, motion } from "framer-motion";

const InstagramViewer: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fetchedUser, setFetchedUser] = useState<any>(null);

  const fetchInstagramProfile = async (username: string): Promise<void> => {
    setIsLoading(true);
    setError("");
    setProfile(null);
    setFetchedUser(null);

    try {
      const [res1, res2] = await Promise.all([
        await fetch("/api/instagram_stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        }),
        await fetch("/api/instagram_general", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        }),
      ]);

      const [{ items }, { items: items1 }] = await Promise.all([
        await res1.json(),
        await res2.json(),
      ]);

      if (!res1.ok && !res2.ok) {
        throw new Error(items.error || "Failed to fetch");
      }

      setFetchedUser(items[0]);
      setProfile({
        ...items[0].user,
        generalData: items1[0],
      });
    } catch (err) {
      setError("Failed to fetch profile data. Please try again.");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (username.trim() === "") {
      setError("Please enter an Instagram username");
      return;
    } else if (
      username.indexOf("https://") != -1 ||
      username.indexOf("instagram.com") != -1
    ) {
      setUsername(
        username
          .split("instagram.com/")[1]
          .slice(0, username.split("instagram.com/")[1].length)
      );
    }
    fetchInstagramProfile(username);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
      <Header />
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden p-1">
          <span className="pl-4 text-gray-400">@</span>
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter Instagram username"
            value={username}
            onChange={handleInputChange}
          />
          <button
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium py-2 px-6 rounded-full transition duration-300 hover:shadow-lg cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "View"}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </form>

      {profile && !isLoading && (
        <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-6 gap-6">
            <div className="flex justify-center items-center flex-col mx-auto">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-1 flex justify-center items-center m-4">
                  <Image
                    src={profile.profile_pic_url}
                    alt={`${profile.username}'s profile`}
                    width={100}
                    height={100}
                    className="rounded-full h-full w-full object-cover border-2 border-white"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                  <h2 className="text-xl font-bold">@{profile.username}</h2>
                  <div className="flex space-x-2">
                    {profile.is_private && (
                      <span className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg flex items-center">
                        <Lock size={14} className="mr-1" /> Private
                      </span>
                    )}
                    {profile.is_verified && (
                      <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-lg flex items-center">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-center md:justify-start space-x-6 mb-3">
                  <div className="text-center">
                    <span className="font-semibold">
                      {profile.generalData.postsCount}
                    </span>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold">
                      {profile.generalData.followersCount}
                    </span>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold">
                      {profile.generalData.followsCount}
                    </span>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium">{profile.full_name}</p>
                  {profile.biography && (
                    <p className="text-sm text-gray-700 whitespace-pre-line mt-1">
                      {profile.biography}
                    </p>
                  )}
                  {profile.external_url && (
                    <a
                      href={profile.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm mt-1 block"
                    >
                      {profile.external_url}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {profile.is_private && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-center">
              <div className="flex justify-center mb-2">
                <Lock size={24} className="text-gray-500" />
              </div>
              <h3 className="font-medium text-gray-700 mb-1">
                This Account is Private
              </h3>
            </div>
          )}

          {!profile.is_private && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6"
            >
              <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-center gap-3">
                <ImageIcon className="w-6 h-6 text-gray-600" />
                <h1 className="text-2xl font-bold text-gray-800">
                  Latest Stories
                </h1>
              </div>

              <div className="p-4">
                <AnimatePresence>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {fetchedUser.items.map((item: any) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Story
                          id={item.id}
                          image={item.image_versions2.candidates[0].url}
                          takenAt={item.taken_at}
                          alt={item.accessibility_caption}
                        />
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>

                {fetchedUser.items.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-md">No stories available</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <div className="text-xs text-gray-500 mt-2 mb-6 text-center"></div>
        </div>
      )}
      {isLoading && (
        <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-10 flex items-center justify-center">
          <Loading text="Fetching profile..." />
        </div>
      )}

      <About />
    </div>
  );
};

export default InstagramViewer;
