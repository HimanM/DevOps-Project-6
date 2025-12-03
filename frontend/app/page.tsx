'use client';
import { useState, useEffect } from 'react';
import { Github, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { TechStack } from '@/components/TechStack';
import { WorkflowVisualizer } from '@/components/WorkflowVisualizer';
import { DocumentationSection } from '@/components/DocumentationSection';


export default function Home() {
  const [message, setMessage] = useState('Initializing...');
  const [timestamp, setTimestamp] = useState('');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/hello');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setMessage(data.message);
        setTimestamp(data.timestamp);
        setStatus('success');
      } catch (err) {
        console.error(err);
        setMessage('Backend unavailable');
        setStatus('error');
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent-green)] selection:text-black">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--glass-border)] bg-[var(--background)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono font-bold text-sm tracking-wider">DEVOPS PROJECT 6</span>
          <a
            href="https://github.com/HimanM/DevOps-Project-6"
            target="_blank"
            className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse"></span>
          EKS & Istio Live Demo
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
          Cloud Native <br />
          <span className="text-gray-500">Infrastructure.</span>
        </h1>

        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          A comprehensive demonstration of modern DevOps practices, featuring Kubernetes orchestration, Service Mesh traffic management, and GitOps automation.
        </p>

        {/* Backend Status Widget */}
        <div className="max-w-sm mx-auto glass-panel rounded-xl p-1 flex items-center gap-4 pr-6 mb-12">
          <div className={`p-3 rounded-lg ${status === 'success' ? 'bg-[var(--accent-green)]/10 text-[var(--accent-green)]' : status === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
            {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
            {status === 'success' && <CheckCircle2 className="w-5 h-5" />}
            {status === 'error' && <AlertCircle className="w-5 h-5" />}
          </div>
          <div className="text-left flex-1">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Backend Status</p>
            <p className="text-sm font-medium text-white truncate">{message}</p>
          </div>
          {status === 'success' && (
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-600 font-mono">{timestamp}</p>
            </div>
          )}
        </div>
      </section>

      {/* Workflow */}
      <WorkflowVisualizer />

      {/* Tech Stack */}
      <TechStack />

      {/* Documentation */}
      <DocumentationSection />

      {/* Footer */}
      <footer className="py-12 text-center border-t border-[var(--glass-border)]">
        <p className="text-sm text-gray-600">
          Designed & Built by Himan Manduja
        </p>
      </footer>
    </main>
  );
}
