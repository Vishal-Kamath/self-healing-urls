import Link from "next/link";
import axios from "axios";
import { notFound, redirect } from "next/navigation";

export default async function Post({ params }: { params: { slug: string } }) {
  const slugArray = params.slug.split("-");
  const id = slugArray.pop();
  const slug = slugArray.join("-");

  const post = (
    await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  ).data;

  if (!post.id) {
    notFound();
  }

  if (slug !== post.title.replaceAll(" ", "-")) {
    redirect(`${post.title.replaceAll(" ", "-")}-${post.id}`);
  }

  const user = (
    await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
  ).data;

  return (
    <main className="flex min-h-screen flex-col gap-9 px-padding py-12">
      <Link href="/" className="text-xl font-semibold text-emerald-600">
        Self Healing URLs Blog
      </Link>

      <article className="flex flex-col gap-6">
        <h2 className="text-4xl">{post.title}</h2>
        <i className="text-sm text-gray-500">by {user.name}</i>
        <p>{post.body}</p>
      </article>

      <Link
        href="/"
        className="border-[1px] text-center text-sm py-2 rounded-md w-24 border-emerald-400 hover:bg-emerald-200"
      >
        Back
      </Link>
    </main>
  );
}
