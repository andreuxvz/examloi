import axios from "axios";

class GeneralService {
  window: any;

  constructor(loading: any) {
    this.window = window;
    this.setUpAxios(loading);
  }

  setUpAxios(loading: any) {
    if (!this.window.isAxiosSetup) {
      this.window.isAxiosSetup = true;
      axios.interceptors.request.use(
        (config) => {
          loading.value = true;
          return config;
        },
        (error) => {
          loading.value = false;
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        (response) => {
          const { data } = response;
          return data;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  }
}

export default GeneralService;
