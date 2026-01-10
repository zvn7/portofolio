import { fetchExperiences } from "@/api/experiences";
import { Experience } from "@/interface/experiences";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useExperiences(
    options?: Omit<UseQueryOptions<Experience[], Error>, "queryKey" | "queryFn">
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
