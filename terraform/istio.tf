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
  version    = "1.24.0" # Upgraded for better compatibility
  timeout    = 900
  wait       = true # Wait for CRDs to be established

  depends_on = [module.eks]
}

resource "helm_release" "istiod" {
  name       = "istiod"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "istiod"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.24.0" # Match base version
  timeout    = 900
  wait       = true

  depends_on = [helm_release.istio_base]
}

resource "helm_release" "istio_ingress" {
  name       = "istio-ingressgateway"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "gateway"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.24.0" # Match base version
  timeout    = 900
  wait       = true

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
  version    = "1.89.0" # Upgraded Kiali version
  timeout    = 900
  wait       = true

  set = [
    {
      name  = "auth.strategy"
      value = "anonymous"
    },
    {
      name  = "external_services.prometheus.url"
      value = "http://prometheus-server.prometheus.svc.cluster.local:9090"
    }
  ]

  depends_on = [helm_release.istiod]
}

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
  timeout    = 900
  wait       = true

  set = [
    {
      name  = "server.persistentVolume.enabled"
      value = "false"
    }
  ]

  depends_on = [module.eks]
}
