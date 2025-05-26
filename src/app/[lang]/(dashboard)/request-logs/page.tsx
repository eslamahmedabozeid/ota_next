import DataTablePage from "@/components/table";
import { tablesNames } from "@/constants";
import initTranslations from "@/localization/i18n";
import { Branch, FormTabSection, TableActionsEnum} from "@/types";
import { TFunction } from "i18next";
import { Metadata } from "next";

type ParamsProps = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}): Promise<Metadata> {
  // read route params
  const { lang } = await params;
  const { t } = await initTranslations(lang, [tablesNames.request_logs]);

  return {
    title: t("meta_data.title"),
  };
}
export default async function RequestLogs({
  params,
}: {
  params: Promise<ParamsProps>;
}) {

  const { lang } = await params;

  const { t } = await initTranslations(lang, [tablesNames.request_logs]);
  // const filterFields = getFilterFields(t);
  return (
        <DataTablePage<Branch>
          tableFor={tablesNames.request_logs}
        actions={[TableActionsEnum.VIEW]}
        formFields={[]}
        />
  );
}
