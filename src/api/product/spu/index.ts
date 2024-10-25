import request from "../../../utils/request";
enum API{
    reqBaseSPUData_API='/admin/product/'
}
// page为第几页，limit为一页要多少，categoryId为要哪个品牌的数据
export const reqBaseSPUData=async (page:number,limit:number,category3Id:number|string)=>{
    return await request.get(API.reqBaseSPUData_API+`${page}/${limit}?category3Id=${category3Id}`)
}