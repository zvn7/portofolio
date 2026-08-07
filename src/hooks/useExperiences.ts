import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import {
    fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
} from "@/api/experiences";
import {
    Experience,
    CreateExperiencePayload,
    UpdateExperiencePayload,
} from "@/interface/experiences";

/* GET */
export function useExperiences(
    options?: Omit<UseQueryOptions<Experience[], Error>, "queryKey" | "queryFn">,
) {
    return useQuery<Experience[], Error>({
        queryKey: ["experiences"],
        queryFn: fetchExperiences,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 1,
        ...options,
    });
}

/* CREATE */
export function useCreateExperience() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateExperiencePayload) => createExperience(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["experiences"] });
        },
    });
}

/* UPDATE */
export function useUpdateExperience() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateExperiencePayload }) =>
            updateExperience(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["experiences"] });
        },
    });
}

/* DELETE */
export function useDeleteExperience() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteExperience(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["experiences"] });
        },
    });
}
