import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  user: string;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: string[];
  shares: number;
}

export default function PublicSpacePage() {
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [newMedia, setNewMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [user, setUser] = useState("Guest");
  const [friends, setFriends] = useState(0);
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [dailyPosts, setDailyPosts] = useState(0);

  // ✅ Hydration-safe rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div />;

  // ✅ Max posts per day based on friends
  const getMaxPostsPerDay = () => {
    if (friends >= 10) return Infinity;
    if (friends >= 2) return 2;
    return 1;
  };

  // ✅ Handle media upload (image or video)
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (file.type.startsWith("image/")) {
        setMediaType("image");
      } else if (file.type.startsWith("video/")) {
        setMediaType("video");
      }
      setNewMedia(result);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Add post
  const addPost = () => {
    const limit = getMaxPostsPerDay();
    if (dailyPosts >= limit) {
      alert("You’ve reached your daily post limit!");
      return;
    }

    if (newPost.trim() === "" && !newMedia) {
      alert("Please write something or upload media.");
      return;
    }

    const post: Post = {
      id: Date.now(),
      user,
      content: newPost,
      image: mediaType === "image" ? newMedia || undefined : undefined,
      video: mediaType === "video" ? newMedia || undefined : undefined,
      likes: 0,
      comments: [],
      shares: 0,
    };

    setPosts([post, ...posts]);
    setNewPost("");
    setNewMedia(null);
    setMediaType(null);
    setDailyPosts(dailyPosts + 1);
  };

  // ✅ Like / Unlike post
  const toggleLike = (id: number) => {
    const alreadyLiked = likes[id];
    setLikes({ ...likes, [id]: !alreadyLiked });
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, likes: alreadyLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  // ✅ Add comment
  const addComment = (id: number) => {
    const commentText = comments[id];
    if (!commentText || commentText.trim() === "") return;

    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, commentText.trim()] }
          : p
      )
    );
    setComments({ ...comments, [id]: "" });
  };

  // ✅ Share post
  const sharePost = (id: number) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, shares: p.shares + 1 } : p
      )
    );
    alert("Post shared successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
          🌍 Public Space
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Share your thoughts, pictures, or videos with the community!
        </p>

        {/* ✅ Friends Control */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <label className="text-gray-700 font-semibold">
            Friends Count:
          </label>
          <input
            type="number"
            min="0"
            value={friends}
            onChange={(e) => setFriends(Number(e.target.value))}
            className="w-20 border border-gray-300 rounded-md px-2 py-1 text-center"
          />
        </div>

        {/* ✅ Post Input Section */}
        <div className="flex flex-col gap-4 mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-400 outline-none"
            rows={3}
          />

          {/* ✅ Upload Media */}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaUpload}
            className="text-sm text-gray-700"
          />

          {newMedia && (
            <div className="flex justify-center">
              {mediaType === "image" ? (
                <img
                  src={newMedia}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border border-gray-300"
                />
              ) : (
                <video
                  src={newMedia}
                  controls
                  className="w-60 h-40 rounded-lg border border-gray-300"
                />
              )}
            </div>
          )}

          <button
            onClick={addPost}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all"
          >
            Post
          </button>

          <p className="text-center text-gray-500 text-sm">
            Posts used today: {dailyPosts} /{" "}
            {getMaxPostsPerDay() === Infinity ? "∞" : getMaxPostsPerDay()}
          </p>
        </div>

        {/* ✅ Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No posts yet. Be the first to share something!
            </p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-blue-600">{post.user}</h3>
                  <div className="flex gap-4 items-center text-gray-600">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1 ${
                        likes[post.id] ? "text-red-500" : "hover:text-red-400"
                      }`}
                    >
                      ❤️ {post.likes}
                    </button>
                    <button
                      onClick={() => sharePost(post.id)}
                      className="hover:text-blue-500"
                    >
                      🔗 {post.shares}
                    </button>
                  </div>
                </div>

                <p className="text-gray-800 mb-2">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-60 h-60 object-cover rounded-lg mx-auto border border-gray-200"
                  />
                )}
                {post.video && (
                  <video
                    src={post.video}
                    controls
                    className="w-72 h-48 mx-auto rounded-lg border border-gray-200"
                  />
                )}

                {/* ✅ Comments */}
                <div className="mt-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={comments[post.id] || ""}
                      onChange={(e) =>
                        setComments({ ...comments, [post.id]: e.target.value })
                      }
                      placeholder="Add a comment..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-sm"
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    >
                      Comment
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    {post.comments.map((c, i) => (
                      <p key={i} className="text-sm text-gray-700 border-b pb-1">
                        💬 {c}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
