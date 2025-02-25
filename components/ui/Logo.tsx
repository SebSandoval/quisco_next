import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="relative w-40 h-40">
        <Image
          src="/logo.svg"
          layout="fill"
          objectFit="contain"
          alt="Logo"
        />

      </div>

    </div>
  )
}
