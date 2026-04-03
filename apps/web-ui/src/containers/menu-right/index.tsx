"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserAvatar } from "../../components/user-avatar";
import { MenuLinks } from "./menu-links";
import { SearchToggle } from "./search-toggle";
import { MobileNavbar } from "../menu-bottom";

export default function MenuRight() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSearchVisible = searchParams.get("search") === "true";

  const isLogin = pathname === "/login";
  const isLanding = pathname === "/landing";

  if (isLogin || isLanding) return null;

  const showSearch = pathname === "/";

  const toggleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isSearchVisible) {
      params.delete("search");
    } else {
      params.set("search", "true");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:top-4 md:right-4 md:bottom-auto md:left-auto md:translate-x-0 z-50 flex items-center gap-1 md:gap-4 bg-white/80 dark:bg-black/80 backdrop-blur-md px-1.5 py-1 md:px-3 md:py-2 rounded-full border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all whitespace-nowrap">
        <div className="hidden md:block">
          <SearchToggle
            isVisible={isSearchVisible}
            onToggle={toggleSearch}
            show={showSearch}
          />
        </div>

        <div className="hidden md:flex items-center gap-4 px-1">
          <MenuLinks pathname={pathname} variant="desktop" />
        </div>

        <div className="md:hidden">
          <MobileNavbar pathname={pathname} />
        </div>

        <UserAvatar className="h-10 w-10 sm:block hidden md:block" />
      </div>
    </>
  );
}
