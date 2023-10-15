import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connect();

export async function POST(req: NextRequest) {
    try{
        const reqBody = await req.json();
        const {email, password, token} = reqBody;
        console.log(token);
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        if(user!) {
            return NextResponse.json({
                error : "Invalid token"}, {status: 400});;  
        }
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message: "User verified",
            success: true,
        })
        
    }catch(e : any)
    {
        return NextResponse.json({error: e.message}, {status: 500})

    }

}