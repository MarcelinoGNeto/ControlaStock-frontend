import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react"
import { FormEditProduto } from "./formEditProduto";


export function DialogEditButton() {
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
        className=""
      >
        Editar produto
      </DialogTrigger>
      {isModalOpen && (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edite as informações abaixo</DialogTitle>
          <FormEditProduto closeModal={closeModal} />
        </DialogHeader>
        
      </DialogContent>

      )}
    </Dialog>
  );
}
