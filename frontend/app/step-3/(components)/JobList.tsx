import React from 'react'
import JobCards from './JobCards'
export const jobs = [
    {
       title: 'Software Engineer',
       company: 'Tech Company',
       location: 'New York, NY',
       description: 'Develop and maintain software applications.',
       salary:"upto 50,000 per ",
       image:"Aspira.png"
    },
    {
       title: 'Data Analyst',
       company: 'DataCorp',
       location: 'San Francisco, CA',
       description: 'Analyze and interpret complex data to help businesses make decisions.',
       salary:"upto 50,000 per "
    },
    // Add more jobs as needed
   ];
const JobList = () => {
  return (<>
     <div>
     {jobs.map((job, index) => (
        <JobCards
          key={index}
          title={job.title}
          company={job.company}
          location={job.location}
          description={job.description}
          salary={job.salary}
          image={job.image}
        />
      ))}
     </div>
  
   
  </>
  
  )
}

export default JobList
