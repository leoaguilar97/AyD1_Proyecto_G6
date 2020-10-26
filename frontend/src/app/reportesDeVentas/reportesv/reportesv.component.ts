import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import * as CanvasJS from "./canvasjs.min";
import { ServicioReportesService } from './servicioReportes/servicio-reportes.service'

@Component({
  selector: "app-reportesv",
  templateUrl: "./reportesv.component.html",
  styleUrls: ["./reportesv.component.css"],
})
export class ReportesvComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient, private servicio: ServicioReportesService) {}

  // Declaraciones
  posts:any = [];
  tipo = "";
  filtro = "";
  rango = "";
  public show: boolean = false;
  public show2: boolean = false;
  public show3: boolean = false;
  public showChart: boolean = false;
  public showChart2: boolean = false;
  public showChart3: boolean = false;
  httpdata;

  ngOnInit() {
    
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
    if (this.tipo == "Pie") {
      this.showChart = true;
      this.showChart2 = false;
      this.showChart3 = false;
      this.llenarArray();
    } else if (this.tipo == "Lineal") {
      this.showChart = false;
      this.showChart2 = true;
      this.showChart3 = false;
      this.llenarArray();
    } else {
      this.showChart = false;
      this.showChart2 = false;
      this.showChart3 = true;
      this.llenarArray();
    }
  }

  

  cancelar() {
    this.tipo = "";
    this.filtro = "";
  }

  cancelar2() {
    this.rango = ""
  }

  llenarArray(){

    if(this.filtro == "Dia" && this.tipo == "Barras"){

      this.servicio.getDia("Barras",this.rango).toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        console.log("ler", this.posts.length)
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["total"];
          label = data["data"][i]["venta"];
          dataPoints.push({ y: y, label: label });
        }
        console.log(dataPoints);
        let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "REPORTE DE VENTAS",
          },
          data: [
            {
              type: "column",
              
              dataPoints: dataPoints,
            },
          ],
        });
    
        chart.render();
      });

    } else if (this.filtro == "Dia" && this.tipo == "Lineal"){

      this.servicio.getDia("Lineal", this.rango).toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["total"];
          label = data["data"][i]["venta"];
          dataPoints.push({ y: y});
        }
        console.log(dataPoints);
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
      });
      
    } else if (this.filtro == "Dia" && this.tipo == "Pie"){
      this.servicio.getDia("Pie", this.rango).toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["total"];
          label = data["data"][i]["venta"];
          dataPoints.push({ y: y, name: label.toString() });
        }
        console.log(dataPoints);
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
              dataPoints: dataPoints,
            },
          ],
        });
    
        chart.render();
      });
      
    } else if(this.filtro == "Mes" && this.tipo == "Barras"){

      this.servicio.getMes("Barras",this.evaluarMes(this.rango)).toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["total"];
          label = data["data"][i]["dia"];
          dataPoints.push({ y: y, label: label });
        }
        console.log(dataPoints);
        let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "REPORTE DE VENTAS",
          },
          data: [
            {
              type: "column",
              
              dataPoints: dataPoints,
            },
          ],
        });
    
        chart.render();
      });

    } else if (this.filtro == "Mes" && this.tipo == "Lineal"){

      this.servicio.getMes("Lineal", this.evaluarMes(this.rango)).toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["total"];
          label = data["data"][i]["dia"];
          dataPoints.push({ y: y});
        }
        console.log(dataPoints);
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
      });
      
    } else if (this.filtro == "Mes" && this.tipo == "Pie"){
      let asaber:string=this.evaluarMes(this.rango)
      this.servicio.getMes("Pie", asaber).toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["total"];
          label = data["data"][i]["dia"];
          dataPoints.push({ y: y, name: label.toString() });
        }
        console.log(dataPoints);
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
              dataPoints: dataPoints,
            },
          ],
        });
    
        chart.render();
      });
      
    } else if(this.filtro == "Categorias" && this.tipo == "Barras"){

      this.servicio.getCategorias("Barras").toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["cantidad"];
          label = data["data"][i]["nombre"];
          dataPoints.push({ y: y, label: label });
        }
        console.log(dataPoints);
        let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "REPORTE DE VENTAS",
          },
          data: [
            {
              type: "column",
              
              dataPoints: dataPoints,
            },
          ],
        });
    
        chart.render();
      });

    } else if (this.filtro == "Categorias" && this.tipo == "Lineal"){

      this.servicio.getCategorias("Lineal").toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["cantidad"];
          label = data["data"][i]["nombre"];
          dataPoints.push({ y: y});
        }
        console.log(dataPoints);
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
      });
      
    } else if (this.filtro == "Categorias" && this.tipo == "Pie"){

      this.servicio.getCategorias("Pie").toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["cantidad"];
          label = data["data"][i]["nombre"];
          dataPoints.push({ y: y, name: label });
        }
        console.log(dataPoints);
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
              dataPoints: dataPoints,
            },
          ],
        });
    
        chart.render();
      });
      
    } else if(this.filtro == "Productos" && this.tipo == "Barras"){

      this.servicio.getProductos("Barras").toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["cantidad"];
          label = data["data"][i]["nombre"];
          dataPoints.push({ y: y, label: label });
        }
        console.log(dataPoints);
        let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "REPORTE DE VENTAS",
          },
          data: [
            {
              type: "column",
              
              dataPoints: dataPoints,
            },
          ],
        });
    
        chart.render();
      });

    } else if (this.filtro == "Productos" && this.tipo == "Lineal"){

      this.servicio.getProductos("Lineal").toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["cantidad"];
          label = data["data"][i]["nombre"];
          dataPoints.push({ y: y});
        }
        console.log(dataPoints);
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
      });
      
    } else if (this.filtro == "Productos" && this.tipo == "Pie"){

      this.servicio.getProductos("Pie").toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["cantidad"];
          label = data["data"][i]["nombre"];
          dataPoints.push({ y: y, name: label });
        }
        console.log(dataPoints);
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
              dataPoints: dataPoints,
            },
          ],
        });
    
        chart.render();
      });
      
    } else if(this.filtro == "Vendedor" && this.tipo == "Barras"){


      this.servicio.getVendedor("Barras").toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["cantidad"];
          label = data["data"][i]["nombre"];
          dataPoints.push({ y: y, label: label });
        }
        console.log(dataPoints);
        let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "REPORTE DE VENTAS",
          },
          data: [
            {
              type: "column",
              
              dataPoints: dataPoints,
            },
          ],
        });
    
        chart.render();
      });

    } else if (this.filtro == "Vendedor" && this.tipo == "Lineal"){

      this.servicio.getVendedor("Lineal").toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["cantidad"];
          label = data["data"][i]["nombre"];
          dataPoints.push({ y: y});
        }
        console.log(dataPoints);
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
      });
      
    } else if (this.filtro == "Vendedor" && this.tipo == "Pie"){

      this.servicio.getVendedor("Pie").toPromise().then((data: any) => {
        console.log(data);
        this.posts = data["data"];
        let dataPoints = [];
        let y = 0;
        let label = "";
        for (var i = 0; i < this.posts.length; i++) {
          y = data["data"][i]["cantidad"];
          label = data["data"][i]["nombre"];
          dataPoints.push({ y: y, name: label });
        }
        console.log(dataPoints);
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
              dataPoints: dataPoints,
            },
          ],
        });
    
        chart.render();
      });
      
    }
  }

  evaluarMes(messi:string): string{

    if(messi == "Enero"){
      
      return "2020-01"

    } else if(messi=="Febrero"){

      return "2020-02"
      
    } else if(messi=="Marzo"){

      return "2020-03"

    } else if(messi=="Abril"){

      return "2020-04"

    } else if(messi=="Mayo"){

      return "2020-05"

    } else if(messi=="Junio"){

      return "2020-06"

    } else if(messi=="Julio"){

      return "2020-07"

    } else if(messi=="Agosto"){

      return "2020-08"

    } else if(messi=="Septiembre"){

      return "2020-09"

    } else if(messi=="Octubre"){

      return "2020-10"

    } else if(messi=="Noviembre"){

      return "2020-11"

    } else if(messi=="Diciembre"){

      return "2020-12"

    }
  }

}
