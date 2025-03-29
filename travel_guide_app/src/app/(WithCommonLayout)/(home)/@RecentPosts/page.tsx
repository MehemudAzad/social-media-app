import Container from "@/components/UI/Container";
import { getRecentPosts } from "@/services/RecentPosts";
import { Button } from "@heroui/button";
import Link from "next/link";

export default async function RecentPosts() {
  // const { data: posts } = await getRecentPosts();
  // console.log(posts);
  console.log('first')

  return (
    <Container>
      <div className="section-title my-8">
        <h2>Bangladesh</h2>
        <h2 className="mb-2 text-center text-2xl">Recent Posts</h2>
        <p className="text-center">Discover the latest Tech news</p>
      </div>
      <div className="my-8 grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-4">
        {/* {posts.map((item: any) => (
          <p key={item._id}>{item.title}</p>
        ))} */}
      </div>
      <div className="flex justify-center">
        <Button className="rounded-md bg-default-900 text-default" size="md">
          <Link href="/found-items">See All</Link>
        </Button>
      </div>
    </Container>
  );
}
