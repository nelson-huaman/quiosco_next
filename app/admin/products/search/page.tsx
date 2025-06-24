import ProdcutSearchForm from "@/components/products/ProdcutSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTeam: string) {
   const products = await prisma.product.findMany({
      where: {
         name: {
            contains: searchTeam,
            mode: 'insensitive'
         }
      },
      include: {
         category: true
      }
   })

   return products
}

export default async function SearchPage(
   { searchParams }: { searchParams: Promise<{ search: string }> }
) {

   const { search } = await searchParams

   const products = await searchProducts(search)

   return (
      <>
         <Heading>Resultado de búqueda: <span className="text-indigo-700">{search}</span></Heading>

         <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
            <ProdcutSearchForm />
         </div>

         {products.length ? (
            <ProductTable
               products={products}
            />
         ) : (
            <p className="text-center mt-5">No hay resultados</p>
         )}


      </>
   )
}
