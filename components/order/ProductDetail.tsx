import { useStore } from "@/src/store";
import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

type ProductDetailProps = {
   item: OrderItem
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export default function ProductDetail({ item }: ProductDetailProps) {

   const increaseQueantity = useStore((state) => state.increaseQueantity)
   const decreaseQueantity = useStore((state) => state.decreaseQueantity)
   const removeItem = useStore((state) => state.removeItem)
   const disableDecreaseQuentity = useMemo(() => item.quantity === MIN_ITEMS, [item])
   const disableIncreaseQuentity = useMemo(() => item.quantity === MAX_ITEMS, [item])

   return (
      <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
         <div className="space-y-4">
            <div className="flex justify-between items-start">
               <p className="text-xl font-bold">{item.name} </p>

               <button
                  type="button"
                  onClick={() => removeItem(item.id)}
               >
                  <XCircleIcon className="text-red-600 h-8 w-8" />
               </button>
            </div>
            <p className="text-2xl text-amber-500 font-black">
               {formatCurrency(item.price)}
            </p>
            <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
               <button
                  type="button"
                  onClick={() => decreaseQueantity(item.id)}
                  disabled={disableDecreaseQuentity}
                  className="disabled:opacity-20"
               >
                  <MinusIcon className="h-6 w-6" />
               </button>

               <p className="text-lg font-black ">
                  {item.quantity}
               </p>

               <button
                  type="button"
                  onClick={() => increaseQueantity(item.id)}
                  disabled={disableIncreaseQuentity}
                  className="disabled:opacity-20"
               >
                  <PlusIcon className="h-6 w-6" />
               </button>
            </div>
            <p className="text-xl font-black text-gray-700">
               Subtotal: {''}
               <span className="font-normal">
                  {formatCurrency(item.subtotal)}
               </span>
            </p>
         </div>
      </div>
   )
}
