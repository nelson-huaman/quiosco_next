"use client"

import { useRouter } from "next/navigation";

export default function GoBackButton() {

   const router = useRouter()

   return (
      <button
         onClick={() => router.back()}
         className="bg-amber-500 w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer"
      >Volver</button>
   )
}
