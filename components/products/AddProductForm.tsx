"use client"

import createProduct from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function AddProductForm({ children }: { children: React.ReactNode }) {

  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {

    const data = {
      name: formData.get('name'),
      price: Number(formData.get('price')),
      categoryId: Number(formData.get('categoryId')),
      image: formData.get('image')
    }

    const result = ProductSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.map(issue => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createProduct(result.data)

    if (response?.error) {
      response?.error.map(issue => {
        toast.error(issue.message)
      })
      return
    }

    toast.success('Producto Creado')  
    router.push('/admin/products')



  }
  return (
    <div
      className="bg-white px-5 py-10 mt-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form
        className="space-y-5"
        action={handleSubmit}
      >
        {
          children
        }
        <input type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded w-full mt-5 p-3 uppercase cursor-pointer font-bold "
          value="Agregar Producto"
        />
      </form>
    </div>
  )
}
