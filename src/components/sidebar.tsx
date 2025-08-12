"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, MoreHorizontal, PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarContextProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isMobile: boolean
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isMobile,
        isCollapsed,
        setIsCollapsed,
      }}
    >
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  )
}

const sidebarVariants = cva(
  "h-screen shrink-0 -translate-x-full transition-[width,transform] duration-300 ease-in-out md:translate-x-0",
  {
    variants: {
      isCollapsed: {
        true: "w-16",
        false: "w-64",
      },
    },
  }
)

interface SidebarProps
  extends React.ComponentProps<"aside">,
    VariantProps<typeof sidebarVariants> {}

export function Sidebar({ className, children }: SidebarProps) {
  const { isMobile, isOpen, setIsOpen, isCollapsed } = useSidebar()

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setIsOpen(false)}
            >
              <ChevronLeft />
              <span className="sr-only">Close</span>
            </Button>
          </SheetHeader>
          <div className="flex h-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside
      className={cn(sidebarVariants({ isCollapsed }), className)}
    >
      {children}
    </aside>
  )
}

interface SidebarHeaderProps extends React.ComponentProps<"div"> {}

export function SidebarHeader({
  className,
  children,
  ...props
}: SidebarHeaderProps) {
  const { isCollapsed } = useSidebar()
  return (
    <div
      className={cn(
        "flex h-16 items-center border-b p-4",
        isCollapsed ? "justify-center" : "justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SidebarContentProps extends React.ComponentProps<"div"> {}

export function SidebarContent({
  className,
  ...props
}: SidebarContentProps) {
  return (
    <div
      className={cn(
        "flex-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

interface SidebarFooterProps extends React.ComponentProps<"div"> {}

export function SidebarFooter({
  className,
  children,
  ...props
}: SidebarFooterProps) {
  const { isCollapsed } = useSidebar()
  return (
    <div
      className={cn(
        "flex h-16 items-center border-t p-4",
        isCollapsed && "justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarTrigger() {
  const { isMobile, isOpen, setIsOpen, isCollapsed, setIsCollapsed } = useSidebar()

  if (isMobile) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="-ml-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

interface SidebarMenuProps extends React.ComponentProps<"nav"> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <nav className={cn("flex flex-col gap-1 p-4", className)} {...props} />
}

const itemVariants = cva(
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
  {
    variants: {
      isActive: {
        true: "bg-accent text-accent-foreground",
      },
      isCollapsed: {
        true: "justify-center",
      },
    },
  }
)

interface SidebarMenuItemProps
  extends React.ComponentProps<"a">,
    VariantProps<typeof itemVariants> {
  icon?: React.ReactNode
  label: string
}

export const SidebarMenuItem = React.forwardRef<
  HTMLAnchorElement,
  SidebarMenuItemProps
>(
  (
    { className, icon, label, isActive, isCollapsed, children, ...props },
    ref
  ) => {
    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              ref={ref}
              className={cn(itemVariants({ isActive, isCollapsed }), className)}
              {...props}
            >
              {icon}
              <span className="sr-only">{label}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      )
    }

    return (
      <a
        ref={ref}
        className={cn(itemVariants({ isActive, isCollapsed }), className)}
        {...props}
      >
        {icon}
        <span className="flex-1">{label}</span>
        {children}
      </a>
    )
  }
)
SidebarMenuItem.displayName = "SidebarMenuItem"

interface SidebarUserProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  children: (
    | React.ReactElement<typeof DropdownMenuItem>
    | React.ReactElement<typeof DropdownMenuSeparator>
  )[]
}

const SidebarUser = React.forwardRef<HTMLDivElement, SidebarUserProps>(
  ({ className, user, children, ...props }, ref) => {
    const { isCollapsed } = useSidebar()
    const { name, email, image } = user

    if (isCollapsed) {
      return (
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-full"
                >
                  <Slot className="h-8 w-8 rounded-full">
                    {children[0]}
                  </Slot>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="right">
              {name && <div>{name}</div>}
              {email && (
                <div className="text-muted-foreground">{email}</div>
              )}
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent side="right">{children}</DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4", className)}
        {...props}
      >
        <Slot className="h-10 w-10 rounded-full">
          {children[0]}
        </Slot>
        <div className="flex-1 overflow-hidden">
          {name && <div className="truncate text-sm font-semibold">{name}</div>}
          {email && (
            <div className="truncate text-xs text-muted-foreground">
              {email}
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">{children}</DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
)
SidebarUser.displayName = "SidebarUser"

export function MobileHeader({ className, children, ...props }: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "flex h-16 items-center border-b px-4 md:hidden",
        className
      )}
      {...props}
    >
      <SidebarTrigger />
      <div className="flex-1" />
      {children}
    </div>
  )
}
