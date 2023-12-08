import Link from "next/link";
import axios from "axios";
import { notFound, redirect } from "next/navigation";
import { FaCircleExclamation } from "react-icons/fa6";

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

      <div className="p-5 flex flex-col gap-3 border-[1px] rounded-md border-gray-300 bg-gray-100 text-gray-600">
        <div className="flex items-center gap-2">
          <FaCircleExclamation className="h-6 w-6 p-[1px] bg-gray-600 rounded-full text-gray-200" />
          <span>NOTE:</span>
        </div>

        <p>
          This is an attempt at creating a self healing url website. Try
          removing some text from the slug.
        </p>
        <p>
          Example: change{" "}
          <span className="bg-gray-300 px-1">
            {post.title.replaceAll(" ", "-") + "-" + post.id}
          </span>{" "}
          to{" "}
          <span className="bg-gray-300 px-1">
            {post.title.slice(6) + "-" + post.id}
          </span>
        </p>
      </div>

      <Link
        href="/"
        className="border-[1px] text-center text-sm py-2 rounded-md w-24 border-emerald-400 hover:bg-emerald-200"
      >
        Back
      </Link>
    </main>
  );
}
