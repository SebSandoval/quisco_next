"use client"

import { useState } from "react"
import { CldUploadWidget } from "next-cloudinary"
import { TbPhotoPlus } from "react-icons/tb"
import Image from "next/image"
import { getImagePath } from "@/utils"

export default function ImageUpload({ image }: { image: string | undefined }) {

  const [imageUrl, setImageUrl] = useState('')
  return (
    <CldUploadWidget
      uploadPreset="quiosco"
      onSuccess={(result, { widget }) => {
        if (result.event === 'success') {
          widget.close()
          //@ts-ignore
          setImageUrl(result.info.secure_url)
        }
      }}
      options={{
        maxFiles: 1
      }}
    >
      {
        ({ open }) => (
          <>
            <div className="space-y-2">

              <label
                className="text-slate-800"
              >
                Imagen Producto
              </label>
              <div
                onClick={() => open()}
                className="relative cursor-pointer hover:opacity-70 transition p-10 vorder-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600 bg-slate-100">
                <TbPhotoPlus
                  size={50}
                />
                <p className="text-lg font-semibold">Agregar Imagen </p>
                {
                  imageUrl && (
                    <div className="absolute  w-full h-full inset-0">
                      <Image
                        src={imageUrl}
                        alt="Imagen Producto"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )
                }
              </div>
            </div>
            {
              image && !imageUrl &&  (
                <div className="space-y-2">
                  <label
                    className="text-slate-800"
                  >
                    Imagen Actual
                  </label>
                  <div className="relative w-64 h-64 cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600 bg-slate-100">
                    <Image
                      src={getImagePath(image)}
                      alt="Imagen Producto"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>

              )
            }

            <input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image} />
          </>
        )
      }

    </CldUploadWidget>
  )
}
