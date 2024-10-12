import { useEffect, useState } from "react";

const { default: Header } = require("./Header")

const Body = () => {
    const [todoList, setTodoList] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [pagination, setPagination] = useState();
    const [paginationLength, setPaginationLength] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState(""); 


    const indexOfLastTodo =  currentPage * pageSize;
    const indexOfFirstTodo = indexOfLastTodo - pageSize;
    
    const filteredTodoList = todoList.filter(todo => 
        todo.title.toLowerCase().includes(filterText.toLowerCase()) // Filter by title
    );
    const visibleTodo = filteredTodoList.slice(indexOfFirstTodo, indexOfLastTodo);

    const handleFilterChange = (e) => {
        setFilterText(e.target.value); // Update the filterText state
        setCurrentPage(1); // Reset to first page when filtering
    };

    // const visibleTodo = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

    useEffect(() => {
        if( todoList.length > 0 && pageSize > 0 ) {
            setPaginationLength(Math.ceil(todoList.length/pageSize));
            const pageArray = paginationLength &&  [...Array(paginationLength + 1).keys()].slice(1);
            console.log('todoList length', pageArray);
            setPagination(pageArray);
        }

    }, [pageSize, todoList, paginationLength]);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const data = await fetch("https://jsonplaceholder.typicode.com/todos");
        const parsedData = await data.json();
        setTodoList(parsedData);
        } 
        catch (error) {
            console.log('Error fetching data', error);
        }
    }

    const gotoPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const selectPageSize = (pageSizeNumber) => {
        setCurrentPage(1);
        setPageSize(pageSizeNumber);
    }

    const gotoPrevPage = () => {
        if(currentPage === 1) return;
        setCurrentPage(currentPage - 1);
        console.log('prev btn', currentPage);

    }

    const gotoNextPage = () => {
        if(currentPage === pagination.length) return;
        setCurrentPage(currentPage + 1);
        console.log('next btn', currentPage);
    }

    return (
        <div>
            <Header />
            <select onChange={(e) => selectPageSize(e.target.value)}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>

            <input type="text" value={filterText} 
                onChange={handleFilterChange} ></input>
            

            {visibleTodo && visibleTodo.map((eachTodo) => {
                    return(
                    <div key={eachTodo.id}>{eachTodo.id} {eachTodo.title}
                    </div>
                    )
            })}

            <div style={{margin: "10px", display: "flex"}} >
                <span onClick={gotoPrevPage}>Prev</span>
                {pagination && pagination.map((pageNumber) => {
                    return(
                        <span style={{margin: "10px", cursor: "pointer"}} key={pageNumber} onClick={() => gotoPage(pageNumber)}>
                            {pageNumber}
                        </span>
                    )
                } )}
                <span onClick={gotoNextPage}>Next</span>

             </div>


        </div>
    )
}
export default Body;