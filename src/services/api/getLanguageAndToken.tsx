import { getCookie } from "cookies-next/client";
import { i18nRouterConfig } from "@/localization/i18nRouterConfig";

const IsServerSide = typeof window === "undefined";

export const getLanguageAndToken = async () => {
  if (IsServerSide) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    
    const lang = cookieStore.get("NEXT_LOCALE")?.value || i18nRouterConfig.defaultLocale;
    const token = cookieStore.get("UT")?.value || "";
    const id = cookieStore.get("ID")?.value || "";

    // Debugging logs for server side
    console.log("Server-Side Language:", lang);
    console.log("Server-Side Token:", token);
    console.log("Server-Side User ID:", id);
    
    return { lang, token, id };
  } else {
    const lang = getCookie("NEXT_LOCALE") || i18nRouterConfig.defaultLocale;
    const token = getCookie("UT") || "";
    const id = getCookie("ID") || "";

    // Debugging logs for client side
    console.log("Client-Side Language:", lang);
    console.log("Client-Side Token:", token);
    console.log("Client-Side User ID:", id);
    
    return { lang, token, id };
  }
};
