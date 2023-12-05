import React, { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Preview(params) {

  const elementRef = useRef(null);

  const htmlInvoicePDF = useRef(null);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const exportPdf = async (action) => {
    let printing = true;



    try {
      await delay(500);
      const doc = new jsPDF('p', 'pt', 'a4');
      const handlePrint = () => {
        doc.autoPrint();
        doc.output('dataurlnewwindow');
      };
  
      const handleSave = () => {
     
        doc.save(`test.pdf`);
        
  
  
  
        // Additional logic as needed
      };
      doc.addFont('assets/fonts/Lato-Regular.ttf', 'Lato', 'normal');
      doc.addFont('assets/fonts/Lato-Bold.ttf', 'Lato', 'bold');
      doc.setFont('Lato');

      const options = {
        html2canvas: {
          scale: 595.26 / 925,
          removeContainer: true,
          allowTaint: true,
          useCORS: true,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
          taintTest: false,
          logging: false,
        },
        x: 0,
        y: 0,
        callback: () => {
          if (action === 'print') {
            handlePrint();
          } else {
            handleSave();
          }

          // Additional logic as needed
          printing = false;
          // Update state or perform other actions
        },
      };

      doc.html(htmlInvoicePDF.current, options);
    } catch (error) {
      console.error(error);
    }

    // Update state or perform other actions
    printing = false;
    // Additional logic as needed
  };

  useEffect(() => {
    exportPdf('print'); // You can change 'print' to 'save' or any other action
  }, []); // Include dependencies if needed


  return (
    <div className="container    p-0 ">
      <div className="cv-review box-shadow rounded-1 mx-auto overflow-hidden bg-white d-flex" ref={htmlInvoicePDF}>
        <div className="d-flex flex-grow-1 m-0">
          <div className="col-5 d-flex flex-column">
            <div className=" cv-header p-3 d-flex flex-column justify-content-end">
            <div className="upload__image-wrapper">
            <button onClick={exportPdf}>Save as PDF</button>

            &nbsp;
           
              <div  className="image-item">
              {
                params.images && (
                  <img src={params.images[0]['data_url']} alt="" width="100" />
                )
              }
              
               
              </div>
      
          </div>

              <h1>{params.allValues.name}</h1>
            </div>
            <div className="d-flex flex-column  flex-grow-1 gap-4 bg-gray-100 py-5 px-4 position-relative">
                <div className="d-flex flex-column   gap-4">
                <div className="d-flex align-items-center  gap-2">
                <i className="pi pi-map-marker"></i>

                <p>{params.allValues.addresse}</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="pi pi-mobile"></i>

                <p>{params.allValues.tel}</p>
              </div>

              <div className="d-flex align-items-center  gap-2">
                <i className="pi pi-google"></i>

                <p>{params.allValues.email}</p>
              </div>
                </div>
              <div className="">
     
        <h4>Educational degree</h4>
     
      <ul className="list-unstyled">
        { 
            params.allValues.education.map((value) => (
            <li >
            <div  className="mb-2 d-flex ">
            <div  className="mb-2 d-flex flex-column flex-grow-1">
            {value.name}
            {value.date[0] - value.date[1]  }
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
   
        <h4>Skills</h4>
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
     
        <h4>Language</h4>
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

          <div className="col-7 d-flex flex-column">
            <div className="cv-header bg-gray-100">
              <div className="cv-header p-3 d-flex flex-column justify-content-between">
                <h1>{params.allValues.title}</h1>
                <p>{params.allValues.bio}</p>
              </div>
            </div>
            <div className="d-flex main-bloc flex-column flex-grow-1 gap-4 justify-content-evenly py-5 px-4">
            {
      params.allValues.experience.length && (
        <div className="">
    
        <h4>PROFESSIONAL EXPERIENCE</h4>
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
    
        <h4>PROFESSIONAL PROJECTS</h4>

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
    
        <h4>Educational PROJECTS</h4>
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
