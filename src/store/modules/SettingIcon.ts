// 设置折叠
import { defineStore } from "pinia";
const useSettingIconStore = defineStore('settingIcon', {
    state: () => {
        return {
            fold:false,
            clickRefresh:true
        }
    },
    actions: {
        changeFold(){
            this.fold=!this.fold
        },
        refresh(){
            this.clickRefresh=!this.clickRefresh
        }
    }
})
export default useSettingIconStore