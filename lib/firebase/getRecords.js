import { ref, get } from "firebase/database";
import { database } from "./appClient";

export async function fetchAllRecords(listPath) {
  const dbRef = ref(database, listPath);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
    return null;
  }
}
