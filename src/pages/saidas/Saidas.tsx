import { RegistroSaidas } from "@/components/SaidaProduto/registroSaidas";

export function Saidas() {
  return (
    <div className="min-h-screen flex flex-col">
      <h2 className="flex justify-center text-xl pt-10 font-bold">Registro de Saída</h2>
      <main className="flex-1 p-10 flex gap-6 justify-center">
        <RegistroSaidas />
      </main>
    </div>
  );
}
