



export default function Privew(params) {
    return (
        <div className="container    p-0 " >

          <div className="cv-review box-shadow rounded-1 mx-auto overflow-hidden bg-white" >
    
            <div className="d-flex m-0">
              <div className="col-5">
              <div className=" cv-header p-3 d-flex flex-column justify-content-end">
                <img src="" />
    
                  <h1>
                  {params.allValues.name}
                  </h1>
    
              </div>
              <div className="d-flex flex-column gap-4 bg-gray-100 py-5 px-4 position-relative" >
    
                <div className="d-flex align-items-center flex-grow-1 gap-2">
                <i className="pi pi-map-marker"></i>
                  

                                            <p>
                                            {params.allValues.addresse}
                        </p>
                </div>
                <div className="d-flex align-items-center flex-grow-1 gap-2">
                <i className="pi pi-mobile"></i>

                        <p>
                        {params.allValues.tel}
                        </p>
                </div>
    
                <div className="d-flex align-items-center flex-grow-1 gap-2">
                <i className="pi pi-google"></i>
                  

                        <p>
                        {params.allValues.email}
                        </p>
                </div>

               
               
              </div>
              </div>
    
              <div className="col-7">
              <div  className="cv-header bg-gray-100">
                <div className="cv-header p-3 d-flex flex-column justify-content-between">
    

                        <h1>
                        {params.allValues.title}
                        </h1>
                        <p>
                        {params.allValues.bio}
                        </p>
                   
                </div>
              </div>
              <div className="d-flex flex-column gap-4  py-5 px-4">
           
                            continue
              </div>
    
              </div>
            </div>
          </div>
        </div>
      );
}