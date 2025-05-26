export const tablesNames = {
  countries: "countries",
  destinations: "destinations",
  destination_places: "destination_places",
  package_categories: "package_categories",
  tours: "tours",
  activities: "activities",
  packages: "packages",
  package_programs: "package_programs",
  static_pages: "static_pages",
  cars: "cars",
  car_categories: "car_categories",
  visa_types: "visa_types",
  request_logs: "request_logs",
  reservations: "reservations",
  roles: "roles",
  users: "users",
  services:"services",
  faqs:"faqs",
  partners:"partners",
  rates:"rates",
  settings:"settings"
};

export const REGEX = {
  ENGLISH_LETTERS: /^[^\u0600-\u06FF]+$/,
  ARABIC_LETTERS: /^[^A-Za-z]+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  SAUDI_PHONE: /^(05\d{8}|\+9665\d{8})$/,
  NUMERIC: /^[0-9]+$/,
};
