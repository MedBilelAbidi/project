export default function Preview(params) {
  return (
    <div className="container    p-0 ">
      <div className="cv-review box-shadow rounded-1 mx-auto overflow-hidden bg-white">
        <div className="d-flex m-0">
          <div className="col-5">
            <div className=" cv-header p-3 d-flex flex-column justify-content-end">
            <div className="upload__image-wrapper">

            &nbsp;
           
              <div  className="image-item">
              {
                params.images.length && (
                  <img src={params.images[0]['data_url']} alt="" width="100" />
                )
              }
              
               
              </div>
      
          </div>

              <h1>{params.allValues.name}</h1>
            </div>
            <div className="d-flex flex-column gap-4 bg-gray-100 py-5 px-4 position-relative">
              <div className="d-flex align-items-center flex-grow-1 gap-2">
                <i className="pi pi-map-marker"></i>

                <p>{params.allValues.addresse}</p>
              </div>
              <div className="d-flex align-items-center flex-grow-1 gap-2">
                <i className="pi pi-mobile"></i>

                <p>{params.allValues.tel}</p>
              </div>

              <div className="d-flex align-items-center flex-grow-1 gap-2">
                <i className="pi pi-google"></i>

                <p>{params.allValues.email}</p>
              </div>
              <div className="">
      <div className="d-flex justify-content-between">
        <h4>Educational degree</h4>
      </div>
      <ul className="list-unstyled">
        { 
            params.allValues.education.map((value) => (
            <li >
            <div  className="mb-2 d-flex ">
            <div  className="mb-2 d-flex flex-column flex-grow-1">
            {value.name}
            {value.date[0] - value.date[1]}
            </div>

            </div>

          </li>

        ))
        
        }
      </ul>
    </div>
    {
      params.allValues.skills.length && (
        <div className="">
      <div className="d-flex justify-content-between">
        <h4>Skills</h4>
      </div>
      <ul className="list-unstyled">
        { 
            params.allValues.skills.map((value) => (
            <li >
            <div  className="mb-2 d-flex ">
            <div  className="mb-2 d-flex flex-column flex-grow-1">
            {value}

            </div>

            </div>

          </li>

        ))
        
        }
      </ul>
    </div>
      )
    }
    {
      params.allValues.certif.length && (
        <div className="">
      <div className="d-flex justify-content-between">
        <h4>CERTIFICATIONS</h4>
      </div>
      <ul className="list-unstyled">
        { 
            params.allValues.certif.map((value) => (
            <li >
            <div  className="mb-2 d-flex ">
            <div  className="mb-2 d-flex flex-column flex-grow-1">
            {value}

            </div>

            </div>

          </li>

        ))
        
        }
      </ul>
    </div>
      )
    }
    {
      params.allValues.language.length && (
        <div className="">
      <div className="d-flex justify-content-between">
        <h4>Language</h4>
      </div>
      <ul className="list-unstyled">
        { 
            params.allValues.language.map((value) => (
            <li >
            <div  className="mb-2 d-flex ">
            <div  className="mb-2 d-flex flex-column flex-grow-1">
            {value}

            </div>

            </div>

          </li>

        ))
        
        }
      </ul>
    </div>
      )
    }
           
            </div>

          </div>

          <div className="col-7">
            <div className="cv-header bg-gray-100">
              <div className="cv-header p-3 d-flex flex-column justify-content-between">
                <h1>{params.allValues.title}</h1>
                <p>{params.allValues.bio}</p>
              </div>
            </div>
            <div className="d-flex flex-column gap-4  py-5 px-4">
            {
      params.allValues.experience.length && (
        <div className="">
      <div className="d-flex justify-content-between">
        <h4>PROFESSIONAL EXPERIENCE</h4>
      </div>
      <ul className="list-unstyled">
        { 
            params.allValues.experience.map((value) => (
            <li >
            <div  className="mb-2 d-flex ">
            <div  className="mb-2 d-flex flex-column flex-grow-1">
            {value.name}
            {value.date[0] - value.date[1]}
            {value.discription}
            </div>

            </div>

          </li>

        ))
        
        }
      </ul>
    </div>
      )
    }
    {
      params.allValues.projects.length && (
        <div className="">
      <div className="d-flex justify-content-between">
        <h4>PROFESSIONAL PROJECTS</h4>
      </div>
      <ul className="list-unstyled">
        { 
            params.allValues.projects.map((value) => (
            <li >
            <div  className="mb-2 d-flex ">
            <div  className="mb-2 d-flex flex-column flex-grow-1">
            {value.name}
            {value.date[0] - value.date[1]}
            {value.discription}
            </div>

            </div>

          </li>

        ))
        
        }
      </ul>
    </div>
      )
    }
    {
      params.allValues.educationProjects.length && (
        <div className="">
      <div className="d-flex justify-content-between">
        <h4>Educational PROJECTS</h4>
      </div>
      <ul className="list-unstyled">
        { 
            params.allValues.educationProjects.map((value) => (
            <li >
            <div  className="mb-2 d-flex ">
            <div  className="mb-2 d-flex flex-column flex-grow-1">
            {value.name}
            {value.date[0] - value.date[1]}
            {value.discription}
            </div>

            </div>

          </li>

        ))
        
        }
      </ul>
    </div>
      )
    }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
