import * as React from 'react';
import { FaCopy, FaGithub } from "react-icons/fa";
import Shell from './shell'
import { FaSquarePlus } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import './App.css'
const snippets = [
  { description: "Print 'Hello, World!'", code: "dump('Hello, World!');" },
  { description: "Perform a basic arithmetic operation", code: "dump(5 + 3);" },
  { description: "Define and print a variable", code: "let greeting = 'Hello, JavaScript!';\ndump(greeting);" },
  { description: "Use a conditional statement", code: "let x = 10;\nif (x > 5) {\n    dump('x is greater than 5');\n} else {\n    dump('x is not greater than 5');\n}" },
  { description: "Create and print an array", code: "let fruits = ['Apple', 'Banana', 'Orange'];\ndump(fruits);" },
  { description: "Access elements of an array", code: "dump(fruits[0]);" },
  { description: "Define and call a function", code: "function greet(name) {\n    dump('Hello, ' + name + '!');\n}\ngreet('Alice');" },
  { description: "Use a loop to print numbers", code: "for (let i = 0; i < 5; i++) {\n    dump(i);\n}" },
  { description: "Create an object and access its properties", code: "let person = {name: 'John', age: 30};\ndump(person.name);\ndump(person.age);" },
  { description: "Use template literals", code: "let name = 'Alice';\nlet age = 25;\ndump(`My name is ${name} and I am ${age} years old.`);" },
  { description: "Use the setTimeout function", code: "dump('Start');\nsetTimeout(() => {\n    dump('Delayed message');\n}, 2000);" },
  { description: "Use the setInterval function", code: "let counter = 0;\nlet intervalId = setInterval(() => {\n    dump(counter++);\n    if (counter > 5) {\n        clearInterval(intervalId);\n    }\n}, 1000);" },
  { description: "Use the Math object", code: "dump(Math.random());" },
  { description: "Use array methods like map", code: "let numbers = [1, 2, 3, 4, 5];\nlet doubled = numbers.map(num => num * 2);\ndump(doubled);" },
  { description: "Use the Date object to get the current date and time", code: "let currentDate = new Date();\ndump(currentDate);" }
];



export const help = () => {
  return (` Exposed Objects:`);
};

interface coordinates {
  x: number;
  y: number;
}


