<template>
    <div>
        <el-card>
            <el-form label-width="auto">
                <el-form-item label="SPU名称">
                    <el-input placeholder="请输入SPU名称"></el-input>
                </el-form-item>
                <el-form-item label="SPU品牌">
                    <el-select placeholder="请选择" style="width: 240px">
                        <el-option :value="1"></el-option>
                        <el-option :value="1"></el-option>
                        <el-option :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="SPU名称">
                    <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
                </el-form-item>
                <el-form-item label="SPU图标">
                    <el-upload v-model:file-list="fileList"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="SPU销售属性">
                    <el-select placeholder="请选择" style="width: 240px">
                        <el-option :value="1"></el-option>
                        <el-option :value="1"></el-option>
                        <el-option :value="1"></el-option>
                    </el-select>
                    <el-button type="primary" icon="Plus" style="margin-left: 10px;" >添加属性值</el-button>
                    <el-table :border="true" style="margin: 10px 0;">
                        <el-table-column label="序号" type="index"  width="80px">

                        </el-table-column>
                        <el-table-column label="销售属性名字">
                            
                        </el-table-column>
                        <el-table-column label="销售属性值">
                            
                        </el-table-column>
                        <el-table-column label="操作">
                            
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" >保存</el-button>
                    <el-button type="primary" @click="cancle">取消</el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 拿到父组件传过来的方法
const $emit=defineEmits(['changeScene'])
//  取消按钮
const cancle=()=>{
    $emit('changeScene',0)
}
</script>

<style scoped></style>