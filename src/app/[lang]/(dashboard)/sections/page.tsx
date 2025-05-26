import { PageHeader } from "@/components/layout"
import initTranslations from "@/localization/i18n"
import SectionsManagementForm from "./sections-management-form"
import { notFound } from "next/navigation"
import apiClient from "@/services/api"
import { PAGES, SECTIONS } from "@/services/api/queries"
import PrivacyForm from "@/components/form/PrivacyForm"
export const dynamic = "force-dynamic"
// This forces a new request when search params change
export const fetchCache = "force-no-store"
// This disables static optimization for this route
export const revalidate = 0

type ParamsProps = { lang: string }
type SearchParamsProps = { page_slug?: string; type?: string }

export async function generateMetadata({
  params,
  searchParams,
}: { params: Promise<ParamsProps>; searchParams: Promise<SearchParamsProps> }) {
  const { lang } = await params
  const { t } = await initTranslations(lang, ["sections"])
  const { page_slug } = await searchParams

  // Translate the page slug if it exists
  const translatedPageSlug = page_slug ? t(`page_slugs.${page_slug}`, { defaultValue: page_slug }) : ""

  return {
    title: t("meta_data.title") + (page_slug ? ` - ${translatedPageSlug}` : ""),
  }
}

export default async function SectionsManagement({
  params,
  searchParams,
}: { params: Promise<ParamsProps>; searchParams: Promise<SearchParamsProps> }) {
  const { lang } = await params
  const { t } = await initTranslations(lang, ["sections"])

  const { page_slug, type } = await searchParams
  const allSections = await apiClient<any[]>(SECTIONS, {
    query: {
      all: "true",
      page_slug: page_slug || "",
      type: type || "",
    },
  })



  // Filter sections based on URL parameters
  let filteredSections = [...allSections?.data]

  if (page_slug) {
    filteredSections = filteredSections.filter((section) => section.page.page_slug === page_slug)
  }

  if (type) {
    filteredSections = filteredSections.filter((section) => section.page.type === type)
  }

  // If no sections found after filtering, show 404
  if (filteredSections.length === 0) {
    notFound()
  }

  // Get page info from the first section
  const pageInfo = filteredSections[0]?.page
console.log(pageInfo,"Page Info");

  // Translate page slug and type
  const translatedPageSlug = pageInfo ? t(`page_slugs.${pageInfo.page_slug}`, { defaultValue: pageInfo.page_slug }) : ""
  const translatedPageType = pageInfo ? t(`page_types.${pageInfo.type}`, { defaultValue: pageInfo.type }) : ""

  const privacyData = await apiClient<any>(PAGES, {
    params: { id:pageInfo.id },
  })
  console.log(privacyData);
  
  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title={t("page_header.title")}
        subtitle={
          pageInfo
            ? `${translatedPageSlug} - ${translatedPageType} ${t("page_header.subtitle")}`
            : t("page_header.subtitle")
        }
      />
      <PrivacyForm key={pageInfo.id} initialData={privacyData?.data || null} lang={lang} />
      
      <SectionsManagementForm
        key={page_slug}
        initialData={filteredSections}
        lang={lang}
        pageSlug={page_slug}
        pageType={type}
      />
    </div>
  )
}
