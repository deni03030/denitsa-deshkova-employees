import React from "react";

const CommonProjects = ({ data }) => {
  return (
    <div>
      <table className="projects-information">
        <thead>
          <tr>
            <th>Employee ID #1</th>
            <th>Employee ID #2</th>
            <th>Project ID</th>
            <th>Days worked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((project, index) => (
            <tr key={index}>
              <td>{project.employeeId1}</td>
              <td>{project.employeeId2}</td>
              <td>{project.projectId}</td>
              <td>{project.daysWorked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonProjects;
