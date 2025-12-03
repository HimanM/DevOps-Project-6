"use client"

import { useEffect } from "react";
import gsap from "gsap";

export function PageAnimations() {
    useEffect(() => {
        // Entrance Animation
        gsap.from("body", {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        });

        // Staggered reveal for main sections
        gsap.from("section", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.2,
        });

        // Neon Pulse Effect for specific elements
        gsap.to(".neon-pulse", {
            boxShadow: "0 0 20px rgba(57, 255, 20, 0.6)",
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "sine.inOut",
        });
    }, []);

    return null; // This component doesn't render anything visible
}
