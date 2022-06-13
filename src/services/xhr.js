import Axios from "axios";

export default function get(url){
  return Axios.get(url);
}