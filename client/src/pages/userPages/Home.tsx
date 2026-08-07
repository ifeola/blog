import { useAuthStore } from "@/store/useAuthStore";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <section className="w-full">
      <div className="w-full px-2 md:px-0 md:max-w-4xl xl:max-w-6xl mx-auto">
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

        <div>
          <h2>Top Blog Posts</h2>

          
        </div>
      </div>
    </section>
  );
};

export default Home;
