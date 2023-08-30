import { promises as fs } from "fs"

class ProductManager {
    constructor() {
        this.patch = "./elementos.txt";
        this.productos = []
    }

    static id = 0

    addProduct = async (titulo, descripcion, precio, imagen, codigo, stock) => {

        ProductManager.id++
        let newProduct = {
            titulo,
            descripcion,
            precio,
            imagen,
            codigo,
            stock,
            id: ProductManager.id,
        };

        this.productos.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.productos));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta);
    }

    getProducts = async () => {
        // let resp = await this.readProducts()
        //return console.log(resp)
    }

    getProductsById = async (id) => {
        let respu = await this.readProducts();
        if (!respu.find((product) => product.id === id)) {
            console.log("Producto no encontrado");
        } else {
            console.log(respu.find((product) => product.id === id));
        }
    };

    deleteProductsById = async (id) => {
        let respu = await this.readProducts();
        let filterProduct = respu.filter(productos => productos.id != id)
        await fs.writeFile(this.patch, JSON.stringify(filterProduct));
        console.log("Producto Eliminado")
    };

    actualizarProductos = async ({ id, ...producto }) => {
        await this.deleteProductsById(id);
        let prodOld = await this.readProducts()
        let prodMod = [{ id, ...producto }, ...prodOld];
        await fs.writeFile(this.patch, JSON.stringify(prodMod));
    };
}

const elementos = new ProductManager();

/* elementos.addProduct("TituloUno", "DescripcionUno", 2000, "ImagenUno", "abc1", 5)
elementos.addProduct("TituloDos", "DescripcionDos", 1000, "ImagenDos", "abc2", 10)
elementos.addProduct("TituloTres", "DescripcionTres", 1000, "ImagenTres", "abc3", 15)*/

//elementos.getProducts();
//elementos.getProductsById(1);
//elementos.deleteProductsById(2)

elementos.actualizarProductos({
    "titulo": "TituloTres",
    "descripcion": "DescripcionTres",
    "precio": 4000,
    "imagen": "ImagenTres",
    "codigo": "abc3",
    "stock": 15,
    "id": 3
})
