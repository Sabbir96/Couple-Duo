import { AfterViewInit, Component, OnDestroy, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements AfterViewInit {
  isChecked = true;
  monthWiseSpendsChart: any;
  categoryWiseSpendsChart: any;

  transactions = [
    {
      date: '2022-01-01',
      amount: 100,
      expense: 'Groceries',
      person: 'Rony',
    },
    {
      date: '2022-01-01',
      amount: 100,
      expense: 'Groceries',
      person: 'Rony',
    },
    {
      date: '2022-01-01',
      amount: 100,
      expense: 'Groceries',
      person: 'Rony',
    },
    {
      date: '2022-01-01',
      amount: 100,
      expense: 'Groceries',
      person: 'Rony',
    },
    { date: '2022-01-02', amount: 200, expense: 'Rent', person: 'Audity' },
  ];

  monthWiseSpends = [
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

  categoryWiseSpends = [
    { category: 'Food', spent: 500 },
    { category: 'Transport', spent: 300 },
  ];

  ngAfterViewInit() {
    this.createCharts();
  }

  ngOnChanges(this: TrackingComponent, changes: SimpleChanges) {
    if (changes['isChecked']) {
      this.createCharts();
    }
  }

  createCharts() {
    this.createMonthWiseSpendsChart();
    this.createCategoryWiseSpendsChart();
  }

  createMonthWiseSpendsChart() {
    const ctx = document.getElementById('monthWiseSpends');
    if (ctx instanceof HTMLCanvasElement) {
      this.monthWiseSpendsChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.monthWiseSpends.map((data) => data.month),
          datasets: [
            {
              label: 'Spent',
              data: this.monthWiseSpends.map((data) => data.spent),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              tension: 0.4,
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
          },
          onHover: (event: any, chartElement: any) => {
            ctx.style.cursor = chartElement[0] ? 'pointer' : 'default';
          },
        },
      });
    }
  }

  createCategoryWiseSpendsChart() {
    const ctx = document.getElementById('categoryWiseSpends');
    if (ctx instanceof HTMLCanvasElement) {
      const colors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ];
      const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ];
      this.categoryWiseSpendsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.categoryWiseSpends.map((data) => data.category),
          datasets: [
            {
              label: 'Spent',
              data: this.categoryWiseSpends.map((data) => data.spent),
              backgroundColor: colors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
            x: {
              display: false,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }
}
