import {NextResponse} from "next/server"


import getCurrentUser from "E:/swiftrut/AIR_BNB-CL0NE/actions/getCurrentUser.ts"

import prisma from "E:/swiftrut/AIR_BNB-CL0NE/libs/prismadb.ts"

interface IParams{
    reservationId:string
}

export default async function DEELETE(
    request:Request,
    {params}:{params:IParams}
) {
    const currentUser =await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const {reservationId}=params;
    if(!reservationId || typeof reservationId != "string"){
        throw new Error("Invalid id")
    }

    const reservation=await prisma.reservation.deleteMany({
        where:{
            id:reservationId,
            OR:[
                {userId:currentUser.id},
                {listing:{userId:currentUser.id}}
        ]
        },
    })


    return NextResponse.json(reservation)
}