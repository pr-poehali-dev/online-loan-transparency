import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface LoanApplication {
  id: string;
  name: string;
  amount: number;
  status: 'approved' | 'rejected';
  timestamp: Date;
  avatar: string;
}

const Index = () => {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [stats, setStats] = useState({
    approvedToday: 0,
    totalAmount: 0,
    successRate: 0
  });

  useEffect(() => {
    const generateRandomApplication = (): LoanApplication => {
      const names = [
        'Алексей Морозов', 'Мария Петрова', 'Дмитрий Соколов', 'Елена Волкова',
        'Сергей Новиков', 'Анна Смирнова', 'Иван Козлов', 'Ольга Федорова',
        'Николай Лебедев', 'Татьяна Орлова', 'Михаил Егоров', 'Светлана Попова'
      ];
      const amounts = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000];
      const statuses: ('approved' | 'rejected')[] = ['approved', 'approved', 'approved', 'rejected'];
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: names[Math.floor(Math.random() * names.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        timestamp: new Date(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
      };
    };

    const initialApps = Array.from({ length: 8 }, generateRandomApplication);
    setApplications(initialApps);

    const approved = initialApps.filter(app => app.status === 'approved');
    setStats({
      approvedToday: approved.length,
      totalAmount: approved.reduce((sum, app) => sum + app.amount, 0),
      successRate: Math.round((approved.length / initialApps.length) * 100)
    });

    const interval = setInterval(() => {
      const newApp = generateRandomApplication();
      setApplications(prev => [newApp, ...prev.slice(0, 15)]);
      
      if (newApp.status === 'approved') {
        setStats(prev => ({
          approvedToday: prev.approvedToday + 1,
          totalAmount: prev.totalAmount + newApp.amount,
          successRate: Math.round(((prev.approvedToday + 1) / (prev.approvedToday + 1 + (15 - prev.approvedToday))) * 100)
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Займы Онлайн
          </h1>
          <p className="text-muted-foreground text-lg">Прозрачная система выдачи займов в режиме реального времени</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 animate-fade-in hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <Icon name="CheckCircle2" size={32} className="text-primary" />
              <Badge className="bg-primary text-primary-foreground">Сегодня</Badge>
            </div>
            <div className="text-4xl font-bold text-primary mb-1">{stats.approvedToday}</div>
            <div className="text-sm text-muted-foreground">Одобренных заявок</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/30 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-2">
              <Icon name="Wallet" size={32} className="text-secondary" />
              <Badge className="bg-secondary text-secondary-foreground">Выдано</Badge>
            </div>
            <div className="text-4xl font-bold text-secondary mb-1">{stats.totalAmount.toLocaleString('ru-RU')} ₽</div>
            <div className="text-sm text-muted-foreground">Общая сумма</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-2">
              <Icon name="TrendingUp" size={32} className="text-accent" />
              <Badge className="bg-accent text-accent-foreground">Рейтинг</Badge>
            </div>
            <div className="text-4xl font-bold text-accent mb-1">{stats.successRate}%</div>
            <div className="text-sm text-muted-foreground">Процент одобрения</div>
          </Card>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
            <h2 className="text-2xl font-bold">Трансляция заявок</h2>
          </div>
          <Badge variant="outline" className="text-xs">Обновляется каждые 5 сек</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {applications.map((app, index) => (
            <Card
              key={app.id}
              className={`p-5 transition-all duration-500 animate-slide-up ${
                app.status === 'approved'
                  ? 'bg-gradient-to-r from-primary/10 to-transparent border-primary/50 hover:border-primary'
                  : 'bg-gradient-to-r from-destructive/10 to-transparent border-destructive/30 hover:border-destructive/50'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <img src={app.avatar} alt={app.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{app.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {app.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold mb-2">
                    {app.amount.toLocaleString('ru-RU')} ₽
                  </div>
                  {app.status === 'approved' ? (
                    <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Icon name="CheckCircle" size={14} className="mr-1" />
                      Одобрен
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <Icon name="XCircle" size={14} className="mr-1" />
                      Отказ
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Card className="p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-dashed">
            <p className="text-sm text-muted-foreground mb-3">
              Интегрируйте трансляцию на ваш сайт
            </p>
            <div className="bg-muted p-4 rounded-lg text-left overflow-x-auto">
              <code className="text-xs text-foreground font-mono">
                {`<iframe src="${window.location.href}" width="100%" height="600" frameborder="0"></iframe>`}
              </code>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
