import { Progress } from "@/components/ui/progress";

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressHeader = ({ currentStep, totalSteps }: ProgressHeaderProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
          GitHub Pages デプロイガイド
        </h1>
        <p className="text-muted-foreground text-lg">
          アプリを世界に公開しましょう
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">進捗状況</span>
          <span className="font-semibold">{currentStep} / {totalSteps} ステップ完了</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>
    </div>
  );
};
