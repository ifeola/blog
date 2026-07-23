import { useAuthStore } from "@/store/useAuthStore";

const Home = () => {
	const user = useAuthStore((state) => state.user);
	return <div>{user?.first_name}</div>;
};

export default Home;
