import { useState } from "react";
import { StepCard } from "@/components/StepCard";
import { ProgressHeader } from "@/components/ProgressHeader";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Lovableでアプリを開発する",
    description: "まずはLovableでアプリを開発しましょう。Lovableは、AIとチャットしながらウェブアプリを作れるツールです。コードを書かなくても、作りたいものを説明するだけでアプリが完成します。",
    details: [
      "Lovableの画面左側のチャット欄で、作りたいアプリについて説明します",
      "AIが自動的にコードを生成し、右側のプレビュー画面で確認できます",
      "気に入らない部分があれば、チャットで修正をお願いできます",
      "完成したら次のステップに進みましょう"
    ]
  },
  {
    title: "GitHubアカウントを準備する",
    description: "GitHubは、コードを保存・管理するための無料サービスです。まだアカウントを持っていない場合は、作成しましょう。",
    details: [
      "GitHubの公式サイト（github.com）にアクセスします",
      "「Sign up」ボタンをクリックして、メールアドレスとパスワードを登録します",
      "メール認証を完了させます",
      "すでにアカウントを持っている場合は、このステップをスキップしてOKです"
    ]
  },
  {
    title: "LovableとGitHubを連携する",
    description: "Lovableで作ったアプリのコードを、GitHubに保存します。この設定をすると、Lovableで編集するたびに自動的にGitHubにも保存されるようになります。",
    details: [
      "Lovableの画面右上にある「GitHub」ボタンをクリックします",
      "「Connect to GitHub」を選択します",
      "GitHubのログイン画面が表示されたら、ログインします",
      "Lovableがアクセス許可を求めてくるので、「Authorize」をクリックします",
      "「Create Repository」をクリックすると、GitHubに新しいリポジトリ（保管場所）が作成されます",
      "これで、Lovableで変更を加えるたびにGitHubにも自動で保存されるようになります"
    ]
  },
  {
    title: "アプリを簡単に公開する（Lovable経由）",
    description: "最も簡単な方法は、Lovableの「Publish」機能を使うことです。ボタン一つで、あなたのアプリがインターネット上に公開されます。",
    details: [
      "Lovableの画面右上にある「Publish」ボタンをクリックします",
      "数秒待つと、「yourapp.lovable.app」のような形式のURLが発行されます",
      "このURLを友達や家族に共有すれば、誰でもアクセスできます",
      "無料プランでも利用可能です",
      "注意：このURLは変更できないので、最初に決めた名前で固定されます"
    ]
  },
  {
    title: "カスタムドメインを設定する（オプション）",
    description: "「yourapp.lovable.app」ではなく、「yoursite.com」のような独自のドメイン名でアプリを公開したい場合は、カスタムドメインを設定できます。",
    details: [
      "まず、ドメイン取得サービス（お名前.comやGoogle Domainsなど）で独自ドメインを購入します",
      "Lovableの「Project > Settings > Domains」を開きます",
      "「Add Custom Domain」をクリックして、購入したドメイン名を入力します",
      "表示される設定手順に従って、ドメイン側の設定を行います",
      "設定が反映されるまで数時間〜24時間かかることがあります",
      "注意：カスタムドメインの設定には、Lovableの有料プランが必要です"
    ]
  },
  {
    title: "GitHub Pagesで公開する（上級者向け）",
    description: "Lovableを使わずに、GitHubのサービス「GitHub Pages」で無料公開することもできます。カスタムドメインも無料で設定可能です。",
    details: [
      "GitHubのあなたのリポジトリページを開きます",
      "「Settings」タブをクリックします",
      "左メニューから「Pages」を選択します",
      "「Source」で「GitHub Actions」を選択します",
      "リポジトリに「.github/workflows/deploy.yml」ファイルを追加して、デプロイ設定を記述します",
      "コードをプッシュすると、自動的にビルド＆デプロイが実行されます",
      "完了すると「https://あなたのユーザー名.github.io/リポジトリ名/」でアクセスできます",
      "この方法は技術的な知識が必要なため、初心者の方はStep 4の方法をおすすめします"
    ],
    code: `# .github/workflows/deploy.yml の例
name: Deploy to GitHub Pages

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
    title: "公開したアプリにアクセスする",
    description: "すべての設定が完了したら、実際にアプリにアクセスして動作を確認しましょう。友達や家族にURLを共有して、みんなに使ってもらいましょう！",
    details: [
      "Lovableで公開した場合：「yourapp.lovable.app」にアクセス",
      "カスタムドメインを設定した場合：「yoursite.com」にアクセス",
      "GitHub Pagesで公開した場合：「yourusername.github.io/repo-name/」にアクセス",
      "スマートフォンやタブレットでも正しく表示されるか確認してみましょう",
      "問題があれば、Lovableで修正してもう一度公開できます"
    ]
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
                details={step.details}
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
