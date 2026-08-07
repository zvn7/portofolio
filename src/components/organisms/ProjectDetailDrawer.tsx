import { Project } from "@/interface/projects";
import { Button } from "@/components/ui/button";

interface Props {
    open: boolean;
    onClose: () => void;
    project: Project | null;
    onEdit: (project: Project) => void;
}

const IconX = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const IconLink = () => (
    <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const Tag = ({ label }: { label: string }) => (
    <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
        {label}
    </span>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <div>{children}</div>
    </div>
);

const ProjectDetailDrawer = ({ open, onClose, project, onEdit }: Props) => {
    if (!project) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background border-l shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
                    <h2 className="font-semibold text-base truncate pr-4">{project.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        aria-label="Close"
                    >
                        <IconX />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    {/* Cover image */}
                    {project.image && (
                        <div className="rounded-lg overflow-hidden border bg-muted aspect-video">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <Field label="Description">
                        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                            {project.description}
                        </p>
                    </Field>

                    {/* Category */}
                    <Field label="Category">
                        <div className="flex flex-wrap gap-1.5">
                            {project.category.map((c) => (
                                <Tag key={c} label={c} />
                            ))}
                        </div>
                    </Field>

                    {/* Technologies */}
                    <Field label="Technologies">
                        <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((t) => (
                                <Tag key={t} label={t} />
                            ))}
                        </div>
                    </Field>

                    {/* Links */}
                    {(project.url || project.repository) && (
                        <Field label="Links">
                            <div className="space-y-2">
                                {project.url && (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-sm text-blue-500 hover:underline underline-offset-2"
                                    >
                                        <IconLink />
                                        Live Website
                                    </a>
                                )}
                                {project.repository && (
                                    <a
                                        href={project.repository}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-sm text-blue-500 hover:underline underline-offset-2"
                                    >
                                        <IconLink />
                                        Repository
                                    </a>
                                )}
                            </div>
                        </Field>
                    )}

                    {/* Meta */}
                    <Field label="Created">
                        <p className="text-sm text-muted-foreground">
                            {new Date(project.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </Field>
                </div>

                {/* Footer actions */}
                <div className="px-6 py-4 border-t shrink-0 flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={() => onEdit(project)}>Edit Project</Button>
                </div>
            </div>
        </>
    );
};

export default ProjectDetailDrawer;
