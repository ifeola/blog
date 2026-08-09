import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function PostContent({ markdown }: { markdown: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>;
}

export default PostContent;
