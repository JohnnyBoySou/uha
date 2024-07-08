import AsyncStorage from "@react-native-async-storage/async-storage";
const key = '@PREFERENCES';

async function getPreferences() {
  try {
    const preferences = JSON.parse(await AsyncStorage.getItem(key)) || [];
    return preferences;
  } catch (error) {
    console.error("Error getting preferences:", error);
    return [];
  }
}

async function editPreferences(updatedPreferences) {
  try {
    const preferences = { ...getPreferences(), ...updatedPreferences };
    await AsyncStorage.setItem(key, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error("Error editing preferences:", error);
    return false;
  }
}

async function createPreferences(preferences) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error("Error creating preference:", error);
    return false;
  }
}

async function excludePreferences() {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error excluding preference ", error);
    return false;
  }
}

async function addLike(array) {
  try {
    const preferences = await getPreferences();
    if (!preferences.likes) {
      preferences.likes = [];
    }
    preferences.likes = preferences.likes.concat(array);
    await editPreferences(preferences);
    return true;
  } catch (error) {
    console.error("Error adding likes array:", error);
    return false;
  }
}

async function verifyLiked(id) {
  try {
    const preferences = await getPreferences();
    return preferences.likes && preferences.likes.some((manga) => manga.id === id);
  } catch (error) {
    console.error("Error verifying liked manga:", error);
    return false;
  }
}

async function removeLike(id) {
  try {
    const preferences = await getPreferences();
    if (!preferences.likes) {
      preferences.likes = [];
    }
    preferences.likes = preferences.likes.filter((manga) => manga.id !== id);
    await editPreferences(preferences);
    return true;
  } catch (error) {
    console.error("Error removing like:", error);
    return false;
  }
}


export { getPreferences, editPreferences, createPreferences, excludePreferences, addLike, verifyLiked, removeLike };