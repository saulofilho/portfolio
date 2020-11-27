const randomColor = () => {
  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  }

  document.body.style.backgroundColor = generateRandomColor();
  document.body.style.color = generateRandomColor();

  // var divNova = document.createElement("p");
  // var conteudoNovo = document.createTextNode(bgColor);
  // var add = divNova.appendChild(conteudoNovo)

  // var divNovax = document.createElement("p");
  // var conteudoNovox = document.createTextNode(clColor);
  // var addx = divNovax.appendChild(conteudoNovox)

  // var addd = document.body.appendChild(divNovax);
  // var addd = document.body.appendChild(divNova);

  // console.log("bsa", addd)
}

export default randomColor
