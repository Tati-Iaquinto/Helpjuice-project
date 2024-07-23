# Helpjuice project

This project is a simple web page that allows users to create H1 headers and paragraphs dynamically, similar to the functionality seen in Notion. Users can type "/1" followed by text and hit "Enter" to convert the input into an H1 header.

## Features

- Converts input text starting with `/1` into an H1 header.
- Displays a style selection popup when `/` is typed.
- Allows for creating standard paragraphs by default.
- Hides the style selection popup when clicking outside or pressing "Enter".

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/notion-like-h1-editor.git
    ```
2. Navigate to the project directory:
    ```sh
    cd notion-like-h1-editor
    ```
3. Open `index.html` in your web browser to view the application.


## How to Use

1. In the input area, type "/” + “1" + “Enter” to convert the input area into an h1 tag. Type and press “Enter” to submit your text as an h1 Header.
2. In the input area, simply type regular text and press "Enter" to create a paragraph with the provided input text.

## Project Structure

The project consists of the following files:

1. **HTML:**
The main structure of the page with input areas and display sections.

2. **CSS:**
Basic styling for the page layout and elements.

3. **JavaScript:**
The JavaScript file contains the logic for handling user input, creating headers and paragraphs. Key functions include:
- `showPopup`: Displays the style menu when the user types "/".
- `transformToH1`: Applies the h1 style to the text.
- `addTextToNewDiv`: Sorts the input value into an h1 or p tag according to the user's command.
- `submitText`: Submits the input text and adds it to the display container as a header or paragraph.
- `addTextToNewDiv`: Displays the submitted text to the block container.

## Future Enhancements

Although I am familiar with JavaScript frameworks and libraries such as React, which would have made this task easier, I challenged myself to implement it in pure JavaScript as the test required. This version is functional, but I see several improvements that can be made to the project, such as:

   - Add support for more block types and styles.
   - Improve the user interface and styling.
   - Add more robust editing capabilities.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to suggest improvements or report bugs.


