import { Component, Input, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../assets/js/canvasjs.min';
import { ParentModel } from 'src/app/models/parent.model';
import { KidModel } from 'src/app/models/kid.model';

@Component({
  selector: 'app-home-parent',
  templateUrl: './home-parent.component.html',
  styleUrls: ['./home-parent.component.css']
})
export class HomeParentComponent implements OnInit {
  parent: ParentModel;
  kid_images: string[];
  analisis: string[];
  activity: any[];

  constructor() {}

  ngOnInit() {
    this.getData();
    var chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      axisY: {
        titleFontColor: '#464990',
        lineColor: '#464990',
        labelFontColor: '#464990',
        tickColor: '#464990'
      },
      axisY2: {
        titleFontColor: '#542E78',
        lineColor: '#542E78',
        labelFontColor: '#542E78',
        tickColor: '#542E78'
      },

      legend: {
        cursor: 'pointer',
        itemclick: toggleDataSeries
      },
      data: [
        {
          type: 'column',
          legendText: `${this.parent.name}`,
          showInLegend: true,
          dataPoints: [
            { label: `motivación-Artes`, y: 266.21 },
            { label: 'Talento-Artes', y: 302.25 },
            { label: `motivación-Ingeniería`, y: 266.21 },
            { label: 'Talento-Ingeniería', y: 302.25 }
          ]
        },
        {
          type: 'column',
          legendText: ' Promedio',
          axisYType: 'secondary',
          showInLegend: true,
          dataPoints: [
            { label: 'motivación-Artes', y: 10.46 },
            { label: '', y: 2.27 },
            { label: 'motivación-Ingeniería', y: 10.46 },
            { label: '', y: 2.27 }
          ]
        }
      ]
    });
    chart.render();

    function toggleDataSeries(e) {
      chart.render();
    }
  }

  getData() {
    this.parent = {
      name: 'Camila',
      email: 'camila@correo.com',
      lastname: 'Torres',
      password: '...'
    };
    this.kid_images = [
      'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F19-1572106646295?alt=media&token=82d4933e-4eae-4e51-943d-0d12d6bc9036',
      'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F22-1572109366370?alt=media&token=3c448d74-3996-4212-9967-281c1e9ba9f4',
      'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F10-1572109266296?alt=media&token=fa24e33f-e29a-40c7-97b5-3388fc4cb97e',
      'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F52-1572109441181?alt=media&token=4da42055-df80-426b-a0c1-a4f8d9686d18',
      'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F72-1572109515494?alt=media&token=94725b21-3d1e-4afe-bd83-056cd37fe90e'
    ];
    this.activity = [
      {
        specialist: 'assets/img/psychologist.jpg',
        description: 'Estudio Completado',
        photo:
          'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F85-1572104348924?alt=media&token=c926b4bb-d058-42a7-9f57-66e2195f7a87',
        date: 'Octubre 26, 2019'
      },
      {
        specialist: 'assets/img/psychologist.jpg',
        description: 'Estudio Completado',
        photo:
          'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F20-1572105484884?alt=media&token=90ad80a6-04b5-4d83-9ed7-0c410ef931d0',
        date: 'Octubre 26, 2019'
      },
      {
        specialist: 'assets/img/psychologist.jpg',
        description: 'Estudio Completado',
        photo:
          'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F2-1572105232306?alt=media&token=aeb5023e-0d9f-41fc-b8a3-64f1a2ad06f5',
        date: 'Octubre 26, 2019'
      },
      {
        specialist: 'assets/img/psychologist.jpg',
        description: 'Estudio Completado',
        photo:
          'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F72-1572104971521?alt=media&token=daf673a5-75bb-4311-b8fa-881e869a1f2d',
        date: 'Octubre 26, 2019'
      }
    ];

    this.analisis = [
      'lorem	lorem lreo lorem lorem ',
      'lorem	lorem lreo lorem lorem ',
      'lorem	lorem lreo lorem lorem '
    ];
  }
}
