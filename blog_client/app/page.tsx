'use client';

import { PostsApi } from "@/api/post-api";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const postsApi = new PostsApi();
  
  useEffect(() => {
    const fetchPosts = async() => {
      const fetchedPosts = await postsApi.fetchPosts();
      setPosts(fetchedPosts);
    }
    fetchPosts();
  }, []);

  function deletePost(id: number) {
    console.log("削除実行")
  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul>
          {posts.map((post: {id: number; title: string; content: string; updated_at: string;}) => (
            <li key={post.id}>
              <div>{post.title}</div>
              <div>{post.content}</div>
              <div>{post.updated_at}</div>
              <button onClick={()=>deletePost(post.id)}></button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  ); 
}
