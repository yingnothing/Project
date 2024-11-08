import request from "../../../utils/request";
import type { UserResponseData,User,userRoleResponseData,setRoleData } from "./type";
enum API{
    reqAllUser_API='/admin/acl/user/',
    reqUpdateUser_API='/admin/acl/user/update',
    reqAddUser_API='/admin/acl/user/save',
    reqUserRole_API='/admin/acl/user/toAssign/',
    reqSetUserRole_API='/admin/acl/user/doAssignRole',
    reqRemoveUser_API='/admin/acl/user/remove/',
    reqBatchRemoveUser_API='/admin/acl/user/batchRemove',
}
// 请求所有用户信息
export const reqAllUser=(page:number,limit:number,keyValue:string)=>{
    return request.get<any,UserResponseData>(API.reqAllUser_API+`${page}/${limit}/?username=${keyValue}`)
}
export const reqpdateOrAddUser=(data:User)=>{
    if(data.id){
        // 修改用户
        return request.put(API.reqUpdateUser_API,data)
    }else{
        // 添加用户
        return request.post(API.reqAddUser_API,data)
    }
}
// 根据用户id获取用户职位信息
export const  reqUserRole=(userId:number|string)=>{
    return request.get<any,userRoleResponseData>(API.reqUserRole_API+userId)
}
// 修改用户角色
export const reqSetUserRole=(data:setRoleData)=>{
    return request.post(API.reqSetUserRole_API,data)
}
// 删除用户
export const  reqRemoveRole=(id:number)=>{
    return request.delete<any,any>(API.reqRemoveUser_API+id)
}
export const batchRemoveUser=(idList:number[])=>{
    return request.delete(API.reqBatchRemoveUser_API,{data:idList})
}