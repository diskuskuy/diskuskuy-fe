import styles from "@/styles/Forum.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatDate, formatTime } from "@/utils/util";
import { useState } from "react";
import { useRouter } from "next/router";
import { addOrRemoveLikePost } from "@/api/forum";

export default function PostComponent({ post, type, parentId, parent, threadId }) {
  const userId = parseInt(localStorage.getItem("userId"))
  const router = useRouter();
  const [numOfLikes, setNumOfLikes] = useState(post?.number_of_likes ?? 0);
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(userId) ? true : false)
  const [isLoading, setisLoading] = useState(false)

  const marginLeft =
    type == "reply" ? "50px" : type == "nestedReply" ? "100px" : "0px";
  const [tags, setTags] = useState(
    post.tag && typeof post.tag === "string"
      ? [post.tag]
      : post.tag
      ? [...post.tag]
      : []
  );

  const handleReply = () => {
    if (type == "initial") {
      router.push(`/reply/${post.id}/create-post`)
    }
  }

  const handleParentReply = () => {
    router.push(`/reply/${threadId}/create-post?parent=${parentId}`)
  }

  const handleNestedParentReply = () => {
    router.push(`/reply/${threadId}/create-post?parent=${parentId}&type=nested`)
  }

  const handleLikePost = () => {
    setisLoading(true)
    if (isLiked) {
      setNumOfLikes(numOfLikes - 1)
      setIsLiked(false)
    } else {
      setNumOfLikes(numOfLikes + 1)
      setIsLiked(true)
  }
    addOrRemoveLikePost(post.id)
    setisLoading(false)
  }

  console.log(post)

  return (
    <div className={styles.postSection} style={{ marginLeft: marginLeft }}>
      <div className="flex flex-col basis-1/12 gap-2 items-center">
        <div className="rounded-full w-20 h-20" >
          <img src={post?.creator_photo_url ?? "/default-prof-pic.png"} className="rounded-full w-20 h-20 object-cover" />
        </div>
        <div className="bg-blue px-2">{post.creator_role}</div>
      </div>
      <div className="flex flex-col basis-11/12 gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold">{post.title ? post.title : post.user}</h1>
          <p className="text-xs">
            Thread dimulai oleh {<strong>{post.creator_name}</strong>}{" "}
            pada {formatDate(post.date)} ({formatTime(post.date)} WIB)
          </p>
          <div>
            <p>
              Tags:{" "}
              {tags.map((tag, i) => (
                <span key={i} className="text-green">
                  {tag}
                  {i != tags.length - 1 && <span> | </span>}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="h-1 w-5 bg-grey"></div>
        <p className="text-sm" dangerouslySetInnerHTML={{ __html: post.content }}></p>
        <div className="h-[0.5px] bg-grey"></div>
        <div className="flex flex-row gap-2 items-center">
          {type !== "nestedReply" && (
            <a className="cursor-pointer text-xs" onClick={parent ? type === "reply" ? handleNestedParentReply : handleParentReply : handleReply}>
              Balas <ExpandMoreIcon />
            </a>
          )}
          <button onClick={handleLikePost} className="rounded-full border border-grey p-2 cursor-pointer flex flex-row gap-2 justify-center" style={{
            background: isLiked ? '#ef4444': 'white',
          }} disabled={isLoading}>
            <img src="/like.png"></img>
          </button>
          {numOfLikes > 0 && <span>{numOfLikes}</span>}
        </div>
      </div>
    </div>
  );
}
