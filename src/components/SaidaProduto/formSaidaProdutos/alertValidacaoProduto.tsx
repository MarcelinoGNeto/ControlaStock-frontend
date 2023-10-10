import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export function AlertValidacaoProduto() {
  return (
    <div className="flex items-center text-amber-300 text-xs">
    <ExclamationTriangleIcon className="w-8 mr-4" />
    <span >O produto selecionado já consta na lista abaixo</span>
    </div>
    
  )
}
