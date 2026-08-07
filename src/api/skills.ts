import { Skill } from "@/interface/skills";

const base = import.meta.env.VITE_API_URL;

export async function fetchSkills(): Promise<Skill[]> {
    const res = await fetch(`${base}/skills`);

    if (!res.ok) {
        throw new Error(`Failed to fetch skills: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return Array.isArray(json) ? json : json.data;
}

export async function createSkill(payload: Omit<Skill, "_id">): Promise<Skill> {
    const res = await fetch(`${base}/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create skill");
    }

    return res.json();
}

export async function updateSkill(id: string, payload: Partial<Skill>): Promise<Skill> {
    const res = await fetch(`${base}/skills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update skill");
    }

    return res.json();
}

export async function deleteSkill(id: string): Promise<void> {
    const res = await fetch(`${base}/skills/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete skill");
    }
}
