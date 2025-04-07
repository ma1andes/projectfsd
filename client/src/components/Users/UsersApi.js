import { apiService } from "../../utils/api.service";

class UsersAPI {
  /**
   * Method AUTH
   * @param {*} username
   * @param {*} password
   * @returns
   */
  static async auth(username, password) {
    try {
      const data = await apiService.login(username, password);
      return { message: "Success", data };
    } catch (error) {
      return { message: "Error", error: { detail: error.message } };
    }
  }

  static async reg(username, password, email = "") {
    try {
      const data = await apiService.register(username, email, password);
      return { message: "Success", data };
    } catch (error) {
      return { message: "Error", error: { detail: error.message } };
    }
  }
}

export default UsersAPI;
