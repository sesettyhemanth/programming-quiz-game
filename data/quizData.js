const quizData = {
  HTML: {
    topics: [
      {
        name: 'HTML Basics',
        questions: [
          {
            id: '1',
            question: 'What does HTML stand for?',
            options: [
              'Hyper Text Markup Language',
              'High Tech Modern Language',
              'Home Tool Markup Language',
              'Hyperlinks and Text Markup Language'
            ],
            correctAnswer: 'Hyper Text Markup Language',
            explanation: 'HTML stands for Hyper Text Markup Language. It is used to create web pages and web applications.',
            difficulty: 'easy'
          },
          {
            id: '2',
            question: 'Which tag is used for the largest heading?',
            options: ['<h6>', '<h1>', '<heading>', '<head>'],
            correctAnswer: '<h1>',
            explanation: '<h1> is the largest heading tag, <h6> is the smallest. Use <h1> for main titles.',
            difficulty: 'easy'
          },
          {
            id: '3',
            question: 'What is the correct way to create a hyperlink?',
            options: [
              '<a href="url">Link Text</a>',
              '<link href="url">Link Text</link>',
              '<a url="url">Link Text</a>',
              '<href>Link Text</href>'
            ],
            correctAnswer: '<a href="url">Link Text</a>',
            explanation: 'The <a> tag with href attribute is used to create hyperlinks in HTML.',
            difficulty: 'easy'
          },
          {
            id: '4',
            question: 'Which tag is used to define an image?',
            options: ['<img>', '<image>', '<picture>', '<photo>'],
            correctAnswer: '<img>',
            explanation: 'The <img> tag is a self-closing tag used to embed images in HTML documents.',
            difficulty: 'easy'
          },
          {
            id: '5',
            question: 'What is the purpose of the <meta> tag?',
            options: [
              'Provides metadata about the HTML document',
              'Creates a meta link',
              'Defines the main content',
              'Creates metadata links'
            ],
            correctAnswer: 'Provides metadata about the HTML document',
            explanation: 'The <meta> tag provides metadata that is not displayed on the page but helps browsers and search engines understand the page.',
            difficulty: 'medium'
          },
          {
            id: '6',
            question: 'Which attribute specifies the character encoding in HTML?',
            options: [
              'charset',
              'encoding',
              'language',
              'character'
            ],
            correctAnswer: 'charset',
            explanation: 'The charset attribute in the <meta> tag specifies the character encoding for the HTML document (usually UTF-8).',
            difficulty: 'medium'
          },
          {
            id: '7',
            question: 'What is the correct HTML structure?',
            options: [
              '<!DOCTYPE html><html><head></head><body></body></html>',
              '<html><body></body></html>',
              '<!DOCTYPE><body></body>',
              '<head></head><body></body>'
            ],
            correctAnswer: '<!DOCTYPE html><html><head></head><body></body></html>',
            explanation: 'A proper HTML document should include DOCTYPE declaration, html, head, and body tags in the correct order.',
            difficulty: 'medium'
          },
          {
            id: '8',
            question: 'Which tag defines a table row?',
            options: ['<tr>', '<td>', '<table>', '<th>'],
            correctAnswer: '<tr>',
            explanation: 'The <tr> tag defines a table row. <td> is for data cells and <th> is for header cells.',
            difficulty: 'easy'
          },
          {
            id: '9',
            question: 'What does the <strong> tag do?',
            options: [
              'Makes text bold and indicates strong importance',
              'Only makes text larger',
              'Only makes text bold',
              'Underlines the text'
            ],
            correctAnswer: 'Makes text bold and indicates strong importance',
            explanation: '<strong> tag not only bolds text but also semantically indicates that the content is of strong importance.',
            difficulty: 'medium'
          },
          {
            id: '10',
            question: 'Which tag is used to create a list with bullet points?',
            options: ['<ul>', '<ol>', '<li>', '<dl>'],
            correctAnswer: '<ul>',
            explanation: '<ul> creates an unordered list with bullet points. <ol> creates ordered (numbered) lists.',
            difficulty: 'easy'
          }
        ]
      },
      {
        name: 'Forms & Input',
        questions: [
          {
            id: '1',
            question: 'What is the correct way to create a form?',
            options: [
              '<form action="submit.php" method="POST"></form>',
              '<input form></input>',
              '<submit></submit>',
              '<data></data>'
            ],
            correctAnswer: '<form action="submit.php" method="POST"></form>',
            explanation: 'The <form> tag with action and method attributes is used to create forms in HTML.',
            difficulty: 'easy'
          },
          {
            id: '2',
            question: 'What input type is used for email validation?',
            options: [
              'email',
              'mail',
              'text',
              'validate'
            ],
            correctAnswer: 'email',
            explanation: 'The input type "email" provides built-in email validation in HTML5.',
            difficulty: 'easy'
          },
          {
            id: '3',
            question: 'Which attribute makes an input field required?',
            options: [
              'required',
              'mandatory',
              'needed',
              'must-fill'
            ],
            correctAnswer: 'required',
            explanation: 'The "required" attribute makes an input field mandatory before form submission.',
            difficulty: 'easy'
          },
          {
            id: '4',
            question: 'What is the difference between <input type="text"> and <textarea>?',
            options: [
              'textarea allows multiple lines of text',
              'input type text is for numbers',
              'textarea is deprecated',
              'No difference'
            ],
            correctAnswer: 'textarea allows multiple lines of text',
            explanation: '<textarea> allows users to enter multiple lines of text, while input type="text" is for single-line input.',
            difficulty: 'medium'
          },
          {
            id: '5',
            question: 'What does the <label> tag do?',
            options: [
              'Associates text with form inputs',
              'Creates a heading',
              'Defines a table',
              'Creates a border'
            ],
            correctAnswer: 'Associates text with form inputs',
            explanation: 'The <label> tag associates descriptive text with form inputs and improves accessibility.',
            difficulty: 'medium'
          }
        ]
      }
    ]
  },
  CSS: {
    topics: [
      {
        name: 'CSS Basics',
        questions: [
          {
            id: '1',
            question: 'What does CSS stand for?',
            options: [
              'Cascading Style Sheets',
              'Computer Style Sheets',
              'Colorful Style Sheets',
              'Creative Style Sheets'
            ],
            correctAnswer: 'Cascading Style Sheets',
            explanation: 'CSS stands for Cascading Style Sheets and is used to style HTML elements.',
            difficulty: 'easy'
          },
          {
            id: '2',
            question: 'Which is the correct CSS syntax?',
            options: [
              'selector { property: value; }',
              'selector { property = value }',
              'selector [ property: value ]',
              'selector ( property: value )'
            ],
            correctAnswer: 'selector { property: value; }',
            explanation: 'CSS syntax consists of selectors followed by a declaration block with property-value pairs.',
            difficulty: 'easy'
          },
          {
            id: '3',
            question: 'What is the highest specificity in CSS?',
            options: [
              'Inline styles',
              'Class selectors',
              'Element selectors',
              'ID selectors'
            ],
            correctAnswer: 'Inline styles',
            explanation: 'Inline styles have the highest specificity, followed by IDs, classes, and element selectors.',
            difficulty: 'medium'
          },
          {
            id: '4',
            question: 'Which property is used to change the background color?',
            options: [
              'background-color',
              'color',
              'bg-color',
              'background'
            ],
            correctAnswer: 'background-color',
            explanation: 'The background-color property changes the background color of an element.',
            difficulty: 'easy'
          },
          {
            id: '5',
            question: 'What does the box model consist of?',
            options: [
              'Content, Padding, Border, Margin',
              'Width, Height, Size, Space',
              'Color, Style, Weight, Shadow',
              'Display, Position, Float, Clear'
            ],
            correctAnswer: 'Content, Padding, Border, Margin',
            explanation: 'The CSS box model includes content, padding (inside), border, and margin (outside).',
            difficulty: 'medium'
          }
        ]
      },
      {
        name: 'Layouts & Flexbox',
        questions: [
          {
            id: '1',
            question: 'What is Flexbox used for?',
            options: [
              'Creating flexible one-dimensional layouts',
              'Creating 3D animations',
              'Styling fonts',
              'Creating databases'
            ],
            correctAnswer: 'Creating flexible one-dimensional layouts',
            explanation: 'Flexbox is a CSS layout model for creating flexible, one-dimensional layouts with containers and items.',
            difficulty: 'easy'
          },
          {
            id: '2',
            question: 'Which property turns an element into a flex container?',
            options: [
              'display: flex',
              'flex: container',
              'layout: flex',
              'type: flex'
            ],
            correctAnswer: 'display: flex',
            explanation: 'The display: flex property turns an element into a flex container.',
            difficulty: 'easy'
          },
          {
            id: '3',
            question: 'What does justify-content do in Flexbox?',
            options: [
              'Aligns items horizontally',
              'Aligns items vertically',
              'Changes font weight',
              'Increases spacing'
            ],
            correctAnswer: 'Aligns items horizontally',
            explanation: 'justify-content aligns flex items along the main axis (horizontally by default).',
            difficulty: 'medium'
          },
          {
            id: '4',
            question: 'What does align-items do in Flexbox?',
            options: [
              'Aligns items vertically',
              'Aligns items horizontally',
              'Changes the direction',
              'Wraps items'
            ],
            correctAnswer: 'Aligns items vertically',
            explanation: 'align-items aligns flex items along the cross axis (vertically by default).',
            difficulty: 'medium'
          },
          {
            id: '5',
            question: 'What is CSS Grid used for?',
            options: [
              'Creating two-dimensional layouts',
              'Creating animations',
              'Styling text',
              'Creating forms'
            ],
            correctAnswer: 'Creating two-dimensional layouts',
            explanation: 'CSS Grid is used for creating two-dimensional layouts with rows and columns.',
            difficulty: 'medium'
          }
        ]
      }
    ]
  },
  JavaScript: {
    topics: [
      {
        name: 'JS Basics',
        questions: [
          {
            id: '1',
            question: 'Which keyword is used to declare a variable in JavaScript?',
            options: ['let, const, var', 'var, variable, let', 'declare, var, const', 'let, var, variable'],
            correctAnswer: 'let, const, var',
            explanation: 'In JavaScript, you can declare variables using var (old way), let, and const (modern ways).',
            difficulty: 'easy'
          },
          {
            id: '2',
            question: 'What is the difference between == and ===?',
            options: [
              '=== checks both value and type, == only checks value',
              '== is faster than ===',
              'They are the same',
              '== checks type, === checks value'
            ],
            correctAnswer: '=== checks both value and type, == only checks value',
            explanation: '=== is strict equality (no type conversion), == is loose equality (with type conversion).',
            difficulty: 'medium'
          },
          {
            id: '3',
            question: 'What does console.log() do?',
            options: [
              'Prints output to the console',
              'Creates a log file',
              'Logs in to a system',
              'Displays an alert'
            ],
            correctAnswer: 'Prints output to the console',
            explanation: 'console.log() is used to print values to the browser console for debugging.',
            difficulty: 'easy'
          },
          {
            id: '4',
            question: 'Which of these is a primitive data type in JavaScript?',
            options: [
              'String, Number, Boolean',
              'Object, Array, Function',
              'Class, Interface, Module',
              'Window, Document, Navigator'
            ],
            correctAnswer: 'String, Number, Boolean',
            explanation: 'Primitive types in JavaScript are: String, Number, Boolean, undefined, null, Symbol, BigInt.',
            difficulty: 'medium'
          },
          {
            id: '5',
            question: 'What is hoisting in JavaScript?',
            options: [
              'Moving declarations to the top of their scope before execution',
              'Lifting elements on a page',
              'Creating new scopes',
              'Deleting variables'
            ],
            correctAnswer: 'Moving declarations to the top of their scope before execution',
            explanation: 'Hoisting is JavaScripts behavior of moving declarations to the top of their scope.',
            difficulty: 'hard'
          }
        ]
      },
      {
        name: 'Arrays & Objects',
        questions: [
          {
            id: '1',
            question: 'How do you create an array in JavaScript?',
            options: [
              'let arr = [1, 2, 3]; or let arr = new Array();',
              'let arr = {1, 2, 3};',
              'let arr = (1, 2, 3);',
              'let arr = <1, 2, 3>;'
            ],
            correctAnswer: 'let arr = [1, 2, 3]; or let arr = new Array();',
            explanation: 'Arrays can be created using array literal notation [] or the Array constructor.',
            difficulty: 'easy'
          },
          {
            id: '2',
            question: 'What does the map() method do?',
            options: [
              'Creates a new array by transforming each element',
              'Finds an element in an array',
              'Removes elements from an array',
              'Sorts an array'
            ],
            correctAnswer: 'Creates a new array by transforming each element',
            explanation: 'The map() method creates a new array by applying a function to each element of the original array.',
            difficulty: 'medium'
          },
          {
            id: '3',
            question: 'How do you access a property of an object?',
            options: [
              'obj.property or obj["property"]',
              'obj->property',
              'obj:property',
              'obj#property'
            ],
            correctAnswer: 'obj.property or obj["property"]',
            explanation: 'Object properties can be accessed using dot notation or bracket notation.',
            difficulty: 'easy'
          },
          {
            id: '4',
            question: 'What does the filter() method do?',
            options: [
              'Creates a new array with elements that pass a test',
              'Changes the original array',
              'Finds a single element',
              'Sorts the array'
            ],
            correctAnswer: 'Creates a new array with elements that pass a test',
            explanation: 'filter() creates a new array containing only elements that satisfy the provided function.',
            difficulty: 'medium'
          },
          {
            id: '5',
            question: 'What is the length property of an array?',
            options: [
              'Returns the number of elements in the array',
              'Returns the size in bytes',
              'Returns the last element',
              'Returns the first element'
            ],
            correctAnswer: 'Returns the number of elements in the array',
            explanation: 'The length property returns the number of elements in an array.',
            difficulty: 'easy'
          }
        ]
      }
    ]
  },
  Python: {
    topics: [
      {
        name: 'Python Basics',
        questions: [
          {
            id: '1',
            question: 'What is the correct way to create a variable in Python?',
            options: [
              'name = "John"',
              'String name = "John"',
              'var name = "John"',
              'name := "John"'
            ],
            correctAnswer: 'name = "John"',
            explanation: 'Python uses simple assignment syntax. Variable types are inferred from the assigned value.',
            difficulty: 'easy'
          },
          {
            id: '2',
            question: 'Which data type is used for text in Python?',
            options: [
              'str',
              'string',
              'text',
              'char'
            ],
            correctAnswer: 'str',
            explanation: 'In Python, the str data type is used for text/strings.',
            difficulty: 'easy'
          },
          {
            id: '3',
            question: 'How do you create a list in Python?',
            options: [
              'my_list = [1, 2, 3]',
              'my_list = (1, 2, 3)',
              'my_list = {1, 2, 3}',
              'my_list = <1, 2, 3>'
            ],
            correctAnswer: 'my_list = [1, 2, 3]',
            explanation: 'Lists in Python are created using square brackets [].',
            difficulty: 'easy'
          },
          {
            id: '4',
            question: 'What does len() function do in Python?',
            options: [
              'Returns the length/number of items',
              'Creates a list',
              'Deletes elements',
              'Converts to integer'
            ],
            correctAnswer: 'Returns the length/number of items',
            explanation: 'The len() function returns the number of items in a sequence (string, list, tuple, etc.).',
            difficulty: 'easy'
          },
          {
            id: '5',
            question: 'How do you create a dictionary in Python?',
            options: [
              'my_dict = {"key": "value"}',
              'my_dict = ["key", "value"]',
              'my_dict = ("key", "value")',
              'my_dict = <"key": "value">'
            ],
            correctAnswer: 'my_dict = {"key": "value"}',
            explanation: 'Dictionaries in Python are created using curly braces {} with key-value pairs.',
            difficulty: 'medium'
          }
        ]
      },
      {
        name: 'Control Flow',
        questions: [
          {
            id: '1',
            question: 'What is the correct syntax for an if statement in Python?',
            options: [
              'if condition: statement',
              'if (condition) { statement }',
              'if condition then statement',
              'if condition => statement'
            ],
            correctAnswer: 'if condition: statement',
            explanation: 'Python uses colon (:) and indentation for if statements, not braces.',
            difficulty: 'easy'
          },
          {
            id: '2',
            question: 'How do you create a for loop in Python?',
            options: [
              'for item in iterable: statement',
              'for item = 0 to 10 { statement }',
              'for (item in iterable) statement',
              'for item -> iterable: statement'
            ],
            correctAnswer: 'for item in iterable: statement',
            explanation: 'Python uses "for item in iterable" syntax for loops.',
            difficulty: 'easy'
          },
          {
            id: '3',
            question: 'What is the purpose of the elif statement?',
            options: [
              'To specify additional conditions after if',
              'To create a loop',
              'To define a function',
              'To handle errors'
            ],
            correctAnswer: 'To specify additional conditions after if',
            explanation: 'elif (else if) is used to check additional conditions when the if condition is false.',
            difficulty: 'medium'
          },
          {
            id: '4',
            question: 'How do you create a while loop in Python?',
            options: [
              'while condition: statement',
              'while (condition) { statement }',
              'while condition then statement',
              'while condition => statement'
            ],
            correctAnswer: 'while condition: statement',
            explanation: 'while loops in Python use the same syntax as if statements.',
            difficulty: 'easy'
          },
          {
            id: '5',
            question: 'What does the break statement do?',
            options: [
              'Exits the loop immediately',
              'Pauses the loop',
              'Restarts the loop',
              'Skips one iteration'
            ],
            correctAnswer: 'Exits the loop immediately',
            explanation: 'The break statement terminates the current loop.',
            difficulty: 'medium'
          }
        ]
      }
    ]
  },
  Java: {
    topics: [
      {
        name: 'Java Basics',
        questions: [
          {
            id: '1',
            question: 'What is Java primarily used for?',
            options: [
              'Building robust, platform-independent applications',
              'Creating websites only',
              'Managing databases only',
              'Creating graphics only'
            ],
            correctAnswer: 'Building robust, platform-independent applications',
            explanation: 'Java is known for its "write once, run anywhere" capability due to the JVM.',
            difficulty: 'easy'
          },
          {
            id: '2',
            question: 'What does JVM stand for?',
            options: [
              'Java Virtual Machine',
              'Java Variable Manager',
              'Java Visual Module',
              'JavaScript Virtual Machine'
            ],
            correctAnswer: 'Java Virtual Machine',
            explanation: 'JVM is the Java Virtual Machine that executes Java bytecode.',
            difficulty: 'easy'
          },
          {
            id: '3',
            question: 'How do you declare a variable in Java?',
            options: [
              'type variableName = value;',
              'var: type variableName;',
              'variableName = value;',
              'declare variableName type;'
            ],
            correctAnswer: 'type variableName = value;',
            explanation: 'Java requires explicit type declaration before variable assignment.',
            difficulty: 'easy'
          },
          {
            id: '4',
            question: 'What is the entry point of a Java program?',
            options: [
              'public static void main(String[] args)',
              'public void start()',
              'public static main()',
              'public void begin(String[] args)'
            ],
            correctAnswer: 'public static void main(String[] args)',
            explanation: 'The main method is the entry point where Java programs start execution.',
            difficulty: 'medium'
          },
          {
            id: '5',
            question: 'Is Java an object-oriented language?',
            options: [
              'Yes, Java is purely object-oriented',
              'No, Java is procedural',
              'Java supports both OOP and procedural',
              'Java is functional only'
            ],
            correctAnswer: 'Yes, Java is purely object-oriented',
            explanation: 'Java is designed as a pure object-oriented programming language.',
            difficulty: 'medium'
          }
        ]
      }
    ]
  }
};

module.exports = quizData;
