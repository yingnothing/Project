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
