<template>
  <div class="container">
    <el-table
      class="table-box drag-table"
      :data="classTable"
      border
      :show-header="false"
      :cell-class-name="getCellClassName"
    >
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable, { MultiDrag, Swap } from "sortablejs";
Sortable.mount(new MultiDrag(), new Swap());

export default {
  data() {
    return {
      classTable: [
        {
            weekDay: "mon",
            
        }
        // {
        //   date: "",
        //   name: "小明",
        //   address: ""
        // },
        // {
        //   date: "",
        //   name: "小虎",
        //   address: ""
        // },
        // {
        //   date: "",
        //   name: "小黄",
        //   address: ""
        // },
        // {
        //   date: "",
        //   name: "小刘",
        //   address: ""
        // }
      ]
    };
  },
  mounted() {
    this.initDrag();
  },
  methods: {
    getCellClassName({ row, column }) {
      //   console.log(row, column, rowIndex, columnIndex);
      // 添加filtered属性
      if (!row[column.property]) {
        return "filtered";
      }
      return "";
    },
    initDrag() {
      const children = document.querySelector(
        `.drag-table .el-table__body-wrapper tbody`
      ).children;

      for (let index = 0; index < children.length; index++) {
        const el = children.item(index);
        Sortable.create(el, {
          group: {
            name: "shared",
            pull: "clone"
          },
          swap: true,
          filter: ".filtered",
          onEnd: evt => {
            console.log("onEnd", evt);
            this.updateData({
              oldRowIndex: evt.from.rowIndex,
              newRowIndex: evt.to.rowIndex,
              oldColumnIndex: evt.oldIndex,
              newColumnIndex: evt.newIndex
            });
          }
        });
      }
    },
    updateData({ oldRowIndex, newRowIndex, oldColumnIndex, newColumnIndex }) {
      console.log(oldRowIndex, newRowIndex, oldColumnIndex, newColumnIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-left: 30px;
  background: #f1eded;
  height: 500px;
  padding-top: 30px;
  .table-box {
    width: 550px;
  }
}
</style>
