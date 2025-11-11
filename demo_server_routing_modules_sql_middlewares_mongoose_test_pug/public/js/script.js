console.log("hola desde VanillaJS. Aquí va tu código para manipular el DOM de la web y para hacer llamadas a API");

document.getElementById("searchButton").addEventListener("click", async e => {
    const title = document.getElementById("productName").value;
    alert(title);
    try{
        const res = await fetch(`/api/books/${title}`); // Llamada a un endpoint de mi propia API
        const data = await res.json();
        alert(data);
        console.log(data);
        document.getElementById("result").innerHTML = JSON.stringify(data);
    }
    catch(error){
        console.log(error);
    }
})

document.getElementById("productForm").addEventListener("submit",(event) => {
    event.preventDefault();

    const id = event.target.id.value;
    const title = event.target.title.value;
    const price = event.target.price.value;
    const description = event.target.description.value;
    const image = event.target.image.value;
    const companyName = event.target.companyName.value;

    console.log(id,title,price,description,image,companyName);

// POST http://localhost:3000/api/products
/*
A enviar por body: (con el nuevo campo de nombre de provider para que haga la relación)
  {
    "id": 3,
    "title": "Ensalada de huevos con atún",
    "price": 2.5,
    "description": "Cafe jugosa del teatro",
    "image": "https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-1200x828.jpg",
    "companyName": "La casa de las plantas"
  }
*/

    const productData = {
        id,
        title,
        price,
        description,
        image,
        companyName
    };

    fetch('/api/products',{
            method:"POST",
            body:JSON.stringify(productData),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                alert("Producto creado con éxito");
                //Refrescar la página para ver el nuevo producto
                window.location.reload();
            })
})