import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prima";


async function searchProducts(search: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive'
      }
    },
    include: {
      category: true
    }
  })

  return products
}


export default async function SearchPage({ searchParams }: {
  searchParams: Promise<{ search: string }>
}) {

  const { search } = await searchParams;

  const products = await searchProducts(search)
  return (
    <>
      <Heading>
        Resultados de la busqueda &quot;{search}&quot;
      </Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end lg:items-center">

        <ProductSearchForm />

      </div>

      {
        products.length ? (
          <ProductTable products={products} />
        )
          : (

            <p className="text-center text-gray-500">No se encontraron productos</p>
          )
      }

    </>
  )
}
