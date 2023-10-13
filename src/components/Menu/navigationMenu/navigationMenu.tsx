import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { logout, usuarioAutenticado } from "@/services/loginAPI";
import { useLoginLogoutContext } from "@/contexts/useLoginLogoutContext";
import { useAuthContext } from "@/contexts/useAuthContext";

export function NavMenu() {
  const { logInOut, setLogInOut } = useLoginLogoutContext();
  const { setAutenticado } = useAuthContext()

  const handleLogoutClick = () => {
    logout();
    setLogInOut(false);
    setAutenticado(false);
  };

  useEffect(() => {
    if (usuarioAutenticado()) {
      setLogInOut(true);
    }
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/home" className={navigationMenuTriggerStyle()}>
            <div className="text-lg font-bold">HOME</div>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/estoque" className={navigationMenuTriggerStyle()}>
            ESTOQUE
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/saidas" className={navigationMenuTriggerStyle()}>
            SAÍDA
          </Link>
        </NavigationMenuItem>
        {logInOut ? (
          <NavigationMenuItem>
            <Link
              to="*"
              className={navigationMenuTriggerStyle()}
              onClick={handleLogoutClick}
            >
              LOGOUT
            </Link>
          </NavigationMenuItem>
        ) : null}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
