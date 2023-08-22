class ProductManager {
    constructor() {
        this.products = []
    }

    static id = 0

    addProduct(title, description, price, image, code, stock) {

        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) {
                console.log(`El codigo ${code} esta repetido`);
                break;
            }
        }

        const productoNuevo = {
            title, description, price, image, code, stock,
        };

        if (!Object.values(productoNuevo).includes(undefined)) {
            ProductManager.id++;
            this.products.push({
                ...productoNuevo,
                id: ProductManager.id,
             });
        } else {
           console.log("Debe llenar los campos necesarios")
        }
    }

    getProduct() {
        return this.products;
    }

    existe(id) {
        return this.products.find((elementos) => elementos.id === id)
    }

    getProductById(id) {
        !this.existe(id) ? console.log("Not Found") : console.log(this.existe(id));
    }
}

const elementos = new ProductManager();

console.log(elementos.getProduct());

elementos.addProduct("tituloElement1", "descripcionElement1", 3000, "imagenElement1", "123abc", 5);
elementos.addProduct("tituloElement2", "descripcionElement2", 1000, "imagenElement2", "124abc");

console.log(elementos.getProduct());

elementos.addProduct("tituloElement3", "descripcionElement3", 1000, "imagenElement3", "124abc", 7);

elementos.getProductById(2)

elementos.getProductById(3);