import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Link } from "react-router-dom";


export default function Home(params) {
    const [data, setData] = useState({})


    useEffect(() => {
        
          const fetchDataById = async () => {
            try {
              const response = await axios.get(
                `http://localhost:3000/cvs`
              );
              setData(response.data)
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          fetchDataById();
          

      }, []);

      const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

  const gridItem = (data) => {
    return (
        <div className="col-4 p-2">
        
            <div className="p-4 border-1 surface-border surface-card border-round">
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag"></i>
                        <span className="font-semibold">{data.title}</span>
                    </div>
                </div>
                <div className="flex flex-column align-items-center gap-3 py-5">
                    {data.thumbnail  &&  <img className="w-10rem shadow-2 border-round" src={`${data.thumbnail.fileName}`} /> }
                    <div className="text-2xl font-bold">{data.name}</div>
                </div>
                <div className="flex align-items-center justify-content-between">
                    <Button icon="pi pi-trash" severity="danger" className="p-button-rounded"></Button>
                    <Link  to={`builder/edit/${data.id}`} className="p-button-rounded p-button p-component p-button-icon-only p-button-success text-white">
                      <i className="pi pi-pencil"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};


    return(
        <div className="bg-gray-500"  >
                    <div className=" container  p-5" >
                <div className="bg-white rounded-3">
                   <div className="p-3">
                    <h4>
                        Your projects
                    </h4>
                 
                    <DataView value={data} itemTemplate={gridItem}  />

                 
                   </div>
                </div>
        </div>
        </div>
    )
}