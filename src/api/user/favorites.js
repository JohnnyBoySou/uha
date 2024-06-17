import AsyncStorage from "@react-native-async-storage/async-storage";

async function getFavs() {
  try {
    const preferences = JSON.parse(await AsyncStorage.getItem("@favorites")) || [];
    return preferences;
  } catch (error) {
    console.error("Error getting preferences:", error);
    return [];
  }
}

async function editFavs(updatedPreferences) {
  try {
    await AsyncStorage.setItem("@favorites", JSON.stringify(updatedPreferences));
    return true;
  } catch (error) {
    console.error("Error editing preferences:", error);
    return false;
  }
}

async function createFavs() {
  try {
    await AsyncStorage.setItem("@favorites", JSON.stringify([]));
    return true;
  } catch (error) {
    console.error("Error creating preference:", error);
    return false;
  }
}

async function excludeFavs() {
  try {
    await AsyncStorage.removeItem("@favorites");
    return true;
  } catch (error) {
    console.error("Error excluding preference", error);
    return false;
  }
}

async function addFav(array) {
  try {
    const favorites = await getFavs();
    let updatedFavorites;
    if (!favorites || !Array.isArray(favorites)) {
      updatedFavorites = array;
    } else {
      updatedFavorites = favorites.concat(array);
    }
    await editFavs(updatedFavorites);
    return true;
  } catch (error) {
    console.error("Error adding likes array:", error);
    return false;
  }
}

async function veriFav(id) {
  try {
    const favorites = await getFavs();
    return favorites && favorites.some((item) => item.id === id);
  } catch (error) {
    console.error("Error verifying liked item:", error);
    return false;
  }
}

async function delFav(id) {
  try {
    let favorites = await getFavs();
    if (!favorites) {
      favorites = [];
    }
    favorites = favorites.filter((item) => item.id !== id);
    await editFavs(favorites);
    return true;
  } catch (error) {
    console.error("Error removing like:", error);
    return false;
  }
}

export {
  addFav,
  delFav,
  veriFav,
  getFavs,
  editFavs,
  createFavs,
  excludeFavs,
};
