"use client"

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Maximize2, ExternalLink } from "lucide-react";

// Helper for clickable images with Zoom capability
const DocImage = ({ src, alt, caption }: { src: string, alt: string, caption: string }) => (
    <div className="my-8 group">
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-[var(--glass-border)] cursor-zoom-in bg-black/20 hover:border-[var(--accent-green)]/50 transition-colors duration-300">
                    <Image src={src} alt={alt} fill className="object-cover transition-opacity duration-300 group-hover:opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/50 backdrop-blur-sm p-3 rounded-full border border-white/10">
                            <Maximize2 className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 bg-black/95 border-[var(--glass-border)] overflow-hidden flex flex-col">
                <DialogTitle className="sr-only">{alt}</DialogTitle>
                <div className="relative flex-1 w-full h-full overflow-auto flex items-center justify-center p-4">
                    <div className="relative w-full h-full min-h-[300px]">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-contain"
                            quality={100}
                        />
                    </div>
                </div>
                <div className="p-4 bg-black/50 backdrop-blur-md border-t border-[var(--glass-border)] text-center">
                    <p className="text-sm text-gray-300 font-mono">{caption}</p>
                </div>
            </DialogContent>
        </Dialog>
        <p className="text-xs text-gray-500 mt-2 text-center font-mono uppercase tracking-wider">{caption}</p>
    </div>
);

// Helper for Technical Terms with Hyperlinks
const Term = ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--accent-green)] hover:underline decoration-[var(--accent-green)] decoration-1 underline-offset-4 inline-flex items-center gap-0.5 transition-all"
    >
        {children}
        <ExternalLink className="w-3 h-3 opacity-50" />
    </a>
);

