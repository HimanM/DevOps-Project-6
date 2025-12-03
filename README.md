# Cloud Native Infrastructure: EKS, Istio, and GitOps

A production-grade implementation of a Cloud Native architecture on AWS, demonstrating the power of Infrastructure as Code, GitOps, and Service Mesh technologies. This project orchestrates a microservices application using Amazon EKS, managed via Terraform, deployed with ArgoCD, and secured and observed by Istio and Kiali.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Live Demo](#live-demo)
3.  [System Architecture](#system-architecture)
4.  [Repository Structure](#repository-structure)
5.  [Deployment Workflow](#deployment-workflow)
    *   [Infrastructure Provisioning](#1-infrastructure-provisioning)
    *   [CI/CD Pipeline](#2-cicd-pipeline)
    *   [GitOps with ArgoCD](#3-gitops-with-argocd)
    *   [Traffic Management and Access](#4-traffic-management-and-access)
    *   [Observability](#5-observability)
    *   [Verification](#6-verification)
6.  [Technologies Used](#technologies-used)

## Project Overview

This initiative was designed to master and demonstrate the core pillars of modern DevOps:

*   **Infrastructure as Code (IaC)**: Automated provisioning of a VPC and EKS cluster using Terraform.
*   **GitOps Continuous Delivery**: Declarative application management and synchronization using ArgoCD.
*   **Service Mesh**: Advanced traffic management, security, and observability with Istio.
*   **Deep Observability**: Real-time mesh visualization and metrics using Kiali.

## Live Demo

Explore the frontend interface deployed on GitHub Pages:
**[Live Demo](https://devops6.himanmanduja.fun)**

> **Note:** This is a frontend-only deployment for demonstration purposes. The backend EKS cluster is not connected to this specific instance.

## System Architecture

The architecture follows industry best practices for scalability, security, and automation.

### Request Flow
1.  **User Request**: Traffic enters via an AWS Application Load Balancer (ALB).
2.  **Ingress Gateway**: The ALB forwards traffic to the Istio Ingress Gateway.
3.  **Traffic Routing**: Istio VirtualServices route requests to the appropriate Kubernetes Services.
4.  **Service Mesh**: Sidecar proxies (Envoy) intercept traffic between microservices, enforcing policies and collecting telemetry.
5.  **Pod Execution**: The request reaches the application Pods running on EKS worker nodes.

## Repository Structure

*   `terraform/`: Infrastructure definitions (VPC, EKS, IAM, Security Groups).
*   `manifests/`: Kubernetes manifests (Deployments, Services, Istio Gateways) managed by ArgoCD.
*   `.github/workflows/`: CI/CD pipelines for building and pushing Docker images.
*   `.docs/`: Documentation assets and screenshots.

## Deployment Workflow

### 1. Infrastructure Provisioning
We utilize Terraform to spin up the entire AWS infrastructure, ensuring a reproducible environment.

**Terraform Output:**
![Terraform Apply Outputs](.docs/tf_apply_outputs.png)

**EKS Cluster Status:**
![EKS Cluster](.docs/eks_cluster.png)

**EC2 Worker Nodes:**
![EC2 Instances](.docs/ec2_instances_of_eks_cluster.png)

**Cluster Networking:**
![EKS Networking](.docs/eks_cluster_networking.png)

**Security Groups:**
![Security Groups](.docs/sequiry_groups_for_project.png)

**Auto Scaling Groups:**
![Auto Scaling Groups](.docs/auto_scaling_groups.png)

### 2. CI/CD Pipeline
GitHub Actions handles the Continuous Integration. Upon code push, Docker images are built and pushed to the registry.

**Pipeline Execution:**
![CI CD Pipeline](.docs/ci_cd_pipeline.png)

**Container Registry:**
![GitHub Packages](.docs/github_packages_images.png)

### 3. GitOps with ArgoCD
Used ArgoCD for continuous delivery. First, the EKS cluster was added to the ArgoCD instance:

```bash
argocd cluster add arn:aws:eks:us-west-2:603630702351:cluster/learn-eks-sm-cluster
```

ArgoCD monitors the manifests directory. When the CI pipeline updates the manifests, ArgoCD detects the drift and syncs the changes to the EKS cluster.

**Application Overview:**
![ArgoCD Overview](.docs/argocd_application_overview.png)

**Application Details:**
![ArgoCD Details](.docs/argocd_application_details.png)

**Sync Status:**
![ArgoCD Sync Status](.docs/argocd_application_application_sync_status.png)

### 4. Traffic Management and Access
The application is exposed securely via Istio Ingress Gateway and AWS ALB.

**Load Balancer Configuration:**
![Load Balancer](.docs/load_balancer_for_Istio.png)

**Target Groups:**
![Target Groups](.docs/target_groups.png)

**Istio Status:**
![Istio Status](.docs/istio.png)

**Live Application:**
![Running Frontend](.docs/running_application_frontend.png)

### 5. Observability
Kiali provides a powerful dashboard to visualize the service mesh topology and health.

**Mesh Graph:**
![Kiali Mesh](.docs/kiali_mesh.png)

**Service Overview:**
![Kiali Overview](.docs/kiali_overview.png)

### 6. Verification
Verifying the deployment via Kubernetes CLI.

**Namespace and Resource Details:**
![CLI Output](.docs/namespace_details_cli.png)

## Technologies Used

*   **Amazon EKS**: Managed Kubernetes Service
*   **Istio**: Service Mesh
*   **ArgoCD**: GitOps Continuous Delivery
*   **Terraform**: Infrastructure as Code
*   **Kiali**: Observability Console
*   **Next.js**: Frontend Framework
