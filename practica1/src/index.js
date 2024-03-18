const products = {};
const categories = [];

const categoriesContainer = $("#categories");
const productsContainer = $("#productos");

$(document).ready(function () {
  $.getJSON("../assets/products.json", function (productos) {
    productos.forEach(function (producto) {
      products[producto.id] = producto;
      const contenido = `
      <div class="product-container rounded-3 my-3 justify-content-between" style="width:100%; z-index: 10" data-categoria="cat-${producto.categoria}" data-product="product-${producto.id}">
          <div class="my-4 d-flex">
          <div class="d-flex flex-row" style="width:100%">
            <div class="d-flex flex-column" style="width: 80%">
              <div class="d-flex flex-row rounded" style="padding: 15px; width: 100%">
                <div class="rounded" style="margin-right: 10%; margin-left: 5%">
                  <img src="${producto.imagen}" height=128 width=128 class="card-img-top rounded" id="img-${producto.id}" alt="${producto.nombre}">
                </div>
                <div class="info" style="padding: 5px">
                    <h5>${producto.descripcion}</h5>
                    <p style="font-size: 10px">Producto: ${producto.id}</p>
                    <p class="info-text stock">Stock disponible: ${producto.stock}</p>
                    <p>Precio: ${producto.precio}€</p>
                </div>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-center" style="height: 100%; margin: auto 10px; ">
                  <span style="cursor: pointer; color: #1B97AD" class="btn-añadir-carrito" data-product="${producto.id}">Agregar a la cesta</span>
            </div>
        </div>
      </div>
    <hr class="hr-product border border opacity-50" style="width: 95%; margin: 0 auto; z-index:0  " data-categoria="cat-${producto.categoria}">
    </div>
      `;
      $("#productos").append(contenido);
    });
  });

  $(document).ready(function () {
    $.getJSON("../assets/categories.json", function (cats) {
      cats.forEach((c) => {
        categories.push(c);
        const cat = `
      <button class="btn btn-primary py-2 px-4 mx-2 active-category pointer category-tag" id="cat-${c.id}">${c.value}</button>
      `;
        $("#categories").append(cat);
        const selectCat = `
          <option value="${c.id}">${c.value}</option>
        `;
        $("#newProductCategoriesSelect").append(selectCat);
      });
    });
  });

  $(document).on("click", ".category-tag", function () {
    if ($(this).hasClass("btn-primary")) {
      $(this)
        .removeClass("btn-primary")
        .removeClass("active-category")
        .addClass("btn-outline-primary");
    } else {
      $(this)
        .removeClass("btn-outline-primary")
        .addClass("active-category")
        .addClass("btn-primary");
    }

    // Get all categories with .active-category class
    const activeCategories = $(".active-category").map(function () {
      return $(this).attr("id");
    });

    $(".product-container").each(function () {
      const productCategory = $(this).data("categoria").toString();
      const isActive = $.inArray(productCategory, activeCategories) >= 0;
      if (isActive) {
        $(this)
          .removeClass("hidden")
          .addClass("product-visible")
          .queue(function (next) {
            var that = this;
            setTimeout(function () {
              $(that).addClass("product-animated");
            }, 0);
            next();
          });
      } else {
        $(this)
          .addClass("hidden")
          .removeClass("product-visible product-animated");
      }
    });
  });

  $("#navbarNav").on("click", "#login", function () {
    $("#loginModal").modal("show");
  });

  $("#loginForm").submit(function (e) {
    e.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();
    if (username === "admin" && password === "pass") {
      $("#loginModal").modal("hide");
      $("#login").parent().hide();
      $("#addCategoryButton").removeClass("hidden");
      $("#addProductButton").removeClass("hidden");
      $("#logout").parent().show();
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });

  $("#navbarNav").on("click", "#logout", function () {
    $("#login").parent().show();
    $("#addCategoryButton").addClass("hidden");
    $("#addProductButton").addClass("hidden");
    $("#logout").parent().hide();
  });

  $("#logout, #admin").parent().hide();

  $(document).ready(function () {
    let carrito = {};

    function actualizarVistaCarrito() {
      $("#cesta-top").empty();
      $("#cesta-bottom").empty();
      if (Object.keys(carrito).length === 0) {
        $("#cesta-top").append(`
        <div class="d-flex flex-row justify-content-center align-items-start">
          <div class="d-flex flex-row align-items-center">
            <div class="producto-carrito">
              No hay productos en la cesta
          </div>
          </div>
      </div>
        `);
        $("#pay").addClass("hidden");
        return;
      } else {
        $("#pay").removeClass("hidden");
      }

      let totalGeneral = 0;

      $.each(carrito, function (id, producto) {
        const costoTotalProducto = producto.precio * producto.cantidad;
        totalGeneral += costoTotalProducto;
        $("#cesta-top").append(`
        <div class="d-flex flex-row justify-content-center align-items-start" style="margin-top: 10px">
          <div class="d-flex flex-row align-items-center">
            <img src="${producto.imagen}" width=48  height=48  />
              <div class="producto-carrito">
              ${
                producto.descripcion
              } <br /> Cantidad: ${producto.cantidad} - Total: ${costoTotalProducto.toFixed(2)}€
          </div>
          <div class="d-flex flex-row justify-content-center" style="height: 100%; margin: auto 10px; ">
            <span style="cursor: pointer; margin-left: 20px" class="btn btn-outline-danger btn-reducir-carrito" data-product="${
              producto.id
            }">Eliminar de la cesta</span>
            </div>
          </div>
      </div>
        `);
      });

      $("#cesta-bottom").append(
        `
        <div class="d-flex flex-row justify-content-center">
          <div class="d-flex flex-row" style="width: 50%">
            <div class="total-carrito h4" >Total: ${totalGeneral.toFixed(
              2
            )}€</div>
          </div>
          <div class="d-flex flex-row" style="width: 50%" >
            <div class="total-carrito h4">
                <span class="btn btn-success" id="botonRealizarPedido">Realizar pedido</span>
            </div
          </div>
        </div>
        `
      );
    }

    $(document).on("click", ".btn-añadir-carrito", function () {
      const idProducto = $(this).data("product");
      const producto = products[idProducto];

      if (carrito[idProducto]) {
        if (producto.stock > 0) {
          carrito[idProducto].cantidad++;
          producto.stock--;
          actualizarVistaCarrito();
          actualizarVistaStock(idProducto, producto.stock);
        } else {
          alert("No hay suficiente stock para añadir más de este producto.");
        }
      } else {
        if (producto.stock > 0) {
          carrito[idProducto] = { ...producto, cantidad: 1 };
          producto.stock--;
          actualizarVistaCarrito();
          actualizarVistaStock(idProducto, producto.stock);
        } else {
          alert("Este producto está agotado.");
        }
      }
      if (producto.stock === 0) {
        const image = $(`#img-${producto.id}`);
        image.css("opacity", "0.2").removeClass("card-img-top");
      }
    });

    function actualizarVistaStock(idProducto, nuevoStock) {
      $(`[data-product='product-${idProducto}']`)
        .find(".info-text.stock")
        .text(`Stock disponible: ${nuevoStock}`);
    }

    actualizarVistaCarrito();

    $(document).on("click", ".btn-reducir-carrito", function () {
      const idProducto = $(this).data("product");
      const producto = products[idProducto];
      if (carrito[idProducto]) {
        carrito[idProducto].cantidad--;
        producto.stock++;
        actualizarVistaCarrito();
        actualizarVistaStock(idProducto, producto.stock);
      }
      if (carrito[idProducto].cantidad === 0) {
        delete carrito[idProducto];
        actualizarVistaCarrito();
      }
      if (producto.stock > 0) {
        const image = $(`#img-${producto.id}`);
        image.css("opacity", "1").addClass("card-img-top");
      }
    });

    $(document).on("click", "#botonRealizarPedido", function () {
      $("#confirmarPedidoModal").modal("show");
    });

    $(document).on("click", "#confirmarPedido", function () {
      alert("Pedido realizado con éxito.");
      carrito = {};
      actualizarVistaCarrito();
      $("#confirmarPedidoModal").modal("hide");
    });
  });

  $(document).on("click", "#createNewCategory", function () {
    const categoryName = $("#newCategoryName").val();
    const categoriesValues = [];
    const categoriesId = [];
    for (const categorie in categories) {
      const { value, id } = categorie;
      categoriesId.push(id);
      categoriesValues.push(value);
    }
    categoriesId.sort((a, b) => a - b);

    if (categoryName && !categoriesValues.includes(categoryName)) {
      const newId = 1 + categoriesId[categoriesId.lenght - 1];
      const newCategory = { value: categoryName, id: newId };
      categories.push(categoryName);
      $("#categories").append(`
      <button class="btn btn-primary py-2 px-4 mx-2 active-category pointer category-tag" id="cat-${newCategory.id}">${newCategory.value}</button>
    `);
      $("#newProductCategoriesSelect").append(
        `<option value="${newCategory.id}">${newCategory.value}</option>`
      );
      $("#addCategoryModal").modal("hide");
      $("#newCategoryName").val("");
    } else {
      alert("La categoría ya existe o el nombre es inválido.");
    }
  });

  $(document).on("click", "#createNewProduct", function () {
    const product = {};
    product.descripcion = $("#newProductDescription").val();
    product.precio = Number($("#newProductPrice").val());
    product.stock = Number($("#newProductStock").val());
    product.categoria = Number($("#newProductCategoriesSelect").val());

    const fileInput = $("#imageInput")[0];
    const id = Object.keys(products).length;
    product.id = id;

    if (
      product.descripcion &&
      product.precio &&
      product.stock &&
      product.categoria &&
      fileInput
    ) {
      const reader = new FileReader();

      reader.onload = function (e) {
        product.imagen = e.target.result;
        const contenido = `
      <div class="product-container rounded-3 my-3 justify-content-between" style="width:100%; z-index: 10" data-categoria="cat-${product.categoria}" data-product="product-${product.id}">
          <div class="my-4 d-flex">
          <div class="d-flex flex-row" style="width:100%">
            <div class="d-flex flex-column" style="width: 80%">
              <div class="d-flex flex-row rounded" style="padding: 15px; width: 100%">
                <div class="rounded" style="margin-right: 10%; margin-left: 5%">
                  <img src="${product.imagen}" height=128 width=128 class="card-img-top rounded" id="img-${product.id}" alt="${product.nombre}">
                </div>
                <div class="info" style="padding: 5px">
                    <h5>${product.descripcion}</h5>
                    <p style="font-size: 10px">Producto: ${product.id}</p>
                    <p class="info-text stock">Stock disponible: ${product.stock}</p>
                    <p>Precio: ${product.precio}€</p>
                </div>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-center" style="height: 100%; margin: auto 10px; ">
                  <span style="cursor: pointer; color: #1B97AD" class="btn-añadir-carrito" data-product="${product.id}">Agregar a la cesta</span>
            </div>
        </div>
      </div>
    <hr class="hr-product border border opacity-50" style="width: 95%; margin: 0 auto; z-index:0  " data-categoria="cat-${product.categoria}">
    </div>
      `;
        $("#productos").append(contenido);
        const activeCategories = $(".active-category").map(function () {
          return $(this).attr("id");
        });
        const isActive =
          $.inArray(`cat-${product.categoria}`, activeCategories) >= 0;
        if (!isActive) {
          $(`.product-container[data-categoria='cat-${product.categoria}']`)
            .addClass("hidden")
            .removeClass("product-visible product-animated");
        }
        $("#productForm")[0].reset();
        $("#addProductModal").modal("hide");
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      alert("Algún campo no está completo. Por favor revisa la información");
    }
  });
});
