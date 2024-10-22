// 品牌管理相关的接口
import request from "../../../utils/request";
enum API{
    getCategory1_API='/admin/product/getCategory1',
    getCategory2_API='/admin/product/getCategory2/',
    getCategory3_API='/admin/product/getCategory3/',
    getCategoryList_API='/admin/product/attrInfoList/',
    ADDORUPDATEATTR_API='/admin/product/saveAttrInfo'
}
export const getCategory1=async ()=>{
    return await request.get(API.getCategory1_API)
}
export const getCategory2=async(id:string)=>{
    return await request.get(API.getCategory2_API+id)
}
export const getCategory3=async(id:string)=>{
    return await request.get(API.getCategory3_API+id)
}
export const getCategoryList=async(id1:string,id2:string,id3:string)=>{
    return await request.get(API.getCategoryList_API+`${id1}/${id2}/${id3}`)
}
export const reqAddOrUpdateAttr=async(data:any)=>{
    return await request.post(API.ADDORUPDATEATTR_API,data)
}

