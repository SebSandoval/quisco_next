"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  }
}
export default function AdminRoute({ link }: AdminRouteProps) {

  const pathname = usePathname();

  const isActive = pathname.startsWith(link.url);
  return (
    <Link
      className={` ${isActive ? 'bg-amber-400'  : '' } py-2 px-4 text-gray-600  border-b-1 last-of-type:border-b-0`}
      href={link.url}
      target={link.blank ? "_blank" : ""}
    >
      {link.text}
    </Link>
  )
}
