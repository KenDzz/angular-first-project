import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ButtonComponent } from '../../../shared/components/button/button';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-reports',
  imports: [ButtonComponent, DatePipe, TranslatePipe],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  protected readonly isGeneratingReport = signal(false);

  protected onGenerateReport(reportType: string): void {
    this.isGeneratingReport.set(true);
    console.log('Generating report:', reportType);

    setTimeout(() => {
      this.isGeneratingReport.set(false);
      console.log('Report generated successfully');
    }, 2000);
  }
}
