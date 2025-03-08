import vi from "./vi";
import en from "./en";
import { flattenMessages } from "./index";

const messages = {
  vi: flattenMessages(vi),
  en: flattenMessages(en),
};

export default messages;
