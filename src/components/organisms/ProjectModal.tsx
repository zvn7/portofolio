import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import { projectSchema, ProjectFormValues } from "@/schemas/projectSchema";
import { useCreateProject, useUpdateProject } from "@/hooks/useProjects";

interface Props {
    open: boolean;
    onClose: () => void;
    project?: any;
}

const ProjectModal = ({ open, onClose, project }: Props) => {
    const createMutation = useCreateProject();
    const updateMutation = useUpdateProject();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            technologies: "",
            url: "",
            repository: "",
        },
    });

    useEffect(() => {
        if (project) {
            reset({
                title: project.title,
                description: project.description,
                category: project.category.join(", "),
                technologies: project.technologies.join(", "),
                url: project.url || "",
                repository: project.repository || "",
            });
        } else {
            reset();
        }
    }, [project, reset]);

    const onSubmit = async (values: ProjectFormValues) => {
        try {
            const payload = {
                title: values.title,
                description: values.description,
                category: values.category.split(",").map((v) => v.trim()),
                technologies: values.technologies.split(",").map((v) => v.trim()),
                url: values.url || undefined,
                repository: values.repository || undefined,
                image: values.image,
            };

            if (!project && !payload.image) {
                Swal.fire("Error", "Image is required", "error");
                return;
            }

            if (project) {
                await updateMutation.mutateAsync({
                    id: project._id,
                    payload,
                });
            } else {
                await createMutation.mutateAsync(payload);
            }

            Swal.fire({
                title: "Success",
                text: project ? "Project updated" : "Project created",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            onClose();
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Something went wrong", "error");
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) onClose();
            }}
        >
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{project ? "Edit Project" : "New Project"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input type="file" {...register("image")} />

                    <Input placeholder="Project title" {...register("title")} />
                    {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}

                    <Textarea placeholder="Description" {...register("description")} />
                    {errors.description && (
                        <p className="text-xs text-red-500">{errors.description.message}</p>
                    )}

                    <Input placeholder="Category. contoh Website, API" {...register("category")} />

                    <Input
                        placeholder="Technologies. contoh react, nodejs"
                        {...register("technologies")}
                    />

                    <Input placeholder="Website URL" {...register("url")} />
                    <Input placeholder="Repository URL" {...register("repository")} />

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {project ? "Save Changes" : "Create"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectModal;
