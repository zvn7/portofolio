import { useProjects } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";

const AdminExperiences = () => {
    const { data: projects = [] } = useProjects();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Manage Projects</h1>
                <Button>Create Project</Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="text-left px-4 py-2">Title</th>
                            <th className="text-left px-4 py-2">Category</th>
                            <th className="text-left px-4 py-2">Tech</th>
                            <th className="text-right px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id} className="border-t">
                                <td className="px-4 py-2">{project.title}</td>
                                <td className="px-4 py-2">{project.category.join(", ")}</td>
                                <td className="px-4 py-2">{project.technologies.join(", ")}</td>
                                <td className="px-4 py-2 text-right space-x-2">
                                    <Button size="sm" variant="outline">
                                        Edit
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminExperiences;
