import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { fetchSkills, createSkill, updateSkill, deleteSkill } from "@/api/skills";
import { Skill } from "@/interface/skills";

/* GET */
export function useSkills(options?: Omit<UseQueryOptions<Skill[], Error>, "queryKey" | "queryFn">) {
    return useQuery<Skill[], Error>({
        queryKey: ["skills"],
        queryFn: fetchSkills,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 1,
        ...options,
    });
}

/* CREATE */
export function useCreateSkill() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: Omit<Skill, "_id">) => createSkill(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
        },
    });
}

/* UPDATE */
export function useUpdateSkill() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<Skill> }) =>
            updateSkill(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
        },
    });
}

/* DELETE */
export function useDeleteSkill() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteSkill(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
        },
    });
}
