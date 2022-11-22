<template>
  <div class="wrapper">
      <header class="headerCss">
        <div class="each">
          <input @keyup.enter="submitSearchResult()" placeholder="Search emails,names or group" class="inputCss" v-model="searchText"  />
        </div>
        <div class="each"> 
            <permissionDropdown :options="options" @selectedOptionedClick="selectedOptionedClick" :disabled="!inviteDisabled()"></permissionDropdown>
        </div>
        <div class="each">
             <el-button @click="inviteClick()" :disabled="!inviteDisabled()">invite</el-button>
        </div>

      </header>
      <section class="sectionCss">
        <div class="eachGroup" v-for="(groupObj,index) in groupsOptions" :key="index">
              <span class="titleText">{{groupObj.title}}</span>
              <div class="each" v-for="(detailObj,index) in groupObj.details" :key="index">
                 <img :src="detailObj.profilePic" width="30px" />
                 <span>{{detailObj.name}}</span>
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
            // {
            // "title" :"selected Person",
            // "details":[
            //     {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"wade Cooper" ,"permission":"No access","email":"wadeCooper@gmail.com","isInvite":false},
            //     {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"Arlin Mccoy","permission":"No access","email":"ArlinMccoy@gmail.com","isInvite":false}
            // ]
            // },
            //  {
            // "title" :"selected Group",
            // "details":[
            //     {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"product","permission":"No access","email":"product@gmail.com","isInvite":false},
            //     {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"engineer","permission":"No access","email":"engineer@gmail.com","isInvite":false}
            // ]
            // }
        
        selectedGroupOptions:[],
        resetGroupsOptions:[]
    }
  },
  
  components:{
    "permissionDropdown":permissionDropdown
  },
  watch:{
     searchText(newObj){
      console.log("new in watcher",newObj);
      if(newObj == ""){
        console.log("inside if");
         this.groupsOptions = this.resetGroupsOptions
        this.newObj = ""
       
      }else{
        console.log("outside if")
        console.log("new in watcher",newObj)
        this.getResultedData(newObj);
      }
      
     }
  },

  created(){
     this.groupsOptions = this.getToDoList
    this.resetGroupsOptions = this.groupsOptions
   this.getResultedData = debounce(this.getResultedData, 1000);
   console.log("$$getPersonList",this.getToDoList);
  
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
    selectedOptionedClick(selectedPermission){
    console.log("selected persmision",selectedPermission);
    console.log("group options",this.groupsOptions);
    this.groupsOptions[0].details[0]['permission'] = selectedPermission;
   for(var i =0;i<this.getToDoList.length;i++){
    debugger
    for(var j=0;j<this.getToDoList[i].details.length;j++){
        if(this.getToDoList[i].details[j].name == this.groupsOptions[0].details[0]['name']){
        this.getToDoList[i].details[j].permission = selectedPermission;
        break;
     }
    }
    
   }
     console.log("group options",this.groupsOptions,this.getToDoList);
     this[SET_TODO_LIST](this.getToDoList);
      console.log("after set mutation",this.getToDoList);

    },
    getResultedData(newObj){
      
        this.groupsOptions = this.resetGroupsOptions
        //  this[SET_TODO_LIST](this.groupsOptions);
         console.log("after reset option",this.groupsOptions);
        console.log("new from methoad",newObj);
      
       var searchArrayMain = []
       console.log("groupsOptions",this.groupsOptions);
      
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
       console.log("searchresult",searchArrayMain);
       this.groupsOptions = searchArrayMain
    },
    inviteClick(){
      // console.log("getPersonList",this.getPersonList);
        // this.groupsOptions[0].details[0]['isInvite'] = true;
        this.$emit("isInviteClick",true);
        console.log("inivte option",this.groupsOptions);
        
          for(var i =0;i<this.getToDoList.length;i++){
            debugger
            for(var j=0;j<this.getToDoList[i].details.length;j++){
                if(this.getToDoList[i].details[j].name == this.groupsOptions[0].details[0]['name']){
                this.getToDoList[i].details[j].isInvite = true;
                break;
            }
            }
            
          }

         this[SET_TODO_LIST](this.getToDoList);
          console.log("after inivte option",this.getToDoList);
    },
    submitSearchResult(){
      console.log("click enter");


    }
  }
}
</script>


<style scoped>
.eachGroup{
    margin: 15px 0 15px 0 ;
}
.sectionCss{
    margin: 20px 0 30px 0;
    padding: 10px;
}
.headerCss{
    display: grid;
    grid-template-columns:auto auto auto;
    grid-gap: 10px;
   background:#edeef1;
   overflow: hidden;
   padding: 10px
    /* border-radius: 10px; */
}
.footerCss{
   overflow: hidden;
    background:#edeef1;
    padding: 10px;
     /* border-radius: 10px; */
}

input:focus{
  outline: none;
}
.inputCss{
      border: none;
    width: 97%;
    height: 38px;
     background:#edeef1;
}
.each{
    /* margin: 0 10 0 10; */
 margin: 10px 0 10px 0;
}
.wrapper{
    border: 1px solid rgb(191, 189, 189);
  
    width: 600px;
    /* height: 500px; */
    /* padding: 10px; */
    border-radius: 10px;
    /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
}
.titleText{
    
    display: block;
    font-size: 20px;
    font-weight: 400;

}
.descriptionText{
        display: block;
    color: gray;
    font-size: 15px;
}
</style>
