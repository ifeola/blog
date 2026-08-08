import api from "@/api/axios";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { useAuthStore } from "@/store/useAuthStore";
import API_PATHS from "@/utils/apiPaths";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import images from "@/assets/images";

interface Post {
  author_id: string;
  content: string;
  deleted_at: string | null;
  id: string;
  published_at: string;
  slug: string;
  status: string;
  title: string;
  updated_at: string | null;
}

const Home = () => {
  // const user = useAuthStore((state) => state.user);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await api.get(API_PATHS.POST.LIST);
      return response?.data?.posts;
    },
    staleTime: 1000 * 60 * 5,
  });

  console.log(data);

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
            {data.map((post: Post) => {
              const randomImage =
                images[Math.floor(Math.random() * images.length)];

              return (
                <Card className="grid row-span-4 grid-rows-subgrid gap-1.5 overflow-clip">
                  <CardHeader className="bg-accent-foreground h-full">
                    <img
                      src={randomImage}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{post.title}</CardTitle>
                  </CardContent>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {post.content}
                    </CardDescription>
                  </CardContent>

                  <CardFooter>
                    <CardAction className="ml-auto">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-foreground"
                      >
                        Read more
                        <ArrowUpRight className="inline-block" size={16} />
                      </Link>
                    </CardAction>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
