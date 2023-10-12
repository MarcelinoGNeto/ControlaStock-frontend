import { FormLogin } from "@/components/Login/formLogin";


export function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <h2 className="flex justify-center text-xl pt-10 font-bold">LOGIN</h2>
      <main className="flex-1 p-10 flex gap-6 justify-center">
        <FormLogin />
      </main>
    </div>
  );
}
