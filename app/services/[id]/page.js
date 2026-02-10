import ServiceDetailPageClient from "./ServiceDetailPageClient"

export async function generateMetadata({ params }) {
  return {
    title: `Service Details - SevaKart`,
    description: "View detailed information about this service",
  }
}

export default function ServiceDetailPage({ params }) {
  return <ServiceDetailPageClient params={params} />
}
