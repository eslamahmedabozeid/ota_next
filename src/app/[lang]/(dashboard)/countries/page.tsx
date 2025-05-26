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
const getCountryFormFields = (t: TFunction): FormTabSection[] => [
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
        name: "image",
        label: t("table.formFields.image.label"),          
        type: "file",
        tableFor: tablesNames.countries,
        props: { className: "col-span-2" }
      },
     
      {
        component: "textArea",
        name: "tags.en",
        label: t("table.formFields.tags_en.label"),
        placeholder: t("table.formFields.tags_en.placeholder"),
        props: { className: "col-span-2" },
        isArray: true,
      },
      {
        component: "textArea",
        name: "tags.ar",
        label: t("table.formFields.tags_ar.label"),
        placeholder: t("table.formFields.tags_ar.placeholder"),
        props: { className: "col-span-2" },
        isArray: true,
      },
       {
        component: "checkbox",
        name: "active",
        label: t("table.formFields.active.label"),
      },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<ParamsProps> }){
    const { lang } = await params
  const { t } = await initTranslations(lang, [tablesNames.countries]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function CountriesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.countries]);
  const formFields = getCountryFormFields(t);

  return (
    <DataTablePage
      tableFor={tablesNames.countries}
      formFields={formFields}
    />
  );
}