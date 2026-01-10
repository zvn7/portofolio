import { fetchProjects, createProject, updateProject, deleteProject } from "@/api/projects";
import { CreateProjectPayload, Project, UpdateProjectPayload } from "@/interface/projects";
import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";

/* =======================
   GET PROJECTS
======================= */
export function useProjects(
    options?: Omit<UseQueryOptions<Project[], Error>, "queryKey" | "queryFn">
) {
    return useQuery<Project[], Error>({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 1,
        ...options,
    });
}

/* CREATE */
export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateProjectPayload) => createProject(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

/* UPDATE */
export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateProjectPayload }) =>
            updateProject(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

/* =======================
   DELETE PROJECT
======================= */
export function useDeleteProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
}
