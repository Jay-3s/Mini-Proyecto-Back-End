import React, { useState, useEffect } from 'react'
import llamados from '../services/llamados'

function Inventario() {
  const [nombre, setNombre] = useState('')
  const [desc, setDesc] = useState('')
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")
  const [img, setImg] = useState(null)
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetchProductos()
  }, [])

  async function fetchProductos() {
    try {
      const data = await llamados.GetProducts()
      setProductos(data)
    } catch (error) {
      // Manejo de error opcional
    }
  }

  async function agregar() {
  const formData = new FormData()
  formData.append('nombre', nombre)
  formData.append('descripcion', desc)
  formData.append('precio', precio)
  formData.append('stock', stock)
  if (img) formData.append('imagen', img)

  try {
    console.log('Enviando:', nombre, desc, precio, stock, img)
    if (editId) {
      await llamados.UpdateProduct(editId, formData) // <-- Cambia aquí
      setEditId(null)
    } else {
      await llamados.PostProduct(formData)
    }
    fetchProductos()
    setNombre('')
    setDesc('')
    setPrecio("")
    setStock("")
    setImg(null)
  } catch (error) {
    // Manejo de error opcional
  }
 }

  async function eliminarProducto(id) {
    try {
      await llamados.DeleteProduct(id)
      fetchProductos()
    } catch (error) {
      // Manejo de error opcional
    }
  }

  function editarProducto(producto) {
    setEditId(producto.id)
    setNombre(producto.nombre)
    setDesc(producto.descripcion)
    setPrecio(producto.precio)
    setStock(producto.stock)
    setImg(null) // No se puede editar la imagen directamente
  }

  return (
    <div className='container'>
      <div>
        <label>Nombre</label>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />

        <label>Descripción</label>
        <input type="text" value={desc} onChange={e => setDesc(e.target.value)} />

        <label>Precio</label>
        <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} />

        <label>Stock</label>
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} />

        <label>Imagen</label>
        <input type="file" onChange={e => setImg(e.target.files[0])} />

        <button onClick={agregar}>Agregar</button>

       <h2>Productos</h2>
       <ul>
         {productos.map(producto => (
           <li key={producto.id}>
             {producto.nombre} - {producto.descripcion} - {producto.precio} - {producto.stock}
             {producto.imagen && (
               <img
                 src={`http://127.0.0.1:8000${producto.imagen}`}
                 alt={producto.nombre}
                 width={50}
                 style={{ marginLeft: 10 }}
                />
             )}
              <button onClick={() => eliminarProducto(producto.id)} style={{ marginLeft: 10 }}>Eliminar</button>
              <button onClick={() => editarProducto(producto)} style={{ marginLeft: 5 }}>Editar</button>
           </li>
          ))}
      </ul>    
      </div>
    </div>
  )
}

export default Inventario