import {
    Experience,
    CreateExperiencePayload,
    UpdateExperiencePayload,
} from "@/interface/experiences";

const base = import.meta.env.VITE_API_URL;

export async function fetchExperiences(): Promise<Experience[]> {
    const res = await fetch(`${base}/experiences`);

    if (!res.ok) {
        throw new Error(`Failed to fetch experiences: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return Array.isArray(json) ? json : json.data;
}

export async function createExperience(payload: CreateExperiencePayload): Promise<Experience> {
    const res = await fetch(`${base}/experiences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create experience");
    }

    return res.json();
}

export async function updateExperience(
    id: string,
    payload: UpdateExperiencePayload,
): Promise<Experience> {
    const res = await fetch(`${base}/experiences/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update experience");
    }

    return res.json();
}

export async function deleteExperience(id: string): Promise<void> {
    const res = await fetch(`${base}/experiences/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete experience");
    }
}
