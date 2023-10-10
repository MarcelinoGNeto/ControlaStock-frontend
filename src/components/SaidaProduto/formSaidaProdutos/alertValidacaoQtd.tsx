import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export function AlertValidacaoQtd() {
  return (
    <div className="flex items-center text-amber-300 text-xs">
    <ExclamationTriangleIcon className="w-8 mr-4" />
    <span >A quantidade desejada está acima da quantidade constante em estoque</span>
    </div>
    
  )
}
