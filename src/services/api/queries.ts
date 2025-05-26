import { tablesNames } from "@/constants";
import { CrudOperation } from "@/types";
import { ST } from "next/dist/shared/lib/utils";

export const LOGIN = "login";
export const REGISTER = "register";
export const PROFILE = "getProfile";

// Pages queries Dosnt Work
export const PAGES = "updateProfile";
export const SECTIONS = "updateProfile";
export const SECTIONS_CREATE = "updateProfile";
export const SECTIONS_UPDATE = "updateProfile";
export const SECTIONS_DELETE = "updateProfile";
export const USERS_UPDATE = "updateProfile";
export const USER_CREATE = "createProfile";
export const PAGES_UPDATE = "updateProfile";

// Countries queries
export const COUNTRIES = "getAllCountries";
export const COUNTRIES_CREATE = "createCountry";
export const COUNTRIES_UPDATE = "updateCountry";
export const COUNTRIES_DELETE = "deleteCountry";
export const COUNTRIES_DETAILS = "getCountryById";
export const COUNTRIES_UPLOAD_IMAGE = "uploadCountryImage";


// Services queries
export const SERVICES = "getAllServices";
export const SERVICES_CREATE = "createServices";
export const SERVICES_UPDATE = "updateServices";
export const SERVICES_DELETE = "deleteServices";
export const SERVICES_DETAILS = "getServicesById";
export const SERVICES_UPLOAD_IMAGE = "uploadServicesImage";

// Destinations queries
export const DESTINATIONS = "getAllDestinations";
export const DESTINATIONS_CREATE = "createDestination";
export const DESTINATIONS_UPDATE = "updateDestination";
export const DESTINATIONS_DELETE = "deleteDestination";
export const DESTINATIONS_DETAILS = "getDestinationById";
export const DESTINATIONS_UPLOAD_IMAGE = "uploadDestinationImage";

// Destination places queries
export const DESTINATION_PLACES = "getAllDestinationPlaces";
export const DESTINATION_PLACES_CREATE = "createDestinationPlace";
export const DESTINATION_PLACES_UPDATE = "updateDestinationPlace";
export const DESTINATION_PLACES_DELETE = "deleteDestinationPlace";
export const DESTINATION_PLACES_DETAILS = "getDestinationPlaceById";
export const DESTINATION_PLACES_UPLOAD_IMAGE = "uploadDestinationPlaceImage";

// Package categories queries
export const PACKAGE_CATEGORIES = "getAllPackageCategories";
export const PACKAGE_CATEGORIES_CREATE = "createPackageCategory";
export const PACKAGE_CATEGORIES_UPDATE = "updatePackageCategory";
export const PACKAGE_CATEGORIES_DELETE = "deletePackageCategory";
export const PACKAGE_CATEGORIES_DETAILS = "getPackageCategoryById";
export const PACKAGE_CATEGORIES_UPLOAD_IMAGE = "uploadPackageCategoryImage";

// Tours queries
export const TOURS = "getAllTours";
export const TOURS_CREATE = "createTour";
export const TOURS_UPDATE = "updateTour";
export const TOURS_DELETE = "deleteTour";
export const TOURS_DETAILS = "getTourById";


// faq queries
export const FAQS = "getAllfaq";
export const Faqs_CREATE = "createFaq";
export const Faqs_UPDATE = "updateFaq";
export const Faqs_DELETE = "deleteFaq";
export const Faqs_DETAILS = "getFaqById";


// Activities queries
export const ACTIVITIES = "getAllActivities";
export const ACTIVITIES_CREATE = "createActivity";
export const ACTIVITIES_UPDATE = "updateActivity";
export const ACTIVITIES_DELETE = "deleteActivity";
export const ACTIVITIES_DETAILS = "getActivityById";
export const ACTIVITIES_UPLOAD_IMAGE = "uploadActivityImage";

