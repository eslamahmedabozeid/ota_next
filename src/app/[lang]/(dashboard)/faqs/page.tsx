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
const getfaqsFormFields  = (t: TFunction): FormTabSection[] => [
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
        component: "checkbox",
        name: "active",
        label: t("table.formFields.active.label"),
        placeholder: "",
      }
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<ParamsProps> }){
    const { lang } = await params
  const { t } = await initTranslations(lang, [tablesNames.faqs]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function StaticPagesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.faqs]);
  const formFields = getfaqsFormFields (t);

  return (
    <DataTablePage
      tableFor={tablesNames.faqs}
      formFields={formFields}
    />
  );
}