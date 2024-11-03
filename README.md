# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices. 
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle. 
**Lets get coding!**

## Submission Details and Deadlines
* Coding playgrounds are **individual** work
* There will be 2 serparate submissions:
  * [Base Playgrounds](#base-coding-playgrounds): Submission Deadline **03.11.2024**
  * [Extended Playgrounds](#extended-coding-playgrounds): Submission Deadline **16.01.2025**
* The playgrounds will be guided through in our sessions - still there will be distance work!
* Use this base template to create your project repository.
* Each playground is linked in the corresponding course section.
* You can find the submissions at the bottom of the Moodle course.
  

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:



# Base Coding Playgrounds

## K.O. Criteria
* No JS Frameworks allowed to solve the base coding playgrounds (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to them!
* No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 1. JS Playground (10 Pts.)
The provided base project template contains some bugs and bad JS coding practices for you to fix in your first playground. Take a look into the component files and get a grasp of the inner workings of the provided project.
> **ATTENTION: After finishing the JS Playground please create a commit or branch and link it below. Otherwise it is not possible to grade your 1. submission, since we will switch to TypeScript afterwards!**
> 
> **This is my JS Playground commit/branch:** branch 1-JS-Playground: https://github.com/flyingcodeman/WebEngineering_Base_KOENIG/tree/1-JS-Playground

**Tasks:**
Fix application code and answer the questions:
* (2) Adapt the code to use ``async/await`` instead of the ``then()``-callback hell and refactor the functions to use arrow function syntax instead of ``function()``-syntax.
* (2) Add proper error handling to the code using ``try/catch`` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
* (1) Extract the range value from the provided Wikitext (response from the API). Examine the provided Wikitext format inside `extractBears` function. 
* (1) Split the code into separate modules with regards to clean separation of concerns.
* (1) Eliminate all other bad coding practices you can find. 
* (3) Answer the following questions and provide some examples inside the ``Readme.md`` file. 

>  **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**


**1. Use of Deprecated `<font>` Tags**

**Issue**: The HTML code used deprecated `<font>` tags for styling text.

**Bad Practice Example**:

```html
<font size="7">Welcome to our wildlife website</font>
```

**Why It's Bad**: The `<font>` tag is obsolete in HTML5 and should not be used. It leads to poor separation of content and presentation, making the code less maintainable and harder to style consistently. Modern web development standards recommend using CSS for styling instead.

**Fix**: Replaced `<font>` tags with semantic HTML elements like `<h1>`, `<h2>`, and `<h3>`, and moved styling to CSS.

**Good Practice Example**:

```JS
<h1>Welcome to our wildlife website</h1>
```


**2. Lack of Semantic HTML Elements**

**Issue**: The HTML structure did not utilize semantic elements, using generic `<div>` elements instead.

**Bad Practice Example**:

```JS
<div class="header">
  <!-- Content -->
</div>
```

**Why It's Bad**: Not using semantic elements reduces the accessibility and readability of the code. Semantic elements like `<header>`, `<nav>`, `<main>`, and `<footer>` provide meaningful context about the content, which is beneficial for SEO and assistive technologies.

**Fix**: Replaced generic `<div>` elements with appropriate semantic HTML5 elements.

**Good Practice Example**:

```JS
<header>
  <!-- Bear -->
</header>
```


**3. Inefficient and Deprecated CSS Selectors**

**Issue**: CSS selectors targeted deprecated HTML attributes, such as `font[size="7"]`.

**Bad Practice Example**:

```JS
font[size="7"] {
  font-size: 4rem;
}
```

**Why It's Bad**: Using selectors based on deprecated attributes can lead to maintenance challenges and unpredictability in styling. It's better to target elements or classes that reflect the current HTML structure.

**Fix**: Updated CSS selectors to target semantic elements directly.

**Good Practice Example**:

```JS
h1 {
  font-size: 4rem;
}
```


**4. Invalid Color Values in CSS**

**Issue**: Hex color values in CSS were missing the `#` symbol.

**Bad Practice Example**:

```JS
background-color: ff80ff;
```

**Why It's Bad**: Without the `#`, the color value is invalid, and the browser may ignore it or produce unexpected results. This leads to inconsistent styling across different browsers.

**Fix**: Added the `#` symbol to all hex color values to ensure they are valid.

**Good Practice Example**:

```JS
background-color: #ff80ff;
```


**5. Overly Specific CSS Selectors**

**Issue**: Selectors like `div[class="nav"]` were unnecessarily specific.

**Bad Practice Example**:

```JS
div[class="nav"] {
  /* Styles */
}
```

**Why It's Bad**: Overly specific selectors make the CSS harder to read and maintain. They can also lead to specificity wars, where it's challenging to override styles without increasing specificity even further.

**Fix**: Simplified selectors to target classes or semantic elements.

**Good Practice Example**:

```JS
nav {
  /* Styles */
}
```


**6. Global Variables and Scope Issues in JavaScript**

**Issue**: Variables were declared without const or let, potentially polluting the global scope.

**Bad Practice Example**:

```JS
showHideBtn = document.querySelector('.show-hide');
```

**Why It's Bad**: Failing to declare variables with const or let defaults them to global scope, which can cause conflicts and unintended side effects in larger codebases.

**Fix**: Declared variables using const or let to ensure proper scoping.

**Good Practice Example**:

```JS
const showHideBtn = document.querySelector('.show-hide');
```


**7. Inconsistent Naming Conventions**

**Issue**: Variable and function names did not consistently use camelCase, making the code less readable.

**Bad Practice Example**:

```JS
const placeholder_image_url = '...';
```

**Why It's Bad**: Inconsistent naming conventions can confuse developers and make the code harder to read and maintain. camelCase is the standard naming convention for variables and functions in JavaScript.

**Fix**: Standardized naming conventions to camelCase throughout the codebase.

**Good Practice Example**:

```JS
const placeholderImageUrl = '...';
```


**8. Hardcoded Strings (Magic Numbers and Strings)**

**Issue**: Repeated use of hardcoded strings and values scattered throughout the code.

**Bad Practice Example**:

```JS
const placeholderImageUrl = 'https://placehold.co/200x150?text=No+Image';

if (!data.query || !data.query.pages) {
  throw new Error('Invalid data structure returned from image API.');
}
```

**Why It's Bad**: Hardcoded strings and numbers (magic values) make the code less flexible and harder to maintain. Changes require finding and updating multiple instances, increasing the risk of errors.

**Fix**: Defined constants in a separate configuration file (constants.js) to centralize values and make them easier to manage.

**Good Practice Example**:

```JS
// constants.js
export const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/200x150?text=No+Image';
export const ERROR_MESSAGES = {
  INVALID_IMAGE_DATA: 'Invalid data structure returned from image API.',
};

// Usage in other files
import { PLACEHOLDER_IMAGE_URL, ERROR_MESSAGES } from './constants.js';

const placeholderImageUrl = PLACEHOLDER_IMAGE_URL;

if (!data.query || !data.query.pages) {
  throw new Error(ERROR_MESSAGES.INVALID_IMAGE_DATA);
}
```


**9. Lack of Comments and Documentation**

**Issue**: Functions and complex code blocks lacked explanatory comments, making the code harder to understand.

**Bad Practice Example**:

```JS
const extractBears = async (wikitext) => {
  // further logic
};
```

**Why It's Bad**: Without comments, it becomes difficult for others (or your future self) to understand the purpose and functionality of the code, which hinders collaboration and maintenance.

**Fix**: Added descriptive comments and used JSDoc to document functions, parameters, and return values.

**Good Practice Example**:

```JS
/**
 * Extracts bear information from the wikitext.
 * @param {string} wikitext - The wikitext content from the API.
 * @returns {Array<Object>} An array of bear objects containing name, binomial, image, and range.
 */
const extractBears = async (wikitext) => {
  // Well-documented logic
};
```


**10. Error Messages Could Be More Descriptive**

**Issue**: Error messages provided to users were generic and did not guide them on how to resolve the issue.

**Bad Practice Example**:

```JS
displayErrorMessage('Unable to load bear data - Please try again');
```

**Why It's Bad**: Generic error messages can frustrate users and don't offer any actionable advice or insight into what went wrong.

**Fix**: Enhanced error messages to be more informative and stored them in constants for consistency.

**Good Practice Example**:

```JS
export const ERROR_MESSAGES = {
  FETCH_BEAR_DATA: 'Unable to load bear data. Please check your internet connection and try again.',
};

displayErrorMessage(ERROR_MESSAGES.FETCH_BEAR_DATA);
```


**11. Improper Use of HTML Elements for Accessibility**

**Issue**: Images lacked alt attributes, and form inputs were not properly associated with labels.

**Bad Practice Example**:

```JS
<img src="media/wild-bear.jpg">
<input type="text" name="name">
```

**Why It's Bad**: Omitting alt attributes on images hinders accessibility for users relying on screen readers. Similarly, inputs without associated labels make forms difficult to navigate for assistive technologies.

**Fix**: Added meaningful alt attributes to images and used <label> elements linked to input fields via the for and id attributes.

**Good Practice Example**:

```JS
<img src="media/wild-bear.jpg" alt="A wild bear in its natural habitat">
<label for="name">Your name:</label>
<input type="text" name="name" id="name">
```


**12. CORS Issues Due to Local File Protocol**

**Issue**: Running the application directly from the `file://` protocol caused Cross-Origin Resource Sharing (CORS) issues, preventing the application from fetching data from external APIs.

**Bad Practice Example**:

```JS
// Attempting to fetch data while running from file:// protocol
fetch('https://en.wikipedia.org/w/api.php?...')
  .then(response => response.json())
  .then(data => { /* ... */ });
```

**Why It's Bad**: Modern browsers enforce CORS policies that block cross-origin requests made from local files for security reasons.

**Fix**: Set up a local development server to serve the files over `http://localhost`, which adheres to CORS policies and allows external API requests.

**Good Practice Example**:

```JS
Used a simple local server with the Live Server extension in VS Code to run the server and avoid CORS.
```



## 2. Dependency- and Build Management Playground (10 Pts.)
Build the application with ``npm`` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others). 

Here are some additional resources: [Package Management and Bundling](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2-Package-Management,-Build-Management-and-Modules), [Vite Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.1-Vite-Web-Application-Setup), [Webpack Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.2-Webpack-Web-Application-Setup).

**Tasks:**
* (1) Integrate `npm` and a build management tool into your project.
* (2) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
* (2) Use ESLint and Prettier inside your project - rulesets can be found below.
* (1) Keep your builds clear and add dependencies to the right build (e.g. do not add dev dependencies inside the production build and vice versa).
* (1) Define the following tasks within `npm scripts`:
  * `dev`: starts the development server
  * `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  * `lint`: runs ESLint on all  `.js` and `.ts` files in your projects `/src` directory
  * `lint:fix`: runs and also fixes all issues found by ESLint
  * `format`: formats all `.js` and `.ts` files in your projects `/src` directory
  * `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
* (1) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
* (2) Answer the question at the end of this section inside ``Readme.md`` file: 


**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:
```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```
 
**Prettier Configurations**

Apply the following ruleset for Prettier:
``` .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

>  **What improvements in your codebase were introduced by using TS instead of JS? Name at least 3 and explain why.**

Present your findings here...

**Switching from JavaScript to TypeScript has improved my codebase noticibly by:**

**1: Improved Readability and Maintainability:**
 Explicit types and interfaces make the code self-explanatory, which is beneficial for collaboration and future development.

**2: Ensuring Null Safety:**
 Early detection of null or undefined values reduces runtime crashes. It was a pain in the ass setting this up on a mac and get working versions, but if it works, it is very smooth.

**3: Promoting Modularity:** Encourages better code organization and reuse through a robust module system - already introduced at the beginning, in modularizing the main.js into different topic-related files.



## 3.	CI/CD Pipeline Playground (5 Pts.)
Implementation of a CI/CD pipeline to automate the development and deployment process – write automated tests.

Here are some additional resources: [GitHub Actions Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/3.2-CI-CD-Pipeline-with-Github-Pages-and-Github-Actions) and [GitHub Actions Docs](https://docs.github.com/en/actions).

**Tasks:**
* (1.5) Write at least 2 meaningful unit tests (use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)) for your project and configure the following tasks in ``npm scripts``:
  * `test`: runs all files that include `.test.` or `.spec.`, e.g.: `example.test.ts`
  * `test:coverage`: runs tests like `test` but also creates a test coverage report
* (1) Configure **2 Workflows** in GitHub Actions, one for development and one for deployment:
  * Create a `development` branch inside your repository
  * (1) Development Workflow should at least test and lint your code when developers push to branch `development`
  * (1) Deployment Workflow is triggered when developers push into `main` branch. It should at least test, lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice). 
* (0.5) Reuse existing workflows or jobs whenever possible! 

## 4.	Accessibility Playground (5 Pts.)
You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility in your project.

**(0.5) Color** 

Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.

Initially 24 contrast errors overall.
- h1 heading element: Contrast Ratio: 1.34:1
- 4 navigation elem.: Contrast Ratio: 4.08:1
- 6 heading elements: Contrast Ratio: 2.79:1
- 7 subtext element: Contrast Ratio: 2.79:1
- 5 "realted" sub points: Contrast Ratio: 1.82:1
- 1 footer element: Contrast Ratio: 2.79:1

Therefore I mainly changed the text colors to white or black and made the green background slightly darker. Now no contrast error appears any more.

**(0.5) Semantic HTML**

Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.

Identified issues:
- The "Show comments" control is implemented as a `<div>`, which is not inherently focusable or operable via keyboard.
- Missing ARIA roles and attributes. Would be good to provide additional context in certain areas of the website.
- Missing "Skip to content" link to bypass repetitive navigation links.
- Missing landmark information in the footer for better navigation. 


**(0.5) Audio** 

The ``<audio>`` player isn't accessible to hearing impaired (deaf) people — can you add some kind of accessible alternative for these users?

**Why It's Not Accessible to Deaf Users?**

- Lack of Textual Content: Deaf users rely on visual content to understand information. An audio player without any textual alternative means that deaf users cannot access the information conveyed through the audio.

- Missing Transcripts or Captions: Without transcripts or captions, the content of the audio remains inaccessible.

**Solution:**

- Provided an accessible transcript for deaf users 

- Usage of accessible controls and ARIA attributes, ensuring that the audio player itself is accessible to all users


**(1) Forms** 
  * The ``<input>`` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
  * The two ``<input>`` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

*Present your findings and fixes here.*

**(0.5) Comment section**

The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?

*Present your findings and fixes here.*

**(1) The table**

The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?

*Present your findings and fixes here.*

**(1) More Findings**

What other accessibility issues did you find? Explain how you did fix them.

# Extended Coding Playgrounds
Please create a new independent Repository for these playgrounds and submit a link to it in the Moodle submission. 
Additionally, provide a description of how to start your frontend and backend services inside the `README.md`.

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 5. Migrate to a Frontend Framework (10 pts.)
In this playground you will migrate your application to a frontend framework of your choice.

**Tasks**:
* Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...)
  * All previous features should still work
  * The application still should use build and dependency management
* Adapt your `npm scripts` if necessary

## 6. Integrate a Backend Framework (10 pts.)
In this playground you will use a backend framework of your choice and connect it with an API to your frontend application. 

**Tasks**:
* (3) Setup a backend framework of your choice
* (2) Create an API your frontend will be connected to (REST, GraphQL, gRPC, you choose...)
* (2) Your backend should now request the bear data from presented Wikipedia API
* (3) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
* (Optional): you may want to introduce some sort of caching layer for Wikipedia API requests


## 7. Containerize your application (10 pts.)
Dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

**Tasks**:
* (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  * The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  * The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app 
* (4) Create two docker-compose files to orchestrate you applications in ``development`` and ``production`` mode:
  * Define ports and dependencies
  * Define corresponding stage (development, production)
  * Use environment variables if possible
* Your application should start with the following commands:
  * Development: `docker-compose -f docker-compose.yml up --build`
  * Production: `docker-compose -f docker-compose.prod.yml up --build`