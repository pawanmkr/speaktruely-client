import axios, { AxiosResponse } from "axios";

export const downloadBlob = async (blobName: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://${
        import.meta.env.VITE_AZURE_STORAGE_ACCOUNT as string
      }.blob.core.windows.net/${
        import.meta.env.VITE_AZURE_STORAGE_CONTAINER as string
      }/${blobName}${import.meta.env.VITE_AZURE_SAS_TOKEN as string}`,
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
