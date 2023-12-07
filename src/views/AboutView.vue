<template>
  <div class="about">
    <ShoppingList title="Supermarkt"/>
  </div>
</template>

<script>
import ShoppingList from '@/components/ShoppingList.vue'

export default {
  name: 'AboutView',
  components: {
    ShoppingList
  }
}
</script>
