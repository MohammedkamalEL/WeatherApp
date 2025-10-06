export default function NameReducar(state, action) {
  switch (action.type) {
    case "Marawi":
      return {lat:'18.5',lon:'31.8'};
      break;
    case "Al-Fashaqah":
      return {lat:'14.3',lon:'35.8'};
      break;
    case "Tandalty":
      return {lat:'13.0',lon:'31.8'};
      break;
    case "Khartom":
      return {lat:'15.5',lon:'32.5'};
      break;
    default:
      throw Error("we Have problem in connection");
      break;
  }
}
