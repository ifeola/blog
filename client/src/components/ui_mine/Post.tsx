import type { Post } from "@/types/type";
import { formattedDate } from "@/utils/utils";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const BlogPost = ({ post, img }: { post: Post; img: string }) => {
  return (
    <Link to={`/posts/${post.slug}`} className="group">
      <article className="grid row-span-3 gap-2.5 grid-rows-subgrid">
        <div className="flex flex-col gap-3.5">
          <div className="aspect-video rounded-2xl overflow-hidden bg-card-foreground">
            <img
              src={img}
              alt={post.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-xs font-normal text-foreground inline-block">
            {formattedDate(post.published_at)}
          </div>
        </div>

        <div className="flex align-top gap-2.5">
          <h5 className="leading-normal group-hover:text-brand transition-colors">
            {post.title}
          </h5>
          <ArrowUpRight
            size={24}
            className="group-hover:text-brand transition-colors"
          />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
};

export default BlogPost;
