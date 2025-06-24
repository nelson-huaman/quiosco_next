import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFount() {
   return (
      <div className="text-center">
         <Heading>Prodcuto No Encontrado</Heading>
         <Link
            href={'/admin/products'}
            className="bg-amber-500 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
         >Ir a Productos</Link>
      </div>
   )
}
