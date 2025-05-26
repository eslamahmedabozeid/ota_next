import { z } from "zod";
import { tablesNames } from "@/constants";
import { Branch, FormTabSection } from "@/types";
import { TFunction } from "i18next";
import { Metadata } from "next";
import initTranslations from "@/localization/i18n";
import DataTablePage from "@/components/table";
import { COUNTRIES } from "@/services/api/queries";
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
      `Unnamed`,
    value: String(branch.id),
  }));
// Schema for form validation

type ParamsProps = { lang: string }

// Form fields configuration
const getCountryFormFields = (t: TFunction,
    branchesOptions: { label: string; value: string }[],
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
          name: "country.id",
          label: t("table.formFields.step_1.course.label"),
          placeholder: t("table.formFields.step_1.course.placeholder"),
          options: branchesOptions, // to be populated dynamically
      },
      {
        component: "input",
        name: "lat",
        type:"number",
        label: t("table.formFields.lat.label"),
        placeholder: t("table.formFields.lat.placeholder"),
      },
      {
        component: "input",
        name: "lng",
        type:"number",
        label: t("table.formFields.lng.label"),
        placeholder: t("table.formFields.lng.placeholder"),
      },
      {
        component: "input",
        name: "temperature",
        type:"number",
        label: t("table.formFields.temperature.label"),
        placeholder: t("table.formFields.temperature.placeholder"),
      },
      {
        component: "dragDrop",
        name: "images",
        label: t("table.formFields.image.label"),          
        type: "file",
        tableFor: tablesNames.destinations,
        props: { className: "col-span-2" },
        multiple: true
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
        component: "dragDrop",
        name: "main_image",
        label: t("table.formFields.image.label"),          
        type: "file",
        tableFor: tablesNames.destinations,
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
  const { t } = await initTranslations(lang, [tablesNames.destinations]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function CountriesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.destinations]);

    let courses: any[] = [];


  try {
    const [branchesRes ] = await Promise.all([
      apiClient<any>(COUNTRIES, { query: { all: "true",limit:"100" } }),
    ]);

    courses = branchesRes?.data?.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch dropdown data:", error);
  }

  console.log("courses", courses);
  
  
  const formFields = getCountryFormFields(
    t,
    BranchesOptions(t, courses, lang),
  );
  

  return (
    <DataTablePage
      tableFor={tablesNames.destinations}
      formFields={formFields}
    />
  );
}