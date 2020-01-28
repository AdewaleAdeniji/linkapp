<template>

  <div id="app">
    {{msg}}
    Your age is {{age}}
    <button v-on:click="add">Add 1</button>
    <button v-on:click="minus">Subtract 1</button>
    <button v-on:click="addten">Add 10</button>
    <form>

      <input type="text" v-model="msg"/>
      <a v-bind:href="website" @click="clicker">Link</a>
      <div :class="{light:light,dark:dark}">I am a boy</div>
    </form>
  </div>
 
  
</template>

<script>

export default {
   data: function() {
    return{
      msg: "Hey",
      website:"https://google.com",
      age:19,
      dark:false,
      light:true,
      }

    },
    methods:{
    oya:function(e){
      this.msg = e.target.value;
    },
    hi:function(el){
      return el+this.msg;

    },
    clicker:function(e){

      var link = e.target.href
     // e.preventDefault();
      if(link.indexOf("3000")<0){
      window.open(link);
      }
      else{
        window.location.href=link;
      }
    },  
    add:function(){
      this.age++;
      this.dark=!this.dark;
      this.light=!this.light;

    },
    minus:function(){
      this.age--;
    },
    addten:function(){
      this.age += 10;
    }
    },
    computed:{

    },
  name: 'app',
  components: {
   
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.light{
  color:#5cb;
}
.dark{
  color:#000;
}
</style>
