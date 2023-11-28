import React, { useState , useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import FormBlocsA from "../../components/FormBlocsA";
import Preview from "../../components/Preview";
import ImageUploading from 'react-images-uploading';

const formSchemaLeftBloc = [
  {
   key : 'education' ,
   collectionName :'education',
   title : 'Educational degree',
   InputName : ''
  },
  {
    key : 'skills' ,
    collectionName :'',
    title : 'Skills',
    InputName : 'skills'

   },
   {
     key : 'certif' ,
     collectionName :'',
     title : 'CERTIFICATIONS',
     InputName : 'certif'

    },
    {
      key : 'language' ,
      collectionName :'',
      title : 'Language',
      InputName :'language',

     }]
     const formSchemaRightBloc = [
      {
       key : 'experience' ,
       collectionName :'experience',
       title : 'PROFESSIONAL EXPERIENCE',
       InputName : '',
      },
      {
        key : 'projects' ,
        collectionName :'projects',
        title : 'PROFESSIONAL  PROJECTS',
        InputName : '',
       },
       {
        key : 'educationProjects' ,
        collectionName :'educationProjects',
        title : 'Educational PROJECTS',
        InputName : '',
       },
     ]

export default function Editor(parmas) {
  const [allValues, setAllValues] = useState({});
  const [EducDeg, setEducDeg] = useState([1]);
  const [images, setImages] = useState();

  const [scals , setScals] = useState(1)
  const [priview, setPriview] = useState(false);
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
  
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const changeHandler = (e) => {
   
      const { name, value } = e.target ? e.target : e.originalEvent.target;

    
        const [nestedKey, index ,nestedField] = name.split('-');
        const newData = { ...allValues };
    if (nestedField) {

     

      // Update the nested key inside the object at the found index
      newData[nestedKey][index][nestedField] = value;

      setAllValues(
        newData
      );
      return
    }
    if (index) {
      if(newData[nestedKey][index]){
        newData[nestedKey][index] = value
      }else{
        newData[nestedKey].push(value) 
      }
      setAllValues(newData);

    }else {
          setAllValues({...allValues , [name] : value});

    }

    
  };
  const AddValues  = (obj) => {
   
    setAllValues({...allValues,...obj});
  }

  const scale = (x) =>{
      setScals(old => old + x)
  }

  const handleDelete = (value, index) => {

    setEducDeg(old => old.filter((_, i) => i !== (index)));

  };
  useEffect(() => {
    let obj = {}
    let array = [...formSchemaLeftBloc , ...formSchemaRightBloc]
    array.map(item =>
      {
        if (item.collectionName) {
          obj = {...obj,...{
            [item.collectionName]: [{
              name: "ddddd",
              date: '20000',
              discription : 'ddddd'
            }],
          }}
        } else if (item.InputName) {
           obj = {
            ...obj , ...{[item.InputName]: [] }
           }
        }
      })
      console.log(obj)
      setAllValues(obj)

  }, []);


  return (
    <div className="container    p-0 " >
        <div className="scale-btn-grp d-flex flex-column" >
          <p className="text-white"> {scals.toFixed(1) == 1 ? Math.round(scals) : scals.toFixed(1) }:1 </p>
        <Button  icon="pi pi-plus" onClick={()=> {scale(0.1)}} />
        <Button  onClick={()=> {scale(-0.1)}} icon="pi pi-minus" />
        <Button icon="pi pi-th-large" onClick={() => setPriview(true)} />

      </div>
      <div className="cv-template box-shadow rounded-1  overflow-hidden bg-white d-flex" style={{transform : `scale(${scals})`}} >

        <div className="d-flex flex-grow-1 m-0">
          <div className="col-5 d-flex flex-column ">
          <div className=" cv-header gap-2 p-3 d-flex flex-column justify-content-end">
           <div>
           <input type="hidden" value={images} name="img"
                onChange={changeHandler} />
           <ImageUploading
        value={images}
        onChange={onChange}
      
        dataURLKey="data_url"
        
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
          {imageList.length === 0 && (
            <div className="dashed"  style={isDragging ? { color: ' #0d6efd' } : undefined}
              onClick={onImageUpload}
              {...dragProps}>
            <div
            className="pi pi-image "
             
            >

            </div>
            <span>
              drag and drop or click to upload an image
            </span>
            </div>


          )}

            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                  <i className="pi pi-trash remove-btn text-danger" onClick={() => onImageRemove(index)}></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
           </div>


              <InputTextarea
              className="flex-grow-1"
                value={allValues.name}
                placeholder="Your full name"
                name="name"
                onChange={changeHandler}
              />

          </div>
          <div className="d-flex flex-column flex-grow-1 justify-content-between gap-4 bg-gray-100 py-5 px-4 position-relative" >

            <div className="d-flex align-items-center flex-grow-1 gap-2">
            <i className="pi pi-map-marker"></i>
              
                <InputTextarea
                className="flex-grow-1"
                  value={allValues.addresse}
                placeholder="Ex: Tunisia, Sfax, Sakkit Ezzit"
                name="addresse"
                onChange={changeHandler}
                />
            </div>
            <div className="d-flex align-items-center flex-grow-1 gap-2">
            <i className="pi pi-mobile"></i>
              
                <InputNumber
                   className="flex-grow-1"
                  value={allValues.tel}
                  placeholder="Ex: +216 99 999 99"
                  name="tel"
                  onChange={changeHandler}
                />
            </div>

            <div className="d-flex align-items-center flex-grow-1 gap-2">
            <i className="pi pi-google"></i>
              
                <InputTextarea
                   className="flex-grow-1"
                  value={allValues.email}
                  placeholder="Ex: exemple@gmail.com"
                  name="email"
                  onChange={changeHandler}
                />
            </div>
            {
              formSchemaLeftBloc.map(item =>(
                <div className="mb-3">
                <FormBlocsA key={item.key} InputName={item.InputName} collectionName={item.collectionName} title={item.title} changeHandler={changeHandler} AddValues={AddValues} allValues={allValues} />
            </div>
              ))
            }
           
           
          </div>
          </div>

          <div className="col-7 d-flex flex-column ">
          <div  className="cv-header  bg-gray-100">
            <div className="p-3 h-100 gap-3  d-flex flex-column justify-content-between">


                <InputTextarea
                className="flex-grow-1"
                  value={allValues.title}
                  placeholder="Ex: Full-Stack web developer"
                  name="title"
                  onChange={changeHandler}
                />


                <InputTextarea
                                className="flex-grow-1"

                  value={allValues.bio}
                  name="bio"
                  placeholder="Your bigraphy"
                  onChange={changeHandler}
                  rows={2}
                  cols={50}
                />
            </div>
          </div>
          <div className="d-flex main-bloc flex-column flex-grow-1 gap-4 justify-content-between py-5 px-4">
       
                 {
              formSchemaRightBloc.map(item =>(
                
                <FormBlocsA key={item.key} hasDiscription={true} InputName={item.InputName} collectionName={item.collectionName} title={item.title} changeHandler={changeHandler} AddValues={AddValues} allValues={allValues} />
          
              ))
            }
          </div>

          </div>
        </div>
      </div>

      <Dialog header="Header" visible={priview} style={{ width: '25cm' }} 
      pt={{
        content: { className: 'bg-gray-500' }
    }}
     onHide={() => setPriview(false)} >
                <Preview images={images} allValues={allValues} ></Preview>
            </Dialog>
    </div>
  );
}
