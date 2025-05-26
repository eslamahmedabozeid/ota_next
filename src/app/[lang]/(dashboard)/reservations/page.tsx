  import { z } from "zod";
  import { tablesNames } from "@/constants";
  import { Branch, FormTabSection, TableActionsEnum } from "@/types";
  import { TFunction } from "i18next";
  import { Metadata } from "next";
  import initTranslations from "@/localization/i18n";
  import DataTablePage from "@/components/table";
  import {
    COUNTRIES,
    VISA_TYPES,
  } from "@/services/api/queries";
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

  type ParamsProps = { lang: string };

  const getFormFields = (
    t: TFunction,
    countryOptions: { label: string; value: string }[],
    visaTypeOptions: { label: string; value: string }[]
  ): FormTabSection[] => [
    {
      id: "1",
      fields: [
                    {
        component: "select",
        name: "status",
        label: t("table.formFields.status.label"),
        placeholder: t("table.formFields.status.placeholder"),
        options: [
          { label: t("table.formFields.status.options.new"), value: "1" },
          { label: t("table.formFields.status.options.pending"), value: "2" },
          { label: t("table.formFields.status.options.approved"), value: "3" },
          { label: t("table.formFields.status.options.processing"), value: "4" },
          { label: t("table.formFields.status.options.cancelled"), value: "5" },
          { label: t("table.formFields.status.options.refunded"), value: "6" },
          { label: t("table.formFields.status.options.completed"), value: "7" },
          // { label: t("table.formFields.status.options.deleted"), value: "8" },
          ],
        },
        {
          component: "textArea",
          name: "notes",
          label: t("table.formFields.notes.label"),
          placeholder: t("table.formFields.notes.placeholder"),
          props: { className: "col-span-2" },
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
    const { t } = await initTranslations(lang, [tablesNames.reservations]);

    return {
      title: t("meta_data.title"),
    };
  }

  export default async function reservationsPage({
    params,
  }: {
    params: Promise<ParamsProps>;
  }) {
    const { lang } = await params;
    const { t } = await initTranslations(lang, [tablesNames.reservations]);

    let countries: any[] = [];
    let visaTypes: any[] = [];

    try {
      const [country, visaType] = await Promise.all([
        apiClient<any>(COUNTRIES, { query: { all: "true", limit: "100" } }),
        apiClient<any>(VISA_TYPES, { query: { all: "true", limit: "100" } }),
      ]);

      countries = country?.data?.data || [];
      visaTypes = visaType?.data?.data || [];
    } catch (error) {
      console.error("❌ Failed to fetch dropdown data:", error);
    }

    const formFields = getFormFields(
      t,
      BranchesOptions(t, countries, lang),
      BranchesOptions(t, visaTypes, lang)
    );

    return (
      <DataTablePage
      actions={[
      TableActionsEnum.VIEW,
      TableActionsEnum.EDIT_IN_SAME_PAGE, 
      ]}
      tableFor={tablesNames.reservations}
      formFields={formFields} />
    );
  }

