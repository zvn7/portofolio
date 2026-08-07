import { useState } from "react";
import Swal from "sweetalert2";
import { useProjects, useDeleteProject } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import ProjectModal from "@/components/organisms/ProjectModal";
import ProjectDetailDrawer from "@/components/organisms/ProjectDetailDrawer";
import { Project } from "@/interface/projects";

const AdminProjects = () => {
    const { data: projects = [], isLoading, isError } = useProjects();
    const deleteMutation = useDeleteProject();

    const [modalOpen, setModalOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleCreate = () => {
        setSelectedProject(null);
        setModalOpen(true);
    };

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    const handleDetail = (project: Project) => {
        setSelectedProject(project);
        setDrawerOpen(true);
    };

    const handleDelete = async (project: Project) => {
        const result = await Swal.fire({
            title: "Delete project?",
            text: `"${project.title}" will be permanently deleted.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#ef4444",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteMutation.mutateAsync(project._id);
            Swal.fire({
                title: "Deleted",
                text: "Project has been deleted.",
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
            });
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Failed to delete project", "error");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Projects</h1>
                    <p className="text-sm text-muted-foreground">
                        {projects.length} project{projects.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <Button size="sm" onClick={handleCreate}>
                    New Project
                </Button>
            </div>

            {isLoading && <p className="text-sm text-muted-foreground">Loading projects...</p>}
            {isError && <p className="text-sm text-red-500">Failed to load projects.</p>}

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Title</th>
                            <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">
                                Category
                            </th>
                            <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                                Technologies
                            </th>
                            <th className="text-right px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && projects.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-8 text-center text-muted-foreground"
                                >
                                    No projects yet.{" "}
                                    <button
                                        className="underline underline-offset-2 hover:text-foreground transition-colors"
                                        onClick={handleCreate}
                                    >
                                        Create your first one.
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            projects.map((project) => (
                                <tr
                                    key={project._id}
                                    className="border-t hover:bg-muted/30 transition-colors"
                                >
                                    {/* Title — clickable untuk detail */}
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleDetail(project)}
                                            className="font-medium text-left hover:underline underline-offset-2 transition-colors"
                                        >
                                            {project.title}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                                        {project.category.join(", ")}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                                        {project.technologies.join(", ")}
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleDetail(project)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(project)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(project)}
                                            disabled={deleteMutation.isPending}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit / Create Modal */}
            <ProjectModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedProject(null);
                }}
                project={selectedProject}
            />

            {/* Detail Drawer */}
            <ProjectDetailDrawer
                open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                    setSelectedProject(null);
                }}
                project={selectedProject}
                onEdit={(project) => {
                    setDrawerOpen(false);
                    setSelectedProject(project);
                    setModalOpen(true);
                }}
            />
        </div>
    );
};

export default AdminProjects;
