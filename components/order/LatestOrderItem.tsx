import { OrderWithProducts } from "@/src/types"

type LatestOrderItemProps = {
  order: OrderWithProducts
}
export default function LatestOrderItem({ order }: LatestOrderItemProps) {
  return (
    <div className="bg-white shadow-md p-5 rounded-md space-y-5">
      <p className="text-2xl  text-slate-600 font-bold">Cliente: {order.name}</p>
      <ul
        className="divide-y divide-gray-200 border-t border-gray-100 text-sm font-medium text-gray-500"
      >
        {
          order.orderProducts.map(orderProduct => (
            <li key={orderProduct.id} className="flex justify-between py-4">
              <div className="flex flex-col">
                <span>{orderProduct.product.name}</span>
                <span className="text-gray-400">{orderProduct.product.price} x {orderProduct.quantity}</span>
              </div>
              <span className="text-gray-900">${orderProduct.product.price * orderProduct.quantity}</span>
            </li>))
        }
      </ul>
    </div>
  )
}
