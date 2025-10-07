const tryCatch = async ({ errorMessage, logging }, steps) => {
  try {
    const result = await steps();
    console.log(result);
    return {
      result,
    };
  } catch (error) {
    const message = errorMessage ? errorMessage : error;
    if (logging) {
      console.log({ error });
    }
    return { as: message };
  }
};
export default tryCatch;
