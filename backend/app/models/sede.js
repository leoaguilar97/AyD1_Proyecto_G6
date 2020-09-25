module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            nombre: { type: String, required: true },
            direccion: { type: String, required: true },
            municipio: { type: String, required: true },
            departamento: { type: String, required: true },
            encargado: { type: String, required: true },
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Sede = mongoose.model("sede", schema);
    return Sede;
};