import request from "../../../utils/request";
enum API{
    reqBaseSPUData_API='/admin/product/',
    // 获取修改部分的spu品牌的下拉菜单
    reqAllTrademark_API='/admin/product/baseTrademark/getTrademarkList',
    // 获取某个spu品牌的照片列表，用于照片墙
    reqImageList_API='/admin/product/spuImageList/',
    // 获取某一个SPU下全部的己有的销售属性接口地址，不太清楚，拿不到数据
    reqSpuHasSaleAttr_API='/admin/product/spuSaleAttrList/',
    //获取整个项目全部的销售属性[颜色、版本、尺码]
    reqAllSaleAttr_API='/admin/product/baseSaleAttrList',
    // 添加一个SPU，卡片里面的数据
    reaAddSPU_API='/admin/product/saveSpuInfo',
    // 更新一个SPU，需要带id
    reqUpdateSPU_API='/admin/product/updateSpuInfo'
}

// page为第几页，limit为一页要多少，categoryId为要哪个品牌的数据
export const reqBaseSPUData=async (page:number,limit:number,category3Id:number|string)=>{
    return await request.get(API.reqBaseSPUData_API+`${page}/${limit}?category3Id=${category3Id}`)
}
    // 获取修改部分的spu品牌的下拉菜单
export const reqAllTrademark=async()=>{
    return  await request.get(API.reqAllTrademark_API)
}
    // 获取某个spu品牌的照片列表，用于照片墙
export const reqImageList=async(spuId:number|string)=>{
    return await request.get(API.reqImageList_API+spuId)
}
export const reqSpuHasSaleAttr=async(spuId:number|string)=>{
    return await request.get(API.reqSpuHasSaleAttr_API+spuId)
}
    //获取整个项目全部的销售属性[颜色、版本、尺码]
export const reqAllSaleAttr=async()=>{
    return await request.get(API.reqAllSaleAttr_API)
}
// 添加SPU或者修改SPU
export const reaAddOrUpdateSPU=async(data:any)=>{
    if(data.id){
        return await request.post(API.reqUpdateSPU_API,data)
    }
    else{
        return await request.post(API.reaAddSPU_API,data)
    }
}