export function DocumentationSection() {
    return (
        <section className="py-24 border-t border-[var(--glass-border)] bg-black/20">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-16 text-center tracking-tight">Project Documentation</h2>

                {/* 0. System Architecture */}
                <div className="mb-24">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[var(--accent-green)] font-mono text-xl">00</span>
                        <h3 className="text-xl font-semibold text-white">System Architecture</h3>
                    </div>
                    <div className="glass-panel p-8 rounded-xl border border-[var(--glass-border)] bg-black/40">
                        <p className="text-gray-300 leading-relaxed mb-6">
                            This project implements a modern <Term href="https://www.cncf.io/">Cloud Native</Term> architecture designed for scalability, security, and observability. The system is composed of several key layers:
                        </p>
                        <ul className="space-y-4 text-gray-400 text-sm list-disc pl-5 mb-6">
                            <li>
                                <strong className="text-white">Infrastructure Layer:</strong> Managed by <Term href="https://www.terraform.io/">Terraform</Term>, provisioning a VPC and an <Term href="https://aws.amazon.com/eks/">Amazon EKS</Term> cluster.
                            </li>
                            <li>
                                <strong className="text-white">Application Layer:</strong> Containerized microservices (Frontend & Backend) running on <Term href="https://kubernetes.io/">Kubernetes</Term>.
                            </li>
                            <li>
                                <strong className="text-white">Traffic Management:</strong> Handled by <Term href="https://istio.io/">Istio Service Mesh</Term>, using an Ingress Gateway behind an AWS ALB.
                            </li>
                            <li>
                                <strong className="text-white">Continuous Delivery:</strong> <Term href="https://argo-cd.readthedocs.io/">ArgoCD</Term> implements GitOps, syncing state from Git to the cluster.
                            </li>
                        </ul>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 font-mono text-xs text-gray-400 overflow-x-auto">
                            <p className="mb-2"><strong className="text-[var(--accent-green)]">Request Flow:</strong></p>
                            <p>User ➔ AWS ALB ➔ Istio Ingress Gateway ➔ VirtualService ➔ Service ➔ Pod</p>
                        </div>
                    </div>
                </div>

                {/* 1. Infrastructure */}
                <div className="mb-24">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[var(--accent-green)] font-mono text-xl">01</span>
                        <h3 className="text-xl font-semibold text-white">Infrastructure Provisioning</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                        The foundation is built on <Term href="https://aws.amazon.com/eks/">AWS EKS</Term> using <Term href="https://www.terraform.io/">Terraform</Term>. We provision a VPC, Subnets, and the EKS Cluster, ensuring a robust environment.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DocImage src="/docs/tf_apply_outputs.png" alt="Terraform Apply" caption="Terraform Apply Output" />
                        <DocImage src="/docs/eks_cluster.png" alt="EKS Cluster" caption="AWS EKS Console" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DocImage src="/docs/eks_cluster_networking.png" alt="EKS Networking" caption="Cluster Networking" />
                        <DocImage src="/docs/ec2_instances_of_eks_cluster.png" alt="EC2 Nodes" caption="Worker Nodes" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DocImage src="/docs/sequiry_groups_for_project.png" alt="Security Groups" caption="Security Group Configuration" />
                        <DocImage src="/docs/namespace_details_cli.png" alt="Namespace Details" caption="Kubernetes Namespaces (CLI)" />
                    </div>
                </div>

                {/* 2. CI/CD Pipeline */}
                <div className="mb-24">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[var(--accent-green)] font-mono text-xl">02</span>
                        <h3 className="text-xl font-semibold text-white">CI/CD Pipeline</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                        Automated pipelines build <Term href="https://www.docker.com/">Docker</Term> images and push them to GitHub Container Registry.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DocImage src="/docs/github_repo.png" alt="GitHub Repo" caption="Source Repository" />
                        <DocImage src="/docs/ci_cd_pipeline.png" alt="CI/CD Pipeline" caption="GitHub Actions Workflow" />
                    </div>
                    <DocImage src="/docs/github_packages_images.png" alt="GHCR Packages" caption="Container Registry Images" />
                </div>

                {/* 3. GitOps */}
                <div className="mb-24">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[var(--accent-green)] font-mono text-xl">03</span>
                        <h3 className="text-xl font-semibold text-white">GitOps with ArgoCD</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                        <Term href="https://argo-cd.readthedocs.io/">ArgoCD</Term> syncs the desired state from Git to the cluster.
                    </p>
                    <DocImage src="/docs/argocd_application_overview.png" alt="ArgoCD Overview" caption="ArgoCD Dashboard" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DocImage src="/docs/argocd_application_details.png" alt="ArgoCD Details" caption="App Sync Details" />
                        <DocImage src="/docs/argocd_application_application_sync_status.png" alt="Sync Status" caption="Real-time Sync Status" />
                    </div>
                </div>

                {/* 4. Service Mesh */}
                <div className="mb-24">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[var(--accent-green)] font-mono text-xl">04</span>
                        <h3 className="text-xl font-semibold text-white">Istio Service Mesh</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                        Traffic management and security handled by <Term href="https://istio.io/">Istio</Term>.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DocImage src="/docs/load_balancer_for_Istio.png" alt="Load Balancer" caption="AWS Load Balancer" />
                        <DocImage src="/docs/target_groups.png" alt="Target Groups" caption="ALB Target Groups" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DocImage src="/docs/auto_scaling_groups.png" alt="ASG" caption="Auto Scaling Groups" />
                        <DocImage src="/docs/istio.png" alt="Istio Status" caption="Istio CLI Status" />
                    </div>
                </div>

                {/* 5. Observability & Access */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[var(--accent-green)] font-mono text-xl">05</span>
                        <h3 className="text-xl font-semibold text-white">Observability & Access</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                        <Term href="https://kiali.io/">Kiali</Term> visualizes the mesh, and the application is accessible via the Load Balancer.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DocImage src="/docs/kiali_mesh.png" alt="Kiali Mesh" caption="Service Mesh Topology" />
                        <DocImage src="/docs/kiali_overview.png" alt="Kiali Overview" caption="Kiali Dashboard" />
                    </div>
                    <DocImage src="/docs/running_application_frontend.png" alt="Live App" caption="Running Application" />
                </div>

            </div>
        </section>
    );
}
