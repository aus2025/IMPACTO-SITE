'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';
import Mermaid from '@/components/Mermaid';
import { generateMermaidFlow, generateMermaidSequence, generateMermaidERD } from '@/utils/mermaid-utils';
import { BusinessAssessment } from '@/types/assessment';

interface MermaidModalProps {
  assessment: BusinessAssessment | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MermaidModal({ assessment, isOpen, onClose }: MermaidModalProps) {
  const [mermaidCode, setMermaidCode] = useState<string>('');
  const [diagramType, setDiagramType] = useState<'flow' | 'sequence' | 'erd'>('flow');
  
  // Generate diagram safely with error handling
  const generateSafeDiagram = (generator: Function, data: BusinessAssessment): string => {
    try {
      return generator(data);
    } catch (error) {
      console.error('Error generating diagram:', error);
      return `graph TD\n  A[Error] --> B[Failed to generate diagram]`;
    }
  };
  
  useEffect(() => {
    if (assessment) {
      switch (diagramType) {
        case 'flow':
          setMermaidCode(generateSafeDiagram(generateMermaidFlow, assessment));
          break;
        case 'sequence':
          setMermaidCode(generateSafeDiagram(generateMermaidSequence, assessment));
          break;
        case 'erd':
          setMermaidCode(generateSafeDiagram(generateMermaidERD, assessment));
          break;
        default:
          setMermaidCode('');
      }
    }
  }, [assessment, diagramType]);
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(mermaidCode)
      .then(() => {
        alert('Mermaid code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };
  
  if (!assessment) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Mermaid Diagram Generator for {assessment.company || 'Assessment'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={diagramType} onValueChange={(value) => setDiagramType(value as 'flow' | 'sequence' | 'erd')} className="flex-1 flex flex-col">
          <TabsList>
            <TabsTrigger value="flow">Flow Chart</TabsTrigger>
            <TabsTrigger value="sequence">Sequence Diagram</TabsTrigger>
            <TabsTrigger value="erd">Entity Relationship</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-1 gap-4 mt-4 overflow-hidden">
            {/* Diagram Preview */}
            <div className="flex-1 overflow-auto border rounded-md p-4 bg-white">
              <h3 className="font-medium text-sm mb-2 text-gray-500">Diagram Preview</h3>
              <div className="w-full h-full overflow-auto bg-white p-2">
                <Mermaid chart={mermaidCode} />
              </div>
            </div>
            
            {/* Mermaid Code */}
            <div className="w-96 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm text-gray-500">Mermaid Code</Label>
                <Button variant="ghost" size="sm" onClick={handleCopyCode} className="h-6 px-2">
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <Textarea 
                value={mermaidCode}
                onChange={(e) => setMermaidCode(e.target.value)}
                className="flex-1 font-mono text-sm resize-none"
              />
            </div>
          </div>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 