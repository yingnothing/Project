// 设置折叠
import { defineStore } from "pinia";
const useSettingIconStore = defineStore('settingIcon', {
    state: () => {
        return {
            fold:false
        }
    },
    actions: {
        changeFold(){
            this.fold=!this.fold
        }
    }
})
export default useSettingIconStore