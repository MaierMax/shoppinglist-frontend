<template>
    <h3>{{ title }}</h3>
    <div>
        <input v-model="nameField" placeholder="Name" type="text" ref="nameInput">
        <input v-model="descrField" placeholder="Description" type="text">
        <input v-model="listIdField" placeholder="List ID" type="text" @keyup.enter="save()">
        <button type="button" @click="save()">Save</button>
    </div>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="items.length === 0">
                    <td colspan="2">No products yet</td>
                </tr>
                <tr v-for="item in items" :key="item.itemID">
                    <td>{{ item.itemName }}</td>
                    <td>{{ item.itemDescr }}</td>
                </tr>
                <tr>
                    <td>{{ nameField }}</td>
                    <td>{{ descrField }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  name: 'DynamicForm',
  props: ['title'],
  data () {
    return {
      items: [],
      nameField: '',
      descrField: ''
    }
  },
  methods: {
    loadThings () {
      const endpoint = 'http://localhost:8080/items'
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(item => {
          this.items.push(item)
        }))
        .catch(error => console.log('error', error))
    },
    save () {
      const endpoint = 'http://localhost:8080/saveItem'
      const data = {
        listID: this.listIdField,
        itemName: this.nameField,
        itemDescr: this.descrField

      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
        })
        .catch(error => console.log('error', error))
    }
  },
  mounted () {
    this.loadThings()
  }
}
</script>

<style scoped>
    table {
        margin-left: auto;
        margin-right: auto;
    }
    button {
        color: black;
    }
</style>
