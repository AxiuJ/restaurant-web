<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar/>
      <main class="main" >
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view @setfood="setf" @setordername="setname" @upd="setdeskid"></router-view>
        </div>
      </main>
      <AppAside  :foods="foods"/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import Sidebar from '../components/Sidebar'
import AppAside from '../components/Aside'
import AppFooter from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'full',
  data(){
    return{
       foods:[],
       deskid:"A12"
    }
  },
  methods:{
    setf(food){
      var i = true;
      console.log(food)
      this.foods.forEach(item => {
        if(item.menusId === food.menusId){
          item.num = item.num+1
          i=false
          food={}
        }
      });
      if(i){
        this.foods.push(food)
      }else{
        this.foods.push()
      }
      
    },
    setname(ordername){
      this.stamename=ordername;
    }
  },
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb
  },
  computed: {
    name () {
      return this.$route.name
    },

    list () {
      return this.$route.matched
    }
  }
}
</script>
