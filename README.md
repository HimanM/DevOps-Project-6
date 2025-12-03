# DevOps Project 6: Learning EKS, Istio, Kiali, and ArgoCD

This project is a comprehensive hands-on exploration of **Amazon EKS**, **Istio Service Mesh**, **Kiali**, and **ArgoCD**. It demonstrates Infrastructure as Code (IaC) with Terraform, GitOps with ArgoCD, and advanced observability.

## 🚀 Project Overview

The goal is to master modern cloud-native technologies:
- **Infrastructure as Code**: Provisioning EKS and VPC with Terraform.
- **GitOps**: Managing application deployments using ArgoCD.
- **Service Mesh**: Traffic management and security with Istio.
- **Observability**: Visualizing the mesh with Kiali.

## 🌐 Live Demo

Check out the frontend deployment on GitHub Pages: **[Live Demo](https://devops6.himanmanduja.fun)**
> **Note:** This is a frontend-only deployment. The backend EKS cluster is not connected to this demo instance.

### Architecture
This project implements a modern **[Cloud Native](https://www.cncf.io/)** architecture:

- **Infrastructure**: [AWS EKS](https://aws.amazon.com/eks/) (v1.33) provisioned via [Terraform](https://www.terraform.io/).
- **GitOps**: [ArgoCD](https://argo-cd.readthedocs.io/) for continuous delivery and state synchronization.
- **Service Mesh**: [Istio](https://istio.io/) (v1.24.0) for traffic management, security, and observability.
- **Observability**: [Kiali](https://kiali.io/) for mesh visualization and [Prometheus](https://prometheus.io/) for metrics.

**Request Flow:**
`User` ➔ `AWS ALB` ➔ `Istio Ingress Gateway` ➔ `VirtualService` ➔ `Service` ➔ `Pod`


## 📂 Repository Structure

- `terraform/`: Infrastructure definitions.
- `manifests/`: Kubernetes YAMLs (Deployment, Service, Istio Gateway).
- `.github/workflows/`: CI/CD for Docker builds.
- `.docs/`: Project screenshots.

## 🛠️ Prerequisites

- AWS CLI, Terraform, Docker, kubectl, ArgoCD CLI.

## 📝 Setup & Deployment Guide

### 1. Infrastructure Provisioning (Terraform)

Initialize and apply the Terraform configuration to create the VPC and EKS cluster.

```bash
cd terraform
terraform init
terraform apply --auto-approve
```

**Terraform Output:**
![Terraform Apply Outputs](.docs/tf_apply_outputs.png)

**AWS Console - EKS Cluster:**
![EKS Cluster](.docs/eks_cluster.png)

**AWS Console - EC2 Nodes:**
![EC2 Instances](.docs/ec2_instances_of_eks_cluster.png)

**AWS Console - Networking:**
![EKS Networking](.docs/eks_cluster_networking.png)

**AWS Console - Security Groups:**
![Security Groups](.docs/sequiry_groups_for_project.png)

**AWS Console - Auto Scaling Groups:**
![Auto Scaling Groups](.docs/auto_scaling_groups.png)

### 2. CI/CD Pipeline

GitHub Actions automatically builds and pushes Docker images to the registry.
![CI CD](.docs/ci_cd_pipeline.png)
![GitHub Packages](.docs/github_packages_images.png)

### 3. GitOps with ArgoCD

We use ArgoCD for continuous delivery. First, the EKS cluster was added to the ArgoCD instance:

```bash
argocd cluster add arn:aws:eks:us-west-2:603630702351:cluster/learn-eks-sm-cluster
```

**ArgoCD Applications Overview:**
![ArgoCD Overview](.docs/argocd_application_overview.png)

**Application Details:**
![ArgoCD Details](.docs/argocd_application_details.png)

**Sync Status:**
![ArgoCD Sync Status](.docs/argocd_application_application_sync_status.png)

### 4. Application Access (Istio Ingress)

The application is exposed via an AWS Application Load Balancer (ALB) provisioned by the Istio Ingress Gateway.

**AWS Console - Load Balancer:**
![Load Balancer](.docs/load_balancer_for_Istio.png)

**AWS Console - Target Groups:**
![Target Groups](.docs/target_groups.png)

**Live Application:**
![Running Frontend](.docs/running_application_frontend.png)

### 5. Observability (Kiali)

Kiali visualizes the service mesh, showing traffic flow and health.

**Kiali Mesh Graph:**
![Kiali Mesh](.docs/kiali_mesh.png)

**Kiali Overview:**
![Kiali Overview](.docs/kiali_overview.png)

### 6. Istio Status
![Istio Status](.docs/istio.png)

### 7. Kubernetes Namespace and Deployments

```bash
kubectl get deploy -n learn-eks-sm
kubectl get svc -n learn-eks-sm
kubectl get pods -n learn-eks-sm
kubectl get all -n learn-eks-sm
```
**CLI Output:**
![CLI Output](.docs/namespace_details_cli.png)

## 🧹 Cleanup

```bash
cd terraform
terraform destroy --auto-approve
```

## 🔗 Technologies Used
- **[Amazon EKS](https://aws.amazon.com/eks/)** - Managed Kubernetes Service
- **[Istio](https://istio.io/)** - Service Mesh
- **[ArgoCD](https://argo-cd.readthedocs.io/)** - GitOps Continuous Delivery
- **[Terraform](https://www.terraform.io/)** - Infrastructure as Code
- **[Kiali](https://kiali.io/)** - Observability Console
- **[Next.js](https://nextjs.org/)** - Frontend Framework

