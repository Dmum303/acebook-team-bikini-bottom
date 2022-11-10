import FriendsBar from "../friends/FriendsBar";
import PostForm from "../postForm/PostForm";

export default function FormBar({ reload }) {
  return (
    <div className="form-bar">
      <PostForm />
      <FriendsBar reload={ reload }/>
    </div>
  );
}