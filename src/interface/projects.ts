export interface Project {
    _id: string;
    title: string;
    description: string;
    category: string[];
    technologies: string[];
    image?: string;
    video?: string;
    url?: string;
    repository?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectPayload {
    title: string;
    description: string;
    category: string[];
    technologies: string[];
    url?: string;
    repository?: string;
    image: File;
}

export interface UpdateProjectPayload {
    title?: string;
    description?: string;
    category?: string[];
    technologies?: string[];
    url?: string;
    repository?: string;
    image?: File;
}