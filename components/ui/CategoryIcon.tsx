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
      <div className={`${category.slug === params.category ? 'bg-amber-500' : ''} flex items-center gap-4 w-full border-t border-gray-300 p-3 last-of-type:border-b`}>
         <div className="w-10 h-10 relative">
            <Image
               fill
               src={`/icon_${category.slug}.svg`}
               alt={`Imagen Categoria ${category.name}`}
            />
         </div>
         <Link
            className="text-xl font-bold"
            href={`/order/${category.slug}`}
         >
            {category.name}
         </Link>
      </div>
   )
}
