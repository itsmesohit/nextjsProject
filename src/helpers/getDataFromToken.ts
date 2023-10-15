
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
    try{
        const tokenEncoded = req.cookies.get("token")?.value || '' ;

        const tokenDecoded:any = jwt.verify(tokenEncoded, process.env.TOKEN_SECRET!);
        return tokenDecoded.id;
       
    }catch(error: any){
        throw new Error(error.message);
    }

}
