import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId} = auth()
        const body = await req.json();

        const {name} = body 

        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        if(!name){
            return new NextResponse("Nama E-Commerce Perlu Dimasukkan", {status:400})
        }

        const store = await db.store.create({
            data : {
                name,
                userId
            },
        });

     } catch (error) {
        console.log(["STORE_POST"], error)
        return new NextResponse("Internal Error", {status:500})
    }
}