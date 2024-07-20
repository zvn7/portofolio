import { RouterProvider } from "react-router-dom";
import { router } from "./routers/route";
import { TooltipProvider } from "@radix-ui/react-tooltip";

function App() {
	return (
		<TooltipProvider delayDuration={0}>
			<RouterProvider router={router} />
		</TooltipProvider>
	);
}

export default App;
