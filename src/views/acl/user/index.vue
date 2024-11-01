<template>
    <div>
        <el-card style="height: 80px;margin-bottom: 5px;">
            <el-form inline class="form">
                <el-form-item label="用户名">
                    <el-input placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button>搜索</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <el-button>添加</el-button>
            <el-button>批量删除</el-button>
            <el-table :border="true" style="margin: 10px 0;" >
                <el-table-column type="selection" >
                </el-table-column>
                <el-table-column label="#" align="center">
                </el-table-column>
                <el-table-column label="id" align="center">
                </el-table-column>
                <el-table-column label="用户名字" align="center">
                </el-table-column>
                <el-table-column label="用户名称" align="center">
                </el-table-column>
                <el-table-column label="用户角色" align="center">
                </el-table-column>
                <el-table-column label="创建时间" align="center">
                </el-table-column>
                <el-table-column label="更新时间" align="center">
                </el-table-column>
                <el-table-column label="操作" width="260px" align="center">
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      :background="true"
      layout="prev, pager, next, jumper,->,total,sizes"
      :total="400"
    />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 默认页面
let pageNo=ref<number>(1)
// 一页展示几条数据
let pageSize=ref<number>(5)
</script>

<style scoped>
.form {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>