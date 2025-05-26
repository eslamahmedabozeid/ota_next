import { EndpointConfig } from "@/types";
import * as queries from "./queries";

// Authentication endpoints
const auth: Record<string, EndpointConfig> = {
  [queries.LOGIN]: {
    url: "/v1/auth/login",
    config: {
      method: "POST",
    },
  },
  [queries.REGISTER]: {
    url: "/v1/auth/register",
    config: {
      method: "POST",
    },
  },
  [queries.PROFILE]: {
    url: "/v1/auth/profile",
    config: {
      method: "GET",
    },
  },
};

// Countries endpoints
const countries: Record<string, EndpointConfig> = {
  [queries.COUNTRIES]: {
    url: "/v1/countries",
    config: {
      method: "GET",
    },
  },
  [queries.COUNTRIES_CREATE]: {
    url: "/v1/countries",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.COUNTRIES_UPDATE]: {
    url: "/v1/countries/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.COUNTRIES_DELETE]: {
    url: "/v1/countries/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.COUNTRIES_DETAILS]: {
    url: "/v1/countries/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.COUNTRIES_UPLOAD_IMAGE]: {
    url: "/v1/countries/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};


const Services: Record<string, EndpointConfig> = {
  [queries.SERVICES]: {
    url: "/v1/Services",
    config: {
      method: "GET",
    },
  },
  [queries.SERVICES_CREATE]: {
    url: "/v1/Services",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.SERVICES_UPDATE]: {
    url: "/v1/Services/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.SERVICES_DELETE]: {
    url: "/v1/Services/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.SERVICES_DETAILS]: {
    url: "/v1/Services/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.SERVICES_UPLOAD_IMAGE]: {
    url: "/v1/Services/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};

// Partners endpoints
const Partners: Record<string, EndpointConfig> = {
  [queries.PARTNERS]: {
    url: "/v1/partners",
    config: {
      method: "GET",
    },
  },
  [queries.PARTNERS_CREATE]: {
    url: "/v1/partners",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.PARTNERS_UPDATE]: {
    url: "/v1/partners/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.PARTNERS_DELETE]: {
    url: "/v1/partners/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.PARTNERS_DETAILS]: {
    url: "/v1/partners/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.PARTNERS_UPLOAD_MEDIA]: {
    url: "/v1/partners/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};


// Rates endpoints
const Rates: Record<string, EndpointConfig> = {
  [queries.RATES]: {
    url: "/v1/rates",
    config: {
      method: "GET",
    },
  },
  [queries.RATES_CREATE]: {
    url: "/v1/rates",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.RATES_UPDATE]: {
    url: "/v1/rates/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.RATES_DELETE]: {
    url: "/v1/rates/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.RATES_DETAILS]: {
    url: "/v1/rates/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.RATES_UPLOAD_MEDIA]: {
    url: "/v1/rates/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};

// Settings endpoints
const settings: Record<string, EndpointConfig> = {
  [queries.SETTINGS]: {
    url: "/v1/general-settings",
    config: {
      method: "GET",
    },
  },
  [queries.SETTINGS_CREATE]: {
    url: "/v1/general-settings",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.SETTINGS_UPDATE]: {
    url: "/v1/general-settings/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.SETTINGS_DELETE]: {
    url: "/v1/general-settings/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.SETTINGS_DETAILS]: {
    url: "/v1/general-settings/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.SETTINGS_UPLOAD_MEDIA]: {
    url: "/v1/general-settings/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};


// Destinations endpoints
const destinations: Record<string, EndpointConfig> = {
  [queries.DESTINATIONS]: {
    url: "/v1/destinations",
    config: {
      method: "GET",
    },
  },
  [queries.DESTINATIONS_CREATE]: {
    url: "/v1/destinations",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.DESTINATIONS_UPDATE]: {
    url: "/v1/destinations/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.DESTINATIONS_DELETE]: {
    url: "/v1/destinations/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.DESTINATIONS_DETAILS]: {
    url: "/v1/destinations/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.DESTINATIONS_UPLOAD_IMAGE]: {
    url: "/v1/destinations/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};

// Destination places endpoints
const destinationPlaces: Record<string, EndpointConfig> = {
  [queries.DESTINATION_PLACES]: {
    url: "/v1/destination-places",
    config: {
      method: "GET",
    },
  },
  [queries.DESTINATION_PLACES_CREATE]: {
    url: "/v1/destination-places",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.DESTINATION_PLACES_UPDATE]: {
    url: "/v1/destination-places/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.DESTINATION_PLACES_DELETE]: {
    url: "/v1/destination-places/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.DESTINATION_PLACES_DETAILS]: {
    url: "/v1/destination-places/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.DESTINATION_PLACES_UPLOAD_IMAGE]: {
    url: "/v1/destination-places/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};

// Package categories endpoints
const packageCategories: Record<string, EndpointConfig> = {
  [queries.PACKAGE_CATEGORIES]: {
    url: "/v1/package-categories",
    config: {
      method: "GET",
    },
  },
  [queries.PACKAGE_CATEGORIES_CREATE]: {
    url: "/v1/package-categories",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.PACKAGE_CATEGORIES_UPDATE]: {
    url: "/v1/package-categories/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.PACKAGE_CATEGORIES_DELETE]: {
    url: "/v1/package-categories/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.PACKAGE_CATEGORIES_DETAILS]: {
    url: "/v1/package-categories/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.PACKAGE_CATEGORIES_UPLOAD_IMAGE]: {
    url: "/v1/package-categories/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};



// Tours endpoints
const tours: Record<string, EndpointConfig> = {
  [queries.TOURS]: {
    url: "/v1/tours",
    config: {
      method: "GET",
    },
  },
  [queries.TOURS_CREATE]: {
    url: "/v1/tours",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.TOURS_UPDATE]: {
    url: "/v1/tours/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.TOURS_DELETE]: {
    url: "/v1/tours/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.TOURS_DETAILS]: {
    url: "/v1/tours/{id}",
    config: {
      method: "GET",
    },
  },
};

// faqs endpoints
const faqs: Record<string, EndpointConfig> = {
  [queries.FAQS]: {
    url: "/v1/faq-categories",
    config: {
      method: "GET",
    },
  },
  [queries.Faqs_CREATE]: {
    url: "/v1/faq-categories",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.Faqs_UPDATE]: {
    url: "/v1/faq-categories/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.Faqs_DELETE]: {
    url: "/v1/faq-categories/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.Faqs_DETAILS]: {
    url: "/v1/faq-categories/{id}",
    config: {
      method: "GET",
    },
  },
};
// Activities endpoints
const activities: Record<string, EndpointConfig> = {
  [queries.ACTIVITIES]: {
    url: "/v1/activities",
    config: {
      method: "GET",
    },
  },
  [queries.ACTIVITIES_CREATE]: {
    url: "/v1/activities",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.ACTIVITIES_UPDATE]: {
    url: "/v1/activities/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.ACTIVITIES_DELETE]: {
    url: "/v1/activities/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.ACTIVITIES_DETAILS]: {
    url: "/v1/activities/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.ACTIVITIES_UPLOAD_IMAGE]: {
    url: "/v1/activities/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};

// Packages endpoints
const packages: Record<string, EndpointConfig> = {
  [queries.PACKAGES]: {
    url: "/v1/packages",
    config: {
      method: "GET",
    },
  },
  [queries.PACKAGES_CREATE]: {
    url: "/v1/packages",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.PACKAGES_UPDATE]: {
    url: "/v1/packages/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.PACKAGES_DELETE]: {
    url: "/v1/packages/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.PACKAGES_DETAILS]: {
    url: "/v1/packages/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.PACKAGES_FEATURED]: {
    url: "/v1/packages/featured",
    config: {
      method: "GET",
    },
  },
  [queries.PACKAGES_UPLOAD_IMAGE]: {
    url: "/v1/packages/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
  [queries.PACKAGES_ACTIVITIES]: {
    url: "/v1/packages/{id}/activities",
    config: {
      method: "GET",
    },
  },
  [queries.PACKAGES_ADD_ACTIVITY]: {
    url: "/v1/packages/{packageId}/activities/{activityId}",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.PACKAGES_REMOVE_ACTIVITY]: {
    url: "/v1/packages/{packageId}/activities/{activityId}",
    config: {
      method: "DELETE",
    },
  },
};

// Package programs endpoints
const packagePrograms: Record<string, EndpointConfig> = {
  [queries.PACKAGE_PROGRAMS]: {
    url: "/v1/package-programs",
    config: {
      method: "GET",
    },
  },
  [queries.PACKAGE_PROGRAMS_CREATE]: {
    url: "/v1/package-programs",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.PACKAGE_PROGRAMS_UPDATE]: {
    url: "/v1/package-programs/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.PACKAGE_PROGRAMS_DELETE]: {
    url: "/v1/package-programs/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.PACKAGE_PROGRAMS_DETAILS]: {
    url: "/v1/package-programs/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.PACKAGES_PROGRAMS_UPLOAD_IMAGE]: {
    url: "/v1/package-programs/upload-image",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};

// Static pages endpoints
const staticPages: Record<string, EndpointConfig> = {
  [queries.STATIC_PAGES]: {
    url: "/v1/static-pages",
    config: {
      method: "GET",
    },
  },
  [queries.STATIC_PAGES_CREATE]: {
    url: "/v1/static-pages",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.STATIC_PAGES_UPDATE]: {
    url: "/v1/static-pages/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.STATIC_PAGES_DELETE]: {
    url: "/v1/static-pages/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.STATIC_PAGES_DETAILS]: {
    url: "/v1/static-pages/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.STATIC_PAGES_BY_SLUG]: {
    url: "/v1/static-pages/slug/{slug}",
    config: {
      method: "GET",
    },
  },
  [queries.STATIC_PAGES_UPLOAD_MEDIA]: {
    url: "/v1/static-pages/upload-media",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};

// Cars endpoints
const cars: Record<string, EndpointConfig> = {
  [queries.CARS]: {
    url: "/v1/cars",
    config: {
      method: "GET",
    },
  },
  [queries.CARS_CREATE]: {
    url: "/v1/cars",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.CARS_UPDATE]: {
    url: "/v1/cars/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.CARS_DELETE]: {
    url: "/v1/cars/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.CARS_DETAILS]: {
    url: "/v1/cars/{id}",
    config: {
      method: "GET",
    },
  },
};

// Car categories endpoints
const carCategories: Record<string, EndpointConfig> = {
  [queries.CAR_CATEGORIES]: {
    url: "/v1/car-categories",
    config: {
      method: "GET",
    },
  },
  [queries.CAR_CATEGORIES_CREATE]: {
    url: "/v1/car-categories",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.CAR_CATEGORIES_UPDATE]: {
    url: "/v1/car-categories/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.CAR_CATEGORIES_DELETE]: {
    url: "/v1/car-categories/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.CAR_CATEGORIES_DETAILS]: {
    url: "/v1/car-categories/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.CAR_CATEGORIES_UPLOAD_ICON]: {
    url: "/v1/car-categories/upload-icon",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};

// Visa types endpoints
const visaTypes: Record<string, EndpointConfig> = {
  [queries.VISA_TYPES]: {
    url: "/v1/visa-types",
    config: {
      method: "GET",
    },
  },
  [queries.VISA_TYPES_CREATE]: {
    url: "/v1/visa-types",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.VISA_TYPES_UPDATE]: {
    url: "/v1/visa-types/{id}",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
  [queries.VISA_TYPES_DELETE]: {
    url: "/v1/visa-types/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.VISA_TYPES_DETAILS]: {
    url: "/v1/visa-types/{id}",
    config: {
      method: "GET",
    },
  },
};

// Request logs endpoints
const requestLogs: Record<string, EndpointConfig> = {
  [queries.REQUEST_LOGS]: {
    url: "/v1/request-logs",
    config: {
      method: "GET",
    },
  },
  [queries.REQUEST_LOGS_BY_REQUEST_NUMBER]: {
    url: "/v1/request-logs/reservation/{requestNumber}",
    config: {
      method: "GET",
    },
  },
  [queries.REQUEST_LOGS_DETAILS]: {
    url: "/v1/request-logs/{id}",
    config: {
      method: "GET",
    },
  },
};

// Reservations endpoints
const reservations: Record<string, EndpointConfig> = {
  [queries.RESERVATIONS]: {
    url: "/v1/reservations",
    config: {
      method: "GET",
    },
  },
  [queries.RESERVATIONS_CREATE]: {
    url: "/v1/reservations",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.RESERVATIONS_DELETE]: {
    url: "/v1/reservations/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.RESERVATIONS_DETAILS]: {
    url: "/v1/reservations/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.RESERVATIONS_MY_RESERVATIONS]: {
    url: "/v1/reservations/my-reservations",
    config: {
      method: "GET",
    },
  },
  [queries.RESERVATIONS_BY_TYPE]: {
    url: "/v1/reservations/type/{type}",
    config: {
      method: "GET",
    },
  },
  [queries.RESERVATIONS_UPDATE_STATUS]: {
    url: "/v1/reservations/{id}/status",
    config: {
      method: "PATCH",
      showToasts: true,
    },
  },
};

// Roles and permissions endpoints
const roles: Record<string, EndpointConfig> = {
  [queries.ROLES]: {
    url: "/roles",
    config: {
      method: "GET",
    },
  },
  [queries.ROLES_CREATE]: {
    url: "/roles",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.ROLES_UPDATE]: {
    url: "/roles/{id}",
    config: {
      method: "PUT",
      showToasts: true,
    },
  },
  [queries.ROLES_DELETE]: {
    url: "/roles/{id}",
    config: {
      method: "DELETE",
    },
  },
  [queries.ROLES_DETAILS]: {
    url: "/roles/{id}",
    config: {
      method: "GET",
    },
  },
  [queries.ROLES_WITH_PERMISSIONS]: {
    url: "/roles/{id}/permissions",
    config: {
      method: "GET",
    },
  },
  [queries.ROLES_ALL_PERMISSIONS]: {
    url: "/roles/permissions/all",
    config: {
      method: "GET",
    },
  },
  [queries.ROLES_ADD_PERMISSION]: {
    url: "/roles/{roleId}/permissions/{permissionId}",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [queries.ROLES_REMOVE_PERMISSION]: {
    url: "/roles/{roleId}/permissions/{permissionId}",
    config: {
      method: "DELETE",
    },
  },
};




// Other endpoints
const others: Record<string, EndpointConfig> = {
  [queries.USER]: {
    url: "/v1/user",
    config: {
      method: "GET",
    },
  },
  [queries.USER_CREATE]: {
    url: "/v1/auth/register",
    config: {
      method: "POST",
            showToasts: true,

    },
  },
  [queries.UPLOAD]: {
    url: "/upload",
    config: {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      showToasts: true,
    },
  },
};

const endpoints: Record<string, EndpointConfig> = {
  ...auth,
  ...countries,
  ...Services,
  ...Partners,
  ...Rates,
  ...settings,
  ...destinations,
  ...destinationPlaces,
  ...packageCategories,
  ...tours,
  ...faqs,
  ...activities,
  ...packages,
  ...packagePrograms,
  ...staticPages,
  ...cars,
  ...carCategories,
  ...visaTypes,
  ...requestLogs,
  ...reservations,
  ...roles,
  ...others,
};
export default endpoints;
