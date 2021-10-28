<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6">
        <v-card class="pa-2 justify-center">
          <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
          <canvas
            id="cvs"
            @mousedown="beginDrawing"
            @mousemove="keepDrawing"
            @mouseup="stopDrawing"
            class="d-flex my-2"
            style="width: 100%; max-width: 300px"
          ></canvas>
          <v-btn class="mr-4" color="green" @click="addTask" :disabled="disableBtn">
            Add New Task
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { uuid } from 'vue-uuid';

export default {
  name: 'AddTask',
  data: () => ({
    name: '',
    nameRules: [(v) => !!v || 'Name is required'],
    ctx: null,
    x: 0,
    y: 0,
    isDrawing: false,
  }),
  computed: {
    disableBtn() {
      return this.name ? false : true;
    },
  },
  methods: {
    /**
     * Draw line on canvas
     */
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    /**
     * Begin drawing line on canvas
     */
    beginDrawing(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },
    /**
     * Keep drawing line on canvas
     */
    keepDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },
    /**
     * Stop drawing line on canvas
     */
    stopDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
      }
    },
    /**
     * Add new task
     */
    addTask() {
      this.$store.dispatch('addTask', {
        id: uuid.v1(),
        name: this.name,
        canvas: document.getElementById('cvs').toDataURL('image/jpeg', 1.0),
      });
      this.name = '';
    },
  },
  mounted() {
    const cvs = document.getElementById('cvs');
    this.canvas = cvs.getContext('2d');
  },
};
</script>

<style scoped>
#cvs {
  border: 1px solid grey;
}
</style>
