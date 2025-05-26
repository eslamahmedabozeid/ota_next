import apiClient from ".";

export const getSelectOptions = async (
  endpointName: string,
  labelKey = "title",
  valueKey = "id"
) => {
  try {
    const res = await apiClient(endpointName);
    const items = Array.isArray(res?.data) ? res.data : [];
    console.log("items", items);

    return items.map((item: any) => {
      const label =
        item?.translation?.[labelKey] ??
        item?.[labelKey] ??
        `(${endpointName}) Item`; // fallback label

      const value = item?.[valueKey];
      return {
        label: String(label),
        value: value ? String(value) : "",
      };
    });
  } catch (error) {
    console.error(`Failed to fetch select options for ${endpointName}`, error);
    return [];
  }
};
