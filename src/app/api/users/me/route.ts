import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { get } from "https";

connect();

export async function GET(req: NextRequest) {
    try{
        const uderID = await getDataFromToken(req);
        const user = await User.findOne({_id: uderID}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        })

    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }

}