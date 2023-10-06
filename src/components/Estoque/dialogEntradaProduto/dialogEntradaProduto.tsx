import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProduto } from "./formProduto";
import { useState } from "react"
import { FileTextIcon } from "lucide-react";


export function DialogEntradaProduto() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger onClick={openModal}
        className="
      inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
      w-54
      bg-primary text-primary-foreground shadow hover:bg-primary/90
      h-10 rounded-md px-8
      "
      >
        Novo Produto
        <FileTextIcon className="w-5 h-5 ml-2"/>
      </DialogTrigger>
      {isModalOpen && (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preencha as informações abaixo</DialogTitle>
          <FormProduto closeModal={closeModal} />
        </DialogHeader>
        
      </DialogContent>

      )}
    </Dialog>
  );
}
