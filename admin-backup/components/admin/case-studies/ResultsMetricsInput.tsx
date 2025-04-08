'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { CaseStudyMetric } from './CaseStudyForm'
import { Plus, Trash, Move } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface ResultsMetricsInputProps {
  metrics: CaseStudyMetric[]
  onChange: (metrics: CaseStudyMetric[]) => void
}

export default function ResultsMetricsInput({
  metrics,
  onChange
}: ResultsMetricsInputProps) {
  // Add new metric
  const addMetric = () => {
    const newMetric: CaseStudyMetric = {
      id: uuidv4(),
      label: '',
      value: '',
      prefix: '',
      suffix: '%'
    }
    
    onChange([...metrics, newMetric])
  }
  
  // Remove metric
  const removeMetric = (id: string) => {
    onChange(metrics.filter(m => m.id !== id))
  }
  
  // Update metric
  const updateMetric = (id: string, field: keyof CaseStudyMetric, value: string) => {
    onChange(
      metrics.map(m => 
        m.id === id 
          ? { ...m, [field]: value }
          : m
      )
    )
  }
  
  // Move metric up or down
  const moveMetric = (id: string, direction: 'up' | 'down') => {
    const index = metrics.findIndex(m => m.id === id)
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === metrics.length - 1)
    ) {
      return // Can't move first up or last down
    }
    
    const newMetrics = [...metrics]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    // Swap the metrics
    const temp = newMetrics[targetIndex];
    newMetrics[targetIndex] = newMetrics[index];
    newMetrics[index] = temp;
    
    onChange(newMetrics)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Results Metrics</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addMetric}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          <span>Add Metric</span>
        </Button>
      </CardHeader>
      <CardContent>
        {metrics.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No metrics added yet. Add metrics to highlight key results.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <div 
                key={metric.id} 
                className="p-4 border border-gray-200 rounded-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Metric {index + 1}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveMetric(metric.id, 'up')}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <Move size={16} className="rotate-180" />
                      <span className="sr-only">Move up</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveMetric(metric.id, 'down')}
                      disabled={index === metrics.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <Move size={16} />
                      <span className="sr-only">Move down</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMetric(metric.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash size={16} />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor={`metric-label-${metric.id}`}>Label</Label>
                    <Input
                      id={`metric-label-${metric.id}`}
                      placeholder="e.g., Increase in Conversion Rate"
                      value={metric.label}
                      onChange={(e) => updateMetric(metric.id, 'label', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor={`metric-prefix-${metric.id}`}>Prefix</Label>
                      <Input
                        id={`metric-prefix-${metric.id}`}
                        placeholder="e.g., $"
                        value={metric.prefix || ''}
                        onChange={(e) => updateMetric(metric.id, 'prefix', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`metric-value-${metric.id}`}>Value</Label>
                      <Input
                        id={`metric-value-${metric.id}`}
                        placeholder="e.g., 250"
                        value={metric.value}
                        onChange={(e) => updateMetric(metric.id, 'value', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`metric-suffix-${metric.id}`}>Suffix</Label>
                      <Input
                        id={`metric-suffix-${metric.id}`}
                        placeholder="e.g., %"
                        value={metric.suffix || ''}
                        onChange={(e) => updateMetric(metric.id, 'suffix', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">Preview:</p>
                  <div className="font-medium text-lg">
                    {metric.label}: {metric.prefix}{metric.value}{metric.suffix}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 