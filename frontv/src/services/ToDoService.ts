import axios from "axios";
import GeneralService from "./generalService";

interface TodoResponse {
  data: any;
  msg: string;
}

export default class TodoService extends GeneralService {
  loading: any;

  constructor(loading: any) {
    super(loading);
    this.loading = loading;
  }

  async get() {
    const res = await axios.get<TodoResponse>("http://localhost:8000/api/todo");
    this.loading.value = false;
    return res;
  }

  async post(req: any) {
    const res = await axios.post<TodoResponse>(
      "http://localhost:8000/api/todo",
      req
    );
    this.loading.value = false;
    return res;
  }

  async destroy(id: string) {
    const res = await axios.delete<TodoResponse>(
      `http://localhost:8000/api/todo/${id}`
    );
    this.loading.value = false;
    return res;
  }
}
