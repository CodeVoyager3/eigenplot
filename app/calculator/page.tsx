import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ControlPanel } from "@/components/dashboard/control-panel";
import { VisualizationPane } from "@/components/dashboard/visualization-pane";
import { GraphProvider } from "@/hooks/use-graph";

export default function CalculatorPage() {
    return (
        <DashboardShell>
            <GraphProvider>
                <Sidebar />
                <ControlPanel />
                <VisualizationPane />
            </GraphProvider>
        </DashboardShell>
    );
}
