import Pagination from "@/components/products/Pagination";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prima";
import Link from "next/link";
import { redirect } from "next/navigation";
async function productsCount() {
  const count = await prisma.product.count()
  return count
}
async function getProducts(pageSize: number, skip: number) {
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  })
  return products
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>
export default async function ProductsPage(
  { searchParams }: { searchParams: { page: string } }
) {

  const page = +searchParams.page || 1
  const pageSize = 10
  const skip = (page - 1) * pageSize
  if (page < 0) redirect("/admin/products")
  const productsData = getProducts(pageSize, skip)

  const totalProductsData = productsCount()

  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])

  const totalPages = Math.ceil(totalProducts / pageSize)
  if (page > totalPages) redirect("/admin/products")

  return (
    <>
      <Heading>
        Administrar Productos
      </Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <Link
          href="/admin/products/new"
          className="bg-amber-400 w-full lg:w-auto text-cl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Nuevo Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable products={products} />
      <Pagination page={page} totalPages={totalPages} />
    </>
  )
}
