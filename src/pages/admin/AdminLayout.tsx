import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            {/* TOP BAR */}
            <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
                <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">Admin</span>
                    </div>

                    <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                        Exit
                    </Button>
                </div>
            </header>

            {/* CONTENT */}
            <main className="mx-auto max-w-5xl px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
