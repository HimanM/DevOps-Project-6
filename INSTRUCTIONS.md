# Deployment Instructions

This guide details how to deploy the sample Frontend (Next.js) and Backend (Node.js) applications to Amazon EKS using Terraform and Istio.

## Prerequisites

Ensure you have the following installed:
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) (configured with `aws configure`)
- [Terraform](https://developer.hashicorp.com/terraform/downloads)
- [Docker](https://docs.docker.com/get-docker/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

## 1. Build and Push Docker Images

You need to push your Docker images to a registry (like Amazon ECR) so EKS can pull them.

### Create ECR Repositories (One-time setup)
```bash
aws ecr create-repository --repository-name frontend
aws ecr create-repository --repository-name backend
```

### Build and Push
Replace `<AWS_ACCOUNT_ID>` and `<REGION>` with your details.

```bash
# Login to ECR
aws ecr get-login-password --region <REGION> | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com

# Build Frontend
docker build -t frontend ./frontend
docker tag frontend:latest <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/frontend:latest
docker push <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/frontend:latest

# Build Backend
docker build -t backend ./backend
docker tag backend:latest <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/backend:latest
docker push <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/backend:latest
```

> **Important**: Update the `image` field in `manifests/frontend-deployment.yaml` and `manifests/backend-deployment.yaml` with your ECR image URIs.

## 2. Provision Infrastructure with Terraform

This will set up the VPC, EKS Cluster, and install Istio & Kiali.

```bash
cd terraform
terraform init
terraform apply
# Type 'yes' when prompted
```

*Note: This process takes approximately 15-20 minutes.*

## 3. Configure kubectl

After Terraform completes, configure `kubectl` to interact with your new cluster.

```bash
aws eks update-kubeconfig --region <REGION> --name learn-eks-sm-cluster
```

## 4. Deploy Applications

Deploy the Kubernetes manifests.

```bash
cd ../ # Go back to root
kubectl apply -f manifests/namespace.yaml
kubectl apply -f manifests/
```

## 5. Access the Application

Get the Load Balancer URL created by the Istio Ingress Gateway.

```bash
kubectl get svc -n istio-system istio-ingressgateway
```

Look for the `EXTERNAL-IP`. Open that URL in your browser. You should see the Frontend app fetching data from the Backend.

## 6. Access Kiali Dashboard

To visualize the mesh:

```bash
# Port forward Kiali
kubectl port-forward svc/kiali-server -n istio-system 20001:20001
```

Open `http://localhost:20001` in your browser.

## 7. Cleanup

To destroy the infrastructure and avoid costs:

```bash
cd terraform
terraform destroy
```
