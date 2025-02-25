"use client"
import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

type CategoryIconProps = {
  category: Category
}
export default function CategoryIcon({ category }: CategoryIconProps) {

  const params = useParams<{category: string}>()
  return (
    <Link 
      href={`/order/${category.slug}`}
    className={`${category.slug===params.category ? 'bg-amber-400': ''} flex items-center gap-4 p-4 w-full border-t cursor-pointer  border-gray-200 hover:bg-gray-100 last-of-type:border-b`}>
      <Image
        src={`/icon_${category.slug}.svg`}
        alt="Imagen Categoria" width={24} height={24} />
      <span className="text-xl font-bold">{category.name}</span>
    </Link>
  )
}
