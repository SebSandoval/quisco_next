"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/src/lib/prima"
import { OrderIdSchema } from "@/src/schema"

export async function completeOrder(formData: FormData) {


  const data = {
    orderId: formData.get('order_id')
  }

  const result = OrderIdSchema.safeParse(data)
  if (result.success) {
    try {
      await prisma.order.update({
        where: {
          id: result.data.orderId
        },
        data: {
          status: true,
          orderReadyAt: new Date(Date.now())
        }
      })

      revalidatePath('/admin/orders')
    } catch (error) {
      console.error('Error al completar la orden', error)
    }
  }
}