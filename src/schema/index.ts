import { z } from 'zod'

export const OrderSchema = z.object({
  name: z.string()
    .min(1, 'El nombre es requerido'),

  total: z.number()
    .min(1, 'El total es requerido'),

  order: z.array(z.object({
    name: z.string(),
    id: z.number(),
    price: z.number(),
    quantity: z.number(),
    subtotal: z.number(),
  }
  ))


})

export const OrderIdSchema = z.object({
  orderId: z.string()
    .transform(value => parseInt(value))
    .refine(value => value > 0, {
      message: 'El id de la orden es requerido'
    })
})

export const searchSchema = z.object({
  search: z.string()
    .trim()
    .min(1, { message: 'La búsqueda es requerida' })
})

export const ProductSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
  price: z.string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: 'Precio no válido' })
    .or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
  categoryId: z.string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
    .or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
  image: z.string()
    .min(1, { message: 'La imagen es requerida' })


})