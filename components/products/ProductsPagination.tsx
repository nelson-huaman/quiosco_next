import Link from "next/link";

type ProductsPaginationProps = {
   page: number
   totalPage: number
}


export default function ProductsPagination({ page, totalPage }: ProductsPaginationProps) {

   const pages = Array.from({ length: totalPage }, (_, i) => i + 1)

   return (
      <nav className="flex justify-center py-10 gap-2">

         {page > 1 && (
            <Link
               href={`/admin/products?page=${page - 1}`}
               className="bg-white px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-400 focus:z-20 focus:outline-offset-0 rounded-lg"
            >&laquo;</Link>
         )}

         {pages.map(currentPage => (
            <Link
               key={currentPage}
               href={`/admin/products?page=${currentPage}`}
               className={`${page === currentPage && 'font-black'} bg-white px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-400 focus:z-20 focus:outline-offset-0 rounded-lg`}
            >{currentPage}</Link>
         ))}

         {page < totalPage && (
            <Link
               href={`/admin/products?page=${page + 1}`}
               className="bg-white px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-400 focus:z-20 focus:outline-offset-0 rounded-lg"
            >&raquo;</Link>
         )}
      </nav>
   )
}
