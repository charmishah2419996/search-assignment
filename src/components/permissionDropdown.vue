<template>
     <el-select v-model="selectedPermission" placeholder="Full access"   @change="$emit('selectedOptionedClick',selectedPermission)" :disabled="disabled">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
     </el-select>
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
