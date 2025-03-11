
export interface responseData{
    "code": number,
    "message": string,
    "ok": boolean
}
export interface permissionData{
    "id": number,
    "createTime":string,
    "updateTime": string,
    "pid": number,
    "name": string,
    "code": string,
    "toCode": string,
    "type": number,
    "status": null,
    "level": number,
    "children"?: permissionData[],
    "select": false
}
export type permissionDataList=permissionData[]
export interface permissionResponseData extends responseData{
    data:permissionDataList
}
// 添加菜单或修改菜单
export interface MenuParams{
    id?:number,
    code:string,
    level:number,
    name:string,
    pid:number
}
