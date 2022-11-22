<template>
<div class="containerOfDropdown">
     <el-select v-model="selectedPermission" placeholder="Full access" class="dropdownCss" @change="$emit('selectedOptionedClick',selectedPermission)" :disabled="disabled">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
     </el-select>
     </div>
</template>
<script>

export default{
     props: ["options","disabled"],
     data(){
        return{
            selectedPermission:""
        }
     },
     
}
</script>
<style scoped>
.el-input >>> .el-input__inner {
  border: none;
     background:#d0d1d3;
}

</style>