// Packages queries
export const PACKAGES = "getAllPackages";
export const PACKAGES_CREATE = "createPackage";
export const PACKAGES_UPDATE = "updatePackage";
export const PACKAGES_DELETE = "deletePackage";
export const PACKAGES_DETAILS = "getPackageById";
export const PACKAGES_FEATURED = "getFeaturedPackages";
export const PACKAGES_UPLOAD_IMAGE = "uploadPackageImage";
export const PACKAGES_ACTIVITIES = "getPackageActivities";
export const PACKAGES_ADD_ACTIVITY = "addActivityToPackage";
export const PACKAGES_REMOVE_ACTIVITY = "removeActivityFromPackage";

// Package programs queries
export const PACKAGE_PROGRAMS = "getAllPackagePrograms";
export const PACKAGE_PROGRAMS_CREATE = "createPackageProgram";
export const PACKAGE_PROGRAMS_UPDATE = "updatePackageProgram";
export const PACKAGE_PROGRAMS_DELETE = "deletePackageProgram";
export const PACKAGES_PROGRAMS_UPLOAD_IMAGE = "uploadPackageProgramsImage";

export const PACKAGE_PROGRAMS_DETAILS = "getPackageProgramById";

// Static pages queries
export const STATIC_PAGES = "getAllStaticPages";
export const STATIC_PAGES_CREATE = "createStaticPage";
export const STATIC_PAGES_UPDATE = "updateStaticPage";
export const STATIC_PAGES_DELETE = "deleteStaticPage";
export const STATIC_PAGES_DETAILS = "getStaticPageById";
export const STATIC_PAGES_BY_SLUG = "getStaticPageBySlug";
export const STATIC_PAGES_UPLOAD_MEDIA = "uploadStaticPageMedia";


// partners queries
export const PARTNERS = "getAllPartners";
export const PARTNERS_CREATE = "createPartners";
export const PARTNERS_UPDATE = "updatePartners";
export const PARTNERS_DELETE = "deletePartners";
export const PARTNERS_DETAILS = "getPartnersById";
export const PARTNERS_UPLOAD_MEDIA = "uploadPartnersMedia";


// Rates queries
export const RATES = "getAllRates";
export const RATES_CREATE = "createRates";
export const RATES_UPDATE = "updateRates";
export const RATES_DELETE = "deleteRates";
export const RATES_DETAILS = "getRatesById";
export const RATES_UPLOAD_MEDIA = "uploadRatesMedia";



// Settings queries
export const SETTINGS = "getAllsettings";
export const SETTINGS_CREATE = "createsettings";
export const SETTINGS_UPDATE = "updatesettings";
export const SETTINGS_DELETE = "deletesettings";
export const SETTINGS_DETAILS = "getsettingsById";
export const SETTINGS_UPLOAD_MEDIA = "uploadsettingsMedia";


// Cars queries
export const CARS = "getAllCars";
export const CARS_CREATE = "createCar";
export const CARS_UPDATE = "updateCar";
export const CARS_DELETE = "deleteCar";
export const CARS_DETAILS = "getCarById";

// Car categories queries
export const CAR_CATEGORIES = "getAllCarCategories";
export const CAR_CATEGORIES_CREATE = "createCarCategory";
export const CAR_CATEGORIES_UPDATE = "updateCarCategory";
export const CAR_CATEGORIES_DELETE = "deleteCarCategory";
export const CAR_CATEGORIES_DETAILS = "getCarCategoryById";
export const CAR_CATEGORIES_UPLOAD_ICON = "uploadCarCategoryIcon";

// Visa types queries
export const VISA_TYPES = "getAllVisaTypes";
export const VISA_TYPES_CREATE = "createVisaType";
export const VISA_TYPES_UPDATE = "updateVisaType";
export const VISA_TYPES_DELETE = "deleteVisaType";
export const VISA_TYPES_DETAILS = "getVisaTypeById";

// Request logs queries
export const REQUEST_LOGS = "getAllRequestLogs";
export const REQUEST_LOGS_BY_REQUEST_NUMBER = "getRequestLogsByRequestNumber";
export const REQUEST_LOGS_DETAILS = "getRequestLogById";

