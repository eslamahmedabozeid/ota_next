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


const BranchesOptions = (
  t: TFunction,
  branches: Branch[],
  lang: string
): { label: string; value: string }[] =>
  branches.map((branch) => ({
    label:
    //@ts-ignore
    branch.name?.[lang] ??
    //@ts-ignore
      branch.title?.[lang] ??
      `Unnamed`,
    value: String(branch.id),
  }));
// Schema for form validation

type ParamsProps = { lang: string }

// Form fields configuration
const getdistinationPlacesFormFields = (t: TFunction,
    categoryOptions: { label: string; value: string }[],
    cityOptions: { label: string; value: string }[],
  ): FormTabSection[] => [
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
  component: "select",
  name: "category.id",
  label: t("table.formFields.category.label"),
  placeholder: t("table.formFields.category.placeholder"),
  options: categoryOptions,
},
{
  component: "select",
  name: "city.id",
  label: t("table.formFields.city.label"),
  placeholder: t("table.formFields.city.placeholder"),
  options: cityOptions,
},
 {
        component: "dragDrop",
        name: "image",
        label: t("table.formFields.image.label"),          
        type: "file",
        tableFor: tablesNames.destination_places,
        props: { className: "col-span-2" },
      }, 
{
  component: "input",
  name: "order_number",
  label: t("table.formFields.order_number.label"),
  placeholder: t("table.formFields.order_number.placeholder"),
  type: "number",
},
{
  component: "textEditor",
  name: "info_en",
  label: t("table.formFields.info_en.label"),
  placeholder: t("table.formFields.info_en.placeholder"),
  props: { className: "col-span-2" },
},
{
  component: "textEditor",
  name: "info_ar",
  label: t("table.formFields.info_ar.label"),
  placeholder: t("table.formFields.info_ar.placeholder"),
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
  const { t } = await initTranslations(lang, [tablesNames.destination_places]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function CountriesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.destination_places]);

    let cities: any[] = [];
    let categories: any[] = [];


  try {
    const [city,category ] = await Promise.all([
      apiClient<any>(DESTINATIONS, { query: { all: "true",limit:"100" } }),
      apiClient<any>(PACKAGE_CATEGORIES, { query: { all: "true",limit:"100" } }),
    ]);

    cities = city?.data?.data || [];
    categories = category?.data?.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch dropdown data:", error);
  }

  console.log("cities", cities);
  
  
  const formFields = getdistinationPlacesFormFields(
    t,
    BranchesOptions(t, cities, lang),
    BranchesOptions(t, categories, lang),
  );
  

  return (
    <DataTablePage
      tableFor={tablesNames.destination_places}
      formFields={formFields}
    />
  );
}