import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Embed = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe src="${window.location.origin}" width="100%" height="800" frameborder="0" style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast({
        title: "Скопировано!",
        description: "Код для встраивания скопирован в буфер обмена",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать код",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Icon name="Code2" size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Код для встраивания</h1>
          <p className="text-muted-foreground">Вставьте этот код на ваш сайт Tilda</p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="text-xs">
                <Icon name="Layers" size={12} className="mr-1" />
                HTML/iframe код
              </Badge>
              <Button
                onClick={handleCopy}
                size="sm"
                className="gap-2"
                variant={copied ? "default" : "outline"}
              >
                <Icon name={copied ? "Check" : "Copy"} size={16} />
                {copied ? "Скопировано" : "Копировать"}
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code className="text-xs md:text-sm text-foreground font-mono block whitespace-pre-wrap break-all">
                {embedCode}
              </code>
            </div>
          </div>

          <Card className="bg-primary/5 border-primary/20 p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="BookOpen" size={18} className="text-primary" />
              Инструкция для Tilda
            </h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-bold text-primary flex-shrink-0">1.</span>
                <span>Откройте редактор страницы Tilda, где хотите разместить трансляцию</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary flex-shrink-0">2.</span>
                <span>Добавьте блок "HTML-код" (найдите в категории "Другое")</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary flex-shrink-0">3.</span>
                <span>Нажмите кнопку "Копировать" выше и вставьте код в блок</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary flex-shrink-0">4.</span>
                <span>Сохраните изменения и опубликуйте страницу</span>
              </li>
            </ol>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
              <Icon name="Smartphone" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium mb-1">Адаптивный дизайн</p>
              <p className="text-xs text-muted-foreground">Отлично работает на всех устройствах</p>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-secondary/10 to-transparent border-secondary/30">
              <Icon name="Zap" size={24} className="mx-auto mb-2 text-secondary" />
              <p className="text-sm font-medium mb-1">Live-обновления</p>
              <p className="text-xs text-muted-foreground">Автоматически каждые 5 секунд</p>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
              <Icon name="Shield" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium mb-1">Безопасно</p>
              <p className="text-xs text-muted-foreground">Не влияет на скорость сайта</p>
            </Card>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="gap-2"
            >
              <Icon name="ArrowLeft" size={16} />
              Вернуться к трансляции
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Embed;
