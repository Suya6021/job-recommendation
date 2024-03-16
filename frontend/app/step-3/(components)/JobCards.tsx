import React from 'react'
interface JobCardProps {
    title: string;
    company: string;
    location: string;
    description: string;
    salary?:string;
    image?:string;
   }
   
   const JobCard: React.FC<JobCardProps> = ({ title, company, location, description,salary }) => {
    return (
       <div className="  m-2 flex flex-col w-full md:w-[600px] bg-slate-200">
         <h4 className='text-xs '>{salary}</h4>
         <div>
          <div>

          </div>
          <div>
         <h2>{title}</h2>
         <h3>{company}</h3>
         <p>{location}</p>
         </div>
         </div>
         <p>{description}</p>
       </div>
    );
   };

export default JobCard
