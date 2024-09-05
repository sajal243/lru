import React, { useState } from 'react'
import useLRUcache from './useLRUcache';

const MainComp = () => {

    const [content, setContent] = useState([]);
    const {get, put} = useLRUcache(3);

    const loadedContent = async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 100)); // just for any data through api call

        const loadedContent = {
            id,
            text: `Tab ${id} data`
        }

        put(id, loadedContent);
        setContent((prev) =>[...prev, loadedContent]);

    }

    const handleClick = (id) => {
        const cachedContent = get(id);
        if(cachedContent){
            console.log("loaded from cache.. content id " + id);
            setContent((prev) => [...prev, cachedContent]);
        }
        else{
            console.log(`Content ${id} ...loaded outside cache`)
            loadedContent(id);
        }
        
    }

  return (
    <div className='main_comp'>
        <button onClick={() => handleClick(1)}>Tab 1</button>
        <button onClick={() => handleClick(2)}>Tab 2</button>
        <button onClick={() => handleClick(3)}>Tab 3</button>
        <button onClick={() => handleClick(4)}>Tab 4</button>
        <button onClick={() => handleClick(5)}>Tab 5</button>
        <button onClick={() => handleClick(6)}>Tab 6</button>

        <p>Loaded Content</p>
        <ul>
            {content.map((ele, i) => {
                return <li key={`${ele.id}${i}`}>{ele.text}</li>
            })}
        </ul>
    </div>
  )
}

export default MainComp