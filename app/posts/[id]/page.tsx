import { samplePosts } from "@/types/blog";
import { notFound } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import BackButton from "@/components/BackButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return samplePosts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const post = samplePosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton />

        <PostDetail post={post} />
      </div>
    </div>
  );
}
