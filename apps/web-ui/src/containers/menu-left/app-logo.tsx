import Link from "next/link";
import Image from "next/image";

export function AppLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group hover:no-underline px-2"
    >
      <div className="flex h-10 w-10 select-none items-center justify-center overflow-hidden">
        <Image
          src="/images/logo.png"
          alt="Paul Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      <span className="text-xl font-black leading-none tracking-tight text-foreground hidden sm:inline">
        Paul
      </span>
    </Link>
  );
}
