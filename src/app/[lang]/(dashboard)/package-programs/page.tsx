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
  packagesOptions: { label: string; value: string }[],


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
        name: "package_id",
        label: t("table.formFields.package.label"),
        placeholder: t("table.formFields.package.placeholder"),
        props: { className: "col-span-2" },
        options: packagesOptions,
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
        component: "input",
        name: "order_number",
        label: t("table.formFields.order_number.label"),
        placeholder: t("table.formFields.order_number.placeholder"),
        type: "number",
      },
      {
        component: "dragDrop",
        name: "image",
        label: t("table.formFields.image.label"),
        type: "file",
        tableFor: tablesNames.package_programs,
        props: { className: "col-span-2" },
      },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<ParamsProps> }){
    const { lang } = await params
  const { t } = await initTranslations(lang, [tablesNames.package_programs]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function PackagesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.package_programs]);

    let packages: any[] = [];



  try {
    const [packageIds] = await Promise.all([
      apiClient<any>(PACKAGES, { query: { all: "true",limit:"100" } }),
    ]);

    packages = packageIds?.data?.data || [];

  } catch (error) {
    console.error("❌ Failed to fetch dropdown data:", error);
  }

  
  
  const formFields = getFormFields(t,
        BranchesOptions(t, packages, lang));
  

  return (
    <DataTablePage
      tableFor={tablesNames.package_programs}
      formFields={formFields}
    />
  );
}