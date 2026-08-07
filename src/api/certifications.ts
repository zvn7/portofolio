import {
    Certification,
    CreateCertificationPayload,
    UpdateCertificationPayload,
} from "@/interface/certifications";

const base = import.meta.env.VITE_API_URL;

export async function fetchCertifications(): Promise<Certification[]> {
    const response = await fetch(`${base}/certifications`);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch certifications: ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return Array.isArray(json) ? json : json.data;
}

export async function createCertification(
    payload: CreateCertificationPayload,
): Promise<Certification> {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("provider", payload.provider);
    formData.append("dateObtained", payload.dateObtained);
    if (payload.certificateUrl) formData.append("certificateUrl", payload.certificateUrl);
    formData.append("image", payload.image);

    const res = await fetch(`${base}/certifications`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create certification");
    }

    return res.json();
}

// !== undefined dari awal, biar nggak kena bug yang sama kayak project kemarin
export async function updateCertification(
    id: string,
    payload: UpdateCertificationPayload,
): Promise<Certification> {
    const formData = new FormData();

    if (payload.title !== undefined) formData.append("title", payload.title);
    if (payload.provider !== undefined) formData.append("provider", payload.provider);
    if (payload.dateObtained !== undefined) formData.append("dateObtained", payload.dateObtained);
    if (payload.certificateUrl !== undefined)
        formData.append("certificateUrl", payload.certificateUrl);
    if (payload.image) formData.append("image", payload.image);

    const res = await fetch(`${base}/certifications/${id}`, {
        method: "PUT",
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update certification");
    }

    return res.json();
}

export async function deleteCertification(id: string) {
    const res = await fetch(`${base}/certifications/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete certification");
    }

    return res.json();
}
