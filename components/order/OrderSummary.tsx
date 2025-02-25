"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/utils"
import { createOrder } from "@/actions/create-order-actions"
import { toast } from "react-toastify"
import { OrderSchema } from "@/src/schema"

export default function OrderSummary() {

  const order = useStore((state) => state.order)
  const clearOrder = useStore((state) => state.clearOrder)
  const total = useMemo(() => order.reduce((acc, item) => acc + (item.quantity * item.price), 0), [order])

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name') as string,
      total,
      order
    }

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })

    }

    toast.success('Pedido creado correctamente')

    clearOrder()


  }
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5" >
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? <p className="text-center">No hay productos en tu pedido</p> : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-20 text-center">
            Total a pagar: {''}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form
            className="w-full mt-5 space-y-5"
            action={handleCreateOrder}
          >
            <input type="text"
              placeholder="Nombre"
              className="w-full bg-gray-100 p-2 rounded"
              name="name"
            />

            <input type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              value="Confirmar pedido"
            />

          </form>
        </div>
      )}
    </aside>
  )
}
