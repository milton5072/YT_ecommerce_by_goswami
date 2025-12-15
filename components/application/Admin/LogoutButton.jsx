import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import { IoLogOutOutline } from "react-icons/io5";
import {showToast} from "@/lib/showToast"
import axios from "axios";

const LogoutButton = () => {
  // still missing some function see video 5.41.54
  const handleLogout = async ()=>{
    try{
      const {data:logoutResponse} = await axios.post('api/auth/logout')
      if(!logoutResponse.success){
        throw new Error(logoutResponse.message)
      }
      showToast("success", logoutResponse.message)
    }catch(error){
      showToast("error", error.message)
    }
  }
    return <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <IoLogOutOutline color="red"/>
            Logout
        </DropdownMenuItem>;
};

export default LogoutButton;