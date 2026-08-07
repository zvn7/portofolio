export interface Certification {
    _id: string;
    title: string;
    provider: string;
    dateObtained: string; // ISO date string dari backend
    certificateUrl?: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCertificationPayload {
    title: string;
    provider: string;
    dateObtained: string;
    certificateUrl?: string;
    image: File;
}

export interface UpdateCertificationPayload {
    title?: string;
    provider?: string;
    dateObtained?: string;
    certificateUrl?: string;
    image?: File;
}
