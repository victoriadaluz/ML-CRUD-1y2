const { log } = require('console');
const fs = require('fs'); //REQUERIMOS EL MODULO FILE SYSTEM (fs es un módulo nativo de Node.js que permite interactuar con los archivos del sistema)
const path = require('path'); //REQUERIMOS EL MODULO PATH QUE GUARDA FILE SYSTEM (para poder trabajar con rutas relativas y absolutas)

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//guardamos en la constante la ruta exacta y el archivo que se encuentre en esa ruta

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJSON = (dataBase) => {
	fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dataBase), "utf-8")
}
//creamos una funcion que recibe como parametro
//una base de datos y convierte(stringify) su valor a una cadena de 
//texto en formato JSON

//There are many different ways of printing an integer with a comma as a thousands separators in JavaScript.
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		//buscamos en la base de datos el producto cuyo ID sea igual al parametro numerico recibido por URL
		//haciendo uso de la propiedad params.id del request
		let product = products.find(product => product.id === +req.params.id);

		res.render('detail', {
			product,
			toThousand
		})
		//Renderizamos la vista detail.ejs en el primer parametro,
		//y le pasamos como segundo parametro un objeto con la variable product
		//encontrado por ID en la base de datos(JSON), para poder trabajar con esa variable en la vista detail.ejs 
		//y usar los datos del JSON
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let lastID = 1;

		products.forEach(product => {
			if(product.id > lastID) {
				lastID = product.id
				//recorremos los productos (JSON) y preguntamos si dentro del producto
				//su id es mayor a la variable lastId, si es verdadero, le asignamos el mismo ID del producto a la variable
			}
		})

		let {
			name,
			price,
			discount,
			category,
			description
			} = req.body
		//destructuramos(desglozamos) los elementos del objeto body para
		//obtener todos los datos del formulario a traves de sus atributos
		//name y value

		let newProduct = {
			//con esto le asignamos un nuevo ID a cada producto creado.
			id: lastID + 1,
			name,
			price,
			discount,
			category,
			description,
			image: "default-image.png"
			//cuando tengamos todos los datos del body
			//creamos un nuevo objeto siguiendo el mismo orden
			//y le pasamos los valores del body
			//para poder crear un nuevo producto
		}

		products.push(newProduct);
		//pusheamos el nuevo producto al array de products original 
		//para despues poder subirlo a nuestra base de datos(JSON)

		writeJSON(products)
		//ejecutamos esta funcion para convertir los datos de products
		//en un texto en formato JSON y guardar esos datos
		// dentro de la variable products(JSON)
		res.redirect('/products')
		//redireccionamos la ruta recibida como parametro
		//cuando terminemos de crear el nuevo producto,
		//nos lleva a la vista de products
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(product => product.id === +req.params.id);
		//buscamos en la base de datos el producto cuyo ID sea igual al parametro numerico recibido por URL
		//haciendo uso de la propiedad params.id del request

		res.render('product-edit-form', {
			product
		})
		//rederizamos la vista product-edit-form.ejs
		//como segundo parametro un objeto con la variable product
		//encontrado por url en el JSON, para poder trabajar con esa variable en la vista product-edit-form
	},

	// Update - Method to update
	update: (req, res) => {
		let {name,
			price,
			discount,
			category,
			description } = req.body;
		//destructuramos(desglozamos,desarmamos) los elementos del objeto body para
		//obtener todos los datos del formulario a traves de sus atributos
		//name y value

		products.forEach(product => {
			if(product.id === +req.params.id) {
				product.name = name,
				product.price = price,
				product.discount = discount,
				product.category = category,
				product.description = description
			}
			//recorremos el JSON y 
			//preguntamos Si, el ID es igual al parametro numerico que recibimos por URL,
			//hacemos que a cada dato del JSON le reescribimos o modifiquemos, su valor  
		})

		writeJSON(products);
		//volvemos a guardar el valor modificado/editado en la base de Datos

		res.redirect('/products')
		//enviamos un mje en el buscador informando que funcion o metodo utilizamos
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let product = products.find(product => product.id === +req.params.id)
		//buscamos en la base de datos el producto cuyo ID sea igual al parametro numerico recibido por URL
		//haciendo uso de la propiedad params.id del request

		products.forEach(product => {
			if(product.id === +req.params.id) {
				let productToDestroy = products.indexOf(product);
				products.splice(productToDestroy, 1)
			}
			//recorremos la base de datos y 
			//preguntamos Si, el producto.ID es igual al parametro numerico que recibimos por URL,
			//a products lo recorremos con un indexOf y buscamos el ID que coincida con el req.param.id(parametro numerico que recibimos por URL)
			//si existe el id devolvemos ese indice que corresponde al objeto recorrido en el array   
			//ya que indexOf() devuelve el primer indice de la posicion del caracter o cadena a buscar
			//despues usamos el metodo splice para eliminar de products el indice encontrado que guarda la variable productToDestroy,
			//como primer parametro le pasamos la variable productToDestroy y como segundo parametro el numero de elementos a borrar
		})
		writeJSON(products);
		//devolvemos los productos y si eliminamos alguno lo redireccionamos a products
		res.redirect('/products')
	}
};

module.exports = controller;