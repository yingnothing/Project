// 账号信息的ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
// 代表一个账号信息的ts类型
export interface User{
    // 添加用户则没有
    id?: number,
    createTime?: string
    updateTime?: string,
    username?: string,
    password?: string,
    name?: string,
    phone?: null,
    roleName?: string
}
export type Records=User[]
// 获取全部用户信息接口返回的数据ts类型
export interface UserResponseData extends ResponseData{
    data:{
        records:Records,
        "total": number,
        "size": number,
        "current": number,
        "pages": number
    }
}

// 用户角色数据类型
export interface userRole{
    "id"?: number,
    "createTime"?: string,
    "updateTime"?:string,
    "roleName": string,
    "remark": null
}
// 一个角色所拥有的角色类型
export type userRoleArr=userRole[]
export interface userRoleResponseData extends ResponseData{
    data:{
        "assignRoles":userRoleArr,
        "allRolesList":userRoleArr
    }
}
// 修改用户角色
export interface setRoleData{
    "roleIdList": number[]
    "userId": number
  }
