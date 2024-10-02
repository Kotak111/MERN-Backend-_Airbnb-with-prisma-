import {NextResponse} from "next/server"
import prisma from "E:/swiftrut/AIR_BNB-CL0NE/libs/prismadb"
import getCurrentUser from "E:/swiftrut/AIR_BNB-CL0NE/actions/getCurrentUser.ts"


export default async function POST(
    request:Request
) {
    const currentUser=await getCurrentUser();


    if(!currentUser){
        return NextResponse.error();
    }
    const body=await request.json();

    const {
        listingId,
        startDate,
        endDate,
        totalprice
    } =body;

    if(!listingId || !startDate || !endDate || !totalprice){
        return NextResponse.error();
    }

    const listingAndReservation =await prisma.listing.update({
        where:{
            id:listingId
        },
        data:{
            reservations:{
                create:{
                    userId:currentUser.id,
                    startDate,
                    endDate,
                    totalprice
                }
            }
        }
    })
    return NextResponse.json(listingAndReservation);
}