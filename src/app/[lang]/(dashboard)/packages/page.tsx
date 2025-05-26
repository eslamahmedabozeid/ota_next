import { z } from "zod";
import { tablesNames } from "@/constants";
import { Branch, FormTabSection } from "@/types";
import { TFunction } from "i18next";
import { Metadata } from "next";
import initTranslations from "@/localization/i18n";
import DataTablePage from "@/components/table";
import { COUNTRIES, DESTINATIONS, PACKAGE_CATEGORIES, PACKAGES, TOURS } from "@/services/api/queries";
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
        component: "textEditor",
        name: "description.en",
        label: t("table.formFields.description_en.label"),
        placeholder: t("table.formFields.description_en.placeholder"),
        props: { className: "col-span-2" },
      },
      {
        component: "textEditor",
        name: "description.ar",
        label: t("table.formFields.description_ar.label"),
        placeholder: t("table.formFields.description_ar.placeholder"),
        props: { className: "col-span-2" },
      },
      {
        component: "select",
        name: "country_id",
        label: t("table.formFields.country.label"),
        placeholder: t("table.formFields.country.placeholder"),
        options: countryOptions,
      },
      {
        component: "select",
        name: "city_id",
        label: t("table.formFields.city.label"),
        placeholder: t("table.formFields.city.placeholder"),
        options: cityOptions,
      },
      {
        component: "select",
        name: "tour_id",
        label: t("table.formFields.tour.label"),
        placeholder: t("table.formFields.tour.placeholder"),
        options: tourOptions,
      },
      {
        component: "select",
        name: "category_id",
        label: t("table.formFields.category.label"),
        placeholder: t("table.formFields.category.placeholder"),
        options: categoryOptions,
      },
      {
        component: "select",
        name: "type",
        label: t("table.formFields.type.label"),
        placeholder: t("table.formFields.type.placeholder"),
        options: [
  { label: t("table.formFields.type.options.package"), value: "package" },
  { label: t("table.formFields.type.options.event"), value: "event" },
],
      },
      {
        component: "input",
        name: "text_address",
        label: t("table.formFields.text_address.label"),
        placeholder: t("table.formFields.text_address.placeholder"),
      },
      {
        component: "input",
        name: "lat",
        label: t("table.formFields.lat.label"),
        placeholder: t("table.formFields.lat.placeholder"),
        type: "number",
      },
      {
        component: "input",
        name: "lng",
        label: t("table.formFields.lng.label"),
        placeholder: t("table.formFields.lng.placeholder"),
        type: "number",
      },
      {
        component: "datePickerRange",
        name: "range",
        label: t("table.formFields.range.label"),
        placeholder: t("table.formFields.range.placeholder"),
        props: {
    startName: "start_date",
    endName: "end_date",
    className: "col-span-2",
  },
      },

      {
        component: "input",
        name: "num_of_days",
        label: t("table.formFields.num_of_days.label"),
        placeholder: t("table.formFields.num_of_days.placeholder"),
        type: "number",
      },
      {
        component: "input",
        name: "price_from",
        label: t("table.formFields.price_from.label"),
        placeholder: t("table.formFields.price_from.placeholder"),
      },
      {
        component: "input",
        name: "price_to",
        label: t("table.formFields.price_to.label"),
        placeholder: t("table.formFields.price_to.placeholder"),
      },
      {
        component: "input",
        name: "min_group_size",
        label: t("table.formFields.min_group_size.label"),
        placeholder: t("table.formFields.min_group_size.placeholder"),
        type: "number",
      },
      {
        component: "input",
        name: "max_group_size",
        label: t("table.formFields.max_group_size.label"),
        placeholder: t("table.formFields.max_group_size.placeholder"),
        type: "number",
      },
      {
        component: "input",
        name: "include",
        label: t("table.formFields.include.label"),
        placeholder: t("table.formFields.include.placeholder"),
        props: { className: "col-span-2" },
      },
      {
        component: "input",
        name: "exclude",
        label: t("table.formFields.exclude.label"),
        placeholder: t("table.formFields.exclude.placeholder"),
        props: { className: "col-span-2" },
      },
      {
        component: "dragDrop",
        name: "thumbnail_image",
        label: t("table.formFields.thumbnail.label"),
        type: "file",
        tableFor: tablesNames.packages,
        props: { className: "col-span-2" },
      },
      {
        component: "dragDrop",
        name: "images",
        label: t("table.formFields.gallery.label"),
        type: "file",
        tableFor: tablesNames.packages,
        multiple: true,
        props: { className: "col-span-2" },
      },
      {
        component: "textArea",
        name: "tags.en",
        label: t("table.formFields.tags_en.label"),
        placeholder: t("table.formFields.tags_en.placeholder"),
        isArray: true,
        props: { className: "col-span-2" },
      },
      {
        component: "textArea",
        name: "tags.ar",
        label: t("table.formFields.tags_ar.label"),
        placeholder: t("table.formFields.tags_ar.placeholder"),
        isArray: true,
        props: { className: "col-span-2" },
      },
      {
        component: "checkbox",
        name: "is_active",
        label: t("table.formFields.active.label"),
      },
      {
        component: "checkbox",
        name: "is_featured",
        label: t("table.formFields.is_featured.label"),
      }
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<ParamsProps> }){
    const { lang } = await params
  const { t } = await initTranslations(lang, [tablesNames.packages]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function PackagesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.packages]);

    let cities: any[] = [];
    let categories: any[] = [];
    let countries: any[] = [];
    let tours: any[] = [];


  try {
    const [city,category,country,tour ] = await Promise.all([
      apiClient<any>(DESTINATIONS, { query: { all: "true",limit:"100" } }),
      apiClient<any>(PACKAGE_CATEGORIES, { query: { all: "true",limit:"100" } }),
      apiClient<any>(COUNTRIES, { query: { all: "true",limit:"100" } }),
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
      tableFor={tablesNames.packages}
      formFields={formFields}
    />
  );
}