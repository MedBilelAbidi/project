import React, { useState, useEffect, useRef  } from "react";
import axios from 'axios';
import { DataView } from 'primereact/dataview';
import { Link } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
const headers = {
  'ngrok-skip-browser-warning': 'true',
  // Other headers as needed
};

export default function Home(params) {
    const [data, setData] = useState([{title: 'Create New Cv', name: 'Create New Cv' , id: 0 , thumbnail:{fileName : 'http://localhost:80/nestjs/pictures/thumbnail.png'}}])
    const toast = useRef(null);

    useEffect(() => {
        
          const fetchDataById = async () => {
            try {
             
              const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/cvs`, {headers}
              )
              setData(old => [...response.data,...old])
            } catch (error) {
              console.error("Error fetching data:", error);
              toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});

            }
          };
          fetchDataById();
          

      }, []);
      const acceptFunc = async (id) => {
        try {
           await axios.delete(
            `${process.env.REACT_APP_API_URL}/cvs/${id}`, headers
          )
          toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
          const updatedData = data.filter(item => item.id !== id);

          setData(updatedData);

       
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
        }
    }
      const confirm = (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => acceptFunc(id),
        });
    };
  const gridItem = (data) => {
    return (
        <div className="col-3 p-2  ">

            <div className="p-3 cv-card border-1 surface-border surface-card border-round">
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-bookmark-fill"></i>
                        <span className="font-semibold">{data.title}</span>
                    </div>
                </div>
                <div className="flex flex-column align-items-center gap-3 py-2">
                    {data.id !== 0  ? <img className="w-6rem h-10rem shadow-2 border-round" src={`${data.thumbnail.fileName}`} alt="" /> 
                    : <Link to='/builder' className="add-new"><img className="w-6rem h-10rem shadow-2 border-round" src={`${data.thumbnail.fileName}`} alt="" /> 
                    <i className="pi pi-plus fsz-5"></i> </Link> }
                    <div className="text-2lg font-bold">{data.name}</div>
                </div>
                {data.id !== 0 && (
                  <div className="flex align-items-center justify-content-between">
                    <button  onClick={()=> confirm(data.id)} className="p-button-rounded p-button-rounded p-button p-component p-button-icon-only p-button-danger text-white">
                      <i className="pi pi-trash"></i>
                    </button>
                    <Link  to={`builder/edit/${data.id}`} className="p-button-rounded p-button p-component p-button-icon-only p-button-success text-white">
                      <i className="pi pi-pencil"></i>
                    </Link>
                </div>
                )}
            </div>
        </div>
    );
};


    return(
        <div className="bg-gray-500"  >
                    <div className=" container minH-100vh  p-5" >
                <div className="bg-white rounded-3">
                   <div className="p-3">
                    <h4>
                        Your projects
                    </h4>
                    <ConfirmDialog />
                    <Toast ref={toast} />
                    <DataView value={data} itemTemplate={gridItem}  />

                 
                   </div>
                </div>
        </div>
        </div>
    )
}