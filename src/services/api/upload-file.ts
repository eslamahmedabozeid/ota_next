// services/api/upload-file.ts

import apiClient from ".";
import { TABLE_QUERY_MAP, UPLOAD } from "./queries";


export async function uploadFilesToServer(files: File[], tableFor: string | undefined) {
  const formData = new FormData();  
  files.forEach(file => {
    formData.append("image", file);
  });
console.log("uploadFilesToServer",tableFor);

  const tableQuery = TABLE_QUERY_MAP[tableFor!];

  const response = await apiClient<{
    success: boolean;
    message: string;
    data: {
      imageUrl: string;
    };
  }>(tableQuery.upload, {
    body: formData,
  });

  return response;
}
