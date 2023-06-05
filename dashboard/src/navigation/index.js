import { allNavs } from "./allNav"
export const getNavs = (role) =>{
    return allNavs.filter(navItem => navItem.role.includes(role))
}