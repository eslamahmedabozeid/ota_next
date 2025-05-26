import { routes } from "@/constants/routes";
import {
  RiDashboardFill,
  RiShoppingBag3Fill,
  RiMapPinTimeLine,
  RiImageFill,
  RiSettings3Fill,
  RiBook2Fill,
} from "react-icons/ri";
import {
  MdShoppingCart,
  MdCategory,
  MdCampaign,
  MdLoyalty,
  MdSettings,
  MdLocalOffer,
  MdOutlineDiscount,
  MdCardGiftcard,
  MdSchool,
  MdPeopleAlt,
} from "react-icons/md";
import {
  FaStore,
  FaUsers,
  FaUserShield,
  FaHeadset,
  FaStar,
  FaConciergeBell,
  FaListUl,
  FaUserGraduate,
  FaRegCheckCircle,
  FaClipboardList,
  FaQuestionCircle,
  FaNewspaper,
  FaEnvelopeOpenText,
  FaHome,
  FaInfoCircle,
} from "react-icons/fa";
import { GiDeathNote, GiKnifeFork, GiNotebook, GiOpenBook, GiTicket } from "react-icons/gi";

import {
  LayoutDashboard,
  Globe,
  MapPin,
  PackageSearch,
  Car,
  Plane,
  FileText,
  ScrollText,
  BookOpen,
  Users,
  ShieldCheck,
  Settings,
  Building2,
  Ticket,
  CalendarRange,
  ClipboardList,
  HandPlatter,
  CircleUser,
  MessageCircle
} from "lucide-react";
/**
 ** the translations for this file is placed inside the dictionaries folder
 ** each new route should be added in 3 places, mainNav, modern and classic
 */

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}
const commonNavRoutes = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    child: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: routes.dashboard.index,
      },
    ],
  },
  {
    title: "Locations",
    icon: Globe,
    child: [
      {
        title: "Countries",
        icon: Globe,
        href: routes.countries.index,
      },
      {
        title: "Destinations",
        icon: MapPin,
        href: routes.destinations.index,
      },
      {
        title: "Destination Places",
        icon: Building2,
        href: routes.destination_places.index,
      },
    ],
  },

  {
    title: "Packages",
    icon: PackageSearch,
    child: [
      {
        title: "Package Categories",
        icon: PackageSearch,
        href: routes.package_categories.index,
      },
      {
        title: "Packages",
        icon: PackageSearch,
        href: routes.packages.index,
      },
      {
        title: "Package Programs",
        icon: ScrollText,
        href: routes.package_programs.index,
      },
    ],
  },
  
  {
    title: "Activities",
    icon: Ticket,
    child: [
      {
        title: "Tours",
        icon: Plane,
        href: routes.tours.index,
      },
      {
        title: "Activities",
        icon: Ticket,
        href: routes.activities.index,
      },
    ],
  },
  {
    title: "Transportation",
    icon: Car,
    child: [
      {
        title: "Car Categories",
        icon: Car,
        href: routes.car_categories.index,
      },
      {
        title: "Cars",
        icon: Car,
        href: routes.cars.index,
      },
    ],
  },
  {
    title: "Visa Services",
    icon: FileText,
    child: [
      {
        title: "Visa Types",
        icon: FileText,
        href: routes.visa_types.index,
      },
    ],
  },
  {
    title: "Bookings",
    icon: CalendarRange,
    child: [
      {
        title: "Reservations",
        icon: CalendarRange,
        href: routes.reservations.index,
      },
      {
        title: "Request Logs",
        icon: ClipboardList,
        href: routes.request_logs.index,
      },
    ],
  },
  {
    title: "Services",
    icon: Globe,
    child: [
      {
        title: "Services",
        icon: Settings,
        href: routes.services.index,
      },
    ],
  },
   {
    title: "Partners",
    icon: CircleUser,
    child: [
      {
        title: "Partners",
        icon: CircleUser,
        href: routes.partners.index,
      },
    ],
  },
   {
    title: "Rates",
    icon: CircleUser,
    child: [
      {
        title: "Rates",
        icon: MessageCircle,
        href: routes.rates.index,
      },
    ],
  },
   {
    title: "FAQ",
    icon: Globe,
    child: [
      {
        title: "FAQ",
        icon: Settings,
        href: routes.faqs.index,
      },
    ],
  },
  {
    title: "Content",
    icon: BookOpen,
    child: [
      {
        title: "Static Pages",
        icon: FileText,
        href: routes.static_pages.index,
      },
    ],
  },
  {
    title: "Access Control",
    icon: ShieldCheck,
    child: [
      {
        title: "Users",
        icon: Users,
        href: routes.users.index,
      },
      {
        title: "Roles",
        icon: ShieldCheck,
        href: routes.roles.index,
                create:"",
      },
    ],
  },
  {
    title: "settings",
    icon: Settings,
    child: [
      {
        title: "General Settings",
        icon: Settings,
        href: routes.settings.index,
      },
    ],
  },
];

