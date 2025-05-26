import { PageHeader } from "@/components/layout"
import initTranslations from "@/localization/i18n"
import apiClient from "@/services/api"
import { PROFILE } from "@/services/api/queries"
import ProfileForm from "./profile-form"
import { getLanguageAndToken } from "@/services/api/getLanguageAndToken"

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
    title: t("meta_data.title_user"),
  }
}

export default async function UserProfile({ params }: { params: Promise<ParamsProps> }) {
  const { lang } = await params
  const { t } = await initTranslations(lang, ["privacy"])
  const { id } = await getLanguageAndToken()

  // Fetch terms of use data
  const userData = await apiClient<any>(PROFILE)
console.log("User data:", userData);

  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title={t("page_header.title_user")}
        subtitle={t("page_header.subtitle_user")}
      />
      <ProfileForm initialData={userData?.data || null} lang={lang} />
    </div>
  )
}
