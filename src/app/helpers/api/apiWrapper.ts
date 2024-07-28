export const apiWrapper = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    const res = await apiCall();
    return res;
  } catch (error) {
    console.log("API call failed:", error);
    throw error;
  }
};
