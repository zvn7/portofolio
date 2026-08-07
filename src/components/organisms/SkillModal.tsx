import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import { skillSchema, SkillFormValues } from "@/schemas/skillSchema";
import { useCreateSkill, useUpdateSkill } from "@/hooks/useSkills";
import { Skill } from "@/interface/skills";

interface Props {
    open: boolean;
    onClose: () => void;
    skill?: Skill | null;
}

const levelOptions = ["beginner", "intermediate", "advanced", "expert"];

const SkillModal = ({ open, onClose, skill }: Props) => {
    const createMutation = useCreateSkill();
    const updateMutation = useUpdateSkill();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SkillFormValues>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            name: "",
            category: "",
            level: "beginner",
        },
    });

    useEffect(() => {
        if (skill) {
            reset({
                name: skill.name,
                category: skill.category,
                level: (skill.level as SkillFormValues["level"]) ?? "beginner",
            });
        } else {
            reset({ name: "", category: "", level: "beginner" });
        }
    }, [skill, reset, open]);

    const onSubmit = async (values: SkillFormValues) => {
        try {
            if (skill) {
                await updateMutation.mutateAsync({ id: skill._id, payload: values });
            } else {
                await createMutation.mutateAsync(values);
            }

            Swal.fire({
                title: "Success",
                text: skill ? "Skill updated" : "Skill created",
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
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{skill ? "Edit Skill" : "New Skill"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                        <Label>
                            Name <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="React" {...register("name")} />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                        <Label>
                            Category <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="Frontend" {...register("category")} />
                        {errors.category && (
                            <p className="text-xs text-red-500">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Level */}
                    <div className="space-y-1.5">
                        <Label>
                            Level <span className="text-red-500">*</span>
                        </Label>
                        <select
                            {...register("level")}
                            className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
                        >
                            {levelOptions.map((lvl) => (
                                <option key={lvl} value={lvl}>
                                    {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.level && (
                            <p className="text-xs text-red-500">{errors.level.message}</p>
                        )}
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
                                : skill
                                  ? "Save Changes"
                                  : "Create Skill"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SkillModal;
