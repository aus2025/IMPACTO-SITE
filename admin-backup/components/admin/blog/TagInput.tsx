'use client'

import { useState, useEffect, KeyboardEvent, useRef } from 'react'
import { X, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  label?: string
  placeholder?: string
  suggestions?: string[]
}

export default function TagInput({
  tags,
  onTagsChange,
  label = 'Tags',
  placeholder = 'Add a tag...',
  suggestions = []
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionRef = useRef<HTMLDivElement>(null)

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions.filter(
        suggestion => 
          suggestion.toLowerCase().includes(inputValue.toLowerCase()) && 
          !tags.includes(suggestion)
      )
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions([])
    }
  }, [inputValue, suggestions, tags])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag]
      onTagsChange(newTags)
      setInputValue('')
      setShowSuggestions(false)
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove)
    onTagsChange(newTags)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <Card className="p-4 space-y-3">
      <Label htmlFor="tag-input">{label}</Label>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <div 
            key={tag} 
            className="flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="relative">
        <div className="flex">
          <Input
            id="tag-input"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setShowSuggestions(true)
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              if (inputValue) {
                addTag(inputValue)
              }
            }}
            disabled={!inputValue.trim()}
            className="ml-2"
          >
            <Plus size={16} />
          </Button>
        </div>
        
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div 
            ref={suggestionRef}
            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1 max-h-60 overflow-auto"
          >
            {filteredSuggestions.map(suggestion => (
              <div 
                key={suggestion} 
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => addTag(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500">Press Enter to add a tag</p>
    </Card>
  )
} 