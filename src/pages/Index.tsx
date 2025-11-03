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

    const initialApps = Array.from({ length: 3 }, () => {
      const app = generateRandomApplication();
      return { ...app, status: 'approved' as const };
    });
    setApplications(initialApps);

    const approved = initialApps.filter(app => app.status === 'approved');
    setStats({
      approvedToday: approved.length,
      totalAmount: approved.reduce((sum, app) => sum + app.amount, 0),
      successRate: Math.round((approved.length / initialApps.length) * 100)
    });

    const interval = setInterval(() => {
      const newApp = generateRandomApplication();
      const approvedApp = { ...newApp, status: 'approved' as const };
      setApplications(prev => [approvedApp, ...prev.slice(0, 2)]);
      
      setStats(prev => ({
        approvedToday: prev.approvedToday + 1,
        totalAmount: prev.totalAmount + approvedApp.amount,
        successRate: Math.round(((prev.approvedToday + 1) / (prev.approvedToday + 1)) * 100)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-7xl">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Займы Онлайн
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg">Прозрачная система выдачи займов в режиме реального времени</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-10">
          <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/20 to-white border-primary/30 animate-fade-in hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <Icon name="CheckCircle2" size={28} className="text-primary" />
              <Badge className="bg-primary text-primary-foreground text-xs">Сегодня</Badge>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stats.approvedToday}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Одобренных заявок</div>
          </Card>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-secondary/20 to-white border-secondary/30 animate-fade-in hover:shadow-lg transition-all" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-2">
              <Icon name="Wallet" size={28} className="text-secondary" />
              <Badge className="bg-secondary text-secondary-foreground text-xs">Выдано</Badge>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">{stats.totalAmount.toLocaleString('ru-RU')} ₽</div>
            <div className="text-xs md:text-sm text-muted-foreground">Общая сумма</div>
          </Card>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/15 to-white border-primary/30 animate-fade-in hover:shadow-lg transition-all" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-2">
              <Icon name="TrendingUp" size={28} className="text-primary" />
              <Badge className="bg-primary text-primary-foreground text-xs">Рейтинг</Badge>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stats.successRate}%</div>
            <div className="text-xs md:text-sm text-muted-foreground">Процент одобрения</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {applications.map((app, index) => (
            <Card
              key={app.id}
              className={`p-3 md:p-5 transition-all duration-500 animate-slide-up ${
                app.status === 'approved'
                  ? 'bg-gradient-to-r from-primary/10 to-white border-primary/50 hover:shadow-md hover:border-primary'
                  : 'bg-gradient-to-r from-destructive/10 to-white border-destructive/30 hover:shadow-md hover:border-destructive/50'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <img src={app.avatar} alt={app.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm md:text-lg truncate">{app.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {app.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-lg md:text-2xl font-bold mb-1 md:mb-2">
                    {app.amount.toLocaleString('ru-RU')} ₽
                  </div>
                  {app.status === 'approved' ? (
                    <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      Одобрен
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">
                      <Icon name="XCircle" size={12} className="mr-1" />
                      Отказ
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>


      </div>
    </div>
  );
};

export default Index;