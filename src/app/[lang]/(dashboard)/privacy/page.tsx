import { PageHeader } from "@/components/layout"
import initTranslations from "@/localization/i18n"
import apiClient from "@/services/api"
import { PAGES } from "@/services/api/queries"
import PrivacyForm from "./privacy-form"

export const dynamic = "force-dynamic"
// This forces a new request when search params change
export const fetchCache = "force-no-store"
// This disables static optimization for this route
export const revalidate = 0

type ParamsProps = { lang: string }

export async function generateMetadata({ params }: { params: Promise<ParamsProps> }) {
  const { lang } = await params
  const { t } = await initTranslations(lang, ["privacy"])

  return {
    title: t("meta_data.title"),
  }
}

export default async function Privacy({ params }: { params: Promise<ParamsProps> }) {
  const { lang } = await params
  const { t } = await initTranslations(lang, ["privacy"])

  // Fetch terms of use data
  const privacyData = await apiClient<any>(PAGES, {
    params: { id:10 },
  })

  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title={t("page_header.title")}
        subtitle={t("page_header.subtitle")}
      />
      <PrivacyForm initialData={privacyData?.data || null} lang={lang} />
    </div>
  )
}
