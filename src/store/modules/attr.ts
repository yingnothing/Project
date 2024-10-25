import { defineStore } from "pinia";
import { getCategory1, getCategory2, getCategory3, getCategoryList } from "../../api/product/attr";
interface CategoryItem {
    id: number;
    createTime: string;
    updateTime: string;
    name: string;
}
export const useAttrStore = defineStore('Attr', {
    state: () => {
        return {
            // 存放请求发回来的数据
            categoryOneData: [] as CategoryItem[],
            categoryTowData: [] as CategoryItem[],
            categoryThreeData: [] as CategoryItem[],
            categoryList:[],
            // 存储各个分类选择的元素的id
            selectOne: '',
            selectTow: '',
            selectThree: '',
        }
    },
    actions: {
        async getC1() {
            const res: any = await getCategory1()
            if (res.code === 200) {
                this.categoryOneData = res.data
            }
        },
        async getC2() {
            const res: any = await getCategory2(this.selectOne)
            if (res.code === 200) {
                this.categoryTowData = res.data
            }
        },
        async getC3() {
            const res: any = await getCategory3(this.selectTow)
            if (res.code === 200) {
                this.categoryThreeData = res.data
            }
        },
        async getCL(){
            const res=await getCategoryList(this.selectOne.toString(),this.selectTow.toString(),this.selectThree.toString())
            this.categoryList=res.data
        },
    }
})