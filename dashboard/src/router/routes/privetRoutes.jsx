import { sellerRoutes } from "./sellerRoutes";
import { adminRoutes } from "./adminRoutes";

export const privetRoutes = [...sellerRoutes, ...adminRoutes];
