<template>
<div class="containerOfDropdown">
     <el-select  v-model="selectedPermission" placeholder="Full access" class="dropdownCss" @change="$emit('selectedOptionedClick',selectedPermission)" :disabled="disabled">
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
            selectedPermission:"No access"
        }
     },
     
}
</script>
<style scoped>
.dropdownCss{
    border: none;
    background: #F3F4F6;
    color: #6B7280;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    }

</style>
