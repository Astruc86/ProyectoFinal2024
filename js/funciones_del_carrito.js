document.addEventListener("DOMContentLoaded", () => {
  const carritoItemsStorage = JSON.parse(localStorage.getItem("cart")) || [];
  const carritoTableBody = document.getElementById("carrito-items");
  const totalgeneral = document.getElementById("total");
  let total = 0;

  const calcularTotal = () => {
    total = carritoItemsStorage.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    totalgeneral.textContent = total.toFixed(2);
  };

  const renderizarCarrito = () => {
    carritoTableBody.innerHTML = "";
    carritoItemsStorage.forEach((item, index) => {
      const row = document.createElement("tr");

      const nombreCelda = document.createElement("td");
      nombreCelda.textContent = item.title;
      row.appendChild(nombreCelda);

      const precioCelda = document.createElement("td");
      precioCelda.textContent = `$${item.price}`;
      row.appendChild(precioCelda);

      const cantidadCelda = document.createElement("td");
      const cantidadInput = document.createElement("input");
      cantidadInput.type = "number";
      cantidadInput.min = 1;
      cantidadInput.value = item.quantity || 1;
      cantidadInput.classList.add("form-control", "cantidad-input");
      cantidadInput.style.width = "80px";
      cantidadInput.style.margin = "0 auto";
      cantidadInput.addEventListener("change", (e) => {
        actualizarCantidad(index, parseInt(e.target.value));
      });
      cantidadCelda.appendChild(cantidadInput);
      row.appendChild(cantidadCelda);

      const subtotalCelda = document.createElement("td");
      subtotalCelda.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
      subtotalCelda.classList.add("subtotal");
      row.appendChild(subtotalCelda);

      const eliminarCelda = document.createElement("td");
      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.classList.add("btn", "btn-danger", "btn-sm");
      eliminarBtn.addEventListener("click", () => {
        eliminarProducto(index);
      });
      eliminarCelda.appendChild(eliminarBtn);
      row.appendChild(eliminarCelda);

      carritoTableBody.appendChild(row);
    });

    calcularTotal();
  };

  const actualizarCantidad = (index, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    carritoItemsStorage[index].quantity = nuevaCantidad;
    localStorage.setItem("cart", JSON.stringify(carritoItemsStorage));
    renderizarCarrito();
  };

  const eliminarProducto = (index) => {
    carritoItemsStorage.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(carritoItemsStorage));
    renderizarCarrito();
  };

  carritoItemsStorage.forEach((item) => {
    item.quantity = item.quantity || 1;
  });
  renderizarCarrito();

  document.getElementById("limpiar-carrito").addEventListener("click", () => {
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });

  document.getElementById("finalizar-compra").addEventListener("click", () => {
    Swal.fire({
      title: "Compra Procesada",
      text: "Se ha procesado la compra #1200",
      icon: "success",
      confirmButtonText: "Aceptar",
    });

    localStorage.removeItem("cart");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 4000);
  });
});
