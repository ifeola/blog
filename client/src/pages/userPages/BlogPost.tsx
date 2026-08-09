import api from "@/api/axios";
import Badge from "@/components/ui_mine/Badge";
import PostContent from "@/components/ui_mine/MarkDown";
import API_PATHS from "@/utils/apiPaths";
import { formattedDate } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import images from "@/assets/images";

const BlogPost = () => {
  const { slug } = useParams();

  const { isPending, data } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await api.get(API_PATHS.POST.GET_BY_SLUG(slug));
      const post = response?.data?.post;
      return post;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full">
      <div className="w-full px-4 lg:px-0 md:max-w-4xl xl:max-w-6xl mx-auto">
        <div>
          <div className="flex flex-col items-center gap-4">
            <Badge variant="outline">{data.category}</Badge>
            <h2 className="max-w-164 text-center">{data.title}</h2>
            <div className="text-xs">{formattedDate(data.published_at)}</div>
          </div>

          <div className="aspect-video bg-secondary-foreground h-120 w-full mt-6 mb-18">
            <img src={images[0]} className="object-contain w-full h-full" />
          </div>
        </div>
        <article className="prose prose-neutral dark:prose-invert max-w-prose mx-auto">
          <PostContent markdown={data.content} />
        </article>
      </div>
    </section>
  );
};

export default BlogPost;
