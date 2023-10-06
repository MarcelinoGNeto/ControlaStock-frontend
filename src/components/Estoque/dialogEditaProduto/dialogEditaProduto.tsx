import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEditaProduto } from "./formEditaProduto";
import { useState } from "react"
import { UpdateIcon } from "@radix-ui/react-icons";

interface DialogEditaProdutoProps {
  id: string;
  refreshTable: any;
}

export function DialogEditaProduto(props: DialogEditaProdutoProps) {
  const { id, refreshTable } = props;
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
      w-36 mr-4
      bg-emerald-400 text-primary-foreground shadow hover:bg-primary/90
      h-10 rounded-md px-8
      "
      >
        Editar
        <UpdateIcon className="w-5 h-5 m-2"/>
      </DialogTrigger>
      {isModalOpen && (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Use os campos abaixo para editar o produto</DialogTitle>
          <FormEditaProduto id={id} closeModal={closeModal} refreshModal={refreshTable}/>
        </DialogHeader>  
      </DialogContent>
      )}
    </Dialog>
  );
}
