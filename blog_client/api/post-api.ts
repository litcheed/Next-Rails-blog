import { FormData } from "@/type/post";

export class PostsApi {

  async fetchPosts() {
    try {
      const res = await fetch("http://localhost:3001/api/v1/posts");
      if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch(error) {
      console.error(error)
    }
  }

  async fetchOnePost(id: number) {
    try {
      const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch(error) {
      console.error(error)
    }
  }

  async createPost(formData: FormData) {
    try{
      const res = await fetch("http://localhost:3001/api/v1/posts",
        {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      if(!res.ok){
        throw new Error(`Failed to create post: ${res.status}`);
      }
    } catch(error) {
      console.error(error)
    }
  }

  async updatePost(formData: FormData, id: number) {
    try{
      const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
      if(!res.ok){
        throw new Error(`Failed to create post: ${res.status}`);
      }
    } catch(error) {
      console.error(error)
    }
  }

  async deletePosts(id: number) {
    try {
      const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error(`Failed to delete post: ${res.status}`);
      }
    } catch(error) {
      console.error(error)
    }
  }

}
