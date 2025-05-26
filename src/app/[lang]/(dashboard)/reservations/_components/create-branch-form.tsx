"use client";

import FormLayout from "@/components/form/layout";
import {
  dashboardSchema,
  DashboardSettingsData,
} from "@/lib/schemas/dashboard.schema";
import { FormTabSection } from "@/types";
import { TFunction } from "i18next";
import { User, Lock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const sections = (t: TFunction): FormTabSection[] => [
  // First step is for general information
  {
    id: "general",
    label: t("form.step_1.label"),
    icon: Lock,
    fields: [
      // First name
      {
        component: "input",
        name: "first_name",
        label: t("table.formFields.first_name.label"),
        placeholder: t("table.formFields.first_name.placeholder"),
      },
      // Last name
      {
        component: "input",
        name: "last_name",
        label: t("table.formFields.last_name.label"),
        placeholder: t("table.formFields.last_name.placeholder"),
      },
      // Phone number
      {
        component: "input",
        name: "phone",
        label: t("table.formFields.phone.label"),
        placeholder: t("table.formFields.phone.placeholder"),
      },
      // Email
      {
        component: "input",
        name: "email",
        label: t("table.formFields.email.label"),
        placeholder: t("table.formFields.email.placeholder"),
      },
      // Notes
      {
        component: "textArea",
        name: "notes",
        label: t("table.formFields.notes.label"),
        placeholder: t("table.formFields.notes.placeholder"),
        props: { className: "col-span-2" },
      },
      // Type
      {
        component: "input",
        name: "type",
        label: t("table.formFields.type.label"),
        placeholder: t("table.formFields.type.placeholder"),
      },
      // Sub total
      {
        component: "input",
        name: "sub_total",
        label: t("table.formFields.sub_total.label"),
        placeholder: t("table.formFields.sub_total.placeholder"),
        type: "number",
      },
      // Extra fees
      {
        component: "input",
        name: "extra_fees",
        label: t("table.formFields.extra_fees.label"),
        placeholder: t("table.formFields.extra_fees.placeholder"),
        type: "number",
      },
      // Total price
      {
        component: "input",
        name: "total_price",
        label: t("table.formFields.total_price.label"),
        placeholder: t("table.formFields.total_price.placeholder"),
        type: "number",
      },
      // Country
      {
        component: "select",
        name: "country.id",
        label: t("table.formFields.country.label"),
        placeholder: t("table.formFields.country.placeholder"),
        // options: countryOptions,
      },
      // Visa type
      {
        component: "select",
        name: "visaType.id",
        label: t("table.formFields.visa_type.label"),
        placeholder: t("table.formFields.visa_type.placeholder"),
        // options: visaTypeOptions,
      },
      // Status
      {
        component: "select",
        name: "status",
        label: t("table.formFields.status.label"),
        placeholder: t("table.formFields.status.placeholder"),
        options: [
          { label: t("table.formFields.status.options.new"), value: "1" },
          { label: t("table.formFields.status.options.pending"), value: "2" },
          { label: t("table.formFields.status.options.approved"), value: "3" },
          { label: t("table.formFields.status.options.processing"), value: "4" },
          { label: t("table.formFields.status.options.cancelled"), value: "5" },
          { label: t("table.formFields.status.options.refunded"), value: "6" },
          { label: t("table.formFields.status.options.completed"), value: "7" },
          // { label: t("table.formFields.status.options.deleted"), value: "8" },
        ],
      },
      // Is paid
      {
        component: "checkbox",
        name: "is_paid",
        label: t("table.formFields.is_paid.label"),
      },
    ],
  },
  // Second step is for working hours
  {
    id: "working-hours",
    label: t("form.step_2.label"),
    icon: Shield,
    fields: [
      // Custom component
      {
        type: "CustomComponent",
        component: CustomComponent,
        name: "custom",
        label: "CustomComponent",
        placeholder: "Enter new password",
      },
      // Data sharing
      {
        component: "checkbox",
        name: "dataSharing",
        label: "Data Sharing",
      },
    ],
  },
  // Third step is for location
  {
    id: "location",
    label: t("form.step_3.label"),
    icon: User,
    fields: [
      // Notification preferences
      {
        component: "checkbox",
        name: "notificationPreferences",
        label: "Notification Preferences",
        options: [
          { label: "Email", value: "email" },
          { label: "Push Notifications", value: "push" },
          { label: "SMS", value: "sms" },
        ],
      },
      // Theme
      {
        component: "radio",
        name: "theme",
        label: "Theme",
        options: [
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
          { label: "System", value: "system" },
        ],
      },
    ],
  },
];

export default function CreateBranchForm({
  defaultValues,
}: {
  defaultValues?: Record<string, string>;
}) {
  const onSubmit = async (data: DashboardSettingsData) => {
    console.log("Dashboard settings submitted:", data);
    // Here you would typically send this data to your backend
  };
  const { t } = useTranslation("create-branch");
  return (
    <FormLayout
      title={t("form.title", { context: defaultValues ? "update" : "create" })}
      description={t("form.description")}
      sections={sections(t)}
      schema={dashboardSchema}
      endpointQuery=""
      defaultValues={defaultValues}
    />
  );
}

function CustomComponent() {
  return <div>CustomComponent</div>;
}
