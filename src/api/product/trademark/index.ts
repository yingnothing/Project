// 品牌管理相关的接口
import request from "../../../utils/request";
enum API{
    // 已提供的接口
    TRADEMARK_API='/admin/product/baseTrademark',
    ADD_TRADEMARK_API='/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_API='/admin/product/baseTrademark/update'
}
// 获取接口数据的方法，page--要第几页，limit--获取几个已有品牌的数据，记得写return返回，切记切记
export  const reqBaseTrademark=async (page:number,limit:number)=>{
    return await request.get(API.TRADEMARK_API+`/${page}/${limit}`)        
}
// 向服务器添加商品
export const addTrademark=(data:any)=>{
    return request.post(API.ADD_TRADEMARK_API,data)
}
// 修改商品信息
export const editTrademark=(data:any)=>{
    return request.put(API.UPDATE_TRADEMARK_API,data)
}