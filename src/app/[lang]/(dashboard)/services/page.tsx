import { z } from "zod";
import { tablesNames } from "@/constants";
import { FormTabSection } from "@/types";
import { TFunction } from "i18next";
import { Metadata } from "next";
import initTranslations from "@/localization/i18n";
import DataTablePage from "@/components/table";

export const dynamic = "force-dynamic";

// Schema for form validation

type ParamsProps = { lang: string }

// Form fields configuration
const getServicesFormFields = (t: TFunction): FormTabSection[] => [
  {
    id: "1",
   fields: [
      {
        component: "input",
        name: "title.en",
        label: t("table.formFields.title_en.label"),
        placeholder: t("table.formFields.title_en.placeholder"),
      },
      {
        component: "input",
        name: "title.ar",
        label: t("table.formFields.title_ar.label"),
        placeholder: t("table.formFields.title_ar.placeholder"),
      },
      {
        component: "textArea",
        name: "description.en",
        label: t("table.formFields.description_en.label"),
        placeholder: t("table.formFields.description_en.placeholder"),
        props: { className: "col-span-2" },
      },
      {
        component: "textArea",
        name: "description.ar",
        label: t("table.formFields.description_ar.label"),
        placeholder: t("table.formFields.description_ar.placeholder"),
        props: { className: "col-span-2" },
      },
      {
        component: "input",
        name: "order_number",
        type: "number",
        label: t("table.formFields.order_number.label"),
        placeholder: t("table.formFields.order_number.placeholder"),
      },
      {
        component: "dragDrop",
        name: "image",
        label: t("table.formFields.image.label"),
        type: "file",
        tableFor: tablesNames.services,
        props: { className: "col-span-2" },
      },
      {
        component: "checkbox",
        name: "is_active",
        label: t("table.formFields.is_active.label"),
      },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<ParamsProps> }){
    const { lang } = await params
  const { t } = await initTranslations(lang, [tablesNames.services]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.services]);
  const formFields = getServicesFormFields(t);

  return (
    <DataTablePage
      tableFor={tablesNames.services}
      formFields={formFields}
    />
  );
}