<template>
  <div class="wrapper">
      <header class="headerCss">
        <div class="each">
          <input @keyup.enter="submitSearchResult()" placeholder="Search emails,names or group"  v-model="searchText"  />
        </div>
        <div class="each"> 
            <permissionDropdown :options="options" @selectedOptionedClick="selectedOptionedClick"></permissionDropdown>
        </div>
        <div class="each">
             <el-button @click="inviteClick()">invite</el-button>
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
      <footer>
         <span class="descriptionText">learn about sharing</span>
      </footer>
  </div>
</template>

<script>
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
        groupsOptions:[
            {
            "title" :"selected Person",
            "details":[
                {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"wade Cooper"},
                {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"Arlin Mccoy"}
            ]
            },
             {
            "title" :"selected Group",
            "details":[
                {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"product"},
                {"profilePic":'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg','name':"engineer"}
            ]
            }
        ],
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
        
       
      }else{
        console.log("outside if")
        console.log("new in watcher",newObj)
      this.getResultedData(newObj);
      }
      
     }
  },
  created(){
    this.resetGroupsOptions = this.groupsOptions
   this.getResultedData = debounce(this.getResultedData, 1000);
  },
  methods:{
    selectedOptionedClick(selectedPermission){
    console.log("selected persmision",selectedPermission);
    },
    getResultedData(newObj){
        this.groupsOptions = this.resetGroupsOptions
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
        this.$emit("isInviteClick",true);
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
}
.headerCss{
    display: grid;
    grid-template-columns:auto auto auto;
    grid-gap: 10px
}
.each{
    /* margin: 0 10 0 10; */
 margin: 10px 0 10px 0;
}
.wrapper{
    border: 1px solid rgb(191, 189, 189);
    width: 600px;
    /* height: 500px; */
    padding: 10px;
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
