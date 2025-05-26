import { SonnToaster } from "@/components/ui/sonner";
import { Toaster as ReactToaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import initTranslations from "@/localization/i18n";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";
import AppThemeProvider from "./dashboard-theme-provider";
import AuthProvider from "./auth-provider";
import ClientComponentsTranslationsProvider from "./client-components-translations-provider";
import TanStackQueryProvider from "./tan-stack-query-provider";

const i18nNamespaces = [
  "categories",
  "signin",
  "branches",
  "levels",
  "create-branch",
  "settings",
  "common",
  "course_categories",
  "courses",              
  "course_curriculums",   
  "course_registration",  
  "course_review",        
  "users",
  "news",
  "student_works_categories",
  "student_works",
  "sections",
  "faqs",
  "contact_us",
  "course_certifications",
  "cars",
  "dashboard",
  "settings",
  "terms",
  "privacy",
  "countries",
  "destinations",
  "destination_places",
  "package_categories",
  "tours",
  "activities",
  "packages",
  "car_categories",
  "visa_types",
  "reservations",
  "services",
  "static_pages",
  "package_programs",
  "request_logs",
  "partners",
  "rates",
  "settings",
  "request_logs"
];

export default async function GlobalProvider({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: any;
}) {
  const { t, resources } = await initTranslations(lang, i18nNamespaces);

  /* if (!session?.user?.email) {
    redirect("/auth/login");
  } */

  return (
    <AppThemeProvider>
      <ThemeProvider
        /*  attribute="class"
        enableSystem={false}
        defaultTheme="light" */
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClientComponentsTranslationsProvider
          namespaces={i18nNamespaces}
          locale={lang}
          resources={resources}
        >
          <AuthProvider>
            <TanStackQueryProvider>
              <NuqsAdapter>
                {" "}
                <NextTopLoader color="#544cfc" showSpinner={false} height={2} />
                <TooltipProvider>{children}</TooltipProvider>
              </NuqsAdapter>
            </TanStackQueryProvider>
          </AuthProvider>
        </ClientComponentsTranslationsProvider>
        <ReactToaster />
        <Toaster />
        <SonnToaster />
      </ThemeProvider>
    </AppThemeProvider>
  );
}
