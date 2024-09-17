$('.add-to-order').on('click', function () {
  let orderButton = $('#order'); // Selecciona el botón de "order"

  // Encuentra la imagen del plato (aunque esté oculta)
  let imgtodrag = $(this).parent('.dish-info').find("img");

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
      'top': orderButton.offset().top + 20,
      'left': orderButton.offset().left + 30,
      'width': 75,
      'height': 75
    }, 1000, 'easeInOutExpo');

    imgclone.animate({
      'width': 0,
      'height': 0
    }, function () {
      $(this).detach();
    });
  }
});
