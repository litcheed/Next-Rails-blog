"use client";

import { PostsApi } from "@/api/post-api";
import { useEffect, useState } from "react";
import { FormData } from "@/type/post";

export default function PostDetail ({params}: {params: {id:number}}) {
  const {id} = params;
  const [post, setPost] = useState<null>();
  const [formData, setFormData] = useState<FormData>({ title: "", content: "" })
  const postsApi = new PostsApi();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async() => {
    const fetchedPost = await postsApi.fetchOnePost(id);
    setPost(fetchedPost);
  }

  const deletePost = async (id: number) => {
    await postsApi.deletePosts(id);
    alert("投稿を削除しました。");
    fetchPost();
  }

  const updatePost = async (formdata: FormData, id: number) => {
    await postsApi.updatePost(formdata, id);
    alert("投稿を更新しました。");
    fetchPost();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value }));
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePost(formData, id);
    setFormData({ title: "", content: ""})
  }

  return(
    <div>
      {post ? (
        <div>
          <div key={post.id} className="mb-4 bg-gray">
            <div>{post.title}</div>
            <div>{post.content}</div>
            <div>{post.updated_at}</div>
            <button onClick={()=>deletePost(post.id)}>削除</button>
          </div>
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div><input type="text" name="title" value={formData.title} onChange={handleChange} /></div>
                <div><input type="text" name="content" value={formData.content} onChange={handleChange} /></div>
                <button onClick={() => updatePost(formData, post.id)}>更新</button>
              </div>
            </form>
          </div>
        </div>
      ):(
        <div>投稿が見つかりません</div>
      )}
    </div>
  );
}
