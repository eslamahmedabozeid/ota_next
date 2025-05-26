import DataTablePage from "@/components/table";
import { tablesNames } from "@/constants";
import initTranslations from "@/localization/i18n";
import { TableFilterFields } from "@/types";
import { Level } from "@/types/levels";
import { TFunction } from "i18next";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

type ParamsProps = { lang: string };

const getFilterFields = (t: TFunction): TableFilterFields => ({
  sidebarFilters: [
    {
      component: "dateRange",
      id: "available_dates", // فقط كمفتاح للـ React loop
      nameFrom: "from",
      nameTo: "to",
      label: t("table.formFields.step_1.available_dates.label"),
      placeholder: t("table.formFields.step_1.available_dates.placeholder"),
      props: {
        className: "col-span-2",
      },
    },
  ],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await initTranslations(lang, [tablesNames.cars]);

  return {
    title: t("meta_data.title"),
  };
}

export default async function DashboardPageView({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${lang}/auth/login`);
  }

  const { t } = await initTranslations(lang, [tablesNames.cars]);
  const filterFields = getFilterFields(t);

  return (
    <>
      <h1>{t("dashboard.title")}</h1>
      {/* لو حابب تشغل الجدول شيل التعليق تحت */}
      {/*
      <DataTablePage<Level>
        tableFor={tablesNames.cars}
        filterFields={filterFields}
        actions={[]}
      />
      */}
    </>
  );
}
