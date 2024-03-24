import * as React from 'react';
import { FaCopy, FaGithub } from "react-icons/fa";
import Shell from './shell'
import { FaSquarePlus } from "react-icons/fa6";
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

interface commands {
  input: string;
  output: string;
}

async function Evaluate(inputValue: string) {
  try {
    const result = await eval(`${inputValue}`);
    return result; // This will log the result of getallrecords
  } catch (error: any) {
    throw new Error(error);
  }
}




const App = () => {
  const [pairIndex, setPairIndex] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [coordinates, setcoordinates] = React.useState<coordinates>({ x: 0, y: 0 });
  const [MouseDown, setMouseDown] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string | any[] | React.ReactElement>();
  const [val, setVal] = React.useState('');
  const [commands, setCommands] = React.useState<commands[]>([{ input: '', output: '' }]);
  const [CmdIndex, setIndex] = React.useState(0);
  const [Shells, setShells] = React.useState<JSX.Element[]>([])




  const addCommand = (newCommand: commands) => {
    setCommands(prevCommands => [...prevCommands, newCommand]);
  };
 
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

  const setFocusedShell = (index: number) => {
  
    setShells((self: JSX.Element[]) => self.filter((shell: JSX.Element) =>  shell.key !== String(index)));

};

  const AddConsole = () => {
    setShells(self => [...self,
    <Shell key={self.length + 1} id={self.length + 1} callback={setFocusedShell} consoleObj={{}}/>
    ])
  }

  React.useEffect(() => {
    const HandleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
 
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



    };

  }, [
    dump, inputValue, setInputValue, MouseDown, setMouseDown, setcoordinates, coordinates
  ]);




  return (
    <div style={{ flexDirection: "row", gap: "0px", display: "flex", overflow: "hidden", backgroundColor: '#999999', padding: "1%", height: windowHeight, width: windowWidth }}>


      <div>
        {Shells.length > 0 ? Shells.map((item: JSX.Element) => (item)) : <></> }
      </div>


      <div
        style={{

          top: "auto", left: "auto",
          fontFamily: "Hack, monospace", flexDirection: "column", display: "flex", width: "100%"
        }}>
          <div style={{border:"1px solid #fff",borderRadius:"15px",backgroundColor:"#555",width:"50%",padding:"15px",display:"flex",flexDirection:"column"}}>
        <p style={{ fontSize: "35px", margin: "0", wordWrap: "break-word" }}>{snippets[pairIndex].description}</p>
        <div style={{ border:"1px solid #666",cursor: "pointer", backgroundColor: "#222", width: "70%", height: "20%", padding: "20px", borderRadius: "5px", flexDirection: "column", display: "flex" }}>
          <FaCopy onClick={() => copyToClipboard()} style={{ fontSize: "30px", marginLeft: "auto", color: "#fff", top: "0" }}></FaCopy>
          <p style={{ fontSize: "15px", wordWrap: "break-word", color: "#fff" }}>{snippets[pairIndex].code}</p>
        </div>
        <p style={{
          scrollbarWidth: "none", // Hide the scrollbar in Firefox
          
          width: "60%", fontSize: "15px", wordWrap: "break-word"
        }}>instead of <strong>console.log()</strong> use <strong>dump()</strong> to output the result to the
          console </p>
        <div  style={{ cursor: "pointer", width: "50%", height: "20%", padding: "20px", borderRadius: "5px", flexDirection: "column", display: "flex" }}>
          <FaSquarePlus onClick={()=>{AddConsole()}} className={'hoverbutton'} style={{fontSize:"30px"}} />
          <p style={{ margin:"0",fontSize: "10px", wordWrap: "break-word", color: "#fff" }}>new console</p>
        </div>
        <div style={{ gap:"5px",justifyContent:"center", width: "100%", height: "100%",display:"flex",flexDirection:"row" }}>
          <FaGithub style={{cursor:"pointer" }}/>
          <a style={{color:"#fff"}} target='_blank' href='https://github.com/NovaDesignedIt/ReactConsole'>github.com/NovaDesignedIt/ReactConsole</a>
        </div>
      </div>
      </div>
     
     
    </div>
  );
}

export default App;