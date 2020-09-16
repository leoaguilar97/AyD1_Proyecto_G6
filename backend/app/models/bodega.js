module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            nombre: { type: String, required: true },
            direccion: { type: String, required: true },
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Bodega = mongoose.model("bodega", schema);
    return Bodega;
};