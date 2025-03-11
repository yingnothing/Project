import { useUserStore } from "../store/modules/user";
import pinia from "../store";
const userStore=useUserStore(pinia)
export function hasButton(app:any){
    app.directive('has',{
        mounted(el:any,options:any){
            console.log(el);
            console.log(options);
            if(!userStore.buttonArry.includes(options.value)){
                el.parentNode.removeChild(el)
            }
        }
    })
}