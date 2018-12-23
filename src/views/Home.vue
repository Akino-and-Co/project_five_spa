<template>
  <div class="home">
    <h2>Project Five</h2>
    <HelloWorld msg="Find the best consumer products!"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
