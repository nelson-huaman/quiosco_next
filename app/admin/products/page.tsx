import ProdcutSearchForm from "@/components/products/ProdcutSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
   return await prisma.product.count()
}

async function getProduct(page: number, pageSize: number) {
   const skip = (page - 1) * pageSize

   const products = await prisma.product.findMany({
      take: pageSize,
      skip,
      include: {
         category: true
      }
   })
   return products
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProduct>>

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

   const { page = "1" } = await searchParams;
   const currentPage = parseInt(page as string, 10) || 1;
   const pageSize = 10

   if(currentPage < 0) redirect('/admin/products')

   const productsData = getProduct(currentPage, pageSize)
   const totalProductsData = productCount()
   const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
   const totalPage = Math.ceil(totalProducts / pageSize)
   
   if(currentPage > totalPage) redirect('/admin/products')

   return (
      <>
         <Heading>Adminstrar Productos</Heading>

         <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
            <Link
               href={'/admin/products/new'}
               className="bg-amber-500 w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer"
            >Crear Producto</Link>
            <ProdcutSearchForm />
         </div>

         <ProductTable
            products={products}
         />
         <ProductsPagination
            page={currentPage}
            totalPage={totalPage}
         />
      </>
   )
}
