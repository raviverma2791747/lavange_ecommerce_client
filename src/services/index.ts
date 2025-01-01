// import AuthService from "./public/auth";
// import OpportunityPrivateService from "./private/opportunity";
// import CountryPrivateService from "./private/country";
// import CityPrivateService from "./private/city";
// import StatePrivateService from "./private/state";
// import OrganizationPrivateService, { BusinessPrivateService } from "./private/organization";
// import UserPrivateService from "./private/user";
// import CityService from "./public/city";
// import CountryService from "./public/country";
// import StateService from "./public/state";
// import OpportunityService from "./public/opportunity";
// import { BusinessService } from "./public/organization";

import CheckoutPrivateService from "./private/checkout";
import UserPrivateService from "./private/user";
import CategoryService from "./public/category";
import CollectionService from "./public/collection";
import { HelpConfigService, HomeConfigService, PolicyConfigService } from "./public/config";
import ProductService from "./public/product";
import UserService from "./public/user";

// export const authService = new AuthService();
// export const opportunityService = new OpportunityService();
// export const countryService = new CountryService();
// export const stateService = new StateService();
// export const cityService = new CityService();
// export const businessService = new BusinessService();

// export const userPrivateService = new UserPrivateService();
// export const opportunityPrivateService = new OpportunityPrivateService();
// export const countryPrivateService = new CountryPrivateService();
// export const cityPrivateService = new CityPrivateService();
// export const statePrivateService = new StatePrivateService();
// export const organizationPrivateService = new OrganizationPrivateService();
// export const businessPrivateService = new BusinessPrivateService();



export const productService = new ProductService();
export const homeConfigService = new HomeConfigService();
export const categoryService = new CategoryService();
export const collectionService = new CollectionService();
export const helpConfigService = new HelpConfigService();
export const policyConfigService = new PolicyConfigService();
export const userService = new UserService();

export const userPrivateService = new UserPrivateService();
export const checkoutPrivateService = new CheckoutPrivateService();