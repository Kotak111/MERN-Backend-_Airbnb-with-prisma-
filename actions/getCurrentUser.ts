import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/[...nextauth].ts";
import prisma from "../libs/prismadb.ts"


export async function getSesssion() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session= await getSesssion();
        if(!session?.user?.email){
            return null;
        }
        const currentUser= await prisma.user.findUnique({
            where:{
                email:session.user.email as string
            }
        });
        if(!currentUser){
            return null;
        }
        return {
            ...currentUser,
            createdAt:currentUser.createdAt.toISOString(),
            updatedAt:currentUser.updatedAt.toISOString(),
            emailVerified:currentUser.emailVerified?.toISOString() || null
        }
    } catch (error :any) {
        return null;
    }
}
