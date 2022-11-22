<template>
  <div class="hello">
    <el-button type="primary" icon="el-icon-share" @click="shareButtonClick()" class="shareBtnCss">share</el-button>
    <shareableDetailedCompoenent v-if="isSharableDetailedVisible" @isinputClickFromSharable="isinputClickFromSharable"></shareableDetailedCompoenent>
    <searchComponent v-if="isSearchComponentVisble" @isInviteClick="isInviteClick"></searchComponent>
  </div>
</template>

<script>
import shareableDetailedCompoenent from './shareableDetailedCompoenent.vue'
import searchComponent from "./searchComponent.vue"
export default {
  name: 'genericComponent',
  components:{
   "shareableDetailedCompoenent":shareableDetailedCompoenent,
   "searchComponent":searchComponent
  },
  data() {
   return{
     isSharableDetailedVisible:false,
     isSearchComponentVisble:false
   }
  },
  methods:{
    isInviteClick(state){
      if(state){
        this.isSharableDetailedVisible = true
      this.isSearchComponentVisble =false
      }
    },
    shareButtonClick(){
      this.isSharableDetailedVisible = true
      this.isSearchComponentVisble =false
    },
    isinputClickFromSharable(state){
      if(state){
        this.isSharableDetailedVisible = false
        this.isSearchComponentVisble = true
      }
    }
  }
}
</script>
<style scoped>
.shareBtnCss{
  margin-bottom: 20px;
}
</style>
