module.exports = mongoose => {

    var schema = mongoose.Schema({
        nombre_cliente: String,
        nit: String,
        direccion: String,
        vendedor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vendedor'
        },

        bodega: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bodega'
        },

        productos: [{
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'producto'
            },
            cantidad: Number
        }]
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Venta = mongoose.model("venta", schema);
    return Venta;
};