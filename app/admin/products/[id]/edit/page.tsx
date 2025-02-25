import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prima"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })
  return product
}

export default async function EditProductsPage({ params }: { params: { id: string } }) {

  const id = +params.id
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Heading>Editar Producto: {product.name}</Heading>

      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  )
}
