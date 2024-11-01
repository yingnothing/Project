import request from "../../../utils/request";
import type { UserResponseData } from "./type";
enum API{
    reqAllUser_API='/admin/acl/user/'
}
export const reqAllUser=(page:number,limit:number)=>{
    return request.get<any,UserResponseData>(API.reqAllUser_API+`${page}/${limit}`)
}