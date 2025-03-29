import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

/**
 * Retrieves all shopping list items for a specific user from Firestore.
 * @param {string} userId - The user's UID.
 * @returns {Promise<Array>} - An array of item objects.
 */
export const getItems = async (userId) => {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const q = query(itemsRef);
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  } catch (error) {
    console.error("Error retrieving items:", error);
    return [];
  }
};

/**
 * Adds a new item to a specific user's shopping list in Firestore.
 * @param {string} userId - The user's UID.
 * @param {Object} item - The item object to be added.
 * @returns {Promise<string>} - The Firestore document ID of the newly added item.
 */
export const addItem = async (userId, item) => {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsRef, item);
    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};
