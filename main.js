document.addEventListener("DOMContentLoaded", function() {
  const inputText = document.getElementById('inputText');
  let createTag = '';

  //Adds an event to manage 'Enter, '/' and '1'
  inputText.addEventListener('keydown', function(event) {
    //'Enter' key checks if the new tag should be an H1 or P type
      if (event.key === 'Enter') {
          event.preventDefault();
          if (createTag === 'h1') {
              transformToH1(); 
          } else {
              submitText(); 
          }
      } else if (event.key === '/') {
          showPopup(inputText); // '/' key opens the popup menu
      } else if (event.key === '1' && inputText.value.endsWith('/')) {
          createTag = 'h1';
      } else {
          createTag = ''; // Resets createTag
      }
  });

  //Global event to close the menu whenever the user clicks outside of it
  document.addEventListener('click', function(event) {
    //Verifies if the click was outside the popup menu or the text area
      const popup = document.getElementById('popupStyle');
      const inputText = document.getElementById('inputText');
      if (popup && !popup.contains(event.target) && !inputText.contains(event.target)) {
          popup.style.display = 'none'; 
      }
  });
  document.addEventListener('keydown', function(event) {
    //Checks if the pressed key's value is 'Enter'
      if (event.key === 'Enter') {
          const popup = document.getElementById('popupStyle');
          if (popup) {
              popup.style.display = 'none';
          }
      }
  });

  //Shows popup menu when the user types '/'
  function showPopup(textarea) {
      let popup = document.getElementById('popupStyle');
      if (!popup) {
          popup = document.createElement('div');
          popup.className = 'popupStyle';
          textarea.parentNode.insertBefore(popup, textarea.nextSibling);

      }
      popup.style.display = 'block';
  }

  // Saves the text inside textarea as either paragraph or h1
  function submitText() {
      const input = document.getElementById('inputText').value;
      if (input.trim() === '') return; // Ignores an empty string value inside the input

      const textObj = {
          id: Math.random().toString(16).slice(2), // Generates an id for each text block
          content: input
      };

      document.getElementById('inputText').value = ''; // Cleans text area
      addTextToNewDiv(textObj); // Fills a new div with the text
  }

  //Sorts text as a paragraph or h1 to the new div
  function addTextToNewDiv(textObj) {
      const newTextDiv = document.getElementById('newDiv');
      const element = document.createElement(textObj.content.startsWith('/1') ? 'h1' : 'p');
      element.innerHTML = textObj.content.startsWith('/1')
          ? textObj.content.slice(2).trim().replace(/\n/g, '<br>')
          : textObj.content.replace(/\n/g, '<br>');
      element.id = textObj.id;
      newTextDiv.appendChild(element);
  }

  // Detects if the user typed '/1' command and tranforms the following text into an h1, as well as hides the command when the text is submitted.
  function transformToH1() {
      const textArea = document.getElementById('inputText');
      let text = textArea.value.replace('/1', '').trim();
      const newH1 = document.createElement('h1');
      newH1.innerText = text;
      newH1.contentEditable = "true";
      newH1.className = 'title'
      newH1.onblur = saveEditableH1;
      newH1.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
              event.preventDefault();
              newH1.blur(); 
          }
      });
      document.getElementById('newDiv').appendChild(newH1);
      newH1.focus();
      textArea.value = ''; // Cleans text area
      textArea.style.display = 'none'; // Hides text area
  }

  // Saves submitted text and creates a new textarea
  function saveEditableH1(event) {
      const newH1 = event.target;
      const newText = newH1.innerText;
      const savedTextDiv = document.createElement('div');
      savedTextDiv.innerHTML = `<h1>${newText}</h1>`;
      document.getElementById('newDiv').appendChild(savedTextDiv);
      document.getElementById('inputText').style.display = 'block';
      document.getElementById('inputText').focus();
      newH1.remove();
  }

});
