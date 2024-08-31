import Layout from "@/components/templates/layouts";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [{ path: "/", element: <HomePage /> }],
	},
	{
		path: "/projects",
		children: [{ path: "/projects", element: <ProjectsPage /> }],
	},
]);
