
// 返回的数据类型
export interface ResponseTrademark{
    code:number,
    message:string,
    ok:boolean
}
// records里面的数据类型
export interface Trademark{
    // 添加时不需要加上id
    id?:number
    tmName:string
    logUrl:string
}
// 一个对象数组
export type Records=Trademark[]
// 最完整的
export interface ResponseTrademarkData extends ResponseTrademark{
    data:{
        records:Records
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