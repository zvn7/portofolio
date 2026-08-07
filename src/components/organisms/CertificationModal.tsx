import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { certificationSchema, CertificationFormValues } from "@/schemas/certificationSchema";
import { useCreateCertification, useUpdateCertification } from "@/hooks/useCertifications";

interface Props {
    open: boolean;
    onClose: () => void;
    certification?: any;
}

const CertificationModal = ({ open, onClose, certification }: Props) => {
    const createMutation = useCreateCertification();
    const updateMutation = useUpdateCertification();
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CertificationFormValues>({
        resolver: zodResolver(certificationSchema),
        defaultValues: {
            title: "",
            provider: "",
            dateObtained: "",
            certificateUrl: "",
            image: undefined,
        },
    });

    useEffect(() => {
        if (certification) {
            reset({
                title: certification.title,
                provider: certification.provider,
                // slice biar cocok sama input type="date" (butuh format YYYY-MM-DD)
                dateObtained: certification.dateObtained?.slice(0, 10) ?? "",
                certificateUrl: certification.certificateUrl ?? "",
                image: undefined,
            });
            setPreview(certification.image ?? null);
        } else {
            reset();
            setPreview(null);
        }

        if (fileInputRef.current) fileInputRef.current.value = "";
    }, [certification, reset, open]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        } else {
            setValue("image", undefined);
            setPreview(certification?.image ?? null);
        }
    };

    const onSubmit = async (values: CertificationFormValues) => {
        if (!certification && !values.image) {
            Swal.fire("Error", "Image is required", "error");
            return;
        }

        try {
            const payload = {
                title: values.title,
                provider: values.provider,
                dateObtained: values.dateObtained,
                certificateUrl: values.certificateUrl,
                ...(values.image instanceof File && { image: values.image }),
            };

            if (certification) {
                await updateMutation.mutateAsync({ id: certification._id, payload });
            } else {
                await createMutation.mutateAsync(payload as any);
            }

            Swal.fire({
                title: "Success",
                text: certification ? "Certification updated" : "Certification created",
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
        <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {certification ? "Edit Certification" : "New Certification"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label>
                            Image {!certification && <span className="text-red-500">*</span>}
                            {certification && (
                                <span className="text-xs text-muted-foreground font-normal ml-1">
                                    (leave empty to keep current)
                                </span>
                            )}
                        </Label>

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-36 object-cover rounded-lg border"
                            />
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80 cursor-pointer"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>
                            Title <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="AWS Certified Developer" {...register("title")} />
                        {errors.title && (
                            <p className="text-xs text-red-500">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label>
                                Provider <span className="text-red-500">*</span>
                            </Label>
                            <Input placeholder="Amazon Web Services" {...register("provider")} />
                            {errors.provider && (
                                <p className="text-xs text-red-500">{errors.provider.message}</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <Label>
                                Date Obtained <span className="text-red-500">*</span>
                            </Label>
                            <Input type="date" {...register("dateObtained")} />
                            {errors.dateObtained && (
                                <p className="text-xs text-red-500">
                                    {errors.dateObtained.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label>Certificate URL</Label>
                        <Input
                            placeholder="https://credential.net/..."
                            {...register("certificateUrl")}
                        />
                        {errors.certificateUrl && (
                            <p className="text-xs text-red-500">{errors.certificateUrl.message}</p>
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
                                : certification
                                  ? "Save Changes"
                                  : "Create Certification"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CertificationModal;
