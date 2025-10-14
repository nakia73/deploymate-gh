import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  code?: string;
  completed: boolean;
  onComplete: () => void;
}

export const StepCard = ({ stepNumber, title, description, code, completed, onComplete }: StepCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      toast({
        title: "コピーしました",
        description: "コマンドがクリップボードにコピーされました",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className={`transition-all duration-300 ${completed ? 'border-primary' : ''}`}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-lg transition-all duration-300 ${
            completed ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}>
            {completed ? <Check className="h-6 w-6" /> : stepNumber}
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
        
        {code && (
          <div className="relative">
            <pre className="bg-code-bg rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-foreground">{code}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
        
        {!completed && (
          <Button onClick={onComplete} className="w-full">
            完了にする
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
