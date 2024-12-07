export default async function Home() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts = await res.json();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul>
          {posts.map((post: {id: number; title: string; content: string; updated_at: string;}) => (
            <li key={post.id}>
              <div>{post.title}</div>
              <div>{post.content}</div>
              <div>{post.updated_at}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  ); 
}
