<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6">
        <v-data-table :headers="headers" :items="getTasks" hide-default-footer class="elevation-1">
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                        <v-img :src="editedItem.canvas" alt="" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                  <v-btn color="blue darken-1" text @click="updateTask"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.name }}</td>
              <td>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                  @click="showEditDialog(row.item)"
                >
                  <v-icon dark> mdi-clipboard-edit </v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark small color="red" @click="deleteTask(row.item.id)">
                  <v-icon dark> mdi-delete-empty </v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TodoList',
  data() {
    return {
      headers: [
        {
          text: 'Task',
          align: 'start',
          value: 'name',
          sortable: false,
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    };
  },
  computed: {
    ...mapGetters(['getTasks']),
  },

  methods: {
    /**
     * Load all tasks
     */
    loadTasks() {
      this.$store.dispatch('getTasks');
    },
    /**
     * Deletes task by row
     */
    deleteTask(row) {
      this.$store.dispatch('deleteTask', row);
    },
    /**
     * Close dialog
     */
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    /**
     * Update name in the row
     */
    updateTask() {
      this.close();
      if (!this.editedItem.name) false;
      this.$store.dispatch('updateTask', {
        id: this.editedItem.id,
        name: this.editedItem.name,
        canvas: this.editedItem.canvas,
      });
    },
    /**
     * Show edit dialog
     */
    showEditDialog(item) {
      this.editedIndex = this.getTasks.indexOf(item);
      this.editedItem = Object.assign(
        {},
        {
          id: item.id,
          name: item.name,
          canvas: item.canvas,
        },
      );
      this.dialog = true;
    },
  },
  created() {
    this.loadTasks();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
};
</script>

<style scoped></style>
