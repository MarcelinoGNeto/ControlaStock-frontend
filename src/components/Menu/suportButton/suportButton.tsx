import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import React from "react";

interface SuportButtonProps {
  phoneNumber: string;
  message?: string;
}

export const SuportButton: React.FC<SuportButtonProps> = ({
  phoneNumber,
  message = "",
}) => {
  const handleWhatsAppClick = () => {
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Button onClick={handleWhatsAppClick}>
      <MessageSquare className="w-4 h-4 mr-2" />
      Suporte
    </Button>
  );
};
