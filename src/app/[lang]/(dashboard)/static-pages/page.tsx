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
const getStaticPagesFormFields  = (t: TFunction): FormTabSection[] => [
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
        name: "sub_title.en",
        label: t("table.formFields.sub_title_en.label"),
        placeholder: t("table.formFields.sub_title_en.placeholder"),
      },
      {
        component: "input",
        name: "sub_title.ar",
        label: t("table.formFields.sub_title_ar.label"),
        placeholder: t("table.formFields.sub_title_ar.placeholder"),
      },
      {
        component: "textArea",
        name: "details.en",
        label: t("table.formFields.details_en.label"),
        placeholder: t("table.formFields.details_en.placeholder"),
        props: { className: "col-span-2" },
      },
      {
        component: "textArea",
        name: "details.ar",
        label: t("table.formFields.details_ar.label"),
        placeholder: t("table.formFields.details_ar.placeholder"),
        props: { className: "col-span-2" },
      },
      {
        component: "input",
        name: "action_button_title.en",
        label: t("table.formFields.action_button_title_en.label"),
        placeholder: t("table.formFields.action_button_title_en.placeholder"),
      },
      {
        component: "input",
        name: "action_button_title.ar",
        label: t("table.formFields.action_button_title_ar.label"),
        placeholder: t("table.formFields.action_button_title_ar.placeholder"),
      },
      {
        component: "dragDrop",
        name: "main_image",
        label: t("table.formFields.main_image.label"),
        type: "file",
        tableFor: tablesNames.static_pages,
        props: { className: "col-span-2" },
      },
      {
        component: "dragDrop",
        name: "image",
        label: t("table.formFields.image.label"),
        type: "file",
        tableFor: tablesNames.static_pages,
        props: { className: "col-span-2" },
      },
      {
        component: "dragDrop",
        name: "video",
        label: t("table.formFields.video.label"),
        type: "file",
        tableFor: tablesNames.static_pages,
        props: { className: "col-span-2" },
      }
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<ParamsProps> }){
    const { lang } = await params
  const { t } = await initTranslations(lang, [tablesNames.static_pages]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function StaticPagesPage({ params }: { params: Promise<ParamsProps> }) {
    const { lang } = await params

  const { t } = await initTranslations(lang, [tablesNames.static_pages]);
  const formFields = getStaticPagesFormFields (t);

  return (
    <DataTablePage
      tableFor={tablesNames.static_pages}
      formFields={formFields}
    />
  );
}