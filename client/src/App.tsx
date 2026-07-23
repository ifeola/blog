import { RouterProvider } from "react-router";
import AuthInitializer from "./components/AuthInitializer";
import router from "./routes/router";

function App() {
	return (
		<AuthInitializer>
			<RouterProvider router={router} />
		</AuthInitializer>
	);
}

export default App;
