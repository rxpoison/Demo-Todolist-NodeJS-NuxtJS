<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn color="red lighten-2" dark v-on="on">
        Edit
      </v-btn>
    </template>

    <v-card>
      <v-card-title primary-title>
        Edit Task Name : "{{ task.task_name }}"
      </v-card-title>
      <v-text-field
        label="Task Name"
        placeholder="Edit Task Name"
        v-model="task_name"
        outlined
      />

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="editTask(task.id)">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    task: {
      task_name: String
    }
  },
  data() {
    return {
      task_name: "",
      dialog: false
    };
  },
  methods: {
    async editTask(id) {
      if (!this.task_name) {
        (this.dialog = false), (this.task_name = "");
      } else {
        let task = await this.$axios.$put("http://localhost:8008/task/" + id, {
          task_name: this.task_name
        });
        (this.dialog = false), (this.task_name = "");
        this.$store.dispatch("getTasks");
      }
    }
  }
};
</script>
