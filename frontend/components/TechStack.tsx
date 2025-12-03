import {
    siIstio,
    siTerraform,
    siArgo,
    siDocker,
    siNextdotjs,
    siKubernetes
} from "simple-icons/icons";
import { Cloud, Activity, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Helper to render Simple Icons
interface SimpleIconProps {
    title: string;
    path: string;
    hex: string;
    slug: string;
}

const SimpleIcon = ({ icon, className }: { icon: SimpleIconProps, className?: string }) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>{icon.title}</title>
        <path d={icon.path} />
    </svg>
);

type TechItem = {
    name: string;
    icon: LucideIcon | SimpleIconProps;
    type: 'simple' | 'lucide';
    description: string;
};

const technologies: TechItem[] = [
    { name: "AWS EKS", icon: Cloud, type: "lucide", description: "Managed Kubernetes Cluster" },
    { name: "Kubernetes", icon: siKubernetes, type: "simple", description: "Container Orchestration" },
    { name: "Istio", icon: siIstio, type: "simple", description: "Service Mesh & Traffic Management" },
    { name: "Kiali", icon: Activity, type: "lucide", description: "Mesh Observability & Visualization" },
    { name: "Terraform", icon: siTerraform, type: "simple", description: "Infrastructure as Code" },
    { name: "ArgoCD", icon: siArgo, type: "simple", description: "GitOps Continuous Delivery" },
    { name: "Docker", icon: siDocker, type: "simple", description: "Containerization" },
    { name: "Next.js", icon: siNextdotjs, type: "simple", description: "Frontend Application" },
];

export function TechStack() {
    return (
        <section className="py-20 border-t border-[var(--glass-border)] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-green)] rounded-full blur-[120px] opacity-[0.03] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <h2 className="text-2xl font-semibold mb-12 text-center tracking-tight">
                    Powered By <span className="accent-text">Cloud Native</span> Tech
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {technologies.map((tech) => {
                        return (
                            <Card key={tech.name} className="glass-panel border-none bg-opacity-0 hover:bg-white/5 transition-all duration-300 group hover:-translate-y-1">
                                <CardHeader className="flex flex-col items-center pb-3 pt-6">
                                    {tech.type === 'simple' ? (
                                        <SimpleIcon icon={tech.icon as SimpleIconProps} className="w-10 h-10 text-gray-500 group-hover:text-[var(--accent-green)] transition-colors duration-300" />
                                    ) : (
                                        (() => {
                                            const IconComponent = tech.icon as LucideIcon;
                                            return <IconComponent className="w-10 h-10 text-gray-500 group-hover:text-[var(--accent-green)] transition-colors duration-300" />;
                                        })()
                                    )}
                                    <CardTitle className="mt-4 text-sm font-medium tracking-wide">{tech.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-[10px] text-gray-500 pb-6 uppercase tracking-wider font-mono">
                                    {tech.description}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
