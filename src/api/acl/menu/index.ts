import request from "../../../utils/request";
import { permissionResponseData,MenuParams } from "./type";
enum API{
    reqAllPermission_API='/admin/acl/permission',
    reqAddPermission_API='/admin/acl/permission/save',
    reqUpdatePermission_API='/admin/acl/permission/update',
    reqRemovePermission_API='/admin/acl/permission/remove/'
}

export const reqAllPermission=()=>{
    return request.get<any,permissionResponseData>(API.reqAllPermission_API)
}
// 添加
export const reqAddPermission = (data:MenuParams)=>{
    return request.post(API.reqAllPermission_API,data)
}
// 更新
export const  reqUpdatePermission = (data:MenuParams)=>{
    return request.post(API.reqUpdatePermission_API,data)
}
// 删除
export const reqRemovePermission=(id:number)=>{
 return request.delete(API.reqRemovePermission_API+id)
}