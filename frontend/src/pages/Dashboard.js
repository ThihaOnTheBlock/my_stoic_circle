import React from "react";

import Post from "../components/Post";

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-items-center w-[100%] h-full overflow-y-scroll no-scrollbar">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
