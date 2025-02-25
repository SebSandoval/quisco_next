import { formatCurrency, getImagePath } from "@/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
  product: Product
}
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border bg-white">
      <Image
        src={getImagePath(product.image)}
        width={400}
        height={400}
        alt={product.name}
        quality={50} />
      <div className="p-5">
        <h3 className="text-2xl font-bold">
          {product.name}
        </h3>
        <p className="mt-5 font-black text-4xl text-amber-400">
          {formatCurrency(product.price)}
        </p>

        <AddProductButton product={product} />
      </div>
    </div>
  )
}
