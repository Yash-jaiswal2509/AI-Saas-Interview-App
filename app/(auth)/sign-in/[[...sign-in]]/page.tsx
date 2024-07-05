import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="glassmorphism-auth size-full flex justify-center items-center">
      <SignIn />
    </div>
  );
}
