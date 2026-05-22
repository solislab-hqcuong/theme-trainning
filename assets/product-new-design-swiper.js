const removeVariantSlides = (swiperInstance) => {
  while (swiperInstance.slides.length > 1) {
    swiperInstance.removeSlide(swiperInstance.slides.length - 1)
  }
}

const updateMobileSwiperSlides = (swiperInstance, variantSlideTemplates, variantColor) => {
  if (!swiperInstance) return

  removeVariantSlides(swiperInstance)

  const templateEl = variantSlideTemplates.find(
    (template) => template.dataset.variantColor === variantColor
  )

  if (templateEl) {
    const clone = templateEl.content.cloneNode(true)
    const slides = Array.prototype.slice.call(clone.querySelectorAll('.swiper-slide'))
    slides.map((slide) => swiperInstance.appendSlide(slide))
  }

  swiperInstance.update()
  swiperInstance.slideTo(0, 0)
}

window.productNewDesignSwiper = (function () {
  const swiperProductImageEl = document.querySelector('.js-swiper-product-image')
  const variantSlideTemplates = Array.prototype.slice.call(
    document.querySelectorAll('.js-swiper-variant-template')
  )

  const swiperEl = document.querySelector('.js-product-swiper')
  let productSwiper = null
  if (swiperEl && typeof Swiper !== 'undefined') {
    productSwiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 16,
    })
  }

  return {
    update: (variantImage, variantColor) => {
      if (swiperProductImageEl) swiperProductImageEl.src = variantImage
      updateMobileSwiperSlides(productSwiper, variantSlideTemplates, variantColor)
    },
  }
})()
