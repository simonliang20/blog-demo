<template>
  <div class="container">
    <h1>计划表-支持拖拽</h1>
    <el-table class="drag-table" :data="schedule" border :cell-class-name="getCellClassName">
      <el-table-column v-for="item in x" :key="item.value" :prop="item.value" :label="item.label"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable, { MultiDrag, Swap } from "sortablejs";
Sortable.mount(new MultiDrag(), new Swap());

export default {
  data() {
    return {
      x: [
        { value: "time", label: "" },
        { value: "mon", label: "星期一" },
        { value: "tue", label: "星期二" },
        { value: "wed", label: "星期三" },
        { value: "thu", label: "星期四" },
        { value: "fri", label: "星期五" },
        { value: "sat", label: "星期六" },
        { value: "sun", label: "星期日" }
      ],
      schedule: [
        {
          time: "9:00~10:00",
          mon: "语文",
          tue: "",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },
        {
          time: "10:00~11:00",
          mon: "",
          tue: "英语",
          wed: "",
          thu: "",
          fri: "",
          sat: "",
          sun: ""
        },
        {
          time: "11:00~12:00",
          mon: "",
          tue: "",
          wed: "数学",
          thu: "",
          fri: "化学",
          sat: "",
          sun: ""
        }
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
            // pull: "clone"
          },
          swap: true,
          filter: ".filtered",
          onEnd: evt => {
            // console.log("onEnd", evt);
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
      // console.log(oldRowIndex, newRowIndex, oldColumnIndex, newColumnIndex);

      // 交换数据
      const schedule = JSON.parse(JSON.stringify(this.schedule));
      const OldProperty = this.x[oldColumnIndex].value;
      const oldValue = schedule[oldRowIndex][OldProperty];
      const newProperty = this.x[newColumnIndex].value;
      const newValue = schedule[newRowIndex][newProperty];
      schedule[newRowIndex][newProperty] = oldValue;
      schedule[oldRowIndex][OldProperty] = newValue;

      // 强刷
      this.schedule = [];
      this.$nextTick(() => {
        this.schedule = schedule;
        this.$nextTick(() => {
          this.initDrag();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;
  background: #f1eded;
  height: 500px;
  padding-top: 30px;
}
</style>
