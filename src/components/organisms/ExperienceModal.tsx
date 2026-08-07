import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Swal from "sweetalert2";

import { useCreateExperience, useUpdateExperience } from "@/hooks/useExperiences";
import { Experience } from "@/interface/experiences";

// ── Schema ────────────────────────────────────────────────────────────────────

const experienceSchema = z.object({
    company: z.string().min(1, "Company is required"),
    position: z.string().min(1, "Position is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().min(1, "Description is required"),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
    open: boolean;
    onClose: () => void;
    experience?: Experience | null;
}

// ── Component ─────────────────────────────────────────────────────────────────

const ExperienceModal = ({ open, onClose, experience }: Props) => {
    const createMutation = useCreateExperience();
    const updateMutation = useUpdateExperience();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
        },
    });

    useEffect(() => {
        if (experience) {
            reset({
                company: experience.company,
                position: experience.position,
                startDate: experience.startDate.slice(0, 10),
                endDate: experience.endDate ? experience.endDate.slice(0, 10) : "",
                description: experience.description,
            });
        } else {
            reset();
        }
    }, [experience, open, reset]);

    const onSubmit = async (values: ExperienceFormValues) => {
        const payload = {
            company: values.company,
            position: values.position,
            startDate: values.startDate,
            endDate: values.endDate || undefined,
            description: values.description,
        };

        try {
            if (experience) {
                await updateMutation.mutateAsync({ id: experience._id, payload });
            } else {
                await createMutation.mutateAsync(payload);
            }

            Swal.fire({
                title: "Success",
                text: experience ? "Experience updated" : "Experience created",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            onClose();
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Something went wrong", "error");
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) onClose();
            }}
        >
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{experience ? "Edit Experience" : "Add Experience"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Company */}
                    <div className="space-y-1.5">
                        <Label>
                            Company <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="PT Example Indonesia" {...register("company")} />
                        {errors.company && (
                            <p className="text-xs text-red-500">{errors.company.message}</p>
                        )}
                    </div>

                    {/* Position */}
                    <div className="space-y-1.5">
                        <Label>
                            Position <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="Frontend Developer" {...register("position")} />
                        {errors.position && (
                            <p className="text-xs text-red-500">{errors.position.message}</p>
                        )}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label>
                                Start Date <span className="text-red-500">*</span>
                            </Label>
                            <Input type="date" {...register("startDate")} />
                            {errors.startDate && (
                                <p className="text-xs text-red-500">{errors.startDate.message}</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <Label>End Date</Label>
                            <Input type="date" {...register("endDate")} />
                            <p className="text-xs text-muted-foreground">Leave empty if current</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <Label>
                            Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            rows={5}
                            className="resize-none"
                            placeholder="Describe your responsibilities and achievements..."
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting || isPending}>
                            {isPending
                                ? "Saving..."
                                : experience
                                  ? "Save Changes"
                                  : "Add Experience"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ExperienceModal;
