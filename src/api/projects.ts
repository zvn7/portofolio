import { CreateProjectPayload, Project, UpdateProjectPayload } from "@/interface/projects";

const base = import.meta.env.VITE_API_URL;

export async function fetchProjects(): Promise<Project[]> {
    const response = await fetch(`${base}/projects`);

    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return Array.isArray(json) ? json : json.data;
}

export async function createProject(payload: CreateProjectPayload): Promise<Project> {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("category", payload.category.join(","));
    formData.append("technologies", payload.technologies.join(","));

    if (payload.url) formData.append("url", payload.url);
    if (payload.repository) formData.append("repository", payload.repository);

    formData.append("image", payload.image);

    const res = await fetch(`${base}/projects`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create project");
    }

    return res.json();
}

export async function updateProject(id: string, payload: UpdateProjectPayload): Promise<Project> {
    const base = import.meta.env.VITE_API_URL;

    const formData = new FormData();

    if (payload.title !== undefined) formData.append("title", payload.title);
    if (payload.description !== undefined) formData.append("description", payload.description);
    if (payload.category !== undefined) formData.append("category", payload.category.join(","));
    if (payload.technologies !== undefined)
        formData.append("technologies", payload.technologies.join(","));
    if (payload.url !== undefined) formData.append("url", payload.url);
    if (payload.repository !== undefined) formData.append("repository", payload.repository);
    if (payload.image) formData.append("image", payload.image);

    const res = await fetch(`${base}/projects/${id}`, {
        method: "PUT",
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update project");
    }

    return res.json();
}

export async function deleteProject(id: string) {
    const base = import.meta.env.VITE_API_URL;

    const res = await fetch(`${base}/projects/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete project");
    }

    return res.json();
}
