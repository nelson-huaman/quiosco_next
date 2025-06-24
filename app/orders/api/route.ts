import { prisma } from "@/src/lib/prisma";

export const dynamic = 'force-dinamyc'

export async function GET() {
   const orders = await prisma.order.findMany({
      take: 5,
      where: {
         orderReadyAt: {
            not: null
         }
      },
      orderBy: {
         orderReadyAt: 'desc'
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