const App = () => {
  const [pairIndex, setPairIndex] = React.useState(0);
  // @ts-ignore
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
  // @ts-ignore
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [coordinates, setcoordinates] = React.useState<coordinates>({ x: 0, y: 0 });
  const [MouseDown, setMouseDown] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string | any[] | React.ReactElement>();

  const [Shells, setShells] = React.useState<JSX.Element[]>([]);
  const [infovisible, setinfovisible] = React.useState(false);




  const dump = (dumpstr: any) => {
    return dumpstr
    //addCommand({ input: val, output: dumpstr });
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippets[pairIndex].code)
      .catch(error => {
        console.error('Failed to copy:', error);
      });
  };

  const DeleteShell = (index: number) => {

    setShells((self: JSX.Element[]) => self.filter((shell: JSX.Element) => shell.key !== String(index)));

  };

  const SetShellFocus = (index: number) => {
    setShells((self: JSX.Element[]) => self.map((shell: JSX.Element) => {
      if (parseInt(shell.key ?? '0') === index) {
        return React.cloneElement(shell, { FocusIndex: 2 });
      }
      return React.cloneElement(shell, { FocusIndex: 1 });

    }));
  };

  const AddConsole = () => {
    setShells(self => [...self,
    <Shell key={self.length + 1} id={self.length + 1} FocusIndex={1} callback={DeleteShell} callbackFocus={SetShellFocus} consoleObj={{}} />
    ])
  }
  const [viewportWidth, setViewportWidth] = React.useState(document.documentElement.clientWidth);
  const [viewportHeight, setViewportHeight] = React.useState(document.documentElement.clientHeight);

  React.useEffect(() => {

    const HandleResize = () => {
      setViewportWidth(document.documentElement.clientWidth);
      setViewportHeight(document.documentElement.clientHeight);
    };
    window.addEventListener('resize', HandleResize);
    const intervalId = setInterval(() => {
      // Generate a random index different from the current one
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * snippets.length);
      } while (newIndex === pairIndex);

      setPairIndex(newIndex);
    }, 5000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', HandleResize);


    };

  }, [
    dump, inputValue, setInputValue, MouseDown, setMouseDown, setcoordinates, coordinates
  ]);




  return (


    <>
      <div style={{ flexDirection: "row", gap: "0px", display: "flex", overflow: "hidden", backgroundColor: '#999999', padding: "1%", height: viewportHeight, width: viewportWidth }}>

        <div style={{ display: "flex", flexDirection: "column", margin: "0" }}>

          <div style={{ cursor: "pointer", width: "50%", borderRadius: "5px", flexDirection: "column", display: "flex" }}>
            <IoMdInformationCircle onClick={() => { setinfovisible(!infovisible); }} className={'hoverbutton'} style={{ fontSize: "30px", color: "#555" }} />
          </div>

          <div style={{ cursor: "pointer", width: "50%", borderRadius: "5px", flexDirection: "column", display: "flex" }}>
            <FaSquarePlus onClick={() => { AddConsole() }} className={'hoverbutton'} style={{ color: "#555", fontSize: "30px" }} />
          </div>
        </div>

        <div>
          {Shells.length > 0 ? Shells.map((item: JSX.Element) => (item)) : <></>}
        </div>


        <div

          style={{
            visibility: infovisible ? "visible" : "hidden",
            top: "auto", left: "auto",
            fontFamily: "Hack, monospace", flexDirection: "column", display: "flex", width: "100%"
          }}>
          <div style={{ border: "1px solid #999", borderRadius: "15px", backgroundColor: "#555", width: "50%", padding: "15px", display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "25px", margin: "0", wordWrap: "break-word" }}>{snippets[pairIndex].description}</p>
            <div style={{ border: "1px solid #666", cursor: "pointer", backgroundColor: "#222", width: "70%", height: "20%", padding: "20px", borderRadius: "5px", flexDirection: "column", display: "flex" }}>
              <FaCopy onClick={() => copyToClipboard()} style={{ fontSize: "30px", marginLeft: "auto", color: "#fff", top: "0" }}></FaCopy>
              <p style={{ fontSize: "15px", wordWrap: "break-word", color: "#fff" }}>{snippets[pairIndex].code}</p>
            </div>
            <p style={{
              scrollbarWidth: "none", // Hide the scrollbar in Firefox

              width: "60%", fontSize: "15px", wordWrap: "break-word"
            }}>instead of <strong>console.log()</strong> use <strong>dump()</strong> to output the result to the
              console </p>
            <strong>Faux pas:</strong>
            <ul>
              <li>
                <p style={{
                  scrollbarWidth: "none", // Hide the scrollbar in Firefox

                  width: "60%", fontSize: "15px", wordWrap: "break-word"
                }}>use <strong>while or for loops</strong> will result in browser collapse </p>
              </li>
              <li>
                <p style={{
                  scrollbarWidth: "none", // Hide the scrollbar in Firefox

                  width: "60%", fontSize: "15px", wordWrap: "break-word"
                }}><strong>variables</strong> terminals dont have memory <strong>(yet) </strong> so issuing lets say; var x = "u lazy devs"; <strong>(ENTER)</strong>  and then issue dump(x)<strong>(ENTER)</strong>, nothing come out :( you must write it in one script: var x = "u lay devs" ;dump(x); <strong>(ENTER)</strong>  </p>
              </li>


            </ul>

            <div style={{ marginBottom: "auto", gap: "5px", justifyContent: "center", width: "100%", height: "1%", display: "flex", flexDirection: "row", padding: "10px" }}>
              <FaGithub style={{ cursor: "pointer", color: "#fff" }} />
              <a style={{ color: "#fff" }} target='_blank' href='https://github.com/NovaDesignedIt/ReactConsole'>github.com/NovaDesignedIt/ReactConsole</a>
            </div>
          </div>
        </div>


      </div>

    </>
  );
}

export default App;