// Reservations queries
export const RESERVATIONS = "getAllReservations";
export const RESERVATIONS_CREATE = "createReservation";
export const RESERVATIONS_DELETE = "deleteReservation";
export const RESERVATIONS_DETAILS = "getReservationById";
export const RESERVATIONS_MY_RESERVATIONS = "getMyReservations";
export const RESERVATIONS_BY_TYPE = "getReservationsByType";
export const RESERVATIONS_UPDATE_STATUS = "updateReservationStatus";

// Roles and permissions queries
export const ROLES = "getAllRoles";
export const ROLES_CREATE = "createRole";
export const ROLES_UPDATE = "updateRole";
export const ROLES_DELETE = "deleteRole";
export const ROLES_DETAILS = "getRoleById";
export const ROLES_WITH_PERMISSIONS = "getRoleWithPermissions";
export const ROLES_ALL_PERMISSIONS = "getAllPermissions";
export const ROLES_ADD_PERMISSION = "addPermissionToRole";
export const ROLES_REMOVE_PERMISSION = "removePermissionFromRole";

// Other common resources
export const UPLOAD = "upload";
export const USER = "getUsers";

// Create map of table names to CRUD operations


export const TABLE_QUERY_MAP: Record<string, Record<CrudOperation, string>> = {
  [tablesNames.countries]: {
    get: COUNTRIES,
    create: COUNTRIES_CREATE,
    update: COUNTRIES_UPDATE,
    delete: COUNTRIES_DELETE,
    details: COUNTRIES_DETAILS,
    bulkDelete: "",
    upload: COUNTRIES_UPLOAD_IMAGE,
  },
   [tablesNames.services]: {
    get: SERVICES,
    create: SERVICES_CREATE,
    update: SERVICES_UPDATE,
    delete: SERVICES_DELETE,
    details: SERVICES_DETAILS,
    bulkDelete: "",
    upload: SERVICES_UPLOAD_IMAGE,
  },

    [tablesNames.partners]: {
    get: PARTNERS,
    create: PARTNERS_CREATE,
    update: PARTNERS_UPDATE,
    delete: PARTNERS_DELETE,
    details: PARTNERS_DETAILS,
    bulkDelete: "",
    upload: PARTNERS_UPLOAD_MEDIA,
  },
    [tablesNames.rates]: {
    get: RATES,
    create: RATES_CREATE,
    update:RATES_UPDATE,
    delete: RATES_DELETE,
    details: RATES_DETAILS,
    bulkDelete: "",
    upload: RATES_UPLOAD_MEDIA,
  },
   [tablesNames.settings]: {
    get: SETTINGS,
    create: SETTINGS_CREATE,
    update:SETTINGS_UPDATE,
    delete: SETTINGS_DELETE,
    details: SETTINGS_DETAILS,
    bulkDelete: "",
    upload: SETTINGS_UPLOAD_MEDIA,
  },
  [tablesNames.destinations]: {
    get: DESTINATIONS,
    create: DESTINATIONS_CREATE,
    update: DESTINATIONS_UPDATE,
    delete: DESTINATIONS_DELETE,
    details: DESTINATIONS_DETAILS,
    bulkDelete: "",
    upload: DESTINATIONS_UPLOAD_IMAGE,

  },
  [tablesNames.destination_places]: {
    get: DESTINATION_PLACES,
    create: DESTINATION_PLACES_CREATE,
    update: DESTINATION_PLACES_UPDATE,
    delete: DESTINATION_PLACES_DELETE,
    details: DESTINATION_PLACES_DETAILS,
    bulkDelete: "",
    upload: DESTINATION_PLACES_UPLOAD_IMAGE,

  },
  [tablesNames.package_categories]: {
    get: PACKAGE_CATEGORIES,
    create: PACKAGE_CATEGORIES_CREATE,
    update: PACKAGE_CATEGORIES_UPDATE,
    delete: PACKAGE_CATEGORIES_DELETE,
    details: PACKAGE_CATEGORIES_DETAILS,
    bulkDelete: "",
    upload: PACKAGE_CATEGORIES_UPLOAD_IMAGE,

  },
   [tablesNames.static_pages]: {
    get: STATIC_PAGES,
    create: STATIC_PAGES_CREATE,
    update: STATIC_PAGES_UPDATE,
    delete: STATIC_PAGES_DELETE,
    details: STATIC_PAGES_DETAILS,
    bulkDelete: "",
    upload: STATIC_PAGES_UPLOAD_MEDIA,

  },
  [tablesNames.tours]: {
    get: TOURS,
    create: TOURS_CREATE,
    update: TOURS_UPDATE,
    delete: TOURS_DELETE,
    details: TOURS_DETAILS,
    bulkDelete: "",
    upload: "",

  },
    [tablesNames.faqs]: {
    get: FAQS,
    create: Faqs_CREATE,
    update: Faqs_UPDATE,
    delete: Faqs_DELETE,
    details: Faqs_DETAILS,
    bulkDelete: "",
    upload: "",

  },
  [tablesNames.activities]: {
    get: ACTIVITIES,
    create: ACTIVITIES_CREATE,
    update: ACTIVITIES_UPDATE,
    delete: ACTIVITIES_DELETE,
    details: ACTIVITIES_DETAILS,
    bulkDelete: "",
    upload:ACTIVITIES_UPLOAD_IMAGE,

  },
  [tablesNames.packages]: {
    get: PACKAGES,
    create: PACKAGES_CREATE,
    update: PACKAGES_UPDATE,
    delete: PACKAGES_DELETE,
    details: PACKAGES_DETAILS,
    bulkDelete: "",
    upload: PACKAGES_UPLOAD_IMAGE,

  },
  [tablesNames.package_programs]: {
    get: PACKAGE_PROGRAMS,
    create: PACKAGE_PROGRAMS_CREATE,
    update: PACKAGE_PROGRAMS_UPDATE,
    delete: PACKAGE_PROGRAMS_DELETE,
    details: PACKAGE_PROGRAMS_DETAILS,
    bulkDelete: "",
    upload: PACKAGES_PROGRAMS_UPLOAD_IMAGE,

  },
  [tablesNames.cars]: {
    get: CARS,
    create: CARS_CREATE,
    update: CARS_UPDATE,
    delete: CARS_DELETE,
    details: CARS_DETAILS,
    bulkDelete: "",
    upload: "",

  },
  [tablesNames.car_categories]: {
    get: CAR_CATEGORIES,
    create: CAR_CATEGORIES_CREATE,
    update: CAR_CATEGORIES_UPDATE,
    delete: CAR_CATEGORIES_DELETE,
    details: CAR_CATEGORIES_DETAILS,
    bulkDelete: "",
    upload: CAR_CATEGORIES_UPLOAD_ICON,

  },
  [tablesNames.visa_types]: {
    get: VISA_TYPES,
    create: VISA_TYPES_CREATE,
    update: VISA_TYPES_UPDATE,
    delete: VISA_TYPES_DELETE,
    details: VISA_TYPES_DETAILS,
    bulkDelete: "",
    upload: "",

  },
  [tablesNames.request_logs]: {
    get: REQUEST_LOGS,
    details: REQUEST_LOGS_DETAILS,
    create: "",
    update: "",

    delete: "",
    bulkDelete: "",
    upload: "",
  },
  [tablesNames.reservations]: {
    get: RESERVATIONS,
    create: RESERVATIONS_CREATE,
    delete: RESERVATIONS_DELETE,
    update:RESERVATIONS_UPDATE_STATUS,
    upload: "",
    details: RESERVATIONS_DETAILS,
    bulkDelete: "",

  },
  [tablesNames.users]: {
    get: USER,
    details: "",
    create: USER_CREATE,
    update: "",
    delete: "",
    bulkDelete: "",
    upload: "",
  },
};
