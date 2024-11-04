import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../../../services/home.service';
import { firstValueFrom } from 'rxjs';
import { CookiesService } from '../../../../../../shared/services/cookies.service';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

import 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  monthWiseSpendsChart: any;
  firstName!: string;
  portfolioValue!: number;
  effectiveBuyingPower!: number;
  gainLoss!: number;
  fundsInvested = 10000;
  portfolioValueByDay = [
    { month: 'Jan', spent: 1200 },
    { month: 'Feb', spent: 800 },
    { month: 'Mar', spent: 900 },
    { month: 'Apr', spent: 1800 },
    { month: 'May', spent: 8000 },
    { month: 'Jun', spent: 300 },
    { month: 'Jul', spent: 600 },
    { month: 'Aug', spent: 8500 },
    { month: 'Sep', spent: 700 },
    { month: 'Oct', spent: 900 },
    { month: 'Nov', spent: 830 },
    { month: 'Dec', spent: 1200 },
  ];
  constructor(
    private router: Router,
    private homeService: HomeService,
    private cookiesService: CookiesService
  ) {}

  async ngOnInit() {
    const { accountId, relationId } = await this.getProfile();
    this.saveAccountIdToCookies(accountId);
    this.saveRelationIdToCookies(relationId);
    await this.getTradingAccById(accountId);
    this.createPortfolioValue();
  }

  createPortfolioValue() {
    const ctx = document.getElementById('portfolioValueByDay');
    if (ctx instanceof HTMLCanvasElement) {
      this.monthWiseSpendsChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.portfolioValueByDay.map((data) => data.month),
          datasets: [
            {
              label: 'Spent',
              data: this.portfolioValueByDay.map((data) => data.spent),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 10,
              pointHoverBackgroundColor: 'blue',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              display: false,
              beginAtZero: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  var tooltipItem = context.parsed;
                  var label = context.dataset.label || '';
                  if (label) {
                    label += ': $';
                  }
                  label += Math.round(tooltipItem.y * 100) / 100;
                  return label;
                },
              },
            },
            annotation: {
              annotations: {
                line1: {
                  type: 'line',
                  xMin: 0,
                  xMax: 0,
                  borderColor: 'rgb(255, 99, 132)',
                  borderWidth: 2,
                  borderDash: [10, 5],
                },
              },
            },
          },
          onHover: (event: any, chartElement: any) => {
            ctx.style.cursor = chartElement[0] ? 'pointer' : 'default';
          },
          onClick: (event: any, chartElement: any) => {
            if (chartElement.length > 0) {
              const index = chartElement[0].index;
              this.monthWiseSpendsChart.options.plugins.annotation.annotations.line1.xMin =
                index;
              this.monthWiseSpendsChart.options.plugins.annotation.annotations.line1.xMax =
                index;
              this.monthWiseSpendsChart.update();
            }
          },
        },
      });
    }
  }

  private async getProfile() {
    const response: any = await firstValueFrom(this.homeService.getProfile());
    this.firstName = response.first_name;
    return {
      accountId: response.alpaca_account_id,
      relationId: response.alpaca_relation_id,
    };
  }

  private saveAccountIdToCookies(accountId: string) {
    this.cookiesService.getAccountId()
      ? this.cookiesService.updateCookies('accountId', accountId, 86400)
      : this.cookiesService.saveToCookies('accountId', accountId, 86400);
  }

  private saveRelationIdToCookies(relationId: string) {
    this.cookiesService.getRelationId()
      ? this.cookiesService.updateCookies('relationId', relationId, 86400)
      : this.cookiesService.saveToCookies('relationId', relationId, 86400);
  }

  private async getTradingAccById(accountId: string) {
    const response: any = await firstValueFrom(
      this.homeService.getTradingAccById(accountId)
    );
    this.portfolioValue = this.calculatePortfolioValue(response);
    this.effectiveBuyingPower = parseFloat(response.effective_buying_power);
    this.gainLoss = this.portfolioValue - this.fundsInvested;
    console.log(response);
  }

  private calculatePortfolioValue(response: any): number {
    const lastLongMarketValue = parseFloat(response.last_long_market_value);
    const lastShortMarketValue = parseFloat(response.last_short_market_value);
    return lastLongMarketValue - lastShortMarketValue;
  }

  goToAddFund() {
    this.router.navigate(['home/invest/add-fund']);
  }

  goToExplore() {
    this.router.navigate(['home/invest/explore']);
  }
}
