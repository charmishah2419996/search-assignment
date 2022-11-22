<template>
  <div class="wrapper">
    <header class="headerCss">
        <div class="leftHeader">
            <span class="titleText">share to web</span>
            <span class="descriptionText">Publish and share link with anyone</span>
        </div>
       <div>
          <el-switch v-model="switchValue"></el-switch>
       </div>
      
    </header>
    <hr class="hrCss">
    <section class="sectionCss">
       <el-input placeholder="People,emails,group" class="inputCss" @focus="inputClick()">
         <template slot="append">invite</template>
       </el-input>
        <div class="wrapperList">
           <div class="eachList" v-for="(selectedOptions,index) in optionsList" :key=index>
             <div class="leftSide">
                <div class="profilePicture">
                    <img :src="selectedOptions.profilePic" class="imgPic">
               </div>
               <div>
                  <span class="titleText">{{selectedOptions.title}}abc</span>
                  <span class="descriptionText"> {{selectedOptions.description}}</span>
               </div>
             </div>
             <div class="rightSide">
                {{selectedOptions.givenPermission}}
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
export default {
  name: 'shareableDetailedCompoenent',
  data(){
    return{
        optionsList:[{
            'title':'Everyone at oslash',
            'description' :'25 workspace member',
            'profilePic' :'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
            'givenPermission':"No Access"
        }],
        switchValue:false
    }
  },
  methods:{
    inputClick(){
        this.$emit("isinputClickFromSharable",true);
    }
  }

}
</script>


<style scoped>
.headerCss{
    display: flex;
    justify-content: space-between;
     padding: 10px;
}
.leftHeader{
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
.inputCss{
 margin: 10px 0 55px 0;
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
.wrapperList{
    margin-top: 10px;
    width: 100%;
}
.hrCss{
    height:1px;border-width:0; background-color: #e7e9eb;
}
.wrapper{
    border: 1px solid rgb(191, 189, 189);
    width: 600px;
    /* height: 500px; */
   
    border-radius: 10px;
}
.eachList{
    display: flex;
    margin: 10px 0 10px 0;

}
.eachList .leftSide{
   width: 80%;
   display: flex;
}
.leftSide .profilePicture{

     width: 15%;
    margin-right: 10px;
}
.profilePicture .imgPic{
   width: 100%;
}
</style>
