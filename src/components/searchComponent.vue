<template>
  <div class="wrapper">
      <header class="headerCss">
        <div class="each">
          <input v-if="isInput" @keyup.enter="submitSearchResult()" placeholder="Search emails,names or group" class="inputCss" v-model="searchText"  />
           <el-alert
           v-else
             :title="searchText"
             @close = "closeSearch"
                  type="info"/>
        </div>
        <div class="each"> 
            <permissionDropdown :options="options" @selectedOptionedClick="selectedOptionedClick" :disabled="!inviteDisabled()"></permissionDropdown>
        </div>
        <div class="each" style="justify-content: right;">
             <el-button @click="inviteClick()" :disabled="!inviteDisabled()" class="inviteBtn">invite</el-button>
        </div>

      </header>
      <section class="sectionCss">
        <div class="eachGroup" v-for="(groupObj,index) in groupsOptions" :key="index">
              <div class="titleText">{{groupObj.title}}</div>
              <div class="each" v-for="(detailObj,index) in groupObj.details" :key="index">
                 <div><img :src="detailObj.profilePic"  /></div>
                 
                 <div class="name">{{detailObj.name}}</div>
              </div>
              
        </div>
      </section>
      <footer class="footerCss">
         <span class="descriptionText">learn about sharing</span>
      </footer>
  </div>
</template>

<script>
import { SET_TODO_LIST } from "@/store/mutation-types";
import { mapGetters ,mapMutations} from "vuex";
import debounce from "debounce";
import permissionDropdown from "./permissionDropdown.vue";
export default {
  name: 'searchComponent',
  data(){
    return{
        searchText:"",
        options: [{
          value: 'Can Edit',
          label: 'Can Edit'
        }, {
          value: 'Can View',
          label: 'Can View'
        }, {
          value: 'Full access',
          label: 'Full access'
        }, {
          value: 'No access',
          label: 'No access'
        }],
        selectedPermission: '',
        groupsOptions:[],
        isInput:true,
        selectedGroupOptions:[],
        resetGroupsOptions:[]
    }
  },
  
  components:{
    "permissionDropdown":permissionDropdown
  },
  watch:{
     searchText(newObj){
    
      if(newObj == ""){
         this.groupsOptions = this.resetGroupsOptions
        this.newObj = ""
      }else{
        this.getResultedData(newObj);
      }
      
     }
  },

  created(){
     this.groupsOptions = this.getToDoList
    this.resetGroupsOptions = this.groupsOptions
   this.getResultedData = debounce(this.getResultedData, 1000);
  
  },
    computed: {
    ...mapGetters("todostore", ["getToDoList"]),
  },
  methods:{
     ...mapMutations("todostore", [SET_TODO_LIST]),
    inviteDisabled(){
       if(this.groupsOptions.length == 1){
        return true
       }else{
        false
       }
    },
    closeSearch(){
        this.groupsOptions = this.getToDoList
        this.isInput = true
        this.searchText = ""
    },
    selectedOptionedClick(selectedPermission){
    this.groupsOptions[0].details[0]['permission'] = selectedPermission;
   for(var i =0;i<this.getToDoList.length;i++){
    for(var j=0;j<this.getToDoList[i].details.length;j++){
        if(this.getToDoList[i].details[j].name == this.groupsOptions[0].details[0]['name']){
        this.getToDoList[i].details[j].permission = selectedPermission;
        break;
     }
    }
    
   }
     this[SET_TODO_LIST](this.getToDoList);
    },
    getResultedData(newObj){
        this.groupsOptions = this.resetGroupsOptions
       var searchArrayMain = []
       for(var i=0;i<this.resetGroupsOptions.length;i++){
          var searchDetailsAr=[];
         var isFind = false
        for(var j=0;j<this.resetGroupsOptions[i].details.length;j++){
           if(this.resetGroupsOptions[i].details[j].name == newObj){
            isFind = true
            let obj ={
              "profilePic":this.resetGroupsOptions[i].details[j].profilePic,
              'name':this.resetGroupsOptions[i].details[j].name
            }
             searchDetailsAr.push(obj)
           }
         }
          let objMain = {
              "title" : this.resetGroupsOptions[i].title,
              "details" : searchDetailsAr
          }
          if(isFind){
             searchArrayMain.push(objMain)
             
          }
          
       }
       this.groupsOptions = searchArrayMain
    },
    inviteClick(){
        this.$emit("isInviteClick",true);  
          for(var i =0;i<this.getToDoList.length;i++){
            for(var j=0;j<this.getToDoList[i].details.length;j++){
                if(this.getToDoList[i].details[j].name == this.groupsOptions[0].details[0]['name']){
                this.getToDoList[i].details[j].isInvite = true;
                break;
            }
            }
            
          }

         this[SET_TODO_LIST](this.getToDoList);
    },
    submitSearchResult(){
      this.isInput = false
      
    }
  }
}
</script>


<style scoped>
.inviteBtn{
 color: #374151;
 font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 16px;
}
img{
      width: 24px;
height: 24px;
border-radius: 12px;
}
.name{
  margin-left: 10px;
}
.eachGroup{
    margin: 15px 0 15px 0 ;
    /* display: flex; */
}
.sectionCss{
    /* margin: 20px 0 30px 0;
    padding: 10px; */
        height: 272px;
}
.headerCss{
    display: grid;
    grid-template-columns:auto auto auto;
    grid-gap: 10px;
   background:#F3F4F6;
   overflow: hidden;
   padding: 10px;
   height:58px;
    /* border-radius: 10px; */
}
.footerCss{
   overflow: hidden;
    background:#F3F4F6;
    padding: 10px;
    height: 36px;
     /* border-radius: 10px; */
}

input:focus{
  outline: none;
}
.inputCss{
      border: none;
    width: 97%;
    height: 38px;
     background:#F3F4F6;
}
.each{
    /* margin: 0 10 0 10; */
 margin: 10px 0 10px 0;
 display: flex;
 align-items: center;

}
.wrapper{
    border: 1px solid rgb(191, 189, 189);
  
    width: 512px;
    /* height: 500px; */
    /* padding: 10px; */
    border-radius: 10px;
    /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
}
.titleText{
    
    display: block;
    /* font-size: 20px;
    font-weight: 400; */
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
color: #374151;

}
.descriptionText{
        display: block;
    color: gray;
    font-size: 15px;
}
</style>
