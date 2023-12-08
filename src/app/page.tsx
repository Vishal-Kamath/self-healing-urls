import axios from "axios";
import Link from "next/link";

export default async function Home() {
  const allPosts = (
    await axios.get("https://jsonplaceholder.typicode.com/posts")
  ).data;

  return (
    <main className="flex min-h-screen flex-col gap-9 px-padding py-12">
      <Link href="/" className="text-xl font-semibold text-emerald-600">
        Self Healing URLs Blog
      </Link>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPosts.map((post: any) => (
          <li
            key={post.id}
            className="flex border-[1px] border-gray-200 h-60 px-3 py-4 rounded-md flex-col gap-2"
          >
            <h2 className="font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">{post.body.slice(0, 25)}...</p>

            <Link
              href={`${post.title.replaceAll(" ", "-")}-${post.id}`}
              className="border-[1px] text-center text-sm py-2 rounded-md mt-auto border-emerald-400 hover:bg-emerald-200"
            >
              Read More
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
