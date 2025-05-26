"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Save, Loader2 } from "lucide-react"
import apiClient from "@/services/api"
import { toast } from "sonner"
import { USERS_UPDATE } from "@/services/api/queries"
import { useTranslation } from "react-i18next"


interface UserProfileFormProps {
  initialData: {
    id: number
    name: string
    email: string
    phone: string
    active: boolean
    verified: boolean
  }
  lang: string
}

export default function ProfileForm({ initialData, lang }: UserProfileFormProps) {
  const { t } = useTranslation("privacy")

  const userProfileSchema = z
  .object({
    name: z.string().min(1, t("validations.name.required")),
    email: z.string().email(t("validations.email.pattern")),
    phone: z.string().min(1, t("validations.phone.required")),
    active: z.boolean(),
    verified: z.boolean(),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
  }).refine(
    (data) => !data.password || data.password === data.password_confirmation,
    {
      path: ["password_confirmation"],
      message: t("validations.password_confirmation.match"),
    }
  );

  type UserProfileFormValues = z.infer<typeof userProfileSchema>


  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
      phone: initialData.phone,
      active: initialData.active,
      verified: initialData.verified,
    },
  })

  const onSubmit = async (formData: UserProfileFormValues) => {
    setIsSubmitting(true)
console.log("Form data:", formData);

try {
  // Call server action to update page
  const response = await apiClient(USERS_UPDATE, {
    params: { id: initialData?.id ||""},
    body: {
      ...formData
    },
  })

  if (response.status) {
    toast.success(t("form.update_success", { defaultValue: "profile of user updated successfully" }))
  } else {
    throw new Error(response.message)
  }
} catch (error) {
  console.error("Error updating terms of use:", error)
  toast.error(t("form.error", { defaultValue: "Failed to update profile of user" }))
} finally {
  setIsSubmitting(false)
}
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.name", { defaultValue: "Name" })}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.email", { defaultValue: "Email" })}</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.phone", { defaultValue: "Phone" })}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t("form.password", { defaultValue: "Password" })}</FormLabel>
      <FormControl>
        <Input type="password" placeholder="Password" autoComplete="new-password" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="password_confirmation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        {t("form.password_confirmation", {
          defaultValue: "Confirm Password",
        })}
      </FormLabel>
      <FormControl>
        <Input type="password" placeholder="Confirm Password" autoComplete="new-password" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


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
