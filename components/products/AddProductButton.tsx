"use client"
import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddProductButtonProps = {
  product: Product
}
export default function AddProductButton({product}: AddProductButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder)
  
  return (
    <button
      type="button"
      className="mt-5 bg-blue-400 text-white font-bold py-2 px-4 rounded w-full"
      onClick={() => addToOrder(product)}
    >
      Agregar

    </button>
  )
}
