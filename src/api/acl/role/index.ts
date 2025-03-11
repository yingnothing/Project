import request from "../../../utils/request";
import { roleResponseData,roleData,permissionResponseData } from "./type";
enum API{
    reqRoleData_API='/admin/acl/role/',
    reqAddRole_API='/admin/acl/role/save',
    reqUpdateRole_API='/admin/acl/role/update',
    reqPermissionData_API='/admin/acl/permission/toAssign/',
    reqSetPermission_API='/admin/acl/permission/doAssign/?',
    reqDeleteRole_API='/admin/acl/role/remove/'
}
export const reqRoleData=(pageNo:number,limit:number,roleName:string)=>{
    return request.get<any,roleResponseData>(API.reqRoleData_API+`${pageNo}/${limit}/?roleName=${roleName}`)
}
export const reqAddOrUpdateRole=(data:roleData)=>{
    if(data.id){
        return request.put(API.reqUpdateRole_API,data)
    }else{
        return request.post(API.reqAddRole_API,data)
    }
    
}
export const reqPermissionData=(roleId:number)=>{
    return request.get<any,permissionResponseData>(API.reqPermissionData_API+roleId)
}

export const  reqSetPermission=(roleId:number,permissionId:number[])=>{
    return request.post<any,any>(API.reqSetPermission_API+`roleId=${roleId}&permissionId=${permissionId}`)
}
// 删除职位
export const reqDeleteRole=(roleId:number)=>{
    return request.delete<any,any>(API.reqDeleteRole_API+roleId)
}