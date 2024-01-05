import { objOfConst } from "./constant.js";

export function disabledFunction(boolean) {
    objOfConst.buttonElement.disabled = boolean;
    objOfConst.nameInputElement.disabled = boolean;
    objOfConst.commentInputElement.disabled = boolean;
  }