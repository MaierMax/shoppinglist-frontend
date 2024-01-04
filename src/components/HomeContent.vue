<template>
  <h3>{{ title }}</h3>
  <div class="button-right">
    <button type="button" @click="deleteAll()"><img :src="require(`@/assets/bin.png`)" alt="Image" id="tiny-image"> Delete All Lists</button>
  </div>
  <div class="centered-container">
    <div id="adding">
      <input v-model="nameField" placeholder="Name" type="text" ref="nameInput" @keyup.enter="save()">
      <button type="button" @click="save()">Save</button>
    </div>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="lists.length === 0">
          <td colspan="3" style="text-align: center;">No lists yet</td>
        </tr>
        <tr v-for="list in lists" :key="list.listID">
          <td @click="changeList(list)"><img :src="require(`@/assets/pen.png`)" alt="Image" id="little-image"></td>
          <td @click="open(list.listID, list.listName)">{{ list.listName }}</td>
          <td @click="deleteList(list.listID)"><img :src="require(`@/assets/bin.png`)" alt="Image" id="little-image"></td>
        </tr>
        <tr v-if="nameField != null && nameField !== ''">
          <td></td>
          <td>{{ nameField }}</td>
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
      lists: [],
      nameField: ''
    }
  },
  methods: {
    loadThings () {
      const endpoint = 'http://localhost:8080/home'
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(list => {
          this.lists.push(list)
        }))
        .catch(error => console.log('error', error))
    },
    save () {
      const endpoint = 'http://localhost:8080/saveList'
      const data = {
        listName: this.nameField
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
      location.reload()
    },
    open (listID, listName) {
      const endpoint = 'http://localhost:8080/getItemsOfList/' + listID
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(list => {
          this.lists.push(list)
        }))
        .catch(error => console.log('error', error))
      this.$router.push({ name: 'list', params: { listID: listID, title: listName } })
    },
    deleteList (listID) {
      const endpoint = 'http://localhost:8080/deleteList/' + listID
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
        })
        .catch(error => console.log('error', error))
      location.reload()
    },
    deleteAll () {
      if (confirm('Do you want to delete all lists and items in those lists?')) {
        const endpoint = 'http://localhost:8080/deleteAllLists'
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data)
          })
          .catch(error => console.log('error', error))
        location.reload()
      }
    },
    changeList (list) {
      const update = prompt('Please enter the new Name', list.listName)
      if (update != null && update !== '') {
        const endpoint = 'http://localhost:8080/updateList/' + list.listID
        const data = {
          newName: update
        }
        const requestOptions = {
          method: 'PUT',
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
        location.reload()
      }
    }
  },
  mounted () {
    this.loadThings()
  }
}
</script>

<style scoped>

  table {
    margin: 0 auto;
    width: 20%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th {
    background-color: #f2f2f2;
  }

  button {
    padding: 10px 16px;
    background-color: #64b467;
    color: black;
    border: none;
    cursor: pointer;
  }
</style>
