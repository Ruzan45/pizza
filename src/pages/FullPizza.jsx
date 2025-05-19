import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export default function FullPizza() {

    const [item, setItem] = React.useState();
    const { pizzaId } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchItem() {
            try {
                const { data } = await axios.get('https://662215b527fcd16fa6c8b4f9.mockapi.io/reactpizza/' + pizzaId);
                setItem(data);
            } catch (error) {
                alert('Ошибка' + error)
                navigate('/');
            }
        }
        fetchItem();
    }, []);

    if (!item) {
        return 'Загрузка...';
    }

    return (
        <div className='container'>
            <div><img src={item.imageUrl} alt={item.title} />
                <h2>{item.title}</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis vero non, praesentium quae architecto qui at. Saepe repellat vitae necessitatibus pariatur tempore? Fugit odio ex distinctio provident, quo quos quaerat.</p>

            </div>
        </div>
    )
}
