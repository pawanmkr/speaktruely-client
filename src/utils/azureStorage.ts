import axios, { AxiosResponse } from "axios";

const account: string = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT as string;
const container: string = import.meta.env
  .VITE_AZURE_STORAGE_CONTAINER as string;
const sasToken: string = import.meta.env.VITE_AZURE_SAS_TOKEN as string;

export const downloadBlob = async (blobName: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://${account}.blob.core.windows.net/${container}/${blobName}${sasToken}`,
      { responseType: "blob" }
    );
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (err) {
    console.log(err);
    return "";
  }
};
