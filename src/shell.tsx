
import * as React from 'react';
import { IoCloseCircle } from "react-icons/io5";

  
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
    } catch (error:any) {
      throw new Error(error);
    }
  }

  
    interface tsconsole {
        id: number;
        callback: (state: number) => void;
        consoleObj: any;
        callbackFocus:(state: number) => void;
        FocusIndex: number;
    }




    const Shell: React.FC<tsconsole> = ({ id, callback, consoleObj,callbackFocus,FocusIndex }) => {
    const [pairIndex, setPairIndex] = React.useState(0);
    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const [coordinates,setcoordinates] = React.useState<coordinates>({x:0,y:0});  
    const [MouseDown,setMouseDown] = React.useState(false); 
    const [inputValue, setInputValue] = React.useState<string | any[] | React.ReactElement>();
    const [val, setVal] = React.useState('');
    const [commands, setCommands] = React.useState<commands[]>([{ input: '', output: '' }]);
    const [CmdIndex, setIndex] = React.useState(0);
  
    const closeShell= (index:number) => {
        callback(index);
    }  
    const SetShellFocus = (index:number) => {
        callbackFocus(index);
    }
    
    const [isDragging, setIsDragging]= React.useState
  (false);
    const [dragStart, setDragStart]= React.useState
  ({ x: 0, y: 0 });
    const [modalPosition, setModalPosition]= React.useState
  ({ x: 0, y: 0 });
  
  const handleMouseDown = (e:any) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e:any) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setModalPosition((prevPosition) => ({
      x: prevPosition.x + dx,
      y: prevPosition.y + dy,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  
    const addCommand = (newCommand: commands) => {
      setCommands(prevCommands => [...prevCommands, newCommand]);
    };
  
    const handleChange = (e: any) => {
      const inputValue = e.target.value;
      setVal(inputValue);
    };
  
  
    const handleKeyDown = async (e: any) => {
  
      if (e.key === 'Enter') {
        e.preventDefault();
        if (val === 'clear' || val === 'cls') {
          setInputValue("");
          setVal('');
        } else {
          try {
            const result = Evaluate(val);
            const output: string | any[] | undefined | any = await result
            const out = typeof output === 'string' ? output.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\r/g, '')
              : JSON.stringify(output, null, 2);
            addCommand({ input: val, output: out });
            //out);
            setInputValue(out);
            setVal('');
  
          } catch (error) {
            setInputValue(`${error}`);
            setVal('');
          }
        }
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault(); // Prevent the default behavior (e.g., moving the cursor in a text input)
        // alert('up');
        const id = CmdIndex < commands.length ? CmdIndex : 0
        const t: commands = commands[id];
        setVal(t.input);
        setInputValue(t.output);
        setIndex(id + 1);
      }
    }
    const dump = (dumpstr: any) => {
      return dumpstr
      //addCommand({ input: val, output: dumpstr });
    }

    React.useEffect(() => {
      const HandleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };
      (window as any).dump = dump;
      document.getElementById('console')?.addEventListener('resize', HandleResize);
      document.getElementById('console')?.addEventListener('fullscreenchange', HandleResize);
 
      return () => {
       
        delete (window as any).dump;
  
        document.getElementById('console')?.removeEventListener('fullscreenchange', HandleResize);
        document.getElementById('console')?.removeEventListener('resize', HandleResize);
  
  
      };
  
    }, [
      dump, inputValue, setInputValue, MouseDown, setMouseDown, setcoordinates, coordinates
    ]);
  
  
    return (
          <div key={id}  onMouseDown={(e)=> {handleMouseDown(e); callbackFocus(id);}}
            onMouseMove={handleMouseMove}  
            onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}  style={{ left:modalPosition.x,top:modalPosition.y, zIndex:FocusIndex,position:"fixed",backgroundColor: "#000", boxShadow: "20px 20px 10px rgba(0, 0, 0, 0.5)", borderRadius: "10px", border: "2px solid #333", fontFamily: "Hack, monospace", width: "800px", height: "400px", flexDirection: "column", display: "flex" }}>
            {/* INPUT -> FIRST ROW  FIRST COLUMN*/}
            <div style={{flexDirection:"row",display:"flex"}}>
            <textarea
              value={val}
              style={{
                overflow: "hidden", marginRight: "0", resize: "none", outline: "none", border: "none", color: "#ddd", fontSize: "20px", backgroundColor: "#000", width: "100%", padding: "20px", borderRadius: "10px", overflowY: "auto", // Enable vertical scrolling
                scrollbarWidth: "none", // Hide the scrollbar in Firefox
                "&. WebkitScrollbar": {
                  display: "none" // Hide the scrollbar in WebKit browsers
                }
              }}
              placeholder="$_ "
              onChange={(e) => { handleChange(e) }}
              onKeyDown={(e) => { handleKeyDown(e) }}
              spellCheck={false}  // Disable spell checking
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
              autoFocus={true}>
            </textarea>
            <IoCloseCircle onClick={()=>closeShell(parseInt(`${id}`))} style={{fontSize:"20px",marginLeft:"auto",padding:"10px",color:"#fc2e32"}}/>
            </div>
            {/* OUT -> SECOND ROW FIRST COLUMN */}
            <div style={{ overflow:"auto",borderRadius: "10px", padding: "15px", color: "#ddd", backgroundColor: "#000", width: "auto", height: "100%" }}>
              <p style={{ width: "100%", wordWrap: "break-word" }}>
                {inputValue}
              </p>
            </div>
          </div>
  
    );
  }
  
  export default Shell;