import Image from "next/image";
import Header from "./componenets/Header";
import Billing from "./componenets/Billing";
 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <h1 className="text-center font-bold text-2xl from-neutral-300">CUSTOM PAYMENT PORTAL</h1>
          <div className="w-96 font-bold text-yellow-400"></div>
        </div>
        
        {/* Add horizontal rule */}
        <hr className="my-8 border-t-2 border-gray-300" />
        
        <Billing onClick={undefined} imageSrc={undefined} title={undefined} />
      </div>
    </main>
  );
}
