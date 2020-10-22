import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import * as CanvasJS from "./canvasjs.min";

@Component({
  selector: "app-reportesv",
  templateUrl: "./reportesv.component.html",
  styleUrls: ["./reportesv.component.css"],
})
export class ReportesvComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  // Declaraciones
  tipo = "";
  filtro = "";
  dia = "";
  mes = "";
  anio = "";
  rango = "";
  public show: boolean = false;
  public show2: boolean = false;
  public show3: boolean = false;
  public showChart: boolean = false;
  public showChart2: boolean = false;
  public showChart3: boolean = false;
  httpdata;

  ngOnInit(): void {
    
  }

  toggle() {
    if (this.filtro == "Dia") {
      this.show = true;
      this.show2 = false;
      this.show3 = false;
    } else if (this.filtro == "Mes") {
      this.show = false;
      this.show2 = true;
      this.show3 = false;
    } else if (this.filtro == "Anio") {
      this.show = false;
      this.show2 = false;
      this.show3 = true;
    } else {
      this.show = false;
      this.show2 = false;
      this.show3 = false;
    }
  }

  toggle2() {
    console.log(this.rango);
    if (this.tipo == "Pie") {
      this.showChart = true;
      this.graficaPie();
      this.showChart2 = false;
      this.showChart3 = false;
    } else if (this.tipo == "Lineal") {
      this.showChart = false;
      this.showChart2 = true;
      this.graficaLineal();
      this.showChart3 = false;
    } else {
      this.showChart = false;
      this.showChart2 = false;
      this.showChart3 = true;
      this.graficaBarras();
    }
  }

  

  cancelar() {
    this.tipo = "";
    this.filtro = "";
  }

  cancelar2() {
    this.dia = "";
    this.mes = "";
    this.anio = "";
  }

  graficaBarras() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "REPORTE DE VENTAS",
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { y: 71, label: "Apple" },
            { y: 55, label: "Mango" },
            { y: 50, label: "Orange" },
            { y: 65, label: "Banana" },
            { y: 95, label: "Pineapple" },
            { y: 68, label: "Pears" },
            { y: 28, label: "Grapes" },
            { y: 34, label: "Lychee" },
            { y: 14, label: "Jackfruit" },
          ],
        },
      ],
    });

    chart.render();
  }

  graficaPie() {
    let chart = new CanvasJS.Chart("chartContainer3", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "REPORTE DE VENTAS",
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: [
            { y: 450, name: "Food" },
            { y: 120, name: "Insurance" },
            { y: 300, name: "Traveling" },
            { y: 800, name: "Housing" },
            { y: 150, name: "Education" },
            { y: 150, name: "Shopping" },
            { y: 250, name: "Others" },
          ],
        },
      ],
    });

    chart.render();
  }

  graficaLineal() {
    let dataPoints = [];
    let y = 0;
    for (var i = 0; i < 10000; i++) {
      y += Math.round(5 + Math.random() * (-5 - 5));
      dataPoints.push({ y: y });
    }
    let chart = new CanvasJS.Chart("chartContainer2", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "REPORTE DE VENTAS",
      },
      subtitles: [
        {
          text: "",
        },
      ],
      data: [
        {
          type: "line",
          dataPoints: dataPoints,
        },
      ],
    });

    chart.render();
  }
}
