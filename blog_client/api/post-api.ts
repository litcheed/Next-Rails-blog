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

}
