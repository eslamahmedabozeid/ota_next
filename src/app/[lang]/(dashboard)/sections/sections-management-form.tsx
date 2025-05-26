"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import SectionForm from "./section-form"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { log } from "console"
import apiClient from "@/services/api"
import { SECTIONS_DELETE } from "@/services/api/queries"
import { toast } from "sonner"

interface Section {
  id: number
  slug: string
  page_id: number
  parent_id: number | null
  order_number: number
  title: string | null
  sub_title: string | null
  details: string | null
  image: string | null
  active: boolean
  created_at: string
  updated_at: string
  page: {
    id: number
    page_slug: string
    type: string
    active: boolean
    created_at: string
    updated_at: string
  }
  parent: any | null
  translations?: Array<{
    id: number
    locale: string
    title?: string
    sub_title?: string
    details?: string
  }>
}

interface SectionsManagementFormProps {
  initialData: Section[]
  lang: string
  pageSlug?: string
  pageType?: string
}

export default function SectionsManagementForm({ initialData, lang, pageSlug, pageType }: SectionsManagementFormProps) {
  const { t, i18n } = useTranslation("sections")
  const [sections, setSections] = useState<Section[]>(initialData)
  const [activeTab, setActiveTab] = useState<string>(initialData[0]?.id.toString() || "1")

  // Check if the current language is RTL
  const isRTL = lang === "ar"

  // Group sections by parent_id
  const parentSections = sections.filter((section) => section.parent_id === null)
  const childSectionsByParentId: Record<number, Section[]> = {}

  sections.forEach((section) => {
    if (section.parent_id) {
      if (!childSectionsByParentId[section.parent_id]) {
        childSectionsByParentId[section.parent_id] = []
      }
      childSectionsByParentId[section.parent_id].push(section)
    }
  })

console.log(parentSections);

  // Translate page slug and type
  const translatedPageSlug = pageSlug ? t(`page_slugs.${pageSlug}`, { defaultValue: pageSlug }) : ""
  const translatedPageType = pageType ? t(`page_types.${pageType}`, { defaultValue: pageType }) : ""

  // Use the appropriate arrow icon based on direction
  const BackArrow = isRTL ? ArrowRight : ArrowLeft

  // Generate a temporary ID for new sections
const generateTempId = () => `temp_${Date.now()}`

// Add new sub-section
const handleAddChildSection = (parentId: number) => {
  const newSection: Section = {
    id: 0,
    slug: `section_${generateTempId()}`,
    page_id: parentSections.find((p) => p.id === parentId)?.page_id || 0,
    parent_id: parentId,
    order_number: (childSectionsByParentId[parentId]?.length || 0) + 1,
    title: null,
    sub_title: null,
    details: null,
    image: "uploads/users/images/blacholder_1745310471.webp",
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    page: parentSections.find((p) => p.id === parentId)!.page,
    parent: parentSections.find((p) => p.id === parentId)!,
    translations: parentSections.find((p) => p.id === parentId)?.slug === "admin-team-business" 
      ? [
          {
            id: 113,
            locale: "en",
            title: " ",
            sub_title: " ",
            details: " "
          },
          {
            id: 114,
            locale: "ar",
            title: " ",
            sub_title: " ",
            details: " "
          }
        ]
      : [],  // For other sections, translations will be empty (or `null`)
  };

  // Update childSectionsByParentId
  setSections((prevSections) => [...prevSections, newSection]);
};


// Delete section (support soft delete or API call)
const handleDeleteSection = async (id: number | string) => {
  try {
    // Call the API to delete the section
    const response = await apiClient(SECTIONS_DELETE, {
      params: { id }, // Pass the section id to delete
    });

    // If the API request is successful, update the state to remove the deleted section
    if (response && response.data) {
      // Update the sections state by filtering out the deleted section
      setSections((prevSections: any) => prevSections.filter((section: any) => section.id !== id));

      // Optionally, show a success message
      toast.success("Section deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting section:", error);
    toast.error("Failed to delete section");
  }
};


  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">

        {(pageSlug || pageType) && (
          <div className="text-sm text-muted-foreground">
            {pageSlug && <span className="font-medium mr-1">{t("form.page")}:</span>}
            {pageSlug && <span className="mr-4">{translatedPageSlug}</span>}
            {pageType && <span className="font-medium mr-1">{t("form.type")}:</span>}
            {pageType && <span>{translatedPageType}</span>}
          </div>
        )}
      </div>

      <Card className="mt-2">
        <CardContent className="p-6 w-full h-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="my-6 w-full flex h-auto flex-wrap">
              {parentSections.map((section) => (
                <TabsTrigger key={section.id} value={section.id.toString()} className="flex-1 py-2">
                  {section?.translations?.find((t) => t.locale === lang)?.title || section.slug}
                </TabsTrigger>
              ))}
            </TabsList>

            {parentSections.map((parentSection) => (
              <TabsContent key={parentSection.id} value={parentSection.id.toString()}>
                <div className="space-y-8">
                  {/* Parent Section Form */}
                  <div className="border p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">{t("form.main_section")}</h3>
                    <SectionForm setSections={setSections}  section={parentSection}  lang={lang} />
                  </div>

                  {/* Child Sections */}
                  {childSectionsByParentId[parentSection.id]?.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">{t("form.sub_sections")}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {childSectionsByParentId[parentSection.id]
                          .sort((a, b) => a.order_number - b.order_number)
                          .map((childSection) => (
                            <div key={childSection.id} className="border p-4 rounded-lg">
                              <h4 className="text-md font-medium mb-4">
                                {childSection?.translations?.find((t) => t.locale === lang)?.title ||
                                  `${t("form.sub_section")} ${childSection.order_number}`}
                              </h4>
                              <SectionForm setSections={setSections}  section={childSection}  lang={lang} />
                              {parentSection?.slug=="our_accreditations"||parentSection?.slug=="partners-42"
||parentSection?.slug=="admin-team-business"||parentSection?.slug=="our_accreditations_business"?( 
 <div className="flex justify-center mt-4">
                              <Button onClick={() => handleDeleteSection(childSection.id)} variant="soft">
                                 {t("form.Delete")}
                                </Button>
                              </div>):""}
                            </div>
                          ))}
                          {parentSection?.slug=="our_accreditations"||parentSection?.slug=="partners-42"
||parentSection?.slug=="admin-team-business"||parentSection?.slug=="our_accreditations_business"
?( 
                            <div className="flex justify-center mt-4">
                          <Button onClick={() => handleAddChildSection(parentSection.id)} variant="outline">
                            {t("form.add_sub_section")}
                          </Button>

                            </div>
                          ):""
                          }
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
