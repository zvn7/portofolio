import { useState } from "react";
import Swal from "sweetalert2";
import { useExperiences, useDeleteExperience } from "@/hooks/useExperiences";
import { Button } from "@/components/ui/button";
import ExperienceModal from "@/components/organisms/ExperienceModal";
import { Experience } from "@/interface/experiences";

const formatDisplayDate = (iso?: string) => {
    if (!iso) return "Present";
    return new Date(iso).toLocaleDateString("id-ID", { month: "short", year: "numeric" });
};

const AdminExperiences = () => {
    const { data: experiences = [], isLoading, isError } = useExperiences();
    const deleteMutation = useDeleteExperience();

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Experience | null>(null);

    const handleCreate = () => {
        setSelected(null);
        setOpen(true);
    };

    const handleEdit = (experience: Experience) => {
        setSelected(experience);
        setOpen(true);
    };

    const handleDelete = async (experience: Experience) => {
        const result = await Swal.fire({
            title: "Delete experience?",
            text: `"${experience.position} at ${experience.company}" will be permanently deleted.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#ef4444",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteMutation.mutateAsync(experience._id);
            Swal.fire({
                title: "Deleted",
                text: "Experience has been deleted.",
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
            });
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Failed to delete experience", "error");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Work Experience</h1>
                    <p className="text-sm text-muted-foreground">
                        {experiences.length} experience{experiences.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <Button size="sm" onClick={handleCreate}>
                    Add Experience
                </Button>
            </div>

            {isLoading && <p className="text-sm text-muted-foreground">Loading experiences...</p>}
            {isError && <p className="text-sm text-red-500">Failed to load experiences</p>}

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Company</th>
                            <th className="text-left px-4 py-3 font-medium">Position</th>
                            <th className="text-left px-4 py-3 font-medium">Period</th>
                            <th className="text-right px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && experiences.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-8 text-center text-muted-foreground"
                                >
                                    No experience added yet.{" "}
                                    <button
                                        className="underline underline-offset-2 hover:text-foreground transition-colors"
                                        onClick={handleCreate}
                                    >
                                        Add your first one.
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            experiences.map((exp) => (
                                <tr
                                    key={exp._id}
                                    className="border-t hover:bg-muted/30 transition-colors"
                                >
                                    <td className="px-4 py-3 font-medium">{exp.company}</td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {exp.position}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                                        {formatDisplayDate(exp.startDate)} —{" "}
                                        {formatDisplayDate(exp.endDate)}
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(exp)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(exp)}
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

            <ExperienceModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setSelected(null);
                }}
                experience={selected}
            />
        </div>
    );
};

export default AdminExperiences;
