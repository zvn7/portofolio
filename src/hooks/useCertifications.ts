import {
    fetchCertifications,
    createCertification,
    updateCertification,
    deleteCertification,
} from "@/api/certifications";
import {
    Certification,
    CreateCertificationPayload,
    UpdateCertificationPayload,
} from "@/interface/certifications";
import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";

export function useCertifications(
    options?: Omit<UseQueryOptions<Certification[], Error>, "queryKey" | "queryFn">,
) {
    return useQuery<Certification[], Error>({
        queryKey: ["certifications"],
        queryFn: fetchCertifications,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 1,
        ...options,
    });
}

export function useCreateCertification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateCertificationPayload) => createCertification(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certifications"] });
        },
    });
}

export function useUpdateCertification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateCertificationPayload }) =>
            updateCertification(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certifications"] });
        },
    });
}

export function useDeleteCertification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteCertification(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certifications"] });
        },
    });
}
