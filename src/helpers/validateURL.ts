const validateURL = (url: string) => {
  const regex = /^(http|https):\/\/[^ "]+$/;
  return regex.test(url);
};

export default validateURL;
