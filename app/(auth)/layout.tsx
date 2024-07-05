import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex h-full w-full items-center justify-center">
      <div className="absolute size-full">
        <Image src="/auth-bg.jpg" alt="logo" className="size-full" fill />
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
