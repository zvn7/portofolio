import { fetchEducations } from "@/api/educations";
import { Education } from "@/interface/educations";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useEducations(
    options?: Omit<UseQueryOptions<Education[], Error>, "queryKey" | "queryFn">
) {
    return useQuery<Education[], Error>({
        queryKey: ["educations"],
        queryFn: fetchEducations,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 1,
        ...options,
    });
}
