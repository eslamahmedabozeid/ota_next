import { z } from "zod";
import { tablesNames } from "@/constants";
import { FormTabSection } from "@/types";
import { TFunction } from "i18next";
import { Metadata } from "next";
import initTranslations from "@/localization/i18n";
import DataTablePage from "@/components/table";

export const dynamic = "force-dynamic";

// Schema for form validation

type ParamsProps = { lang: string };

// Form fields configuration
const getgeneralsettingsFormFields = (t: TFunction): FormTabSection[] => [
  {
    id: "1",
    fields: [
      {
        component: "input",
        name: "slug",
        label: t("table.formFields.slug.label"),
        placeholder: t("table.formFields.slug.placeholder"),
        props: { disabled: true },
      },
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
        component: "input",
        name: "icon",
        label: t("table.formFields.icon.label"),
        placeholder: t("table.formFields.icon.placeholder"),
      },
      {
        component: "dragDrop",
        name: "image",
        label: t("table.formFields.image.label"),
        type: "file",
        tableFor: tablesNames.settings,
        props: { className: "col-span-2" },
      },
      {
        component: "input",
        name: "value",
        type: "number",
        label: t("table.formFields.value.label"),
        placeholder: t("table.formFields.value.placeholder"),
      },
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { lang } = await params;
  const { t } = await initTranslations(lang, [tablesNames.settings]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function GeneralSettingsPage({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { lang } = await params;

  const { t } = await initTranslations(lang, [tablesNames.settings]);
  const formFields = getgeneralsettingsFormFields(t);

  return (
    <DataTablePage tableFor={tablesNames.settings} formFields={formFields} />
  );
}
