import { useState, useEffect } from "react";

const Form = () => {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    categoria_id: "",
    imagen: null,
  });

  const campos = [
    { span: "Nombre", type: "text", name: "nombre" },
    { span: "Precio", type: "number", name: "precio" },
    { span: "Imagen", type: "file", name: "imagen" },
  ];

  useEffect(() => {
    fetch("https://insutec.shop/phpmar/categorias.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategorias(data.data);
        }
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = new FormData();
    datos.append("nombre", formData.nombre);
    datos.append("precio", formData.precio);
    datos.append("categoria_id", formData.categoria_id);
    datos.append("imagen", formData.imagen);

    try {
      const res = await fetch("https://insutec.shop/phpmar/upload.php", {
        method: "POST",
        body: datos,
      });

      const result = await res.json();
      console.log("Respuesta del servidor:", result);

      if (result.success) {
        alert("Producto subido con éxito");
        // Reset form si querés
        setFormData({
          nombre: "",
          precio: "",
          categoria_id: "",
          imagen: null,
        });
      } else {
        alert("Error al subir: " + result.error);
      }
    } catch (error) {
      console.error("Error en el fetch:", error);
      alert("Error de red o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {campos.map((campo, index) => (
        <div key={index}>
          <label>
            <span>{campo.span}</span>
            <input
              type={campo.type}
              name={campo.name}
              onChange={handleChange}
              {...(campo.type !== "file"
                ? { value: formData[campo.name] }
                : {})}
              required
            />
          </label>
        </div>
      ))}

      <div>
        <label>
          <span>Categoría</span>
          <select
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button type="submit">Subir</button>
    </form>
  );
};

export default Form;
