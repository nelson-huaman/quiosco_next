import { OrderWithProducts } from "@/src/types"

type LatestOrderItemProps = {
   order: OrderWithProducts
}

export default function LatestOrderItem({ order }: LatestOrderItemProps) {
   return (
      <div className="bg-white shadow p-5 space-y-5 rounded-lg">
         <p className="text-2xl font-bold text-slate-600">
            Cliente: {order.name}
         </p>
         <ul
            className=""
            role="list"
         >
            {order.orderProducts.map(product => (
               <li
                  key={product.id}
                  className="flex py-4 text-lg"
               >
                  <p>
                     <span className="font-bold">
                        ({product.quantity}) {''}
                     </span>
                     {product.Product.name}
                  </p>
               </li>
            ))}
         </ul>
      </div>
   )
}
