<template>
  <div class="list">
    <ListContent :title="this.$route.params.title" :listID="this.$route.params.listID" />
  </div>
</template>

<script>
import ListContent from '@/components/ListContent.vue'

export default {
  name: 'ListView',
  props: {
    listID: {
      type: Number
    },
    title: {
      type: String
    }
  },
  components: {
    ListContent
  }
}
</script>
