import prisma from "../libs/prismadb.ts"


export interface IlistingParams{
    userId?:string
}

export default async function getListing(
    params:IlistingParams
) {
    try {
        const {userId}=params;
        let query :any={};
        if(userId){
            query.userId=userId
        }
        const listings=await prisma.listing.findMany({
            where:query,
            orderBy:{
                createdAt:"desc"
            }
        })
    const safeListings =listings.map((listing)=>({
        ...listing,
        createdAt:listing.createdAt.toISOString(),
    }))

    return safeListings;
    } catch (error :any) {
        throw new Error(error)
    }
}