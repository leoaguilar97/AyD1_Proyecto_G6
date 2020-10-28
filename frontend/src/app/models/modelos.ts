export interface Venta {
    id: String;
    nombre: String;
    cantidad: Number;
    precio: Number;
}

export interface Item {
    producto: String;
    cantidad: Number;
    precio: Number;
}

export interface Producto {
    producto: String;
    cantidad: String;
}

export interface Factura {
    nombre_cliente: String;
    nit: String;
    direccion: String;
    vendedor: String;
    productos: Array<Producto>;
    bodega: String;
}

export interface Inventario {
    bodega: String;
    productos: Array<Item>;
}
