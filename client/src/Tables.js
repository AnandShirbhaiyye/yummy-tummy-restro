// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import swal from "sweetalert";
// import "./Tables.css"
// import Navbar from "../../components/Navbar/Navbar";

// import { loginRequired } from "../../util/loginRequired";
// import { currentUser } from "../../util/CurrentUser";

// function Tables() {

//     const [availableTables, setAvailableTables] = useState([])

//     useEffect(() => {
//         async function fetchTables() {
//             const response = await axios.get("/availableTables")
//             console.log(response.data.data);
//             setAvailableTables(response.data.data)
//         }
//         fetchTables()
//     })

//     useEffect(() => {
//         loginRequired()
//     }, [])

//     async function bookTable(tableNumber) {
//         console.log('Table Booked');

//         const response = await axios.post('/bookTable', {
//             tableNumber: tableNumber,
//             userId: currentUser._id
//         })

//         console.log(response.data.data);

//         if (response.data.data.booked) {
//             await swal("Table Booked Successfully", response.data.message, "success")
//             localStorage.setItem("bookTable", JSON.stringify.apply(response.data.data))
//         }
//         else {
//             await swal("Error", response.data.message, "error")
//         }
//     }

//     async function unbookTable(tableNumber) {
//         console.log("Unbooked Table");
//         const response = await axios.post('/unbookTable', { tableNumber: tableNumber })

//         console.log(response.data.data);
//         localStorage.removeItem("bookedTable")

//         await swal({
//             icon: 'success',
//             title: "success",
//             text: response.data.message,
//         })
//     }


//     return (
//         <div className='tables row'>

//             <Navbar />

//             <p className='avl-table'>Available Tables</p>
//             {
//                availableTables &&
//                availableTables ? Map((availableTables) => {
//                    return (
//                        <div className='col-md-3'>
//                            <p className='table-name'> Table No : {availableTables.tableNumber}

//                                <img className='table-img' alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD9UkOc07NjjLhJb_bQJyw9XSn9TmprX27qQ&usqp=CAU' />
//                                <button type='button' className='book-btn' onClick={()=>{bookTable(availableTables.tableNumber)}}>BOOK TABLE</button>
//                                <button type='button' className='book-btn' onClick={()=>{unbookTable(availableTables.tableNumber)}}>UNBOOK TABLE</button>

//                            </p>
//                            <br />
//                        </div>
//                    )
//                    })
//             }                       
//         </div>   
//     )
// }

// export default Tables