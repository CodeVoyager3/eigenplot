// import { prisma } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ControlPanel } from "@/components/dashboard/control-panel";
import { VisualizationPane } from "@/components/dashboard/visualization-pane";
import { redirect } from "next/navigation";
import { GraphProvider } from "@/hooks/use-graph";
import { auth } from "@clerk/nextjs/server";

export default async function ProjectPage({ params }: { params: { projectId: string } }) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    // TODO: Fetch Project from external Java API
    const project = {
        id: params.projectId,
        name: "Mock Project",
        userId: userId
    };

    // if (!project || project.userId !== userId) {
    //     // Handle 404 or redirect
    //     redirect("/dashboard");
    // }

    // TODO: Fetch Equations from external Java API
    const equations: any[] = [];


    return (
        <DashboardShell>
            <GraphProvider initialEquations={equations || []} projectId={params.projectId}>
                <Sidebar />
                <ControlPanel />
                <VisualizationPane />
            </GraphProvider>
        </DashboardShell>
    );
}
