# -----------------------------
# Outputs
# -----------------------------
output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security group ids attached to the cluster control plane"
  value       = module.eks.cluster_security_group_id
}

output "region" {
  description = "AWS region"
  value       = var.region
}

output "cluster_name" {
  description = "Kubernetes Cluster Name"
  value       = module.eks.cluster_name
}

output "configure_kubectl" {
  description = "Command to configure kubectl"
  value       = "aws eks update-kubeconfig --region ${var.region} --name ${module.eks.cluster_name}"
}

output "istio_ingress_lb_hostname" {
  description = "The external hostname or IP of the Istio ingress gateway LoadBalancer"
  value       = data.kubernetes_service.istio_ingress.status[0].load_balancer[0].ingress[0].hostname
}

output "istio_ingress_lb_ip" {
  description = "The external IP of the Istio ingress gateway LoadBalancer (if available)"
  value       = data.kubernetes_service.istio_ingress.status[0].load_balancer[0].ingress[0].ip
}
