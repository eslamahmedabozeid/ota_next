"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import DragDropArea from "@/components/form/DragDropArea/DragDropArea"
import apiClient from "@/services/api"
import { SECTIONS_CREATE, SECTIONS_UPDATE } from "@/services/api/queries"
import { useTranslation } from "react-i18next"

// Define the schema for section form with conditional validation
const createSectionFormSchema = (initialData: any, t: any) => {
  return z.object({
    title: z.record(
      z.string(),
      initialData.hasTitle ? z.string().min(1, t("validation.title_required")) : z.string().optional(),
    ),
    sub_title: z.record(
      z.string(),
      initialData.hasSubTitle ? z.string().min(1, t("validation.subtitle_required")) : z.string().optional(),
    ),
    details: z.record(
      z.string(),
      initialData.hasDetails ? z.string().min(1, t("validation.details_required")) : z.string().optional(),
    ),
    active: z.boolean(),
    image: initialData.hasImage ? z.string().min(1, t("validation.image_required")) : z.string().optional(),
    order_number: z.union([z.string(), z.number()]).refine(value => {
      // Check if it's a valid number
      if (typeof value === 'string') {
        return !isNaN(Number(value)); // If it's a string, it should be convertible to a number
      }
      return true; // If it's already a number, it's valid
    }, {
      message: t("validation.invalid_order_number"),
    }),
    })
}

interface RequestBody {
  page_slug: string;
  type: string;
  page_id: number;
  order_number: string | number;
  title: Record<string, string | undefined>;
  sub_title: Record<string, string | undefined>;
  details: Record<string, string | undefined>;
  active: boolean;
  image: string | undefined;
  slug?: string; // Add the slug property to the type
  parent_id?: any; // Add the slug property to the type
}
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

interface SectionFormProps {
  section: Section
  lang: string
  setSections: React.Dispatch<React.SetStateAction<Section[]>>; // Pass setSections function
}

