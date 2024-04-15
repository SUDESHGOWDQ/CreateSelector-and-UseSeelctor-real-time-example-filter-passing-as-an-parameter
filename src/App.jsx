import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchData, selectFilteredEvents, deleteTask } from './features/events/eventsSlice';



const App = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const filteredEvents = useSelector((state) => selectFilteredEvents(state, filter));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(()=>{
    if(search==="") return;
    let timer  = setTimeout(()=>{
      console.log(search);
    },500);
    return ()=>{
      clearTimeout(timer)
    }
  },[search])

  

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleDeleteTask = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the task "${name}"?`)) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <div className='App'>
      <div className='nav'>
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('upcoming')}>Upcoming</button>
        <button onClick={() => handleFilterChange('completed')}>Completed</button>
        <div className='form'>
          <input type='text' placeholder='Search Here' value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>
      <center>
        <table border={1} cellPadding={10} cellSpacing={20} width={'80%'}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredEvents.length > 0)?( filteredEvents.filter((item) => item.name.toLowerCase().includes(search)).map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className={item.status}>{item.status}</td>
                  <td>
                    <button onClick={() => handleDeleteTask(item.id, item.name)}>Delete</button>
                    <button>Edit</button>
                  </td>
                </tr>
              ))):("Not Found")}
          </tbody>
        </table>
      </center>
    </div>
  );
};

export default App;
