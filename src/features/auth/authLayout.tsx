import heroImage from "@/assets/heroIMG.jpg";
import Image from "next/image";
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>
      <div className="flex-1 bg-primary hidden lg:block relative">
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white p-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-xl">{subtitle}</p>
          </div>
        </div>
        <div className="w-full h-full top-16">
          <Image
            src={heroImage}
            alt="Fashion e-commerce background"
            layout="fill"
            objectFit="cover"
            sizes="100%"
          />
        </div>
      </div>
    </div>
  );
}
