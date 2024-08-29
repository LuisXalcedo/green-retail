import Image from "next/image";

export default function Header() {
  return (
    <>
      <Image src={"/logo.png"} alt="Green Retail" width={32} height={32} />
    </>
  );
}
