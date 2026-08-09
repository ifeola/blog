import api from "@/api/axios";
import API_PATHS from "@/utils/apiPaths";
import { useQuery } from "@tanstack/react-query";
import images from "@/assets/images";
import type { Post } from "@/types/type";
import BlogPost from "@/components/ui_mine/Post";

function random_image() {
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return randomImage;
}

const Home = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await api.get(API_PATHS.POST.LIST);
      return response?.data?.posts;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full">
      <div className="w-full px-4 lg:px-0 md:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="flex flex-col items-start justify-center text-left gap-4 py-24">
          <span className="text-xs uppercase tracking-widest font-medium px-3 py-1 bg-brand rounded-full text-accent">
            Blog
          </span>
          <h1 className="max-w-3xl font-heading font-semibold text-foreground leading-none text-wrap">
            Stay Informed and Inspired with NextDev News
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed">
            Discover the latest insights, trends, and stories that matter to
            you. From cutting-edge technology to thoughtful opinion pieces, our
            team of writers brings you well-researched content designed to keep
            you informed, spark curiosity, and inspire meaningful conversations
            every day.
          </p>
        </div>

        <div className="space-y-6">
          <h2>Top Blog Posts</h2>

          <div className="grid-mine">
            {data.slice(0, 3).map((post: Post) => {
              return <BlogPost img={random_image()} post={post} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
