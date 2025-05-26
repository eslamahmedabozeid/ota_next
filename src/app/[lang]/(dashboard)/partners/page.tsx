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
        name: "name.en",
        label: t("table.formFields.name_en.label"),
        placeholder: t("table.formFields.name_en.placeholder"),
      },
      {
        component: "input",
        name: "name.ar",
        label: t("table.formFields.name_ar.label"),
        placeholder: t("table.formFields.name_ar.placeholder"),
      },
      {
        component: "dragDrop",
        name: "image_url",
        label: t("table.formFields.image.label"),
        type: "file",
        tableFor: tablesNames.partners,
        props: { className: "col-span-2" },
      },
      {
        component: "checkbox",
        name: "is_featured",
        label: t("table.formFields.is_featured.label"),
      },
      {
        component: "checkbox",
        name: "active",
        label: t("table.formFields.active.label"),
      },
      {
        component: "input",
        name: "order_number",
        type: "number",
        label: t("table.formFields.order_number.label"),
        placeholder: t("table.formFields.order_number.placeholder"),
      },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<ParamsProps> }){
    const { lang } = await params
  const { t } = await initTranslations(lang, [tablesNames.partners]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function PartnersPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.partners]);
  const formFields = getServicesFormFields(t);

  return (
    <DataTablePage
      tableFor={tablesNames.partners}
      formFields={formFields}
    />
  );
}