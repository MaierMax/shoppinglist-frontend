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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8vh;
}

.button-left {
  position: absolute;
  top: 1vh;
  left: 2vh;
}

.button-left button {
  font-size: 16px;
}

.button-right {
  position: absolute;
  top: 1vh;
  right: 2vh;
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

table {
  border-collapse: separate;
}

th {
  padding: 10px 0;
}

td {
  padding: 3px 0;
  border-bottom: 1px solid #ddd;
}

#adding {
    position: relative;
    text-align: center;
    margin-top: 20px;
  }

  #adding input {
    padding: 8px;
    margin-right: 5px;
  }

  h3 {
    font-size: 30px;
  }
</style>
