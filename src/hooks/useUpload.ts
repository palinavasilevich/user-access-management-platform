import { useState } from "react";

type UploadState<T> =
  | { status: "idle" }
  | { status: "uploading"; progress: number }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

type UploadOptions<T> = {
  url: string;
  method?: "POST" | "PUT";
  onProgress?: (progress: number) => void;
  parseResponse?: (response: unknown) => T;
};

type UploadResponse = {
  url: string;
  name: string;
  size: number;
  type: string;
};

export function useUpload<T = UploadResponse>() {
  const [state, setState] = useState<UploadState<T>>({
    status: "idle",
  });

  const upload = async (
    file: File,
    options: UploadOptions<T>,
  ): Promise<T | undefined> => {
    const { onProgress, parseResponse } = options;

    setState({
      status: "uploading",
      progress: 0,
    });

    try {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));

        setState({
          status: "uploading",
          progress,
        });

        onProgress?.(progress);
      }

      const mockResponse: UploadResponse = {
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
      };

      const data = parseResponse
        ? parseResponse(mockResponse)
        : (mockResponse as T);

      setState({
        status: "success",
        data,
      });

      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed.";

      setState({
        status: "error",
        error: message,
      });

      return undefined;
    }
  };

  const reset = () => {
    setState({
      status: "idle",
    });
  };

  return {
    state,
    upload,
    reset,
    isUploading: state.status === "uploading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
  };
}
