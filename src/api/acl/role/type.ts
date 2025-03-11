export interface responseData{
    "code": number,
    "message": string,
    "ok": boolean
}
export interface roleData {
    "id"?: number,
    "createTime"?: string,
    "updateTime"?:string,
    "roleName": string,
    "remark"?: null
}
export type roleRecords=roleData[]
export interface roleResponseData extends responseData{
    data:{
         "records":roleRecords
         "total": number,
         "size": number,
         "current": number,
         "orders": [],
         "optimizeCountSql": boolean,
         "hitCount": boolean,
         "countId": null,
         "maxLimit": null,
         "searchCount": boolean,
         "pages": number
    }
   
}
// 权限部分
export interface permissionData{
    "id": number,
    "createTime": string,
    "updateTime":string,
    "pid": number,
    "name": string,
    "code": null,
    "toCode": null,
    "type": number,
    "status": null,
    "level": number,
    "children"?: permissionData[],
    "select": boolean
}
export type permissionDataArr=permissionData[]
export interface permissionResponseData extends responseData{
    data:permissionDataArr
}