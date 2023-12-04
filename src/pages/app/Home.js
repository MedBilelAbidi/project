import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import html2canvas from 'html2canvas';

export default function Home(params) {
    const [data, setData] = useState({})


    useEffect(() => {
        
          const fetchDataById = async () => {
            try {
              const response = await axios.get(
                `http://localhost:3000/cvs/1`
              );
              setData(response.data)
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          fetchDataById();
          

      }, []);

    

    return(
        <div className="bg-gray-500"  >
                    <div className=" container h-100vh p-5" >
                <div className="bg-white rounded-3">
                   <div className="p-3">
                    <h4>
                        Your projects
                    </h4>
                    <button >Save as Image</button>

                    <div     style={{ transform: `scale(0.5)` }}>
                   
                    </div>
                   </div>
                </div>
        </div>
        </div>
    )
}