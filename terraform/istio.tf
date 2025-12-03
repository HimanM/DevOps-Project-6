# -----------------------------
# Namespaces
# -----------------------------
resource "kubernetes_namespace" "istio_system" {
  metadata {
    name = "istio-system"
  }
}

resource "kubernetes_namespace" "prometheus" {
  metadata {
    name = "prometheus"
  }
}

# -----------------------------
# Istio Base (includes CRDs)
# -----------------------------
resource "helm_release" "istio_base" {
  name       = "istio-base"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "base"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.24.0"
  timeout    = 1800
  wait       = true

  depends_on = [module.eks]
}

# -----------------------------
# Istiod
# -----------------------------
resource "helm_release" "istiod" {
  name       = "istiod"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "istiod"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.24.0"
  timeout    = 1800
  wait       = true

  depends_on = [helm_release.istio_base]
}

# -----------------------------
# Istio Ingress Gateway (Helm only)
# -----------------------------
resource "helm_release" "istio_ingress" {
  name       = "istio-ingressgateway"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "gateway"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.24.0"
  timeout    = 1800
  wait       = false # avoid Terraform hanging

  depends_on = [helm_release.istiod]

  values = [
    yamlencode({
      service = {
        type = "LoadBalancer"
        ports = [
          {
            name       = "http"
            port       = 80
            targetPort = 8080
          },
          {
            name       = "https"
            port       = 443
            targetPort = 8443
          }
        ]
      }
    })
  ]
}

# -----------------------------
# Data Source for Istio Ingress Service
# -----------------------------
data "kubernetes_service" "istio_ingress" {
  metadata {
    name      = "istio-ingressgateway"
    namespace = kubernetes_namespace.istio_system.metadata[0].name
  }

  depends_on = [helm_release.istio_ingress]
}

# -----------------------------
# Kiali
# -----------------------------
resource "helm_release" "kiali_server" {
  name       = "kiali-server"
  repository = "https://kiali.org/helm-charts"
  chart      = "kiali-server"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.89.0"
  timeout    = 900
  wait       = true

  set = [
    {
      name  = "auth.strategy"
      value = "anonymous"
    },
    {
      name  = "external_services.prometheus.url"
      value = "http://prometheus-server.prometheus.svc.cluster.local:80"
    }
  ]

  depends_on = [helm_release.istiod]
}

# -----------------------------
# Prometheus
# -----------------------------
resource "helm_release" "prometheus" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "prometheus"
  namespace  = kubernetes_namespace.prometheus.metadata[0].name
  timeout    = 900
  wait       = false # allow Helm to continue without blocking

  set = [
    {
      name  = "server.persistentVolume.enabled"
      value = "false"
    }
  ]

  depends_on = [module.eks]
}
