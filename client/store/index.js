var URL_API = "http://localhost:8008";
//เก็บข้อมูล
export const state = () => ({
  tasks: []
});

//แก้ไข
export const mutations = {
  setTasks(state, data) {
    state.tasks = data;
  }
};

//สั่งงาน
export const actions = {
  async getTasks(store) {
    // let tasks = JSON.parse(window.localStorage.getItem("tasks") || "[]");
    // store.commit("setTasks", tasks);

    let res = await this.$axios.get(URL_API + "/tasks");
    store.commit("setTasks", res.data);
    window.localStorage.setItem("tasks", JSON.stringify(res.data));
    console.log("Taskssss : ", res.data);
  }
};
