"use client"

import { useStore } from "@/src/store"
import ProductDetail from "./ProductDetail"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

   const order = useStore((state) => state.order)
   const clearOrder = useStore((state) => state.clearOrder)

   const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

   const handleCreateorder = async (formData: FormData) => {

      const data = {
         name: formData.get('name'),
         total,
         order
      }

      const result = OrderSchema.safeParse(data)
      if (!result.success) {
         result.error.issues.forEach(issue => {
            toast.error(issue.message)
         })
         return
      }

      const response = await createOrder(data)
      if (response?.errors) {
         response.errors.forEach(issue => {
            toast.error(issue.message)
         })
      }

      toast.success('Pedido realizado')
      clearOrder()
   }

   return (
      <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
         <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
         {order.length === 0 ? (
            <p className="text-center my-10">El pedido esta vacio</p>
         ) : (
            <div className="mt-5">
               {order.map(item => (
                  <ProductDetail
                     key={item.id}
                     item={item}
                  />
               ))}
               <p className="text-2xl mt-10 text-center">
                  Total a pagar: {''}
                  <span className="font-bold">{formatCurrency(total)}</span>
               </p>
               <form
                  className="w-full mt-10 space-y-5"
                  action={handleCreateorder}
               >
                  <input
                     type="text"
                     placeholder="Tu nombre"
                     name="name"
                     className="bg-white border border-gray-300 p-2 w-full"
                  />

                  <input
                     type="submit"
                     value="Confimar Pedido"
                     className="text-white py-2 rounded uppercase bg-black w-full text-center font-bold cursor-pointer"
                  />
               </form>
            </div>
         )}
      </aside>
   )
}
