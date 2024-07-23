document.addEventListener("DOMContentLoaded", function() {
  const inputText = document.getElementById('inputText');
  let createTag = '';

  // Adiciona evento para tratar 'Enter', '/', e '1'
  inputText.addEventListener('keydown', function(event) {
      // Ao apertar 'Enter', verifica o modo de comando e realiza a ação apropriada
      if (event.key === 'Enter') {
          event.preventDefault();
          if (createTag === 'h1') {
              transformToH1(); // Transforma o textarea em um H1 editável
          } else {
              submitText(); // Salva o texto como parágrafo ou H1
          }
      } else if (event.key === '/') {
          showPopup(inputText); // Exibe o menu de estilos
      } else if (event.key === '1' && inputText.value.endsWith('/')) {
          createTag = 'h1'; // Define o modo de comando para H1
      } else {
          createTag = ''; // Reseta o modo de comando para outros inputs
      }
  });

  // Evento global para cliques fora do menu de estilo para escondê-lo
  document.addEventListener('click', function(event) {
      // Verifica se o clique foi fora do popup ou do textarea
      const popup = document.getElementById('popupStyle');
      const inputText = document.getElementById('inputText');
      if (popup && !popup.contains(event.target) && !inputText.contains(event.target)) {
          popup.style.display = 'none'; // Esconde o menu se clicar fora
      }
  });
  document.addEventListener('keydown', function(event) {
      // Verifica se a tecla pressionada é 'Enter'
      if (event.key === 'Enter') {
          const popup = document.getElementById('popupStyle');
          if (popup) {
              popup.style.display = 'none'; // Esconde o menu ao pressionar Enter
          }
      }
  });

  // Função para exibir o menu de estilo ao digitar '/'
  function showPopup(textarea) {
      let popup = document.getElementById('popupStyle');
      if (!popup) {
          popup = document.createElement('div');
          popup.className = 'popupStyle';
          textarea.parentNode.insertBefore(popup, textarea.nextSibling);

      }
      popup.style.display = 'block';
  }

  // Função para salvar o texto do textarea como parágrafo ou H1
  function submitText() {
      const input = document.getElementById('inputText').value;
      if (input.trim() === '') return; // Ignora se o input estiver vazio

      const textObj = {
          id: Math.random().toString(16).slice(2), // Gera um ID único para o texto
          content: input
      };

      document.getElementById('inputText').value = ''; // Limpa o textarea
      addTextToNewDiv(textObj); // Adiciona o texto à área de saída
  }

  // Função para adicionar o texto como parágrafo ou H1 ao div
  function addTextToNewDiv(textObj) {
      const newTextDiv = document.getElementById('newDiv');
      const element = document.createElement(textObj.content.startsWith('/1') ? 'h1' : 'p');
      element.innerHTML = textObj.content.startsWith('/1')
          ? textObj.content.slice(2).trim().replace(/\n/g, '<br>')
          : textObj.content.replace(/\n/g, '<br>');
      element.id = textObj.id;
      newTextDiv.appendChild(element);
  }

  // Função para transformar o textarea em um H1 editável
  function transformToH1() {
      const textArea = document.getElementById('inputText');
      let text = textArea.value.replace('/1', '').trim();
      const newH1 = document.createElement('h1');
      newH1.innerText = text;
      newH1.contentEditable = "true";
      //teste mudando a classe
      newH1.className = 'title'
      // editableH1.className = 'editable';
      newH1.onblur = saveEditableH1; // Salva o texto ao sair do modo de edição (verificar necessidade)
      newH1.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
              event.preventDefault();
              newH1.blur(); // Sai do modo de edição ao apertar Enter
          }
      });
      document.getElementById('newDiv').appendChild(newH1);
      newH1.focus();
      // document.execCommand('selectAll', false, null);
      textArea.value = ''; // Limpa o textarea
      textArea.style.display = 'none'; // Esconde o textarea
  }

  // Função para salvar o texto editado no H1 e restaurar o textarea
  function saveEditableH1(event) {
      const newH1 = event.target;
      const newText = newH1.innerText;
      const savedTextDiv = document.createElement('div');
      savedTextDiv.innerHTML = `<h1>${newText}</h1>`;
      document.getElementById('newDiv').appendChild(savedTextDiv);
      document.getElementById('inputText').style.display = 'block'; // Mostra novamente o textarea
      document.getElementById('inputText').focus(); // Foca no textarea
      newH1.remove(); // Remove o H1 editável
  }

});
