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
  productos = [];
  cats = [];
  cats2 = [];
  nuevo_nombre: string;
  nueva_categoria = "";
  nuevo_proveedor = "";
  nueva_data = "";
  tipo = "";
  filtro = "";
  dia = "";
  mes = "";
  anio = "";
  public show: boolean = false;
  public show2: boolean = false;
  public show3: boolean = false;
  httpdata;

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategs();
    this.graficaBarras();
    this.graficaPie();
    this.graficaLineal();
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
    } else {
      this.show = false;
      this.show2 = false;
      this.show3 = true;
    }
  }

  cargarProductos(): boolean {
    this.http
      .get("https://api-erpp.herokuapp.com/api/producto")
      .toPromise()
      .then((data: any) => {
        this.productos = data;
      });
    return true;
  }

  cargarCategs() {
    this.http
      .get("https://api-erpp.herokuapp.com/api/categoria")
      .subscribe((data) => this.displaydata(data));
  }

  displaydata(data) {
    this.httpdata = data;
    console.log(this.httpdata);
    this.httpdata.categorias.forEach((element) => {
      this.cats.push(element);
    });
    console.log(this.cats);
  }

  editar(id: string) {
    this.router.navigate(["editarProducto", id]);
  }

  eliminar(id: string) {
    const direccion = "https://api-erpp.herokuapp.com/api/producto/" + id;
    this.http
      .delete(direccion)
      .toPromise()
      .then((data: any) => {
        console.log(data);
        this.cargarProductos();
      });
  }

  agregar() {
    console.log("BANDERA" + this.nueva_categoria);
    this.http
      .post("https://api-erpp.herokuapp.com/api/producto", {
        nombre: this.nuevo_nombre,
        categorias: [this.nueva_categoria],
        proveedores: [this.nuevo_proveedor],
      })
      .toPromise()
      .then((data: any) => {
        console.log(data);
        this.cancelar();
        this.cargarProductos();
      });
  }

  cancelar() {
    this.nuevo_nombre = "";
    this.nueva_categoria = "";
    this.nuevo_proveedor = "";
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
