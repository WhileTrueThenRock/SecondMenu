//Swiper
const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    speed: 200,
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

  });

  function filterSlides(category) {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      slide.classList.add('hidden');
    });

    const filteredSlides = document.querySelectorAll(`.swiper-slide[data-category="${category}"]`);
    filteredSlides.forEach(slide => {
      slide.classList.remove('hidden');
    });

    // Cambiar el título según el grupo
    const categoryTitle = document.getElementById('category-title');
    switch (category) {
      case 'group1':
        categoryTitle.textContent = 'Entrantes';
        break;
      case 'group2':
        categoryTitle.textContent = 'Pasta';
        break;
      case 'group3':
        categoryTitle.textContent = 'Pescado';
        break;
      case 'group4':
        categoryTitle.textContent = 'Carnes';
        break;
      case 'group5':
        categoryTitle.textContent = 'Postres';
        break;
      // Añade más casos para otros grupos
      default:
        categoryTitle.textContent = 'Categoría';
    }

    // Reiniciar la animación del título
    categoryTitle.classList.remove('animate');
    void categoryTitle.offsetWidth; // Forzar reflujo
    categoryTitle.classList.add('animate');

    localStorage.setItem('lastCategory', category);
    swiper.update();

  }



  function saveCurrentSlide(category, slideIndex) {
    localStorage.setItem('lastCategory', category);
    localStorage.setItem('lastSlideIndex', slideIndex);
  }

  window.onload = () => {
    const swiperContainer = document.querySelector('.swiper');

    // Ocultar el Swiper completamente al cargar (opacidad 0)
    swiperContainer.style.opacity = '0';

    const lastCategory = localStorage.getItem('lastCategory') || 'group1';
    const lastSlideIndex = localStorage.getItem('lastSlideIndex') || 0;

    // Aplicar el filtro de categoría al cargar
    filterSlides(lastCategory);

    // Mover inmediatamente a la última diapositiva sin animación
    swiper.slideTo(lastSlideIndex, 0, false);

    // Mostrar el Swiper solo cuando haya cargado la diapositiva correcta
    setTimeout(() => {
      swiperContainer.style.opacity = '1'; // Hacerlo visible lentamente después de un breve retraso
    }, 100); // Este retraso asegura que el Swiper se cargue correctamente
  };


  swiper.on('slideChange', () => {
    const currentSlide = swiper.realIndex;
    const currentCategory = localStorage.getItem('lastCategory');
    saveCurrentSlide(currentCategory, currentSlide);
  });

  // Allergens

  function toggleAllergens(allergensId, viewMoreId, viewLessId) {
    const allergensDiv = document.getElementById(allergensId);
    const viewMore = document.getElementById(viewMoreId);
    const viewLess = document.getElementById(viewLessId);

    if (allergensDiv.style.display === 'none') {
      allergensDiv.style.display = 'block';
      viewMore.style.display = 'none';
      viewLess.style.display = 'inline-block';
    } else {
      allergensDiv.style.display = 'none';
      viewMore.style.display = 'inline-block';
      viewLess.style.display = 'none';
    }
  }

 /* //Arrows scroll
  let scrollAmount = 0;
  const scrollStep = 120; // Ajusta este valor para que se desplace un elemento a la vez

  function scrollList(direction) {
    const list = document.querySelector('.navigation');
    const listWidth = list.scrollWidth;
    const containerWidth = document.querySelector('.horizontal-scroll').clientWidth;

    if (direction === 1) {
      // Desplazar hacia la derecha
      scrollAmount += scrollStep;
      if (scrollAmount > listWidth - containerWidth) {
        scrollAmount = listWidth - containerWidth; // No permite sobrepasar el final
      }
    } else {
      // Desplazar hacia la izquierda
      scrollAmount -= scrollStep;
      if (scrollAmount < 0) {
        scrollAmount = 0; // No permite sobrepasar el inicio
      }
    }

    list.style.transform = `translateX(-${scrollAmount}px)`;
  } */

  //Cart number + effects

  document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Actualizar el contador de platos en el carrito al cargar la página
    updateCartCount(cart);

    document.querySelectorAll('button#add').forEach(button => {
      const dishName = button.getAttribute('data-dish-name');

      let dishInCart = cart.find(item => item.name === dishName);
      if (dishInCart) {
        button.innerHTML = '<i class="fa-solid fa-check"style="color: green;"></i>';
      } else {
        button.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
      }
    });
  });

  function toggleOrder(button, dishName, description, imageUrl) {
    const item = { name: dishName, description: description, imageUrl: imageUrl };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let dishIndex = cart.findIndex(item => item.name === dishName);

    if (dishIndex !== -1) {
      cart.splice(dishIndex, 1);
      button.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
    } else {
      cart.push({ name: dishName, description: description, imageUrl: imageUrl, quantity: 1 });
      button.innerHTML = '<i class="fa-solid fa-check"style="color: green;"></i>';

      let cartElement = $('#order');
      let imgtodrag = $(button).closest('.dish-info').find("img").eq(0);

      if (imgtodrag.length) {
        var imgclone = imgtodrag.clone().offset({
          top: imgtodrag.offset().top,
          left: imgtodrag.offset().left
        }).css({
          'opacity': '0.8',
          'position': 'absolute',
          'height': '150px',
          'width': '150px',
          'z-index': '100'
        }).appendTo($('body')).animate({
          'top': cartElement.offset().top + 10,
          'left': cartElement.offset().left + 10,
          'width': 75,
          'height': 75
        }, 1000, 'easeInOutExpo', function () {
          imgclone.fadeOut('fast', function () {
            $(this).remove();
          });
        });
      }
    }

    // Guardar carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar el contador de platos
    updateCartCount(cart);
  }

  // Función para actualizar el número total de platos
  function updateCartCount(cart) {
    const cartCount = cart.length; // Total de platos en el carrito
    document.getElementById('cart-count').textContent = cartCount;
  }