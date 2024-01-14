<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.centered-container {
  align-items: center;
  justify-content: center;
  height: 8vh;
  position: sticky;
}

button {
  color: black;
  padding: 10px 16px;
  background-color: #64b467;
  border: none;
  cursor: pointer;
}

.button-left {
  position: absolute;
  top: 1vh;
  left: 2vh;
  position: fixed;
}

.button-left button {
  font-size: 16px;
}

.button-right {
  position: absolute;
  top: 1vh;
  right: 2vh;
  position: fixed;
}

.button-right button {
  font-size: 16px;
}

#little-image{
  width: 20px;
  height: 20px;
}

#tiny-image{
  width: 16px;
  height: 16px;
}

th {
  background-color: #f2f2f2;
  padding: 10px 0;
}

td {
  padding: 3px 0;
  border-bottom: 1px solid #ddd;
}

#adding {
  text-align: center;
  margin-top: 5px;
}

#adding input {
  padding: 8px;
  margin-right: 5px;
}

h3 {
  font-size: 30px;
  margin-top: 1vh;
}
</style>
