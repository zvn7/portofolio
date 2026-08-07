import { useState } from "react";
import Swal from "sweetalert2";
import { useSkills, useDeleteSkill } from "@/hooks/useSkills";
import { Button } from "@/components/ui/button";
import SkillModal from "@/components/organisms/SkillModal";
import { Skill } from "@/interface/skills";

const levelBadge: Record<string, string> = {
    beginner: "bg-slate-100 text-slate-700",
    intermediate: "bg-blue-100 text-blue-700",
    advanced: "bg-amber-100 text-amber-700",
    expert: "bg-emerald-100 text-emerald-700",
};

const AdminSkills = () => {
    const { data: skills = [], isLoading, isError } = useSkills();
    const deleteMutation = useDeleteSkill();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

    const handleCreate = () => {
        setSelectedSkill(null);
        setModalOpen(true);
    };

    const handleEdit = (skill: Skill) => {
        setSelectedSkill(skill);
        setModalOpen(true);
    };

    const handleDelete = async (skill: Skill) => {
        const result = await Swal.fire({
            title: "Delete skill?",
            text: `"${skill.name}" will be permanently deleted.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#ef4444",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteMutation.mutateAsync(skill._id);
            Swal.fire({
                title: "Deleted",
                text: "Skill has been deleted.",
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
            });
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Failed to delete skill", "error");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Skills</h1>
                    <p className="text-sm text-muted-foreground">
                        {skills.length} skill{skills.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <Button size="sm" onClick={handleCreate}>
                    New Skill
                </Button>
            </div>

            {isLoading && <p className="text-sm text-muted-foreground">Loading skills...</p>}
            {isError && <p className="text-sm text-red-500">Failed to load skills.</p>}

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Name</th>
                            <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">
                                Category
                            </th>
                            <th className="text-left px-4 py-3 font-medium">Level</th>
                            <th className="text-right px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && skills.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-8 text-center text-muted-foreground"
                                >
                                    No skills yet.{" "}
                                    <button
                                        className="underline underline-offset-2 hover:text-foreground transition-colors"
                                        onClick={handleCreate}
                                    >
                                        Create your first one.
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            skills.map((skill) => (
                                <tr
                                    key={skill._id}
                                    className="border-t hover:bg-muted/30 transition-colors"
                                >
                                    <td className="px-4 py-3 font-medium">{skill.name}</td>
                                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                                        {skill.category}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                                                levelBadge[skill.level] ??
                                                "bg-muted text-muted-foreground"
                                            }`}
                                        >
                                            {skill.level}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(skill)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(skill)}
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

            {/* Modal */}
            <SkillModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedSkill(null);
                }}
                skill={selectedSkill}
            />
        </div>
    );
};

export default AdminSkills;
