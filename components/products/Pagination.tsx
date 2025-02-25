import Link from "next/link";
type PaginationProps = {
  page: number
  totalPages: number
}
export default function Pagination({ page, totalPages }: PaginationProps) {

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <nav className="flex justify-center py-10">
      {
        page > 1 && (
          <Link
            className="px-4 py-2 bg-white text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            href={`/admin/products?page=${page - 1}`}
          >
            &laquo;
          </Link>
        )
      }
      {
        pages.map((p) => (
          <Link
            key={p}
            className={`px-4 py-2 bg-white text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${p === page ? 'bg-gray-200 font-bold' : ''}`}
            href={`/admin/products?page=${p}`}
          >
            {p}
          </Link>
        ))
      }
      {
        page < totalPages && (
          <Link
            className="px-4 py-2 bg-white text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            href={`/admin/products?page=${page + 1}`}
          >
            &raquo;
          </Link>
        )
      }

    </nav>
  )
}
