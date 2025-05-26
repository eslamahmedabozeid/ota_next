import { tablesNames } from "@/constants";
import { TFunction } from "i18next";
import { ZodSchema } from "zod";
import { CategorySchema } from "./category.schema";
import { BranchSchema } from "./branch.schema";
import { LevelsSchema } from "./levels.schema";
import { CourseCategoriesSchema } from "./courseCategory.schema";
import Users from "@/app/[lang]/(dashboard)/users/page";
import { UsersSchema } from "./users.schema";
import { CourseSchema } from "./course.schema";
import { CurriculumSchema } from "./curriculums.schema";
import { CourseReviewSchema } from "./courseReview.schema";
import { CourseRegistrationSchema } from "./courseRegistration.schema";
import { NewsSchema } from "./news.schema";
import { StudentWorkSchema } from "./studentWork.schema";
import { StudentWorkCategoriesSchema } from "./studentWorkCategories.schema";
import { FaqsSchema } from "./faqs.schema";
import { ContactsSchema } from "./contact.schema";
import { CourseCertificationsSchema } from "./courseCertifications.schema";
import { CountrySchema } from "./countries.schema";
import { DistinationSchema } from "./destinations.schema";
import { DistinationPlacesSchema } from "./destinations-places.schema";
import { PackageCategoriesSchema } from "./package-categories.schema";
import { ToursSchema } from "./tours.schema";
import { ActivitiesSchema } from "./activites.schema";
import { PackagesSchema } from "./packages.schema";
import { CarsSchema } from "./cars.schema";
import { CarCategorySchema } from "./car-categories.schema";
import { VisaTypeSchema } from "./visa-types.schema";
import { ReservationSchema } from './reservations.schema';
import { ServiceSchema } from './services.schema';
import { StaticPageSchema } from './static-pages.schema'
import { PackagesProgramsSchema } from "./package-programs.schema";
import { PartnersSchema } from './partners.schema';
import { RatesSchema } from './rates.schema';
import { SettingsSchema } from './settings.schema'
export const TABLE_FORM_SCHEMA_MAP: Record<
  string,
  (t: TFunction, type: "create" | "update") => ZodSchema<any>
> = {
  [tablesNames.countries]: CountrySchema,
  [tablesNames.destinations]: DistinationSchema,
  [tablesNames.destination_places]: DistinationPlacesSchema,
  [tablesNames.package_categories]: PackageCategoriesSchema,
  [tablesNames.tours]: ToursSchema,
  [tablesNames.activities]: ActivitiesSchema,
  [tablesNames.packages]: PackagesSchema,
  [tablesNames.cars]: CarsSchema,
  [tablesNames.car_categories]: CarCategorySchema,
  [tablesNames.visa_types]: VisaTypeSchema,
  [tablesNames.reservations]: ReservationSchema,
  [tablesNames.services]: ServiceSchema,
  [tablesNames.static_pages]: StaticPageSchema,
  [tablesNames.faqs]: FaqsSchema,
  [tablesNames.package_programs]: PackagesProgramsSchema,
  [tablesNames.partners]: PartnersSchema,
  [tablesNames.rates]: RatesSchema,
  [tablesNames.settings]: SettingsSchema,
  [tablesNames.users]: UsersSchema,
  [tablesNames.request_logs]: UsersSchema,

  // [tablesNames.categories]: CategorySchema,
  // [tablesNames.branches]: BranchSchema,
  // [tablesNames.levels]: LevelsSchema,
  // [tablesNames.users]: UsersSchema,
  // [tablesNames.course_categories]: CourseCategoriesSchema,
  // [tablesNames.courses]: CourseSchema,
  // [tablesNames.course_curriculums]: CurriculumSchema,
  // [tablesNames.course_review]: CourseReviewSchema,
  // [tablesNames.course_registration]: CourseRegistrationSchema,
  // [tablesNames.news]: NewsSchema,
  // [tablesNames.student_works]: StudentWorkSchema,
  // [tablesNames.student_works_categories]: StudentWorkCategoriesSchema,
  // [tablesNames.faq]: FaqsSchema,
  // [tablesNames.contact_us]: ContactsSchema,
  // [tablesNames.course_certifications]: CourseCertificationsSchema,
};
