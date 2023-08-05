import { useEffect, useState } from "react";
import avatar from "../assets/avatar.jpg";
import { FollowSuggestion } from "../interface";
import { useNavigate } from "react-router-dom";
import { fetchFollowSuggestions, followUser, unfollowUser } from "../utils";
import { nanoid } from "nanoid";

export const FollowSuggestions = ({ userId }: { userId: number }) => {
  const [suggestions, setSuggestions] = useState<FollowSuggestion[]>();
  useEffect(() => {
    const fetch = async (id: number) => {
      const result: FollowSuggestion[] | undefined =
        await fetchFollowSuggestions(id);
      result && setSuggestions(result);
    };
    if (userId) {
      void fetch(userId);
    }
  }, [userId]);

  return (
    <div className="w-[80%] p-2 rounded bg-xlite mt-4 text-sublime_yite">
      <div className="p-2 text-2xl font-bold text-light_gray">
        <p>Consider Following</p>
      </div>
      {suggestions
        ? suggestions.map((suggestion) => {
            return (
              <Suggestion
                id={suggestion.id}
                key={nanoid()}
                full_name={suggestion.full_name}
                username={suggestion.username}
              />
            );
          })
        : null}
    </div>
  );
};

const Suggestion = ({ id, full_name, username }: FollowSuggestion) => {
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);
  return (
    <div className="flex justify-between items-center w-full rounded p-2">
      <div
        className="flex cursor-pointer"
        onClick={() => {
          navigate(`/profile/${username}`);
        }}
      >
        <div className="avatar w-[48px] rounded-full overflow-hidden">
          <img src={avatar} />
        </div>
        <div className="ml-4">
          <p>{full_name}</p>
          <p className="text-light_gray">@{username}</p>
        </div>
      </div>
      <div
        className="follow w-[20%] text-center"
        onClick={async () => {
          if (following) {
            setFollowing(false);
            await unfollowUser(id);
          } else {
            setFollowing(true);
            await followUser(id);
          }
        }}
      >
        <button>{following ? "Following" : "Follow"}</button>
      </div>
    </div>
  );
};
