'use client';

import { PostsApi } from "@/api/post-api";
import { FormData } from "@/type/post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState<FormData>({ title: "", content: "" })
  const postsApi = new PostsApi();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async() => {
    const fetchedPosts = await postsApi.fetchPosts();
    setPosts(fetchedPosts);
  }

  const createPost = async(formData: FormData) => {
    console.log(JSON.stringify(formData))
    await postsApi.createPost(formData);
    alert("投稿を作成しました。");
    fetchPosts();
  }

  const deletePost = async (id: number) => {
    await postsApi.deletePosts(id);
    alert("投稿を削除しました。");
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
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {posts ? (
        <div>
          {posts.map((post: {id: number; title: string; content: string; updated_at: string;}) => (
            <div key={post.id} className="mb-4 bg-gray">
              <div>{post.title}</div>
              <div>{post.content}</div>
              <div>{post.updated_at}</div>
              <button onClick={()=>deletePost(post.id)}>削除</button>
              <button><Link href={`/${post.id}`}>編集</Link></button>
            </div>
          ))}
        </div>
      ):(
        <div>投稿が見つかりません</div>
      )}
        <div className="mt-4">
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
