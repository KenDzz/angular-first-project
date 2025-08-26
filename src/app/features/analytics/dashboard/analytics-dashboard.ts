import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { ButtonComponent } from '../../../shared/components/button/button';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  conversionRate: number;
}

@Component({
  selector: 'app-analytics-dashboard',
  imports: [ButtonComponent, DatePipe, DecimalPipe, TranslatePipe],
  templateUrl: './analytics-dashboard.html',
  styleUrl: './analytics-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsDashboardComponent {
  protected readonly analyticsData = signal<AnalyticsData>({
    totalUsers: 12543,
    activeUsers: 8721,
    revenue: 45678,
    conversionRate: 23.5,
  });

  protected readonly chartData = signal([
    { date: new Date('2024-01-01'), value: 1200 },
    { date: new Date('2024-01-02'), value: 1400 },
    { date: new Date('2024-01-03'), value: 1100 },
    { date: new Date('2024-01-04'), value: 1800 },
    { date: new Date('2024-01-05'), value: 1600 },
  ]);

  protected readonly lastUpdated = signal(new Date());

  protected onRefreshData(): void {
    // Simulate data refresh
    this.lastUpdated.set(new Date());
    console.log('Analytics data refreshed');
  }
}
