import React, { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";


const innerSchema = [
    {
        label : 'Enable Photo',
        name : 'photo',
        inputId : 'photo',
        childs : undefined
    },
    {
        label : 'Enable Bio',
        name : 'bio',
        inputId : 'bio',
        childs : undefined

    },
    {
        label : 'Enable Infos',
        name : 'info',
        inputId : 'info',
        childs : [
            {
                label : 'Enable Addresse',
                name : 'addres',
                inputId : 'addres',
                childs : undefined
        
            },
            {
                label : 'Enable Phone',
                name : 'tel',
                inputId : 'tel',
                childs : undefined
        
            },
            {
                label : 'Enable Mail',
                name : 'mail',
                inputId : 'mail',
                childs : undefined
        
            },
        ]

    },
]

export default function EditorSideInner(params) {

    const [allValues, setAllValues] = useState({});
    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
     }
    return(

        <div className="d-flex  flex-column gap-2">
        {innerSchema.map((outerItem, outerIndex) => (
          <div key={outerIndex}>
          <div className="d-flex justify-content-between align-items-center">
                 <label className="form-label" htmlFor={outerItem.name}>{outerItem.label}</label>
            
                <InputSwitch checked={allValues[outerItem.name]} inputId={outerItem.inputId} name={outerItem.name} onChange={changeHandler} />
        
            </div>
            {Array.isArray(outerItem.childs) && (
              <ul className="d-flex  flex-column gap-2">
                {outerItem.childs.map((innerItem, innerIndex) => (
                <li className=" d-flex justify-content-between align-items-center">
                 <label className="form-label" htmlFor={innerItem.name}>{innerItem.label}</label>
            
                <InputSwitch checked={allValues[innerItem.name]} inputId={innerItem.inputId} name={innerItem.name} onChange={changeHandler} />
        
            </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
        
    )
}