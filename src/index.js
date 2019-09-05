import Vue from 'vue'
import lozad from 'lozad'
import '@ecomplus/storefront-twbs'
import EcProductCard from './components/EcProductCard.vue'
import EcomCart from '@ecomplus/shopping-cart'

export default options => {
  const elClass = (options && options.elClass) || 'product-card'
  const cart = new EcomCart()

  const load = $productCard => {
    if (!$productCard.classList.contains('ec-product-card')) {
      const { productId, sku } = $productCard.dataset

      new Vue({
        components: {
          EcProductCard
        },

        data () {
          return {
            productId,
            sku
          }
        },

        methods: {
          addToCart ({ product }) {
            cart.addProduct(product)
          }
        },

        template: `
        <ec-product-card
          class="${elClass}"
          :data-product-id="productId"
          :data-sku="sku"
          :productId="productId"
          @buy="addToCart"
        >
          ${$productCard.outerHTML}
        </ec-product-card>`
      }).$mount($productCard)
    }
  }

  const observer = lozad(`.${elClass}`, { load })
  observer.observe()
}
