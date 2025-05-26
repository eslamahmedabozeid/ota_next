"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { uploadFilesToServer } from "@/services/api/upload-file";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, Trash } from "lucide-react";
import { toast } from "sonner";

interface DragDropAreaProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  multiple?: boolean;
  tableFor?: string;
}

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL || "";

export default function DragDropArea({
  name,
  label,
  required = false,
  tableFor,
  className,
  multiple = false,
}: DragDropAreaProps) {
  const { register, setValue, watch } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentValue = watch(name);

  useEffect(() => {
    if (Array.isArray(currentValue)) {
      const cleaned = currentValue.map((url: string) => {
        const cleanedUrl = url.replace(/^"+|"+$/g, "");
        return cleanedUrl.startsWith("http") ? cleanedUrl : `${cleanedUrl}`;
      });
      setPreviews(cleaned);
    } else if (typeof currentValue === "string") {
      const cleanedUrl = currentValue.replace(/^"+|"+$/g, "");
      const fullUrl = cleanedUrl.startsWith("http") ? cleanedUrl : `${cleanedUrl}`;
      setPreviews([fullUrl]);
    } else {
      setPreviews([]);
    }
  }, [currentValue]);

const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const file = files[0];
  try {
    const uploaded = await uploadFilesToServer([file], tableFor);
//@ts-ignore
    const url = uploaded?.data?.imageUrl?.replace(/^"+|"+$/g, "");
    const fullUrl = url;

    const newValues = multiple ? [...(currentValue || []), url] : url;

    setValue(name, newValues, { shouldValidate: true });
    setPreviews(multiple ? [...(previews || []), fullUrl] : [fullUrl]);

    toast.success("File uploaded successfully");
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("File upload failed");
  } finally {
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
};

  const handleRemove = (urlToRemove: string) => {
    const updated = previews.filter((url) => url !== urlToRemove);
    setPreviews(updated);
    setValue(name, multiple ? updated : null, { shouldValidate: true });
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <div className="flex flex-col items-center gap-4 p-4 border border-dashed rounded-lg">
        {previews.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {previews.map((url) => (
              <div key={url} className="relative">
                <Image
                  src={url?.includes("https://") ? url : `${process.env.NEXT_PUBLIC_IMAGE_PUBLIC_URL || ""}${url}`}
                  width={120}
                  height={120}
                  alt="uploaded-image"
                  className="rounded-md object-cover"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute -top-2 -right-2"
                  onClick={() => handleRemove(url)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <label className="cursor-pointer">
          <input
            {...register(name)}
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={false} // 👈 always allow selecting one image at a time
            onChange={handleChange}
            hidden
          />
          <div className="flex flex-col items-center text-muted-foreground">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </div>
        </label>
      </div>
    </div>
  );
}



// "use client";

// import { useController, useFormContext } from "react-hook-form";
// import { Label } from "@/components/ui/label";
// import { cn } from "@/lib/utils";
// import { FileUploader } from "./file-uploader";
// import { uploadFilesToServer } from "@/services/api/upload-file";

// interface DragDropAreaProps {
//   name: string;
//   label?: string;
//   placeholder?: string;
//   required?: boolean;
//   className?: string;
//   maxSize?: number;
//   maxFileCount?: number;
// }

// export default function DragDropArea({
//   name,
//   label,
//   placeholder,
//   required = false,
//   className,
//   maxSize = 5 * 1024 * 1024,
//   maxFileCount = 1,
// }: DragDropAreaProps) {
//   const { control, setValue } = useFormContext();
//   const {
//     field: { onChange, value },
//     fieldState: { error },
//   } = useController({
//     name,
//     control,
//   });

//   const handleUpload = async (files: File[]) => {
//     try {
//       const uploaded = await uploadFilesToServer(files);
//       const url = uploaded[0].url.replace(/^"+|"+$/g, ""); // remove quotes if exist
//       setValue(name, url, { shouldValidate: true });
//       onChange(url);
//     } catch (error) {
//       console.error("Upload error:", error);
//     }
//   };

//   return (
//     <div className={cn("w-full space-y-2", className)}>
//       {label && (
//         <Label
//           htmlFor={name}
//           className={cn("text-sm font-medium", error && "text-destructive")}
//         >
//           {label}
//           {required && <span className="text-destructive ml-1">*</span>}
//         </Label>
//       )}
//       <FileUploader
//         value={value}
//         onValueChange={onChange}
//         maxFileCount={maxFileCount}
//         maxSize={maxSize}
//         onUpload={handleUpload} // 
//         progresses={{}} // optional progress
//       />

//       {error && <p className="text-sm text-destructive">{error.message}</p>}
//     </div>
//   );
// }
