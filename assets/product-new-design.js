const SWATCH_ACTIVE_CLASS = 'border-white'
const SWATCH_INACTIVE_CLASS = 'border-white/20'
const HIDDEN_CLASS = 'hidden'

const updateProductImage = (productImageEl, url) => {
  if (productImageEl) productImageEl.src = url
}

const updateProductPrice = (productPriceEl, price) => {
  if (productPriceEl) productPriceEl.textContent = price
}

const updateSelectedColor = (selectedColorEl, color) => {
  if (selectedColorEl) selectedColorEl.textContent = color
}

const updateVariantId = (variantIdEl, variantId) => {
  if (variantIdEl) variantIdEl.value = variantId
}

const updateSubmitState = (submitEl, submitTextEl, isAvailable) => {
  if (!submitEl) return
  submitEl.disabled = !isAvailable
  if (submitTextEl) submitTextEl.textContent = isAvailable ? 'Add to Cart' : 'Sold Out'
}

const deactivateAllSwatches = (swatches) => {
  if (swatches.length) {
    swatches.map((swatchEl) => swatchEl.classList.replace(SWATCH_ACTIVE_CLASS, SWATCH_INACTIVE_CLASS))
  }
}

const activateSwatch = (swatchEl) => {
  if (swatchEl) swatchEl.classList.replace(SWATCH_INACTIVE_CLASS, SWATCH_ACTIVE_CLASS)
}

const hideAllVariantImageGroups = (variantImageGroups) => {
  if (variantImageGroups.length) {
    variantImageGroups.map((groupEl) => groupEl.classList.add(HIDDEN_CLASS))
  }
}

const showVariantImages = (variantImageGroups, variantColor) => {
  if (!variantImageGroups.length) return

  const targetGroupEl = variantImageGroups.find(
    (groupEl) => groupEl.dataset.variantImagesGroup === variantColor
  )
  if (targetGroupEl) targetGroupEl.classList.remove(HIDDEN_CLASS)
}

const productImageEl = document.querySelector('.js-product-image')
const productPriceEl = document.querySelector('.js-product-price')
const selectedColorEl = document.querySelector('.js-selected-color')
const variantIdEl = document.querySelector('.js-product-form-variant-id')
const submitEl = document.querySelector('.js-product-form-submit')
const submitTextEl = document.querySelector('.js-product-form-submit-text')
const swatches = Array.prototype.slice.call(document.querySelectorAll('.js-variant-swatch'))
const variantImageGroups = Array.prototype.slice.call(document.querySelectorAll('.js-variant-images-group'))

if (swatches.length) {
  swatches.map((swatchEl) => {
    swatchEl.addEventListener('click', () => {
      const { variantId, variantImage, variantPrice, variantColor, variantAvailable } = swatchEl.dataset
      const isAvailable = variantAvailable === 'true'

      updateProductImage(productImageEl, variantImage)
      updateProductPrice(productPriceEl, variantPrice)
      updateSelectedColor(selectedColorEl, variantColor)
      updateVariantId(variantIdEl, variantId)
      updateSubmitState(submitEl, submitTextEl, isAvailable)
      deactivateAllSwatches(swatches)
      activateSwatch(swatchEl)
      hideAllVariantImageGroups(variantImageGroups)
      showVariantImages(variantImageGroups, variantColor)

      if (window.productNewDesignSwiper) {
        window.productNewDesignSwiper.update(variantImage, variantColor)
      }
    })
  })
}
