export default function langRedu(state, action) {
  console.log("state", state, action);

  switch (action.type) {
    case "ar":
      return "en";
      break;
    case "en":
      return "ar";
      break;
    default:
      throw Error("this is Error");
  }
}
