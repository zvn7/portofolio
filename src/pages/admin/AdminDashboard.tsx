import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-xl font-semibold">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Manage portfolio content.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border p-5 space-y-3">
                    <h2 className="font-medium">Projects</h2>
                    <p className="text-sm text-muted-foreground">
                        Create, edit, and organize portfolio projects.
                    </p>
                    <Button size="sm" onClick={() => navigate("/admin/projects")}>
                        Manage Projects
                    </Button>
                </div>

                <div className="rounded-xl border p-5 space-y-3">
                    <h2 className="font-medium">Experiences</h2>
                    <p className="text-sm text-muted-foreground">Update work history and roles.</p>
                    <Button size="sm" onClick={() => navigate("/admin/experiences")}>
                        Manage Experiences
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
