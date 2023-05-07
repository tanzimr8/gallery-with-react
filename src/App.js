import {useState,useEffect,useReducer} from 'react'
import Navbar from './Components/Navbar'
import './App.css';
import Card from './Components/Card';
import UploadForm from './Components/Uploadform'

const photos = [
  'https://picsum.photos/id/1001/2020',
  'https://picsum.photos/id/1002/2020',
  'https://picsum.photos/id/1003/2020',
  'https://picsum.photos/id/1004/2020',
  'https://picsum.photos/id/1005/2020',
  'https://picsum.photos/id/1006/2020',
  'https://picsum.photos/id/1012/2020',
  'https://picsum.photos/id/1008/2020',
  'https://picsum.photos/id/1009/2020',
  'https://picsum.photos/id/1010/2020',
  'https://picsum.photos/id/1019/2020',
  'https://picsum.photos/id/1022/2020',
];
const initialState ={
  items: photos,
  count:photos.length,
  inputs: {title:null,file:null,path:null},
  isCollapsed: false,
}

function App() {

  // const [state,dispatch] = useReducer(reducer,initialState);
  const [count,setCount] = useState();
  const [items,setItems] = useState(photos);
  const [inputs,setInputs] = useState({title:null,file:null,path:null});
  const [isCollapsed,setIsCollapsed] = useState(false);
  const toggle = () => setIsCollapsed(!isCollapsed)
  const handleOnChange = (e)=> {
    if(e.target.name==='file'){
      setInputs({...inputs,file:e.target.files[0],path:URL.createObjectURL(e.target.files[0])});
    }
    else{
      setInputs({...inputs, title: e.target.value});
    }
  }
  const handleOnSubmit = (e)=>{
    e.preventDefault();
    setItems([inputs.path,...items]);
    setInputs({title:null,file:null,path:null});
    setIsCollapsed(false); 
  }
  
  useEffect(()=>{
    setCount(`You have ${items.length} ${items.length === 1 ? 'image' : 'images'} `);
  },[items]);
  return (
    <>
    <Navbar/>
    <div class="container text-center">
      <button onClick={toggle} className='btn btn-success m-3 float-end'>{isCollapsed ? 'Hide' : 'Add'}</button>
      <UploadForm 
      inputs={inputs}
      isVisible = {isCollapsed}
      onChange={handleOnChange} 
      onSubmit={handleOnSubmit}
      />
      <p className='text-info my-3'>{count}</p>
      <h1>Galley</h1>
      <div className="row">
        {items.map((item,index)=>{
          return <Card src={item} key={index}/>
        })}
      </div>
    </div>
    </>
  );
}

export default App;
