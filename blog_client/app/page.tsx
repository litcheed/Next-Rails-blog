'use client';

import { PostsApi } from "@/api/post-api";
import { FromData } from "@/type/post";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState<FromData>({ title: "", content: "" })
  const postsApi = new PostsApi();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async() => {
    const fetchedPosts = await postsApi.fetchPosts();
    setPosts(fetchedPosts);
  }

  const createPost = async(formData: FromData) => {
    console.log(JSON.stringify(formData))
    await postsApi.createPost(formData);
    fetchPosts();
  }

  const deletePost = async (id: number) => {
    await postsApi.deletePosts(id)
    fetchPosts();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value }));
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost(formData);
    setFormData({ title: "", content: ""})
  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          {posts.map((post: {id: number; title: string; content: string; updated_at: string;}) => (
            <div key={post.id}>
              <div>{post.title}</div>
              <div>{post.content}</div>
              <div>{post.updated_at}</div>
              <button onClick={()=>deletePost(post.id)}>削除</button>
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div><input type="text" name="title" value={formData.title} onChange={handleChange} /></div>
              <div><input type="text" name="content" value={formData.content} onChange={handleChange} /></div>
              <button onClick={() => createPost(formData)}>投稿</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  ); 
}
