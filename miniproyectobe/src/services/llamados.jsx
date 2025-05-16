// Servicios para consumir la API de Django

// Obtener productos
async function GetProducts() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/productos/', {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Error fetching products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

// Crear producto
async function PostProduct(formData) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/productos/", {
            method: 'POST',
            body: formData
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            console.error('Respuesta del backend:', data);
            throw new Error('Error posting product');
        }
        return data;
    } catch (error) {
        console.error('Error posting product:', error);
        throw error;
    }
}

// Actualizar producto
async function UpdateProduct(id, formData) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/productos/${id}/`, {
            method: 'PATCH',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Error updating product with id ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

// Eliminar producto
async function DeleteProduct(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/productos/${id}/`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error deleting product with id ${id}`);
        }
        return { message: `Product with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

export default { GetProducts, PostProduct, UpdateProduct, DeleteProduct };