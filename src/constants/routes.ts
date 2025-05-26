import { tablesNames } from ".";

export type CrudRoutes = {
  index: string;
  create: string;
  edit: (id: string) => string;
};

// Define a base type for all routes
type BaseRoutesType = {
  [key: string]: CrudRoutes | Record<string, string>;
};

// Define a more specific type that enforces dashboard to be Record<string, string>
// and all other keys to be CrudRoutes
type RoutesType = BaseRoutesType & {
  dashboard: Record<string, string>;
};

// Create the routes object
const routesObj = {
  dashboard: {
    index: "/dashboard",
  },
  homeIndividual: {
    index: "/sections?page_slug=home&type=individual",
  },
  homeBusiness: {
    index: "/sections?page_slug=home-business&type=business",
  },
  aboutUsIndividual: {
    index: "/sections?page_slug=about-us&type=individual",
  },
  courseDiplomaIndividual: {
    index: "/sections?page_slug=courses-diploma&type=individual",
  },
  programsIndividual: {
    index: "/sections?page_slug=programs&type=individual",
  },
  newsIndividual: {
    index: "/news_section",
  },
  studentIndividual: {
    index: "/student",
  },
  contactUsIndividual: {
    index: "/contact",
  },
    countries: {
    index: "/countries",
    create: "/countries/create",
    edit: (id: string) => `/countries/edit/${id}`,
  },
    services: {
    index: "/services",
    create: "/services/create",
    edit: (id: string) => `/services/edit/${id}`,
  },
  destinations: {
    index: "/destinations",
    create: "/destinations/create",
    edit: (id: string) => `/destinations/edit/${id}`,
  },
  destination_places: {
    index: "/destination-places",
    create: "/destination-places/create",
    edit: (id: string) => `/destination-places/edit/${id}`,
  },
  package_categories: {
    index: "/package-categories",
    create: "/package-categories/create",
    edit: (id: string) => `/package-categories/edit/${id}`,
  },
  packages: {
    index: "/packages",
    create: "/packages/create",
    edit: (id: string) => `/packages/edit/${id}`,
  },
  package_programs: {
    index: "/package-programs",
    create: "/package-programs/create",
    edit: (id: string) => `/package-programs/edit/${id}`,
  },
  tours: {
    index: "/tours",
    create: "/tours/create", 
    edit: (id: string) => `/tours/edit/${id}`,
  },
  faqs: {
    index: "/faqs",
    create: "/faq/create", 
    edit: (id: string) => `/faqs/edit/${id}`,
  },
   partners: {
    index: "/partners",
    create: "/partners/create", 
    edit: (id: string) => `/partners/edit/${id}`,
  },
   rates: {
    index: "/rates",
    create: "/rates/create", 
    edit: (id: string) => `/rates/edit/${id}`,
  },
  activities: {
    index: "/activities",
    create: "/activities/create",
    edit: (id: string) => `/activities/edit/${id}`,
  },
  cars: {
    index: "/cars",
    create: "/cars/create",
    edit: (id: string) => `/cars/edit/${id}`,
  },
  car_categories: {
    index: "/car-categories",
    create: "/car-categories/create",
    edit: (id: string) => `/car-categories/edit/${id}`,
  },
  visa_types: {
    index: "/visa-types",
    create: "/visa-types/create",
    edit: (id: string) => `/visa-types/edit/${id}`,
  },
  request_logs: {
    index: "/request-logs",
    details: (id: string) => `/request-logs/${id}`,
  },
  reservations: {
    index: "/reservations",
    create: "/reservations/create",
    edit: (id: string) => `/reservations/edit/${id}`,
  },
  static_pages: {
    index: "/static-pages",
    create: "/static-pages/create",
    edit: (id: string) => `/static-pages/edit/${id}`,
  },
  users: {
    index: "/users",
    create: "/users/create",
    edit: (id: string) => `/users/edit/${id}`,
  },
  roles: {
    index: "/roles",
    create: "/roles/create",
    edit: (id: string) => `/roles/edit/${id}`,
  },
  settings: {
    index: "/settings",
    create: "/settings/create", 
    edit: (id: string) => `/settings/edit/${id}`,
  },
  
};

// Use a type assertion to tell TypeScript that our object matches the expected type
export const routes = routesObj;
//export const routes = routesObj as RoutesType;
