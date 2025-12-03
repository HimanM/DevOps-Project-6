resource "kubernetes_namespace" "istio_system" {
  metadata {
    name = "istio-system"
  }
}

resource "helm_release" "istio_base" {
  name       = "istio-base"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "base"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.20.0"

  depends_on = [module.eks]
}

resource "helm_release" "istiod" {
  name       = "istiod"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "istiod"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.20.0"

  depends_on = [helm_release.istio_base]
}

resource "helm_release" "istio_ingress" {
  name       = "istio-ingressgateway"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "gateway"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.20.0"

  set = [
    {
      name  = "service.type"
      value = "LoadBalancer"
    }
  ]

  depends_on = [helm_release.istiod]
}

resource "helm_release" "kiali_server" {
  name       = "kiali-server"
  repository = "https://kiali.org/helm-charts"
  chart      = "kiali-server"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.78.0" # Check for latest version compatible with Istio

  set = [
    {
      name  = "auth.strategy"
      value = "anonymous" # For learning/demo purposes
    },
    {
      name  = "external_services.prometheus.url"
      value = "http://prometheus-server.prometheus.svc.cluster.local:9090"
    }
  ]

  depends_on = [helm_release.istiod]
}

# Note: Kiali usually requires Prometheus. 
# Adding Prometheus installation for completeness if Kiali is needed.
resource "kubernetes_namespace" "prometheus" {
  metadata {
    name = "prometheus"
  }
}

resource "helm_release" "prometheus" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "prometheus"
  namespace  = kubernetes_namespace.prometheus.metadata[0].name

  set = [
    {
      name  = "server.persistentVolume.enabled"
      value = "false"
    }
  ]

  depends_on = [module.eks]
}
