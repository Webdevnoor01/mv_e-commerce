import { allNav } from "./allNav"
export const getNavs = (role) =>{
    return allNav.filter(navItem => navItem.role.includes(role))
}