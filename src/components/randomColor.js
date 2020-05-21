const randomColor = () => {
  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  }

  document.body.style.backgroundColor = generateRandomColor();
  document.body.style.color = generateRandomColor();
}

export default randomColor
