import { z } from "zod";
import { tablesNames } from "@/constants";
import { Branch, FormTabSection } from "@/types";
import { TFunction } from "i18next";
import { Metadata } from "next";
import initTranslations from "@/localization/i18n";
import DataTablePage from "@/components/table";
import { COUNTRIES, DESTINATIONS, CAR_CATEGORIES, PACKAGES, TOURS } from "@/services/api/queries";
import apiClient from "@/services/api";

export const dynamic = "force-dynamic";


const BranchesOptions = (
  t: TFunction,
  branches: Branch[],
  lang: string
): { label: string; value: string }[] =>
  branches?.map((branch) => ({
    label:
    //@ts-ignore
    branch?.name?.[lang] ??
    //@ts-ignore
      branch?.title?.[lang] ??
      `Unnamed`,
    value: String(branch?.id),
  }));
// Schema for form validation

type ParamsProps = { lang: string }

// Form fields configuration
const getFormFields = (t: TFunction,
  countryOptions: { label: string; value: string }[],
  cityOptions: { label: string; value: string }[],
  tourOptions: { label: string; value: string }[],
  categoryOptions: { label: string; value: string }[]
  ): FormTabSection[] => [
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
        component: "select",
        name: "category_id",
        label: t("table.formFields.category.label"),
        placeholder: t("table.formFields.category.placeholder"),
        options: categoryOptions,
      },
      {
        component: "input",
        name: "seats_num",
        label: t("table.formFields.seats_num.label"),
        placeholder: t("table.formFields.seats_num.placeholder"),
        type: "number",
      },
      {
        component: "input",
        name: "bags_num",
        label: t("table.formFields.bags_num.label"),
        placeholder: t("table.formFields.bags_num.placeholder"),
        type: "number",
      },
      {
        component: "input",
        name: "price_per_day",
        label: t("table.formFields.price_per_day.label"),
        placeholder: t("table.formFields.price_per_day.placeholder"),
        type: "number",
      },
      {
        component: "checkbox",
        name: "automatic",
        label: t("table.formFields.automatic.label"),
      },
      {
        component: "checkbox",
        name: "km_rental",
        label: t("table.formFields.km_rental.label"),
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
  const { t } = await initTranslations(lang, [tablesNames.cars]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function CarsPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.cars]);

    let cities: any[] = [];
    let categories: any[] = [];
    let countries: any[] = [];
    let tours: any[] = [];


  try {
    const [city,category,country,tour ] = await Promise.all([
      apiClient<any>(DESTINATIONS, { query: { all: "true",limit:"100" } }),
      apiClient<any>(CAR_CATEGORIES, { query: { all: "true",limit:"100" } }),
      apiClient<any>(COUNTRIES, { query: { all: "true",limit:"100" } }),
      apiClient<any>(TOURS, { query: { all: "true",limit:"100" } }),
      apiClient<any>(TOURS, { query: { all: "true",limit:"100" } }),
    ]);

    cities = city?.data?.data || [];
    categories = category?.data?.data || [];
    countries = country?.data?.data || [];
    tours = tour?.data?.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch dropdown data:", error);
  }

  console.log("cities", cities);
  console.log("categories", categories);
  
  
  const formFields = getFormFields(
    t,
    BranchesOptions(t, countries, lang),
    BranchesOptions(t, cities, lang),
    BranchesOptions(t, tours, lang),
    BranchesOptions(t, categories, lang),
  );
  

  return (
    <DataTablePage
      tableFor={tablesNames.cars}
      formFields={formFields}
    />
  );
}