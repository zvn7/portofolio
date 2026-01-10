import { useState } from "react";
import Swal from "sweetalert2";
import { useProjects, useDeleteProject } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import ProjectModal from "@/components/organisms/ProjectModal";

const AdminProjects = () => {
    const { data: projects = [], isLoading, isError } = useProjects();

    const deleteMutation = useDeleteProject();

    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const handleCreate = () => {
        console.log("CLICK CREATE");
        setSelectedProject(null);
        setOpen(true);
    };

    const handleEdit = (project: any) => {
        setSelectedProject(project);
        setOpen(true);
    };

    const handleDelete = async (project: any) => {
        const result = await Swal.fire({
            title: "Delete project?",
            text: `Project "${project.title}" will be permanently deleted.`,
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
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Projects</h1>
                <Button size="sm" onClick={handleCreate}>
                    New Project
                </Button>
            </div>

            {isLoading && <p className="text-sm text-muted-foreground">Loading projects...</p>}

            {isError && <p className="text-sm text-red-500">Failed to load projects</p>}

            <div className="space-y-3">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="rounded-xl border p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <p className="font-medium">{project.title}</p>
                            <p className="text-xs text-muted-foreground">
                                {project.category.join(", ")}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
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
                        </div>
                    </div>
                ))}
            </div>

            <ProjectModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setSelectedProject(null);
                }}
                project={selectedProject}
            />
        </div>
    );
};

export default AdminProjects;
