import { Component, OnInit,AfterViewInit  } from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {EventService} from "../../../service/event.service";
import {MaisonJeunesService} from "../../../service/maison-jeunes.service";
import {GroupeService} from "../../../service/groupe.service";
import Chart from 'chart.js/auto'; // Importez Chart.js

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    this.createBarChart();
    this.createPieChart();
  }

  createBarChart(): void {
    const ctxBar = (document.getElementById('myBarChart') as HTMLCanvasElement).getContext('2d');
    if (ctxBar) {
      new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: [
            'عدد الأشجار المزروعة',
            'عدد المواقع',
            'المساحة المزروعة',
            'المساحة المنظفة',
            'المساحة المروية',
            'عدد البلديات'
          ],
          datasets: [{
            label: 'إحصائيات',
            data: [150, 10, 2500, 1200, 1000, 5], // Remplacez ces valeurs par vos données réelles
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    }
  }

  createPieChart(): void {
    const ctxPie = (document.getElementById('myPieChart') as HTMLCanvasElement).getContext('2d');
    if (ctxPie) {
      new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels: [
            'عدد الأشجار المزروعة',
            'عدد المواقع',
            'المساحة المزروعة',
            'المساحة المنظفة',
            'المساحة المروية',
            'عدد البلديات'
          ],
          datasets: [{
            label: 'توزيع الإحصائيات',
            data: [150, 10, 2500, 1200, 1000, 5], // Remplacez ces valeurs par vos données réelles
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    }
  }
}