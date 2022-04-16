import { arrayOf2 } from "../utils/constants";

export default interface Bank {
  Bank_Name: string,

  Bank_Code: string,

  Branch_Name: string,

  Branch_Code: string,

  Branch_Address: string,

  City: string,

  day_closed: string,

  location: {
    coordinates: arrayOf2, // [lng , lat]
  },
}