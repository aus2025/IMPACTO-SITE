import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

// Custom implementation without Radix UI
interface DropdownMenuProps {
  children: React.ReactNode
}

interface DropdownMenuContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | undefined>(undefined)

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
    if (!context) throw new Error("DropdownMenuTrigger must be used within a DropdownMenu")
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      context.setOpen(prev => !prev)
    }
    
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        className={asChild ? undefined : cn("flex items-center justify-between", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  children,
  ...props 
}) => {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuContent must be used within a DropdownMenu")
  
  if (!context.open) return null
  
  return (
    <div 
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md",
        "top-full right-0 mt-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean
  asChild?: boolean
}

const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, children, inset, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none w-full text-left",
          "hover:bg-gray-100 focus:bg-gray-100",
          inset && "pl-8",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

// Simple stubs for the other components
const DropdownMenuCheckboxItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  (props, ref) => <DropdownMenuItem ref={ref} {...props} />
)
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  (props, ref) => <DropdownMenuItem ref={ref} {...props} />
)
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

const DropdownMenuLabel: React.FC<React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean
}> = ({ 
  className, 
  children,
  inset, 
  ...props 
}) => (
  <div 
    className={cn(
      "px-2 py-1.5 text-sm font-semibold", 
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

const DropdownMenuSeparator: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  ...props 
}) => (
  <div 
    className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
    {...props} 
  />
)

const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}

// Simple placeholder components for those that aren't implemented
const DropdownMenuGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => <div {...props} />
const DropdownMenuPortal: React.FC<{children: React.ReactNode}> = ({children}) => <>{children}</>
const DropdownMenuSub: React.FC<{children: React.ReactNode}> = ({children}) => <>{children}</>
const DropdownMenuSubContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => <div {...props} />
const DropdownMenuSubTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { inset?: boolean; asChild?: boolean }
>(({ className, children, inset, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  
  return (
    <Comp
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none w-full text-left",
        "hover:bg-gray-100 focus:bg-gray-100",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </Comp>
  )
})
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"
const DropdownMenuRadioGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => <div {...props} />

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} 