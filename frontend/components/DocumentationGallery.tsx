"use client"

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Maximize2 } from "lucide-react";

// Map of image filenames to readable titles
const images = [
    { src: "/docs/eks_cluster.png", title: "EKS Cluster Overview" },
    { src: "/docs/kiali_mesh.png", title: "Kiali Service Mesh" },
    { src: "/docs/argocd_application_overview.png", title: "ArgoCD Applications" },
    { src: "/docs/tf_apply_outputs.png", title: "Terraform Outputs" },
    { src: "/docs/load_balancer_for_Istio.png", title: "Istio Load Balancer" },
    { src: "/docs/running_application_frontend.png", title: "Frontend Application" },
];

export function DocumentationGallery() {
    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12 neon-text">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                {images.map((img, idx) => (
                    <Dialog key={idx}>
                        <DialogTrigger asChild>
                            <Card className="cursor-pointer group overflow-hidden border-none bg-transparent">
                                <CardContent className="p-0 relative aspect-video rounded-xl overflow-hidden border border-[var(--glass-border)]">
                                    <Image
                                        src={img.src}
                                        alt={img.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <Maximize2 className="w-8 h-8 text-[var(--neon-green)] drop-shadow-[0_0_5px_rgba(57,255,20,0.8)]" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center">
                                        <span className="text-sm font-medium text-white">{img.title}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-[95vw] border-[var(--neon-green)] shadow-[0_0_30px_rgba(57,255,20,0.2)]">
                            <DialogTitle className="sr-only">{img.title}</DialogTitle>
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={img.src}
                                    alt={img.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </section>
    );
}
