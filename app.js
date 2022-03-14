const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { text } = require("stream/consumers");
const { mainModule } = require("process");
const memberArray = [];

// Write code to use inquirer to gather information about the development team members,
const promptMember = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please Select Employee type",
        choices: ["Manager", "Engineer", "Intern", "Done"],
      },
    ])
    .then((response) => {
      if (response.role === "Manager") {
        managerQuestions();
      } else if (response.role === "Engineer") {
        engineerQuestions();
      } else if (response.role === "Intern") {
        internQuestions();
      } else {
        renderPage();
      }
    });
};

const managerQuestions = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Pease enter new manager name",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a name!");
          return false;
        }
      },
    },

    {
      type: "input",
      name: "id",
      message: "Enter employee ID",
      validate: (idNumber) => {
        if (idNumber) {
          return true;
        } else {
          console.log("Please enter employee ID number!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "email",
      message: "Enter e-mail address",
      validate: (mailInput) => {
        if (mailInput) {
          return true;
        } else {
          console.log("Please enter an e-mail address!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "officeNum",
      message: "Enter managers office number",
      validate: (numInput) => {
        if (numInput) {
          return true;
        } else {
          console.log("Please enter a office number");
          return false;
        }
      },
    },
  ]).then(function(response){
      const newManger = new Manager(response.name,response.id,response.email,response.officeNum);
      memberArray.push(newManger);
      console.log(memberArray);
      promptMember();
  })
};

const engineerQuestions = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter new engineer's name",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a name!");
          return false;
        }
      },
    },

    {
      type: "input",
      name: "id",
      message: "Enter employee ID",
      validate: (idNumber) => {
        if (idNumber) {
          return true;
        } else {
          console.log("Please enter employee ID number!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "email",
      message: "Enter e-mail address",
      validate: (mailInput) => {
        if (mailInput) {
          return true;
        } else {
          console.log("Please enter an e-mail address!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "githubUser",
      message: "Enter GitHub username ",
      validate: (gitInput) => {
        if (gitInput) {
          return true;
        } else {
          console.log("Please enter a Github username!");
          return false;
        }
      },
    },
  ]).then(function(response){
    const newEngineer = new Engineer(response.name,response.id,response.email,response.githubUser);
    memberArray.push(newEngineer);
    console.log(memberArray);
    promptMember();
})
};

const internQuestions = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter Intern's name",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a name!");
          return false;
        }
      },
    },

    {
      type: "input",
      name: "id",
      message: "Enter employee ID",
      validate: (idNumber) => {
        if (idNumber) {
          return true;
        } else {
          console.log("Please enter employee ID number!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "email",
      message: "Enter e-mail address",
      validate: (mailInput) => {
        if (mailInput) {
          return true;
        } else {
          console.log("Please enter an e-mail address!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "school",
      message: "Please enter intern's school ",
      validate: (schoolInput) => {
        if (schoolInput) {
          return true;
        } else {
          console.log("Please enter a school name!");
          return false;
        }
      },
    },
  ]).then(function(response){
    const newIntern = new Intern(response.name,response.id,response.email,response.school);
    memberArray.push(newIntern);
    console.log(memberArray);
    promptMember();
})
};

const renderPage = () =>  {
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
fs.writeFileSync(outputPath,render(memberArray),"utf-8")
}



promptMember();

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
