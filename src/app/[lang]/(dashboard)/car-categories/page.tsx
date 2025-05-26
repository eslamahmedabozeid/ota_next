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
        component: "dragDrop",
        name: "icon",
        label: t("table.formFields.icon.label"),
        type: "file",
        tableFor: tablesNames.car_categories,
        props: { className: "col-span-2" },
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
  const { t } = await initTranslations(lang, [tablesNames.car_categories]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function CarcategoriesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.car_categories]);
  
  
  const formFields = getdistinationPlacesFormFields(t);
  

  return (
    <DataTablePage
      tableFor={tablesNames.car_categories}
      formFields={formFields}
    />
  );
}