export default function SectionForm({ section, lang,setSections }: SectionFormProps) {
  const { t } = useTranslation("sections")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeLocaleTab, setActiveLocaleTab] = useState(lang)
  const [isCreated, setIsCreated] = useState(false)  // Track if the section has been created

  // Check if the current language is RTL
  const isRTL = lang === "ar"

  // Get available locales from translations
  const availableLocales = Array.from(new Set(section.translations?.map((t) => t.locale)))

  // Determine which fields have values
  const hasImage = !!section.image
  const hasTitle = section?.translations?.some((t) => !!t.title)
  const hasSubTitle = section.translations?.some((t) => !!t.sub_title)
  const hasDetails = section.translations?.some((t) => !!t.details)

  
  // Prepare default values from section data
  const defaultValues: {
    title: Record<string, string>
    sub_title: Record<string, string>
    details: Record<string, string>
    active: boolean
    image: string
    order_number: number
  } = {
    title: {},
    sub_title: {},
    details: {},
    active: section.active,
    image: section.image || "",
    order_number: section.order_number || 0,
  }

  // Populate translations
  section.translations?.forEach((translation) => {
    if (translation.title) {
      defaultValues.title[translation.locale] = translation.title
    }
    if (translation.sub_title) {
      defaultValues.sub_title[translation.locale] = translation.sub_title
    }
    if (translation.details) {
      defaultValues.details[translation.locale] = translation.details
    }
  })

  // Create schema with conditional validation based on initial data
  const sectionFormSchema = createSectionFormSchema(
    {
      hasImage,
      hasTitle,
      hasSubTitle,
      hasDetails,
    },
    t,
  )

  type SectionFormValues = z.infer<typeof sectionFormSchema>

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: defaultValues as any,
  })

  const onSubmit = async (data: SectionFormValues) => {
    setIsSubmitting(true)
  
    // Prepare the request body
    const requestBody: RequestBody = {
      page_slug: section.page.page_slug,
      type: section.page.type,
      page_id: section.page_id,
      title: data.title,
      sub_title: data.sub_title,
      details: data.details,
      active: data.active,
      image: data.image,
      order_number: data.order_number,  // Include order_number
    }
  
    // Add slug and parent_id only if creating a new section
    if (!section.id && !isCreated) {
      const slug = `temp_${Date.now()}`
      requestBody.slug = slug  // Add slug for new section
      requestBody.parent_id = section.parent_id || null  // Ensure parent_id is passed
    }
  
    let response:any;
    
    try {
      // If section.id exists, update existing section, else create a new section
      if (section.id) {
        // Update existing section
        response = await apiClient(SECTIONS_UPDATE, {
          body: requestBody,
          params: { id: section.id },
        })
      } else if (!isCreated) {
        // Create new section if not created already
        response = await apiClient(SECTIONS_CREATE, {
          body: requestBody,
        })
        console.log("Request Body:", response);

        setIsCreated(true);  // Mark as created so it doesn't get created again
        setSections((prevSections: any) => 
          prevSections.map((section: any) => 
            section.id === 0 ? { ...section, ...data, id: response.data.id } : section
          )
        )
      }
  
      // Handle response based on create or update
      if (response && response.data) {
        toast.success(t(section.id ? "form.update_success" : "form.create_success"))
      }
    } catch (error) {
      console.error("Error processing section:", error)
      toast.error(t("form.error"))
    } finally {
      setIsSubmitting(false)
    }
  }
  
  
  
  

  // Watch for changes in the image field to update validation
  const watchImage = form.watch("image")

  useEffect(() => {
    const hasImageNow = !!watchImage
    if (hasImageNow !== hasImage) {
      // Re-create the schema with updated conditions
      const newSchema = createSectionFormSchema(
        {
          hasImage: hasImageNow,
          hasTitle,
          hasSubTitle,
          hasDetails,
        },
        t,
      )

      // This is a workaround since we can't directly update the resolver
      form.clearErrors("image")
    }
  }, [watchImage, hasImage, hasTitle, hasSubTitle, hasDetails, form, t])

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
        {/* Image Upload - Only show if it has a value or we're adding a new one */}
        {(hasImage || form.watch("image")) && (
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("form.image")} {hasImage && <span className="text-destructive">*</span>}
                </FormLabel>
                <FormControl>
                  <DragDropArea
                    name="image"
                    className="mb-4"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    required={hasImage}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Language Tabs for Translations */}
        <Tabs value={activeLocaleTab} onValueChange={setActiveLocaleTab}>
          <TabsList className="mb-4">
            {availableLocales.map((locale) => (
              <TabsTrigger key={locale} value={locale}>
                {locale.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          {availableLocales.map((locale) => (
            <TabsContent key={locale} value={locale} className="space-y-4">
              {/* Title - Only show if it has a value in any language */}
              {(hasTitle || Object.values(form.watch("title")).some(Boolean)) && (
                <FormField
                  control={form.control}
                  name={`title.${locale}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("form.title")} ({locale}) {hasTitle && <span className="text-destructive">*</span>}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} dir={locale === "ar" ? "rtl" : "ltr"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Sub Title - Only show if it has a value in any language */}
              {(hasSubTitle || Object.values(form.watch("sub_title")).some(Boolean)) && (
                <FormField
                  control={form.control}
                  name={`sub_title.${locale}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("form.subtitle")} ({locale}) {hasSubTitle && <span className="text-destructive">*</span>}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} dir={locale === "ar" ? "rtl" : "ltr"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Details - Only show if it has a value in any language */}
              {(hasDetails || Object.values(form.watch("details")).some(Boolean)) && (
                <FormField
                  control={form.control}
                  name={`details.${locale}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("form.details")} ({locale}) {hasDetails && <span className="text-destructive">*</span>}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value || ""}
                          className="min-h-[120px]"
                          dir={locale === "ar" ? "rtl" : "ltr"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Active Status */}
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>{t("form.active")}</FormLabel>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
<FormField
  control={form.control}
  name="order_number"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t("form.order_number")}</FormLabel>
      <FormControl>
        <Input {...field} type="number" value={field.value || ""} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("form.saving")}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {t("form.save_changes")}
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
