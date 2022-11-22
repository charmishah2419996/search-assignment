<template>
  <div class="wrapper">
    <header class="headerCss">
        <div class="leftHeader">
           <div style="margin-top: 10px;"> <img src="https://cdn.pixabay.com/photo/2016/08/24/14/29/earth-1617121__340.jpg" class="imgPic"></div>
           <div>
            <span class="titleText" >share to web</span>
            <span class="descriptionText">Publish and share link with anyone</span>
            </div>
        </div>
       <div style="margin-top: 10px;">
          <el-switch v-model="switchValue"></el-switch>
       </div>
      
    </header>
    <hr class="hrCss">
    <section class="sectionCss">
       <el-input placeholder="People,emails,group" class="inputCss" @focus="inputClick()">
         <template slot="append">Invite</template>
       </el-input>
        <div class="wrapperList">
           <div class="eachList" v-for="(selectedOptions,index) in optionsList" :key="index">
            <!-- {{selectedOptions}} -->
             <div class="leftSide">
                <div class="profilePicture">
                    <img :src="selectedOptions.profilePic" class="imgPic">
               </div>
               <div>
                  <span class="titleText">{{selectedOptions.name}}</span>
                  <span class="descriptionText"> {{selectedOptions.email}}</span>
               </div>
             </div>
             <div class="rightSide permission">
                {{selectedOptions.permission}}
             </div>
           </div>
         </div>  
       
    </section>
    <hr class="hrCss">
    <footer class="footerCss">
      <span class="descriptionText">learn about sharing</span>
    </footer>
  
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'shareableDetailedCompoenent',
  data(){
    return{
        optionsList:[{
          "profilePic":'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaufFlgpRkoTKitXpoaDwqo7Ld5qEa5QI5zPFRUlqnXQ&s','name':"Everyone at oslash","permission":"No access","email":"25 workspace member","isInvite":false
        }],
        switchValue:false
    }
  },
  computed: {
    ...mapGetters("todostore", ["getToDoList"]),
    
  },
  created(){
    this.processOptionList();
  // this.optionsList = this.getToDoList
  },
  methods:{
    processOptionList(){
   for(var i=0;i<this.getToDoList.length;i++){
     for(var j=0;j<this.getToDoList[i].details.length;j++){
      if(this.getToDoList[i].details[j].isInvite){
        console.log("inside",this.getToDoList[i].details[j]);
       this.optionsList.push(this.getToDoList[i].details[j])
       console.log("after",this.getToDoList);
       }
     }
   }
   console.log("$$ after options list",this.optionsList);
    },
    inputClick(){
        this.$emit("isinputClickFromSharable",true);
    }
  }

}
</script>


<style scoped>

.fontCss{
      font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: #000000;
}
img{
      width: 24px;
    height: 24px;
    border-radius: 12px;
}
.headerCss{
    display: flex;
    justify-content: space-between;
     padding: 10px;
}
.leftHeader{
  display: flex;
     width: 70%;
}
.footerCss{
  padding: 10px;
}
.sectionCss{
  padding: 10px;
    /* height: 380px; */
    /* margin: 55px 0 15px 0; */
}
/* .inputCss{
 margin: 10px 0 55px 0;
} */
   
.titleText{
    
    display: block;
   

    font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #111827;

}
.descriptionText{
        display: block;
    /* color: gray;
    font-size: 15px; */
    font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
color: #6B7280;
}
.wrapperList{
    margin-top: 10px;
    width: 100%;
}
.hrCss{
    height:1px;border-width:0; background-color: #e7e9eb;
}
.wrapper{
    border: 1px solid rgb(191, 189, 189);
    /* width: 600px; */
        width: 512px;
    /* height: 262px; */
    /* height: 500px; */
   background: #FFFFFF;
    border-radius: 10px;
}
.eachList{
    display: flex;
    margin: 10px 0 10px 0;
    
    justify-content: space-between;


}
.eachList .leftSide{
   width: 80%;
   display: flex;
}
.leftSide .profilePicture{

     width: 7%;
    margin-top: 10px;
}
.permission{
  font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #6B7280;
    margin-top: 10px;
}
.imgPic{
  margin-right: 10px;
}
/* .profilePicture .imgPic{
   width: 100%;
} */
</style>
