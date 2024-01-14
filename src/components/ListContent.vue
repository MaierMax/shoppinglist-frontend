<template>
  <h3>{{ title }}</h3>
  <div class="button-left">
    <button type="button" @click="back()">˂ Back</button>
  </div>
  <div class="button-right">
    <button type="button" @click="deleteItems()"><img :src="require(`@/assets/bin.png`)" alt="Image" id="tiny-image"> Delete Selected Items</button>
  </div>
  <div class="centered-container">
    <div id="adding">
      <input v-model="nameField" placeholder="Name" type="text" ref="nameInput" @keyup.enter="save()">
      <input v-model="descrField" placeholder="Description" type="text" @keyup.enter="save()">
      <button type="button" @click="save()">Save</button>
    </div>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th style="width: 10%;"></th>
          <th id="name" style="width: 30%;">Name</th>
          <th id="description" style="width: 30%;">Description</th>
          <th style="width: 10%;"></th>
        </tr>
      </thead>
    </table>
  </div>
  <div v-for="(items, category) in categorizedItems" :key="category">
    <div class="category-header">
      <button @click="toggleCategoryVisibility(category)">-{{ category }}</button>
    </div>
    <table v-show="isCategoryVisible(category)">
      <tbody>
        <tr v-if="items.length === 0">
          <td colspan="4" style="text-align: center;">No products yet</td>
        </tr>
        <tr v-for="item in items" :key="item.itemID">
          <td id="checkbox" style="width: 10%;"><input type="checkbox" v-model="checkedItems[item.itemID]" @change="handleCheckboxChange(item.itemID)"></td>
          <td id="name" style="width: 30%;" @click="changeItem(item, item.itemName, 'Name')">{{ item.itemName }}</td>
          <td id="description" style="width: 30%;" @click="changeItem(item, item.itemDescr, 'Description')">{{ item.itemDescr }}</td>
          <td id="bin" style="width: 10%;" @click="deleteItem(item.itemID)"><img :src="require(`@/assets/bin.png`)" alt="Image" id="little-image"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <table>
      <tbody>
        <tr v-if="nameField !== '' || descrField !== ''">
          <td style="width: 10%;"></td>
          <td id="name" style="width: 30%;">{{ nameField }}</td>
          <td id="description" style="width: 30%;">{{ descrField }}</td>
          <td style="width: 10%;"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCategory } from '@/assets/categorySorter.js'
export default {
  name: 'DynamicForm',
  props: {
    listID: {
      type: Number
    },
    title: {
      type: String
    }
  },

  data () {
    return {
      items: [],
      nameField: '',
      descrField: '',
      checkedItems: [],
      visibleCategories: {}
    }
  },

  computed: {
    categorizedItems () {
      const result = {}
      this.items.forEach(item => {
        const category = getCategory(item.itemName)
        if (!result[category]) {
          result[category] = []
        }
        result[category].push(item)
      })
      return result
    }
  },

  methods: {
    loadThings () {
      const endpoint = 'http://localhost:8080/getItemsOfList/' + this.listID
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
        listID: this.listID,
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
      const category = getCategory(this.nameField)
      console.log('Category: ', category)
      location.reload()
    },

    back () {
      this.$router.push({ name: 'home' })
    },

    deleteItem (itemID) {
      const endpoint = 'http://localhost:8080/deleteItem/' + itemID
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

    handleCheckboxChange (itemID) {
      console.log(`Checkbox for item ${itemID + 1} changed. New value: ${this.checkedItems[itemID]}`)
    },

    deleteItems () {
      for (const item of this.items) {
        if (item.itemID in this.checkedItems) {
          this.deleteItem(item.itemID)
        }
      }
      location.reload()
    },

    changeItem (item, currentValue, text) {
      const update = prompt('Please enter the new ' + text, currentValue)
      if (update != null && update !== '') {
        if (text === 'Name') {
          item.itemName = update
        } else {
          item.itemDescr = update
        }
        const endpoint = 'http://localhost:8080/updateItem' + text + '/' + item.itemID
        let data = {}
        if (text === 'Name') {
          data = {
            newName: update
          }
        } else {
          data = {
            newDescr: update
          }
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
      }
    },

    toggleCategoryVisibility (category) {
      this.visibleCategories[category] = !this.isCategoryVisible(category)
    },

    isCategoryVisible (category) {
      return this.visibleCategories[category] !== false
    }
  },

  mounted () {
    this.loadThings()
  },

  watch: {
    listID: 'loadThings'
  }
}
</script>

<style scoped>

  table {
    margin: 0 auto;
    width: 30%;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .category-header {
    display: flex;
    align-items: left;
    margin: 0 auto;
    width: 30%;
  }

  .category-header button {
    color: black;
    padding: 10px 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;
    margin-left: 0vh;
  }

  #checkbox {
    text-align: left;
  }

  #bin {
    text-align: right;
  }

  #text {
    text-align: center;
    padding: 8px;
  }

  #description {
    text-align: center;
    padding: 8px;
  }
</style>
