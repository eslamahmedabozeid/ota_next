"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, Save } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TextEditor } from "@/components/form"
import { toast } from "sonner"
import apiClient from "@/services/api"
import { PAGES_UPDATE } from "@/services/api/queries"

// Types
type TermsOfUseFormValues = {
  page_slug: string
  type: string
  title: { en: string; ar: string }
  sub_title?: { en?: string; ar?: string }
  details?: { en?: string; ar?: string }
  active: boolean
}

interface TermsOfUseFormProps {
  initialData: {
    id: number
    page_slug: string
    type: string
    active: boolean
    translations: Array<{
      id: number
      locale: string
      title: string
      sub_title: string
      details: string
    }>
  } | null
  lang: string
}

export default function PrivacyForm({ initialData, lang }: TermsOfUseFormProps) {
  const { t } = useTranslation("privacy")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeLocaleTab, setActiveLocaleTab] = useState(lang)

  const isRTL = lang === "ar"

  // Determine which fields are available based on initialData
  const fieldVisibility = {
    sub_title: {
      en: !!initialData?.translations?.find((t) => t.locale === "en")?.sub_title,
      ar: !!initialData?.translations?.find((t) => t.locale === "ar")?.sub_title,
    },
    details: {
      en: !!initialData?.translations?.find((t) => t.locale === "en")?.details,
      ar: !!initialData?.translations?.find((t) => t.locale === "ar")?.details,
    },
  }

  // Build schema dynamically
  const baseSchema: any = {
    page_slug: z.string().min(1, "Page slug is required"),
    type: z.string().min(1, "Page type is required"),
    title: z.object({
      en: z.string().min(1, "English title is required"),
      ar: z.string().min(1, "Arabic title is required"),
    }),
    active: z.boolean(),
  }

  if (fieldVisibility.sub_title.en || fieldVisibility.sub_title.ar) {
    baseSchema.sub_title = z.object({
      ...(fieldVisibility.sub_title.en ? { en: z.string().min(1, "English subtitle is required") } : {}),
      ...(fieldVisibility.sub_title.ar ? { ar: z.string().min(1, "Arabic subtitle is required") } : {}),
    })
  }

  if (fieldVisibility.details.en || fieldVisibility.details.ar) {
    baseSchema.details = z.object({
      ...(fieldVisibility.details.en ? { en: z.string().min(1, "English details are required") } : {}),
      ...(fieldVisibility.details.ar ? { ar: z.string().min(1, "Arabic details are required") } : {}),
    })
  }
// @ts-ignore
const termsOfUseSchema: z.ZodType<TermsOfUseFormValues> = z.object(baseSchema)

  const defaultValues: TermsOfUseFormValues = {
    page_slug: initialData?.page_slug || "",
    type: initialData?.type || "",
    title: {
      en: initialData?.translations?.find((t) => t.locale === "en")?.title || "",
      ar: initialData?.translations?.find((t) => t.locale === "ar")?.title || "",
    },
    sub_title: {
      ...(fieldVisibility.sub_title.en && {
        en: initialData?.translations?.find((t) => t.locale === "en")?.sub_title || "",
      }),
      ...(fieldVisibility.sub_title.ar && {
        ar: initialData?.translations?.find((t) => t.locale === "ar")?.sub_title || "",
      }),
    },
    details: {
      ...(fieldVisibility.details.en && {
        en: initialData?.translations?.find((t) => t.locale === "en")?.details || "",
      }),
      ...(fieldVisibility.details.ar && {
        ar: initialData?.translations?.find((t) => t.locale === "ar")?.details || "",
      }),
    },
    active: initialData?.active ?? true,
  }

  const form = useForm<TermsOfUseFormValues>({
    resolver: zodResolver(termsOfUseSchema),
    defaultValues,
  })

  const onSubmit = async (formData: TermsOfUseFormValues) => {
    setIsSubmitting(true)
    console.log("Form data:", formData)

    try {
      const response = await apiClient(PAGES_UPDATE, {
        params: { id: initialData?.id || "" },
        body: { ...formData },
      })

      if (response.status) {
        toast.success(t("form.update_success"))
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error("Error updating terms of use:", error)
      toast.error(t("form.error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <Tabs value={activeLocaleTab} onValueChange={setActiveLocaleTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
              </TabsList>

              {["en", "ar"].map((locale) => (
                <TabsContent key={locale} value={locale} className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`title.${locale}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("form.title", { defaultValue: "Title" })} (
                          {locale === "en" ? "English" : "العربية"})
                        </FormLabel>
                        <FormControl>
                          <Input {...field} dir={locale === "ar" ? "rtl" : "ltr"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {
                  // @ts-ignore
                  fieldVisibility.sub_title[locale] && (
                    <FormField
                      control={form.control}
                      name={`sub_title.${locale}` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("form.sub_title", { defaultValue: "Subtitle" })} (
                            {locale === "en" ? "English" : "العربية"})
                          </FormLabel>
                          <FormControl>
                            <Input {...field} dir={locale === "ar" ? "rtl" : "ltr"} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {
                  // @ts-ignore
                  fieldVisibility.details[locale] && (
                    <TextEditor
                      name={`details.${locale}` as any}
                      label={t("form.details", { defaultValue: "Details" })}
                      placeholder={t("form.details")}
                    />
                  )}
                </TabsContent>
              ))}
            </Tabs>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("form.saving", { defaultValue: "Saving..." })}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t("form.save_changes", { defaultValue: "Save Changes" })}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
