import { axiosInstace } from "./api";
import { Health } from "../types/api";

document.getElementById("ping")!.addEventListener("click", () => {
  axiosInstace.get<Health>("/ping").then(({ data }) => {
    const counter = document.getElementById("count")!; // nullじゃないことがわかっているので、!を使用する
    counter.innerHTML = `${data.count}`;
  });
});

if (module.hot) {
  module.hot.accept();
}
