import { z } from "zod";
import { tablesNames } from "@/constants";
import { Branch, FormTabSection } from "@/types";
import { TFunction } from "i18next";
import { Metadata } from "next";
import initTranslations from "@/localization/i18n";
import DataTablePage from "@/components/table";
import { COUNTRIES, DESTINATIONS, PACKAGE_CATEGORIES, PACKAGES } from "@/services/api/queries";
import apiClient from "@/services/api";

export const dynamic = "force-dynamic";


// Schema for form validation

type ParamsProps = { lang: string }

// Form fields configuration
const getdistinationPlacesFormFields = (t: TFunction): FormTabSection[] => [
  {
    id: "1",
      fields: [
    {
      component: "input",
      name: "title.en",
      label: t("table.formFields.name_en.label"),
      placeholder: t("table.formFields.name_en.placeholder"),
    },
    {
      component: "input",
      name: "title.ar",
      label: t("table.formFields.name_ar.label"),
      placeholder: t("table.formFields.name_ar.placeholder"),
    },
    {
      component: "input",
      name: "price",
      label: t("table.formFields.price.label"),
      placeholder: t("table.formFields.price.placeholder"),
      type: "number",
    },
    {
      component: "input",
      name: "processing_time",
      label: t("table.formFields.processing_time.label"),
      placeholder: t("table.formFields.processing_time.placeholder"),
    },
    {
      component: "input",
      name: "validity",
      label: t("table.formFields.validity.label"),
      placeholder: t("table.formFields.validity.placeholder"),
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
  const { t } = await initTranslations(lang, [tablesNames.visa_types]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function visatypesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.visa_types]);
  
  
  const formFields = getdistinationPlacesFormFields(t);
  

  return (
    <DataTablePage
      tableFor={tablesNames.visa_types}
      formFields={formFields}
    />
  );
}