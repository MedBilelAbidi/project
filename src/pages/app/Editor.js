import React, { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import FormBlocsA from "../../components/FormBlocsA";
import Preview from "../../components/Preview";
import ImageUploading from "react-images-uploading";
import axios from 'axios';
import { useParams } from "react-router-dom";

const formSchemaLeftBloc = [
  {
    key: "education",
    collectionName: "education",
    title: "Educational degree",
    InputName: "",
  },
  {
    key: "skills",
    collectionName: "",
    title: "Skills",
    InputName: "skills",
  },
  {
    key: "certif",
    collectionName: "",
    title: "CERTIFICATIONS",
    InputName: "certif",
  },
  {
    key: "language",
    collectionName: "",
    title: "Language",
    InputName: "language",
  },
];
const formSchemaRightBloc = [
  {
    key: "experience",
    collectionName: "experience",
    title: "PROFESSIONAL EXPERIENCE",
    InputName: "",
  },
  {
    key: "projects",
    collectionName: "projects",
    title: "PROFESSIONAL  PROJECTS",
    InputName: "",
  },
  {
    key: "educationProjects",
    collectionName: "educationProjects",
    title: "Educational PROJECTS",
    InputName: "",
  },
];

export default function Editor(parmas) {
  const [allValues, setAllValues] = useState({});
  const [EducDeg, setEducDeg] = useState([1]);
  const [images, setImages] = useState();
  const { id } = useParams();
  const [scals, setScals] = useState(1);
  const [priview, setPriview] = useState(false);
  const onChange = (imageList, addUpdateIndex) => {
     setImages(imageList);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target ? e.target : e.originalEvent.target;

    const [nestedKey, index, nestedField] = name.split("-");
    const newData = { ...allValues };
    if (nestedField) {
      // Update the nested key inside the object at the found index
      newData[nestedKey][index][nestedField] = value;

      setAllValues(newData);
      console.log(allValues);

      return;
    }
    if (index) {
      if (newData[nestedKey][index]) {
        newData[nestedKey][index] = value;
      } else {
        newData[nestedKey].push(value);
      }
      setAllValues(newData);
    } else {
      setAllValues({ ...allValues, [name]: value });
    }
    console.log(allValues);
  };
  const AddValues = (obj) => {
    setAllValues({ ...allValues, ...obj });
  };

  const scale = (x) => {
    setScals((old) => old + x);
  };
 const valueGenerator = (array) =>{
  let obj = {};
  array.map((item) => {
    if (item.collectionName) {
      obj = {
        ...obj,
        ...{
          [item.collectionName]: [
            {
              name: "",
              date: "",
              discription: "",
            },
          ],
        },
      };
    } else if (item.InputName) {
      obj = {
        ...obj,
        ...{ [item.InputName]: [] },
      };
    }
  });
  setAllValues(obj);
 }
 const valueInsert = (data) =>{
  const splitStringWithSeparator = (str, separator = '#') => (typeof str === 'string' && str.length) ? str.split(separator) : [];
  const isPossiblySplittedString = (str, separator = '#') => typeof str === 'string' && str.includes(separator);

  let newData = { ...allValues };
  for (const key in data) {
   let value = data[key]
    if (isArrayOfObjects(value)) {
      const val = value.map((element) => ({
        id: element.id,
        name: element.name,
        date: [new Date(splitStringWithSeparator(element.date)[0]), new Date(splitStringWithSeparator(element.date)[1])],
        discription: element.discription
    }));
    // setAllValues({ ...allValues, [key]: val });
    newData = {...newData, [key]: val }
    } 
    else if(isPossiblySplittedString(value)){
      newData = {...newData, [key]:  value.split('#') }
    }else {
      newData = {...newData, [key]: value }
    }
  }
  if (newData.picture) {
    setImages([{data_url: newData.picture.fileName}])
  }
  setAllValues(newData);

 }
  const handleDelete = (value, index) => {
    setEducDeg((old) => old.filter((_, i) => i !== index));
  };
  useEffect(() => {
    if (id) {
      const fetchDataById = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/cvs/${id}`
          );
          valueInsert(response.data)

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataById();
      
    }
    let array = [...formSchemaLeftBloc, ...formSchemaRightBloc];
    valueGenerator(array)
  }, []);

  const   isArrayOnlyStrings = (arr)=> {
    return Array.isArray(arr) && arr.every((item) => typeof item === 'string');
  }
  const   isArrayOfObjects = (obj)=> {
    return Array.isArray(obj) && obj.every(item => typeof item === 'object')
  }
  // Handle form submission
  const handleSubmit = () => {
   
    let formdata = new FormData()
    const joinArrayWithSeparator = (arr, separator = '#') => (Array.isArray(arr) && arr.length) ? arr.join(separator) : '';

    for (const key in allValues) {
        const value = allValues[key];
        if (key === 'id' || key ===  'createdAt' || key === 'updatedAt' || key === 'picture') {
          continue
        }
        if (isArrayOnlyStrings(value)) {
          formdata.append(key, joinArrayWithSeparator(value));
        }
       else if (isArrayOfObjects(value)) {
        // Use map to transform each element in the array
        const val = value.map(element => ({
          id: element.id? element.id : null,
          name: element.name,
          date: joinArrayWithSeparator(element.date),
          discription: element.discription
      }));

      formdata.append(key, JSON.stringify(val));
        }else{
          formdata.append(key, value)
          
        }

    }
    if (images && images[0]?.file) {
      // Check if images[0].file is defined before appending to avoid errors
      formdata.append("file", images[0].file);
  }
  console.log( [...formdata.entries()].reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}));

  if (id) {
    axios.patch(`http://localhost:3000/cvs/${id}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }else {
    axios.post(`http://localhost:3000/cvs/1`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  };
  return (
    <div className="container    p-0 ">
      <div className="scale-btn-grp d-flex flex-column">
        <p className="text-white">
          {" "}
          {scals.toFixed(1) == 1 ? Math.round(scals) : scals.toFixed(1)}:1{" "}
        </p>
        <Button
          icon="pi pi-plus"
          onClick={() => {
            scale(0.1);
          }}
        />
        <Button
          onClick={() => {
            scale(-0.1);
          }}
          icon="pi pi-minus"
        />
        <Button icon="pi pi-th-large" onClick={() => setPriview(true)} />
      </div>
      
        <div
          className="cv-template box-shadow rounded-1  overflow-hidden bg-white d-flex"
          style={{ transform: `scale(${scals})` }}
        >
          <div className="d-flex flex-grow-1 m-0">
            <div className="col-5 d-flex flex-column ">
              <div className=" cv-header gap-2 p-3 d-flex flex-column justify-content-end">
                <div>
                  <input
                    type="hidden"
                    value={images}
                    name="img"
                    onChange={changeHandler}
                  />
                  <ImageUploading
                    multiple={false}
                    value={images}
                    onChange={onChange}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        {imageList.length === 0 && (
                          <div
                            className="dashed"
                            style={
                              isDragging ? { color: " #0d6efd" } : undefined
                            }
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            <div className="pi pi-image "></div>
                            <span>
                              drag and drop or click to upload an image
                            </span>
                          </div>
                        )}
                        &nbsp;
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image["data_url"]} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                              {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                              <i
                                className="pi pi-trash remove-btn text-danger"
                                onClick={() => onImageRemove(index)}
                              ></i>
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
              <div className="d-flex flex-column flex-grow-1  gap-4 bg-gray-100 py-5 px-4 position-relative">
                  <div className="d-flex flex-column   gap-2">
                  <div className="d-flex align-items-center  gap-2">
                  <i className="pi pi-map-marker"></i>

                  <InputTextarea
                    className="flex-grow-1"
                    value={allValues.addresse}
                    placeholder="Ex: Tunisia, Sfax, Sakkit Ezzit"
                    name="addresse"
                    onChange={changeHandler}
                  />
                </div>
                <div className="d-flex align-items-center  gap-2">
                  <i className="pi pi-mobile"></i>

                  <InputNumber
                    className="flex-grow-1"
                    value={allValues.tel}
                    placeholder="Ex: +216 99 999 99"
                    name="tel"
                    onValueChange={changeHandler}
                    useGrouping={false}
                  />
                </div>

                <div className="d-flex align-items-center  gap-2">
                  <i className="pi pi-google"></i>

                  <InputTextarea
                    className="flex-grow-1"
                    value={allValues.email}
                    placeholder="Ex: exemple@gmail.com"
                    name="email"
                    onChange={changeHandler}
                  />
                </div>
                  </div>
                {formSchemaLeftBloc.map((item) => (
                  <div className="mb-2">
                    <FormBlocsA
                      key={item.key}
                      InputName={item.InputName}
                      collectionName={item.collectionName}
                      title={item.title}
                      changeHandler={changeHandler}
                      AddValues={AddValues}
                      allValues={allValues}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-7 d-flex flex-column ">
              <div className="cv-header  bg-gray-100">
                <div className="p-3 h-100 gap-3  d-flex flex-column ">
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
              <div className="d-flex main-bloc flex-column flex-grow-1 gap-4  py-5 px-4">
                {formSchemaRightBloc.map((item) => (
                  <FormBlocsA
                    key={item.key}
                    hasDiscription={true}
                    InputName={item.InputName}
                    collectionName={item.collectionName}
                    title={item.title}
                    changeHandler={changeHandler}
                    AddValues={AddValues}
                    allValues={allValues}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed-bottom border-top bg-white d-flex flex-wrap justify-content-end px-3 py-2 box-shadow">
          <span className="p-buttonset">
            <Button label="Delete" icon="pi pi-trash" />
            <Button label="Cancel" icon="pi pi-times" />
            <Button label="Save" onClick={()=> handleSubmit()} icon="pi pi-check" />
          </span>
        </div>
     

      <Dialog
        header="Header"
        visible={priview}
        style={{ width: "25cm" }}
        pt={{
          content: { className: "bg-gray-500" },
        }}
        onHide={() => setPriview(false)}
      >
        <Preview images={images} allValues={allValues}></Preview>
      </Dialog>
    </div>
  );
}
