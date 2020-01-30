<template>
  <v-layout>
    <v-flex class="text-center">
      <form>
        <v-text-field
          label="Task Name"
          placeholder="Enter Task Name"
          v-model="taskName"
          outlined
        />
        <v-btn color="success" class="mr-4" @click="showTasks">
          Show
        </v-btn>
        <v-btn color="success" class="mr-4" @click="addTask">
          Add
        </v-btn>
      </form>

      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Id</th>
              <th class="text-left">Task Name</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td>{{ task.id }}</td>
              <td>{{ task.task_name }}</td>
              <td>
                <editNameTask v-bind:task="task" />
                <v-btn color="success" class="mr-4" @click="deleteTask(task.id)"
                  >Delete</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-flex>
  </v-layout>
</template>
<script>
import editNameTask from "../components/editNameTask";
export default {
  components: {
    editNameTask
  },
  created() {
    this.$store.dispatch("getTasks");
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  data() {
    return {
      dialog: false,
      taskName: ""
    };
  },
  // async asyncData({ params, $axios }) {
  //   let { data } = await $axios.get(`http://localhost:8008/tasks`);
  //   return { tasks: data };
  // },
  methods: {
    async showTasks() {
      // let task = await this.$axios.$get("http://localhost:8008/tasks");
      // this.tasks = task;
      console.log("Show Tasks");
    },
    async addTask() {
      let task = await this.$axios.$post("http://localhost:8008/task", {
        task_name: this.taskName
      });
      this.taskName = "";
      this.$store.dispatch("getTasks");
    },
    async deleteTask(id) {
      let task = await this.$axios.$delete("http://localhost:8008/task/" + id);

      this.$store.dispatch("getTasks");
    }
  }
};
</script>