export const menusConfig = {
  mainNav: commonNavRoutes,
  sidebarNav: {
    modern: commonNavRoutes,
    classic: [
      {
        isHeader: true,
        title: "dashboard",
      },
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: routes.dashboard.index,

      },
      {
        isHeader: true,
        title: "Locations",
      },
      {
        title: "Countries",
        icon: Globe,
        href: routes.countries.index,
      },
       
      {
        title: "Destinations",
        icon: MapPin,
        href: routes.destinations.index,
      },
      {
        title: "Destination Places",
        icon: Building2,
        href: routes.destination_places.index,
      },
      {
        isHeader: true,
        title: "Packages",
      },
      {
        title: "Package Categories",
        icon: PackageSearch,
        href: routes.package_categories.index,
      },
      {
        title: "Packages",
        icon: PackageSearch,
        href: routes.packages.index,
      },
      {
        title: "Package Programs",
        icon: ScrollText,
        href: routes.package_programs.index,
      },
      {
        isHeader: true,
        title: "Activities",
      },
      {
        title: "Tours",
        icon: Plane,
        href: routes.tours.index,
      },
      {
        title: "Activities",
        icon: Ticket,
        href: routes.activities.index,
      },
      {
        isHeader: true,
        title: "Transportation",
      },
      {
        title: "Car Categories",
        icon: Car,
        href: routes.car_categories.index,
      },
      {
        title: "Cars",
        icon: Car,
        href: routes.cars.index,
      },
      {
        isHeader: true,
        title: "Visa Services",
      },
      {
        title: "Visa Types",
        icon: FileText,
        href: routes.visa_types.index,
      },
      {
        isHeader: true,
        title: "Bookings",
      },
      {
        title: "Reservations",
        icon: CalendarRange,
        href: routes.reservations.index,

      },
      {
        title: "Request Logs",
        icon: ClipboardList,
        href: routes.request_logs.index,
      },
      {
        isHeader: true,
        title: "Services",
      },
      {
        title: "Services",
        icon: HandPlatter,
        href: routes.services.index,
      },
      {
        title: "Partners",
        icon: CircleUser,
        href: routes.partners.index,
      },
     
      {
        isHeader: true,
        title: "Content",
      },
      {
        title: "Static Pages",
        icon: FileText,
        href: routes.static_pages.index,
        child:[]
      },
      {
        isHeader: true,
        title: "Access Control",
      },
      {
        title: "Users",
        icon: Users,
        href: routes.users.index,
      },
       {
        title: "Faq",
        icon: FileText,
        href: routes.faqs.index,
      },
       {
        title: "Rates",
        icon: MessageCircle,
        href: routes.rates.index,
      },
       
     
      {
        title: "Roles",
        icon: ShieldCheck,
        href: routes.roles.index,
      },
      {
        isHeader: true,
        title: "Settings",
      },
   {
        title: "Settings",
        icon: Settings,
        href: routes.settings.index,
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
