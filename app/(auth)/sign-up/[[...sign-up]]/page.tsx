import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="glassmorphism-auth flex size-full items-center justify-center">
      <SignUp />
    </div>
  );
}
