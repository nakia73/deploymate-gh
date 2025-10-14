import { useState } from "react";
import { StepCard } from "@/components/StepCard";
import { ProgressHeader } from "@/components/ProgressHeader";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "GitHubリポジトリの作成",
    description: "まず、GitHubで新しいリポジトリを作成します。リポジトリ名は「username.github.io」形式にすると、ユーザーサイトとして公開できます。",
    code: "# リポジトリ名の例\nyour-username.github.io",
  },
  {
    title: "プロジェクトのクローンと初期化",
    description: "作成したリポジトリをローカルにクローンし、プロジェクトファイルを配置します。",
    code: `git clone https://github.com/your-username/your-repo.git
cd your-repo
# あなたのプロジェクトファイルをここに配置`,
  },
  {
    title: "ビルドの設定（必要な場合）",
    description: "ReactやViteなどのフレームワークを使用している場合、本番用のビルドを作成します。package.jsonのbase設定も確認しましょう。",
    code: `# vite.config.tsでbaseを設定
base: '/your-repo-name/'

# ビルドコマンド
npm run build`,
  },
  {
    title: "GitHub Actionsの設定",
    description: ".github/workflows/deploy.ymlファイルを作成し、自動デプロイを設定します。",
    code: `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist`,
  },
  {
    title: "コミットとプッシュ",
    description: "変更をコミットし、GitHubにプッシュします。",
    code: `git add .
git commit -m "Initial commit"
git push origin main`,
  },
  {
    title: "GitHub Pagesの有効化",
    description: "GitHubリポジトリの Settings > Pages で、Source を「GitHub Actions」に設定します。数分待つと、サイトが公開されます。",
  },
  {
    title: "デプロイの確認",
    description: "https://your-username.github.io/your-repo-name/ にアクセスして、正しく公開されているか確認しましょう！",
  },
];

const Index = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const handleReset = () => {
    setCompletedSteps([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          <ProgressHeader currentStep={completedSteps.length} totalSteps={steps.length} />
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                stepNumber={index + 1}
                title={step.title}
                description={step.description}
                code={step.code}
                completed={completedSteps.includes(index)}
                onComplete={() => handleStepComplete(index)}
              />
            ))}
          </div>

          {completedSteps.length === steps.length && (
            <div className="text-center space-y-4 p-8 bg-card rounded-lg border border-primary">
              <div className="text-6xl">🎉</div>
              <h2 className="text-2xl font-bold">おめでとうございます！</h2>
              <p className="text-muted-foreground">
                すべてのステップを完了しました。あなたのアプリは世界中から見られるようになりました！
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleReset} variant="outline">
                  最初から始める
                </Button>
                <Button asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHubで確認
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
