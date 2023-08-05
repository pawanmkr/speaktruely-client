import { useEffect, useState } from "react";
import avatar from "../assets/avatar.jpg";
import Sidebar from "../components/Sidebar";
import {
  checkIfFollowingTheUser,
  fetchProfile,
  fetchProfilePosts,
  followUser,
  topics,
  unfollowUser,
} from "../utils";
import { Decoded, Post, UserProfile } from "../interface";
import jwt_decode from "jwt-decode";
import Feed from "../components/Feed";
import { Authentication } from "../components/authentication/Authentication";
import { AiFillMessage } from "react-icons/ai";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<UserProfile>();
  const [user, setUser] = useState<Decoded>();
  const token: string | null = localStorage.getItem("jwt");
  const [posts, setPosts] = useState<Post[]>([]);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string>("");

  useEffect(() => {
    const fetchData = async (username: string): Promise<void> => {
      const _profile = await fetchProfile(username);
      if (_profile) {
        setProfile(_profile);
        const result: Post[] | undefined = await fetchProfilePosts(_profile.id);
        result && setPosts(result);
      }
    };
    if (token) {
      setJwt(token);
      setUser(jwt_decode(token));
    }
    username && void fetchData(username);
  }, [token, username]);

  if (showRegister) {
    return <Authentication />;
  }

  return profile ? (
    <div className="w-full flex justify-between h-[100vh] overflow-hidden">
      <Sidebar topics={topics} user={user} />

      <div className="w-[50%] flex flex-col items-center  overflow-auto scrollbar-hide border-x-[1px] border-xlite">
        <UserInfo profile={profile} jwt={jwt} />

        {posts.length > 0 ? (
          <Feed
            posts={posts}
            setPosts={setPosts}
            jwt={jwt}
            setShowRegister={setShowRegister}
          />
        ) : (
          <div className="text-center text-light_gray mt-8 text-xl">
            <p>User hasn't posted anything yet!</p>
          </div>
        )}
      </div>
      <div className="side w-[30%]"></div>
    </div>
  ) : null;
};

// dp, follows, bio, name, indicator that tells about people sentiment, feed,

const UserInfo = ({ profile, jwt }: { profile: UserProfile; jwt: string }) => {
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    const fetchData = async (id: number): Promise<void> => {
      const res: boolean | undefined = await checkIfFollowingTheUser(id);
      if (res) {
        setFollowing(true);
      }
    };
    jwt && void fetchData(profile.id);
  }, [jwt, profile.id]);

  return (
    <div className="text-sublime_yite w-[63%] my-4 rounded p-2 py-4 bg-xlite">
      <div className="flex w-full justify-around">
        {/* avatar */}
        <div className="overflow-hidden rounded-full w-[128px]">
          <img src={avatar} />
        </div>

        {/* profile details */}
        <div className="p-2">
          <div className="p-2">
            <p>{profile.full_name}</p>
            <p className="text-light_gray">@{profile.username}</p>
          </div>
          <div className="flex px-2 font-bold">
            <p>
              Followers <span>{profile.followers_count}</span>
            </p>
            <p className="ml-6">
              Following <span>{profile.following_count}</span>
            </p>
          </div>
        </div>
      </div>

      {/* bio */}
      <div className="p-2">
        <p>
          Hi, I Bring unprocessed International news to you. If it excites you
          consider following me.
        </p>
      </div>

      {/* profile buttons: follow, message, donate */}
      <div className="flex justify-between px-2 mt-2">
        {/* message icon and button */}
        <div className="text-4xl text-center cursor-pointer flex items-center scale-x-[-1]">
          <AiFillMessage />
        </div>

        <div className="flex justify-between w-[60%] text-sublime_darkblue font-bold">
          {/* follow */}
          <div
            className="follow text-center bg-sublime_yite py-2 rounded w-[45%]"
            onClick={async () => {
              if (following) {
                setFollowing(false);
                await unfollowUser(profile.id);
              } else {
                setFollowing(true);
                await followUser(profile.id);
              }
            }}
          >
            <button>{following ? "Following" : "Follow"}</button>
          </div>

          {/* donate */}
          <div className="bg-sublime_yite px-8 py-2 rounded w-[45%]">
            <button>Donate</button>
          </div>
        </div>
      </div>
    </div>
  );
};
