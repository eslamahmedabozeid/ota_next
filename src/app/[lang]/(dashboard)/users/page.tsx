import DataTablePage from "@/components/table";
import { tablesNames } from "@/constants";
import initTranslations from "@/localization/i18n";
import { Branch, FormTabSection, TableActionsEnum} from "@/types";
import { TFunction } from "i18next";
import { Metadata } from "next";

type ParamsProps = { lang: string };
const options = (t: TFunction) => {
console.log();

  return Array.from({ length: 2 }).map((_, index) => ({
    label: t(
      "table.formFields.step_1.status.options." + index + ".label"
    ),
    value: t(
      "table.formFields.step_1.status.options." + index + ".value"
    ),
  }
)
);

}


const getFormFields = (t: TFunction): FormTabSection[] => {
  
  
  return[
  {
    id: "1",
    fields: [
      {
        component: "input",
        name: "first_name",
        label: t("table.formFields.step_1.first_name.label"),
        placeholder: t("table.formFields.step_1.first_name.placeholder"),
      },
      {
        component: "input",
        name: "last_name",
        label: t("table.formFields.step_1.last_name.label"),
        placeholder: t("table.formFields.step_1.last_name.placeholder"),
      },
      {
        component: "input",
        name: "email",
        label: t("table.formFields.step_1.email.label"),
        placeholder: t("table.formFields.step_1.email.placeholder"),
        
      },
      {
        component: "input",
        name: "password",
        type: "password",
        label: t("table.formFields.step_1.password.label"),
        placeholder: t("table.formFields.step_1.password.placeholder"),
        
      },
      {
        component: "input",
        name: "password_confirmation",
        type: "password",
        label: t("table.formFields.step_1.password_confirmation.label"),
        placeholder: t("table.formFields.step_1.password_confirmation.placeholder"),
        
      },
      {
        component: "input",
        name: "phone",
        label: t("table.formFields.step_1.phone.label"),
        placeholder: t("table.formFields.step_1.phone.placeholder"),
      },
      {
        component: "select",
        name: "active",
        label: t("table.formFields.step_1.status.label"),
        placeholder: t("table.formFields.step_1.status.placeholder"),
        options: options(t),
      },

    ],
  },
]};
export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}): Promise<Metadata> {
  // read route params
  const { lang } = await params;
  const { t } = await initTranslations(lang, [tablesNames.users]);

  return {
    title: t("meta_data.title"),
  };
}
export default async function Users({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { lang } = await params;

  const { t } = await initTranslations(lang, [tablesNames.users]);
  // const filterFields = getFilterFields(t);
  const formFields = getFormFields(t);

  return (
        <DataTablePage<Branch>
          tableFor={tablesNames.users}
          actions={[
              TableActionsEnum.VIEW,
              TableActionsEnum.CREATE_IN_SAME_PAGE,
              ]}
          formFields={formFields}
        />
  );
}
