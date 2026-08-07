import { useState } from "react";
import Swal from "sweetalert2";
import { useCertifications, useDeleteCertification } from "@/hooks/useCertifications";
import { Button } from "@/components/ui/button";
import CertificationModal from "@/components/organisms/CertificationModal";
import { Certification } from "@/interface/certifications";
import { formatMonthYear } from "@/lib/utils"; // asumsi util yang sama dipakai di section Resume

const AdminCertifications = () => {
    const { data: certifications = [], isLoading, isError } = useCertifications();
    const deleteMutation = useDeleteCertification();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

    const handleCreate = () => {
        setSelectedCertification(null);
        setModalOpen(true);
    };

    const handleEdit = (certification: Certification) => {
        setSelectedCertification(certification);
        setModalOpen(true);
    };

    const handleDelete = async (certification: Certification) => {
        const result = await Swal.fire({
            title: "Delete certification?",
            text: `"${certification.title}" will be permanently deleted.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#ef4444",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteMutation.mutateAsync(certification._id);
            Swal.fire({
                title: "Deleted",
                text: "Certification has been deleted.",
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
            });
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Failed to delete certification", "error");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Certifications</h1>
                    <p className="text-sm text-muted-foreground">
                        {certifications.length} certification
                        {certifications.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <Button size="sm" onClick={handleCreate}>
                    New Certification
                </Button>
            </div>

            {isLoading && (
                <p className="text-sm text-muted-foreground">Loading certifications...</p>
            )}
            {isError && <p className="text-sm text-red-500">Failed to load certifications.</p>}

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Title</th>
                            <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">
                                Provider
                            </th>
                            <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                                Date Obtained
                            </th>
                            <th className="text-right px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && certifications.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-8 text-center text-muted-foreground"
                                >
                                    No certifications yet.{" "}
                                    <button
                                        className="underline underline-offset-2 hover:text-foreground transition-colors"
                                        onClick={handleCreate}
                                    >
                                        Create your first one.
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            certifications.map((certification) => (
                                <tr
                                    key={certification._id}
                                    className="border-t hover:bg-muted/30 transition-colors"
                                >
                                    <td className="px-4 py-3 font-medium">{certification.title}</td>
                                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                                        {certification.provider}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                                        {formatMonthYear(certification.dateObtained)}
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(certification)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(certification)}
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

            <CertificationModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedCertification(null);
                }}
                certification={selectedCertification}
            />
        </div>
    );
};

export default AdminCertifications;
