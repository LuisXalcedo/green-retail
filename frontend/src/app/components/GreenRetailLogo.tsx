import Image from "next/image";

export default function GreenRetailLogo() {
  return (
    <Image
      src="/logo.png"
      alt="Green Retail Logo"
      width={100}
      height={100}
      priority={true}
    />
  );
}
