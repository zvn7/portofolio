import { Experience } from "@/interface/experiences";

export async function fetchExperiences(): Promise<Experience[]> {
    const base = import.meta.env.VITE_API_URL;
    const response = await fetch(`${base}/experiences`);

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.data;
}
