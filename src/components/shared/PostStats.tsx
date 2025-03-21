import {
  useDeleteSavedPost,
  useGetCurrentUserQuery,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

interface PostStatsProps {
  post?: Models.Document;
  userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost, isPending: isLikingPost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeleingSaved } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUserQuery();

  const savePostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(savePostRecord ? true : false);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savePostRecord) {
      setIsSaved(false);
      deleteSavedPost(savePostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({
        postId: post?.$id || "",
        userId,
      });
    }
  };

  return (
    <div className="flex justify-between items-center z-50">
      <div className="flex gap-2 mr-5">
        {isLikingPost ? (
          <Loader />
        ) : (
          <img
            src={`${
              checkIsLiked(likesList, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }`}
            alt="Like"
            width={20}
            height={20}
            onClick={handleLikePost}
            className="cursor-pointer"
          />
        )}
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSavingPost || isDeleingSaved ? (
          <Loader />
        ) : (
          <img
            src={`${
              isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
            }`}
            alt="Save"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
