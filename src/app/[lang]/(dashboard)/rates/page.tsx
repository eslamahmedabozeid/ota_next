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
        name: "name",
        label: t("table.formFields.name.label"),
        placeholder: t("table.formFields.name.placeholder"),
      },
      {
        component: "input",
        name: "sub_title",
        label: t("table.formFields.sub_title.label"),
        placeholder: t("table.formFields.sub_title.placeholder"),
      },
      {
        component: "textArea",
        name: "comment",
        label: t("table.formFields.comment.label"),
        placeholder: t("table.formFields.comment.placeholder"),
        props: { className: "col-span-2" },
      },
      {
        component: "input",
        name: "stars",
        type: "number",
        label: t("table.formFields.stars.label"),
        placeholder: t("table.formFields.stars.placeholder"),
      },
      {
        component: "dragDrop",
        name: "image",
        label: t("table.formFields.image.label"),
        type: "file",
        tableFor: tablesNames.rates,
        props: { className: "col-span-2" },
      },
      {
        component: "checkbox",
        name: "active",
        label: t("table.formFields.active.label"),
      },
      {
        component: "checkbox",
        name: "is_featured",
        label: t("table.formFields.is_featured.label"),
      },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<ParamsProps> }){
    const { lang } = await params
  const { t } = await initTranslations(lang, [tablesNames.rates]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function ratesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.rates]);
  const formFields = getServicesFormFields(t);

  return (
    <DataTablePage
      tableFor={tablesNames.rates}
      formFields={formFields}
    />
  );
}