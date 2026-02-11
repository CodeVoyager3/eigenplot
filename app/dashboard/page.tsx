
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Plus, Folder, MoreVertical, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Sidebar } from "@/components/dashboard/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProject } from "./actions";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) return null;

  const projects: any[] = []; // TODO: Fetch from external Java API

  return (
    <DashboardShell>
      <Sidebar />
      <div className="flex-1 bg-background p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Projects</h1>
              <p className="text-muted-foreground mt-1">Manage your simulations and datasets.</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form action={createProject}>
                  <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                      Give your new simulation project a name.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      className="col-span-3 mt-2"
                      placeholder="e.g., Orbital Mechanics"
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects?.map((project) => (
              <Link key={project.id} href={`/dashboard/${project.id}`}>
                <div className="group relative rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Folder className="h-6 w-6" />
                    </div>
                    <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Edited {new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {projects?.length === 0 && (
              <div className="col-span-full text-center p-12 border border-dashed rounded-xl text-muted-foreground">
                No projects found. Create one to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
