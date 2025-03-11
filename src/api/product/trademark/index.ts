// 品牌管理相关的接口
import request from "../../../utils/request";
enum API{
    // 已提供的接口
    TRADEMARK_API='/admin/product/baseTrademark',
    ADD_TRADEMARK_API='/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_API='/admin/product/baseTrademark/update',
    REMOVE_TRADEMARK_API='/admin/product/baseTrademark/remove'
}
// 获取接口数据的方法，page--要第几页，limit--获取几个已有品牌的数据，记得写return返回，切记切记
export  const reqBaseTrademark=async (page:number,limit:number)=>{
    return await request.get(API.TRADEMARK_API+`/${page}/${limit}`)        
}
// 向服务器添加商品
export const addTrademark=async (data:any)=>{
    return await request.post(API.ADD_TRADEMARK_API,data)
}
// 修改商品信息
export const editTrademark=async (data:any)=>{
    return await request.put(API.UPDATE_TRADEMARK_API,data)
}
// 移除商品
export const removeTrademark:any=async(id:any)=>{
    return await request.delete(API.REMOVE_TRADEMARK_API+`/${id}`)
}