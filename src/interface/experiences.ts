export interface Experience {
    _id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateExperiencePayload {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
}

export interface UpdateExperiencePayload {
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}
