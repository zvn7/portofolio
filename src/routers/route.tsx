import Layout from "@/components/templates/layouts";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminExperiences from "@/pages/admin/AdminExperiences";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminProjects from "@/pages/admin/AdminProjects";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "projects",
                element: <ProjectsPage />,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            },
            {
                path: "projects",
                element: <AdminProjects />,
            },
            {
                path: "experiences",
                element: <AdminExperiences />,
            },
        ],
    },
]);
