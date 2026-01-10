import { Education } from "@/interface/educations";

export async function fetchEducations(): Promise<Education[]> {
    const base = import.meta.env.VITE_API_URL;
    const response = await fetch(`${base}/education`);

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.data;
}
