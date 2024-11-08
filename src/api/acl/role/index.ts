import request from "../../../utils/request";
import { roleResponseData,roleData } from "./type";
enum API{
    reqRoleData_API='/admin/acl/role/',
    reqAddRole_API='/admin/acl/role/save',
    reqUpdateRole_API='/admin/acl/role/update'
}
export const reqRoleData=(pageNo=1,limit:number,roleName:string)=>{
    return request.get<any,roleResponseData>(API.reqRoleData_API+`${pageNo}/${limit}/?roleName=${roleName}`)
}
export const reqAddOrUpdateRole=(data:roleData)=>{
    if(data.id){
        return request.put(API.reqUpdateRole_API,data)
    }else{
        return request.post(API.reqAddRole_API,data)
    }
    
}
