import { fillTeacher } from "./lecture/fields.js";
import { logout } from "./auth/logout.js";

document.addEventListener("DOMContentLoaded", () => {
  const exit = document.getElementById("exit");
  fillTeacher();
  logout(exit);
  // é um listener que aguarda o clique para efetuar o logou
});
