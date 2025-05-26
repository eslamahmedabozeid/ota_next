"use client"

import type React from "react"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { uploadFilesToServer } from "@/services/api/upload-file"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, Trash } from "lucide-react"
import { toast } from "sonner"
import { log } from "console"

interface DragDropAreaProps {
  name: string
  label?: string
  required?: boolean
  className?: string
  multiple?: boolean
  value?: string | string[] | null
  onChange?: (value: string | string[] | null) => void
}

export default function DragDropArea({
  name,
  label,
  required = false,
  className,
  multiple = false,
  value,
  onChange,
}: DragDropAreaProps) {
  const formContext = useFormContext()
  const { register, setValue, watch } = formContext || {}
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Use either the passed value or get it from form context
  const currentValue = value !== undefined ? value : formContext ? watch(name) : null

  useEffect(() => {
    if (Array.isArray(currentValue)) {
      const cleaned = currentValue.map((url: string) => url?.replace(/^"+|"+$/g, "") || "")
      setPreviews(cleaned.filter(Boolean))
    } else if (typeof currentValue === "string" && currentValue) {
      const cleanedUrl = currentValue.replace(/^"+|"+$/g, "")
      setPreviews([cleanedUrl])
    } else {
      setPreviews([])
    }
  }, [currentValue])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
  
    // const file = files[0]
    // try {
    //   // Upload the file to the server
    //   const uploaded = await uploadFilesToServer([file])
    //   const path = uploaded[0].path.replace(/^"+|"+$/g, "") // Extract the path from the response
    //   console.log("path", path);
    //   const newValues = multiple
    //     ? [...(Array.isArray(currentValue) ? currentValue : []), path]
    //     : [path]
  
    //   // Use either the passed onChange or setValue from form context
    //   if (onChange) {
    //     onChange(multiple ? newValues : path)
    //   } else if (formContext) {
    //     setValue(name, multiple ? newValues : path, { shouldValidate: true })
    //   }
  
    //   setPreviews(multiple ? path : [path])
  
    //   toast.success("File uploaded successfully")
    // } catch (error) {
    //   console.error("Upload error:", error)
    //   toast.error("File upload failed")
    // } finally {
    //   if (fileInputRef.current) fileInputRef.current.value = ""
    // }
  }

  const handleRemove = (urlToRemove: string) => {
    const updated = previews.filter((url) => url !== urlToRemove)
    setPreviews(updated)

    // Use either the passed onChange or setValue from form context
    if (onChange) {
      onChange(multiple ? updated : null)
    } else if (formContext) {
      setValue(name, multiple ? updated : null, { shouldValidate: true })
    }
  }

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
            {previews.map((url, index) => (
              <div key={`${url}-${index}`} className="relative">
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
            {...(formContext ? register(name) : { name })}
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={false} // always allow selecting one image at a time
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
  )
}
