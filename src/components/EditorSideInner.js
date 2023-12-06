import React, { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { useSelector, useDispatch } from 'react-redux'
import { switchState } from "../store/enable-slice/enableStore";
import {selectorEnableSlice} from "../store/enable-slice/enableStore"


const innerSchema = [
    {
        label : 'Enable Photo',
        name : 'enablePhoto',
        inputId : 'enablePhoto',
        childs : undefined
    },
    {
        label : 'Enable Bio',
        name : 'enableBio',
        inputId : 'enableBio',
        childs : undefined

    },
    {
        label : 'Enable Infos',
        name : 'enableInfos',
        inputId : 'enableInfos',
        childs : [
            {
                label : 'Enable Addresse',
                name : 'enableAddresse',
                inputId : 'enableAddresse',
                childs : undefined
        
            },
            {
                label : 'Enable Phone',
                name : 'enablePhone',
                inputId : 'enablePhone',
                childs : undefined
        
            },
            {
                label : 'Enable Mail',
                name : 'enableEmail',
                inputId : 'enableEmail',
                childs : undefined
        
            },
        ]

    },
]

export default function EditorSideInner(params) {
    // {enablePhoto, enableBio ,enableInfos, enableAddresse, enablePhone, enableEmail }
    const dispatch = useDispatch()
    const enableStoreState = useSelector(selectorEnableSlice)
    const [allValues, setAllValues] = useState({});
    const changeHandler = e => {
        dispatch(switchState(e.target.name))
        setAllValues({...allValues, [e.target.name]: e.target.value})
     }
    return(

        <div className="d-flex  flex-column gap-2">
        {innerSchema.map((outerItem, outerIndex) => (
          <div key={outerIndex}>
          <div className="d-flex justify-content-between align-items-center">
                 <label className="form-label" htmlFor={outerItem.name}>{outerItem.label}</label>
            
                <InputSwitch checked={enableStoreState[outerItem.name]} inputId={outerItem.inputId} name={outerItem.name} onChange={changeHandler} />
        
            </div>
            {Array.isArray(outerItem.childs) && (
              <ul className={`d-flex mt-2 flex-column gap-2 ${!enableStoreState.enableInfos && 'disabled'}`} >
                {outerItem.childs.map((innerItem, innerIndex) => (
                <li className=" d-flex justify-content-between align-items-center">
                 <label className="form-label" htmlFor={innerItem.name}>{innerItem.label}</label>
            
                <InputSwitch checked={enableStoreState[innerItem.name]} inputId={innerItem.inputId} name={innerItem.name} onChange={changeHandler} />
        
            </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
        
    )
}