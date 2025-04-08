'use client'

import * as React from 'react'
import { X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

interface MultiSelectProps {
  value: string[]
  onChange: (value: string[]) => void
  options?: { label: string; value: string }[]
  placeholder?: string
  className?: string
  children?: React.ReactNode
}

export function MultiSelect({
  value = [],
  onChange,
  options = [],
  placeholder = 'Select options',
  className,
  children,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')

  // Convert children to options if provided instead of options prop
  const selectOptions = React.useMemo(() => {
    if (options.length > 0) return options

    const childOptions: { label: string; value: string }[] = []
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === MultiSelectItem) {
        const { value, children } = child.props
        childOptions.push({
          label: children as string,
          value,
        })
      }
    })
    return childOptions
  }, [children, options])

  const selectedOptions = selectOptions.filter((option) => 
    value.includes(option.value)
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between h-auto min-h-10',
            selectedOptions.length > 0 ? 'h-auto' : 'h-10',
            className
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <Badge
                  variant="secondary"
                  key={option.value}
                  className="mr-1 mb-1"
                >
                  {option.label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onChange(value.filter((item) => item !== option.value))
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search..."
            value={searchValue}
            onValueChange={setSearchValue}
            className="h-9"
          />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {selectOptions.map((option) => {
              const isSelected = value.includes(option.value)
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(
                      isSelected
                        ? value.filter((item) => item !== option.value)
                        : [...value, option.value]
                    )
                    setSearchValue('')
                  }}
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{option.label}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface MultiSelectItemProps {
  value: string
  children: React.ReactNode
}

export function MultiSelectItem({
  value,
  children,
}: MultiSelectItemProps) {
  return null // This component is only used for structure, not rendering
} 