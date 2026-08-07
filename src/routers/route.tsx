import Layout from "@/components/templates/layouts";
import AdminCertifications from "@/pages/admin/AdminCertifications";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminExperiences from "@/pages/admin/AdminExperiences";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminSkills from "@/pages/admin/AdminSkills";
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
            {
                path: "skills",
                element: <AdminSkills />,
            },
            {
                path: "certifications",
                element: <AdminCertifications />,
            },
        ],
    },
]);
