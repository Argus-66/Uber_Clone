import OlaMapSection from "@/components/Home/OlaMapSection";
import SearchSection from "@/components/Home/SearchSection";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <SearchSection />
      </div>
      <div className="col-span-2">
        <OlaMapSection />
      </div>
    </div>
  );
}
