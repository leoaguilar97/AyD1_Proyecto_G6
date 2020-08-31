module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        primerNombre: String,
        segundoNombre: String,
        primerApellido: String,
        segundoApellido: String,
        dpi: Number,
        fechaNacimiento: Date,
        direccion: String,
        numeroCelular: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Usuario = mongoose.model("usuario", schema);
    return Usuario;
};