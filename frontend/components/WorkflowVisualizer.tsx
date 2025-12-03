"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Code, Box, Upload, Server, Network, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { id: 1, title: "Code", icon: Code, desc: "Developer pushes code to GitHub" },
    { id: 2, title: "Build", icon: Box, desc: "GitHub Actions builds Docker image" },
    { id: 3, title: "Push", icon: Upload, desc: "Image pushed to GHCR Registry" },
    { id: 4, title: "Deploy", icon: Server, desc: "ArgoCD syncs manifests to EKS" },
    { id: 5, title: "Mesh", icon: Network, desc: "Istio manages traffic & security" },
    { id: 6, title: "Access", icon: Globe, desc: "User accesses via ALB Ingress" },
];

export function WorkflowVisualizer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".workflow-card", {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Auto-scroll for mobile
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const interval = setInterval(() => {
            if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
                // Reset to start smoothly
                scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                // Scroll to next card (approx width + gap)
                scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
            }
        }, 3000); // Scroll every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={containerRef} className="py-24 border-t border-[var(--glass-border)] overflow-hidden bg-black/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">DevOps Workflow</h2>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto">
                        From code commit to production deployment, automated by a robust CI/CD pipeline.
                    </p>
                </div>

                {/* Mobile: Horizontal Scroll Snap with "Carousel" feel */}
                <div
                    ref={scrollContainerRef}
                    className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 scroll-smooth scrollbar-hide"
                >
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="workflow-card glass-panel min-w-[85vw] sm:min-w-[300px] p-8 rounded-2xl snap-center flex flex-col items-center text-center border border-[var(--glass-border)] relative overflow-hidden"
                        >
                            {/* Step Number at Top */}
                            <div className="absolute top-4 right-4 text-4xl font-bold text-[var(--accent-green)]/10 font-mono">
                                0{step.id}
                            </div>

                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[var(--accent-green)] border border-white/10 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-white">{step.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Desktop: Grid/Timeline */}
                <div className="hidden md:flex justify-between items-start relative px-10">
                    {/* Connecting Line */}
                    <div className="absolute top-10 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent -z-10" />

                    {steps.map((step, index) => (
                        <div key={step.id} className="workflow-card flex flex-col items-center text-center w-40 group relative">
                            <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center mb-6 text-gray-400 group-hover:text-[var(--accent-green)] group-hover:scale-110 group-hover:border-[var(--accent-green)]/30 transition-all duration-300 z-10 bg-[#050505] border border-[var(--glass-border)] shadow-lg">
                                <step.icon className="w-9 h-9" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-200 group-hover:text-white transition-colors">{step.title}</h3>
                            <p className="text-sm text-gray-500 leading-snug px-2 group-hover:text-gray-400 transition-colors">{step.desc}</p>

                            {/* Step Number Background (More Visible) */}
                            <div className="absolute -top-6 -right-4 text-7xl font-bold text-white/[0.05] group-hover:text-[var(--accent-green)]/10 transition-colors duration-300 -z-10 select-none pointer-events-none font-mono">
                                0{step.id}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
