import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dinamyc'

export async function GET() {
   const orders = await prisma.order.findMany({
      where: {
         status: false
      },
      include: {
         orderProducts: {
            include: {
               Product: true
            }
         }
      }
   })
   
   return Response.json(orders)
}