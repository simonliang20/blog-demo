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
      // x轴的数据，定义表头使用和定位使用
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
      // 要渲染的表格数据
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
      // 找出每一行（tr）
      const children = document.querySelector(
        `.drag-table .el-table__body-wrapper tbody`
      ).children;

      // 给每一行添加列表拖拽，实现单元格拖拽
      for (let index = 0; index < children.length; index++) {
        const el = children.item(index);
        Sortable.create(el, {
          group: {
            name: "shared", // 定义为可列表间拖拽
          },
          swap: true, // 交换属性
          filter: ".filtered", // 过滤不能拖拽
          onEnd: evt => {
            // console.log("onEnd", evt);
            // 更新数据，这里暂时直接通过交换数据来拖拽，实际情况是会通过接口更新再拉取列表实现
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

      // 强制刷新
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
