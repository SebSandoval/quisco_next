"use server"

import { prisma } from "@/src/lib/prima"
import { ProductSchema } from "@/src/schema"

export default async function createProduct(data: unknown) {
  const result = ProductSchema.safeParse(data)
  if (!result.success) {
    return {
      error: result.error.issues
    }
  }

  await prisma.product.create({
    data: result.data
  })


}