import {connectDB} from "@/lib/databaseConnection";
import {catchError} from "@/lib/helperFunctions";
import { cookies } from "next/headers";
import {response} from "@/lib/helperFunction";
export async function POST() {
    try{
      await connectDB()
      const cookieStore = await cookies()
      cookieStore.delete("auth_token")
      return response(true, 200, "Logout successfully!")
    }catch(error){
        catchError(error)
    }
}


