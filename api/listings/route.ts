import {NextResponse} from "next/server"
import prisma from "E:/swiftrut/AIR_BNB-CL0NE/libs/prismadb.ts"
import getCurrentUser from "E:/swiftrut/AIR_BNB-CL0NE/actions/getCurrentUser.ts"


export async function  POST(
    request:Request
) {
    const currentUser= await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const body= await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue,
        price
    } =body;


Object.keys(body).forEach((value:any)=>{
if(!body[value]){
    NextResponse.error();
}
});

const listing=await prisma.listing.create({
    data:{
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue,
        price:parseInt(price,10),
        userId :currentUser.id
    }
})

return NextResponse.json(listing);
}