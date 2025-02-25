import { create } from 'zustand';
import { OrderItem } from './types';
import { Product } from '@prisma/client';

interface Store {
  order: OrderItem[]
  addToOrder: (product: Product) => void
  increaseQuantity: (id: Product['id']) => void
  decreaseQuantity: (id: Product['id']) => void
  removeItem: (id: Product['id']) => void
  clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {

    const { id, name, price } = product

    let order: OrderItem[] = []

    if (get().order.find(item => item.id === id)) {

      order = get().order.map(item => item.id === id ? {
        ...item,
        quantity: item.quantity + 1,
        subtotal: item.price * (item.quantity + 1)
      } : item)

    } else {
      order = [
        ...get().order,
        {
          id,
          name,
          price: +price,
          quantity: 1,
          subtotal: +product.price
        }]
    }
    set(() => ({
      order
    }))
  },

  increaseQuantity: (id) => {


    set((state) => ({
      order: state.order.map(item => item.id === id ? {
        ...item,
        quantity: item.quantity + 1,
        subtotal: item.price * (item.quantity + 1)
      } : item)
    }))
  },

  'decreaseQuantity': (id) => {

    set((state) => ({
      order: state.order.map(item => item.id === id ? {
        ...item,
        quantity: item.quantity - 1,
        subtotal: item.price * (item.quantity - 1)
      } : item).filter(item => item.quantity > 0)

    }))
  },

  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter(item => item.id !== id)
    }))
  },

  clearOrder: () => {
    set(() => ({
      order: []
    }))
  }
}));