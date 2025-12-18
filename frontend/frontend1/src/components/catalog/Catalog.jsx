import React from 'react';
import "./catalog.scss";

const API_URL = 'http://127.0.0.1:8000/api/'

export default function Catalog() {

    const [Data, setData] = useState([]);
        const getData = () => {
            //const dataResponce = await
            axios.get(API_URL + 'drinks')
                // console.log(dataResponce)
                .then(response => {
                    setData(response.data) 
                });
        }
    
        useEffect(() => {
            getData();
        }, []);

    return (
        <div>
            {Data.map(element => (
                <div key={element.id}>
                    <p > {element.image} </p>
                    <img src={ element.image }></img>
                </div>
                
            ))}
        </div>
    )
}

