"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { Shield, Eye, Lock, Activity } from "lucide-react";
import { ApifyClient } from "apify-client";
import Image from "next/image";

interface InstagramProfileResponse {
  user_info?: InstagramProfile;
  message?: string;
  picture?: any;
  stories?: Story[];
  highlights?: Highlight[];
  ticket?: number;
  queue?: any;
}

interface InstagramProfile {
  id: number;
  username: string;
  full_name: string;
  biography: string;
  external_url: string;
  is_private: boolean;
  is_verified: boolean;
  profile_pic_url: string;
  posts: number;
  followers: number;
  following: number;
}

interface Story {
  id: string;
  pk: string;
  media_type: string;
  source: string;
  thumbnail: string;
  taken_at: string;
  taken_at_raw: string;
  mentions: any[];
  link: string;
}

interface Highlight {
  node: {
    id: string;
    title: string;
    cover_media: {
      thumbnail_src: string;
    };
  };
}

const client = new ApifyClient({
  token: process.env.NEXT_PUBLIC_APIFY_API_TOKEN,
});

const InstagramViewer: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fetchedUser, setFetchedUser] = useState<any>(null);

  const fetchInstagramProfile = async (username: string): Promise<void> => {
    setIsLoading(true);
    setError("");

    try {
      const run = await client.actor("8NmXJISbPNjQiPYCz").call({
        cookies: process.env.NEXT_PUBLIC_APIFY_SESSION_ID,
        username,
      });

      const { items } = await client.dataset(run.defaultDatasetId).listItems();

      console.log(items);

      setFetchedUser(items[0]);
      setProfile(items[0].user);
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
    }
    fetchInstagramProfile(username);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg"></div>
            <span className="font-bold text-xl">InstaViewer</span>
          </div>
          <div className="text-sm text-gray-600">Instagram Profile Viewer</div>
        </div>
      </nav>

      <div className="flex flex-col items-center p-6 max-w-4xl mx-auto h-full">
        <div className="text-center mb-8 mt-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Instagram Story Viewer
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Enter any username to view their stories anonymously
          </p>
        </div>

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

        {profile && (
          <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-10">
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6 gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-1 flex justify-center items-center">
                  <Image
                    src={profile.profile_pic_url}
                    alt={`${profile.username}'s profile`}
                    width={100}
                    height={100}
                    className="rounded-full h-full w-full object-cover border-2 border-white"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
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
                    <span className="font-semibold">{profile.posts}</span>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold">{profile.followers}</span>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold">{profile.following}</span>
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

            {profile.is_private && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-center">
                <div className="flex justify-center mb-2">
                  <Lock size={24} className="text-gray-500" />
                </div>
                <h3 className="font-medium text-gray-700 mb-1">
                  This Account is Private
                </h3>
                <p className="text-sm text-gray-600">
                  Follow this account to see their photos and videos.
                </p>
              </div>
            )}

            <div className="text-xs text-gray-500 mt-2 mb-6 text-center">
              User ID: {profile.id}
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-5 mb-8 mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
          About InstaViewer
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="text-green-500 mt-0.5">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">100% Anonymous</h4>
              <p className="text-sm text-gray-600">
                Profile owners won't know you've viewed their content
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-green-500 mt-0.5">
              <Lock size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">No Data Storage</h4>
              <p className="text-sm text-gray-600">
                We don't save any profile data or information you view
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-green-500 mt-0.5">
              <Activity size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Open-source</h4>
              <p className="text-sm text-gray-600">
                <
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 text-sm text-gray-500">
          <p>
            InstaViewer is not affiliated with Instagram or Meta Platforms, Inc.
          </p>
        </div>
      </div>

      <footer className="bg-white py-4 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 InstaViewer.</p>
          <p className="mt-1">
            Not affiliated with Instagram or Meta Platforms, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InstagramViewer;
