module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nombre: String,
        apellido: String,
        dpi: { type: Number, unique: true },
        correo: { type: Number, unique: true },
        fechaNacimiento: Date,
        direccion: String,
        numeroCelular: Number,
        tienda: Number,
        password: String,
        roles: []
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