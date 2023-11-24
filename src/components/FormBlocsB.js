import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";

export default function FormBlocsB(params) {
  const [EducDeg, setEducDeg] = useState([1]);

  const AddInput = () => {
    setEducDeg((prevNumbers) => [...prevNumbers, prevNumbers.at(-1) + 1]);
    if (params.collectionName) {
      params.AddValues({
        ...params.allValues,
        [`${params.collectionName}${EducDeg.at(-1) + 1}`]: {
          name: "",
          date: null,
        },
      });
    } else if (params.InputName) {
      params.AddValues({ ...params.allValues, [params.InputName]: "" });
    }
  };
  const handleDelete = (index) => {
    setEducDeg((old) => old.filter((_, i) => i !== index));
  };

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
      <ul>
        {EducDeg.map((value, index) => (
            <li>
            <div key={params.InputName? `${params.InputName}${value}`  :  `${params.collectionName}${value}`} className="mb-2">
              <InputText
                className="p-inputtext-sm"
                id={params.InputName? `${params.InputName}${value}`  :  `${params.collectionName}${value}`}
                name={params.InputName? `${params.InputName}${value}`  :  `${params.collectionName}${value}-name`}
                placeholder="Ex: Universty Oxford"
                value={ params.InputName? params.allValues[`${params.InputName}${value}`] :  params.allValues[`${params.collectionName}${value}`]["name"]}
                onChange={params.changeHandler}
              />
              {(params.collectionName && params.allValues[`${params.collectionName}${value}`]["name"] ) && (
                <Calendar
                  name={`education${value}-date`}
                  value={params.allValues[`${params.collectionName}${value}`]["date"]}
                  onChange={params.changeHandler}
                  selectionMode="range"
                  view="year"
                  dateFormat="yy"
                />
              )}
              {EducDeg.length > 1 && (
                <Button
                  key={params.InputName? `${params.InputName}${value}`  :  `${params.collectionName}${value}`}
                  icon="pi pi-times"
                  onClick={() => handleDelete(index)}
                  rounded
                  text
                  severity="danger"
                  aria-label="Search"
                />
              )}
            </div>
          </li>

        ))}
      </ul>
    </div>
  );
}
