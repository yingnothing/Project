// 品牌管理相关的接口
import request from "../../../utils/request";
enum API{
    // 已提供的接口
    TRADEMARK_API='/admin/product/baseTrademark'
}
// 获取接口数据的方法，page--要第几页，limit--获取几个已有品牌的数据，记得写return返回
export  const reqBaseTrademark=async (page:number,limit:number)=>{
    return await request.get(API.TRADEMARK_API+`/${page}/${limit}`)        
}