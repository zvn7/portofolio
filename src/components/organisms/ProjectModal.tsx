import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import MultiSelect from "@/components/molecules/MultiSelect";
import { useSkills } from "@/hooks/useSkills";
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
    const { data: skills = [] } = useSkills();
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const technologyOptions = Array.from(new Set(skills.map((s) => s.name))).map((name) => ({
        label: name,
        value: name,
    }));

    const categoryOptions = [
        { label: "Website", value: "Website" },
        { label: "Application", value: "Application" },
        { label: "API", value: "API" },
        { label: "UI/UX", value: "UI/UX" },
    ];

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            category: [],
            technologies: [],
            url: "",
            repository: "",
            image: undefined,
        },
    });

    useEffect(() => {
        if (project) {
            reset({
                title: project.title,
                description: project.description,
                category: project.category,
                technologies: project.technologies,
                url: project.url ?? "",
                repository: project.repository ?? "",
                image: undefined,
            });
            setPreview(project.image ?? null);
        } else {
            reset();
            setPreview(null);
        }

        if (fileInputRef.current) fileInputRef.current.value = "";
    }, [project, reset, open]);

    // Handle file change — ambil File pertama dari FileList
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        } else {
            setValue("image", undefined);
            setPreview(project?.image ?? null);
        }
    };

    const onSubmit = async (values: ProjectFormValues) => {
        // Untuk create, image wajib ada
        if (!project && !values.image) {
            Swal.fire("Error", "Image is required", "error");
            return;
        }

        try {
            const payload = {
                title: values.title,
                description: values.description,
                category: values.category,
                technologies: values.technologies,
                url: values.url,
                repository: values.repository,
                ...(values.image instanceof File && { image: values.image }),
            };

            if (project) {
                await updateMutation.mutateAsync({ id: project._id, payload });
            } else {
                await createMutation.mutateAsync(payload as any);
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
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{project ? "Edit Project" : "New Project"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label>
                            Image {!project && <span className="text-red-500">*</span>}
                            {project && (
                                <span className="text-xs text-muted-foreground font-normal ml-1">
                                    (leave empty to keep current)
                                </span>
                            )}
                        </Label>

                        {/* Preview */}
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-36 object-cover rounded-lg border"
                            />
                        )}

                        {/* File input — dikontrol manual, bukan via register */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80 cursor-pointer"
                        />
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                        <Label>
                            Title <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="My Awesome Project" {...register("title")} />
                        {errors.title && (
                            <p className="text-xs text-red-500">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <Label>
                            Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            placeholder="Brief description of the project..."
                            rows={3}
                            className="resize-none"
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                        <Label>
                            Category <span className="text-red-500">*</span>
                        </Label>
                        <MultiSelect
                            options={categoryOptions}
                            value={watch("category")}
                            onChange={(val) => setValue("category", val, { shouldValidate: true })}
                            placeholder="Select category"
                        />
                        {errors.category && (
                            <p className="text-xs text-red-500">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Technologies */}
                    <div className="space-y-1.5">
                        <Label>
                            Technologies <span className="text-red-500">*</span>
                        </Label>
                        <MultiSelect
                            options={technologyOptions}
                            value={watch("technologies")}
                            onChange={(val) =>
                                setValue("technologies", val, { shouldValidate: true })
                            }
                            placeholder="Select technologies"
                        />
                        {errors.technologies && (
                            <p className="text-xs text-red-500">{errors.technologies.message}</p>
                        )}
                    </div>

                    {/* URL & Repository */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label>Website URL</Label>
                            <Input placeholder="https://..." {...register("url")} />
                            {errors.url && (
                                <p className="text-xs text-red-500">{errors.url.message}</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <Label>Repository URL</Label>
                            <Input
                                placeholder="https://github.com/..."
                                {...register("repository")}
                            />
                            {errors.repository && (
                                <p className="text-xs text-red-500">{errors.repository.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                isSubmitting || createMutation.isPending || updateMutation.isPending
                            }
                        >
                            {isSubmitting || createMutation.isPending || updateMutation.isPending
                                ? "Saving..."
                                : project
                                  ? "Save Changes"
                                  : "Create Project"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectModal;
