import { PageHeader } from "@/components/layout"
import initTranslations from "@/localization/i18n"
import TermsOfUseForm from "./terms-of-use-form"
import apiClient from "@/services/api"
// import { PAGES } from "@/services/api/queries"

export const dynamic = "force-dynamic"
// This forces a new request when search params change
export const fetchCache = "force-no-store"
// This disables static optimization for this route
export const revalidate = 0

type ParamsProps = { lang: string }

export async function generateMetadata({ params }: { params: Promise<ParamsProps> }) {
  const { lang } = await params
  const { t } = await initTranslations(lang, ["terms"])

  return {
    title: t("meta_data.title", { defaultValue: "Terms of Use Management" }),
  }
}

export default async function TermsOfUseManagement({ params }: { params: Promise<ParamsProps> }) {
  const { lang } = await params
  const { t } = await initTranslations(lang, ["terms"])

  // Fetch terms of use data
  // const termsData = await apiClient<any>(PAGES, {
  //   params: { id:11 },
  // })

  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title={t("page_header.title", { defaultValue: "Terms of Use Management" })}
        subtitle={t("page_header.subtitle", { defaultValue: "Manage website terms of use content" })}
      />
      <TermsOfUseForm initialData={ null} lang={lang} />
    </div>
  )
}
