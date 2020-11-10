import {store} from './store';


export const guards = {
    isAuthenticated: (to, from, next) => {
        if(store.state.auth !== null){
            next();
        } else{
            next('/user/login')
        }
    },
    isAdmin :(to, from, next) => {
        if(store.state.auth.userr.role === "Admin"){
            next();
        }else{
            next("/user/login");
        }
    },
    isVillage :(to, from, next) => {
        if(store.state.auth.userr.registrant.reg_Category === "VILLAGE_LEADER"){
            next();
        }else{
            next('/user/login')
        }
    }

}