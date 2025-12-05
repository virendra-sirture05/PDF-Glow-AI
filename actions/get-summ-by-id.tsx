"use server"

import { prisma } from "@/lib/prisma";

export const getSummById = async(id : string)=>{
    try {
        const summary = await prisma.pdfSummary.findUnique({
            where : {
                id : id
            }
        })
        return summary;
    } catch (error) {
        console.log(error);
    }
}