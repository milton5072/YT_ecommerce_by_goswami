import { connectDB } from "@/lib/databaseConnection";
import { response, catchError } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import optModel from "@/models/Otp.model";
export async function POST(request){
  try{
    await connectDB()
    const payload = await request.json()
    const validationSchema = zSchema.pick({
      email:true,
      otp:true
    })
    const validatedData = validationSchema.safeParse(payload)
    if(!validatedData.success){
      return response(false,401,"Invalid or missing input field.",{
        errors:validatedData.error.errors
      })
    }
    const {email,otp} = validatedData.data
    const getOtpData = await optModel.findOne({email,otp}) 
    if(!getOtpData){
      return response(false,404,"Invalid or expaired OTP.",{})
    }
    const getUser = await UserModel.findOne({email, deletedAt:null})
  }catch(error){
    return catchError(error,"Database connection failed.")
    
  }
}