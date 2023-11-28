import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";

export default function FormBlocsA(params) {

  
  const [collection, setCollection] = useState([1]);
  const [loading, setLoading] = useState(true);

  const AddInput = () => {
    setCollection((prevNumbers) => [...prevNumbers, prevNumbers.at(-1) + 1]);
    const newData = {...params.allValues}
    if (params.collectionName || params.hasDiscription) {
      newData[params.collectionName].push({
        name: "",
        date: null,
        discription : ''
      })
      params.AddValues(newData);
    } 
  };
  const handleDelete = (index) => {
    setCollection((old) => old.filter((_, i) => i !== index));
  };
  useEffect(() => {
    console.log('allValues before component mount:', params.allValues);
    if (params.allValues) {
      setLoading(false)
    }
  }, [params.allValues]);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>{params.title}</h4>
        <Button
          icon="pi pi-plus"
          onClick={() => AddInput()}
          rounded
          text
          severity="success"
          aria-label="Search"
        />
      </div>
      <ul className="list-unstyled">
        {loading? 'wait a sec' : (
            collection.map((value, index) => (
            <li key={params.InputName? `${params.InputName}${index}`  :  `${params.collectionName}${index}`}>
            <div>
            <div  className="mb-2 d-flex ">
            <div  className="mb-2 d-flex flex-column flex-grow-1">
            <InputTextarea
                className="p-inputtext-sm "
                id={params.InputName? `${params.InputName}-${index}`  :  `${params.collectionName}-${index}`}
                name={params.InputName? `${params.InputName}-${index}`  :  `${params.collectionName}-${index}-name`}
                placeholder="Ex: Universty Oxford"
                value={ params.InputName? params.allValues[`${params.InputName}-${index}`] :  params.allValues[params.collectionName][index]["name"]}
                onChange={params.changeHandler}
              /> 
              {params.collectionName && (
                ( <Calendar
                  name={`${params.collectionName}-${index}-date`}
                  value={params.allValues[params.collectionName][index]["date"]}
                  onChange={params.changeHandler}
                  selectionMode="range"
                  view="year"
                  dateFormat="yy"
                  placeholder="2023"
                />)
              )}
            </div>

              {collection.length > 1 && (
                <Button
                  key={params.InputName? `${params.InputName}-${index}`  :  `${params.collectionName}-${index}`}
                  icon="pi pi-times"
                  onClick={() => handleDelete(index)}
                  rounded
                  text
                  severity="danger"
                  aria-label="Search"
                />
              )}
            </div>
            <div>
            {
              (params.hasDiscription && (
                <InputTextarea
                className="discription"
                  value={params.allValues[params.collectionName][index]['discription']}
                  name={params.InputName? `${params.InputName}-${index}`  :  `${params.collectionName}-${index}-discription`}
                  placeholder="Your bigraphy"
                  onChange={params.changeHandler}
                  rows={2}
                  cols={40}
                />  
              ))
            }
          
              </div>
            </div>
           
          </li>

        ))
          )
        }
      </ul>
    </div>
  );
}
