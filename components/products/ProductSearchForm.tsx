"use client"
import { searchSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function ProductSearchForm() {
  const router = useRouter()  

  const handleSearchForm = (formData: FormData) => {

    const data = {
      search: formData.get('search') as string
    }
    const result = searchSchema.safeParse(data)

    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message)
      })
      return

    }

    router.push(`/admin/products/search?search=${result.data.search}`)

  }
  return (
    <form action={handleSearchForm} className="flex items-center">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Buscar producto"
        className="border border-gray-300 rounded-lg px-4 py-2"
      />
      <button
        type="submit"
        className="bg-amber-400 text-white rounded-lg px-4 py-2 ml-2"
      >
        Buscar
      </button>

    </form>
  )
}
