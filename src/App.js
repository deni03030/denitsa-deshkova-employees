import React, { useState } from "react";
import Papa from "papaparse";
import { parse, isValid, differenceInCalendarDays } from "date-fns";
import FileInput from "./components/FileInput";
import CommonProjects from "./components/CommonProjects";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  const calculateDaysWorked = (dateFrom1, dateTo1, dateFrom2, dateTo2) => {
    const possibleFormats = [
      "dd/MM/yyyy",
      "MM/dd/yyyy",
      "dd-MM-yyyy",
      "MM-dd-yyyy",
      "dd/MMM/yy",
      "dd/MMM/yyyy",
    ];

    const from1 = parseDate(dateFrom1, possibleFormats);
    const to1 =
      dateTo1 === "NULL" ? new Date() : parseDate(dateTo1, possibleFormats);
    const from2 = parseDate(dateFrom2, possibleFormats);
    const to2 =
      dateTo2 === "NULL" ? new Date() : parseDate(dateTo2, possibleFormats);

    if (!isValid(from1) || !isValid(to1) || !isValid(from2) || !isValid(to2)) {
      return 0;
    }

    const intersectionStart = from1 < from2 ? from2 : from1;
    const intersectionEnd = to1 < to2 ? to1 : to2;

    const diffInDays =
      differenceInCalendarDays(intersectionEnd, intersectionStart) + 1;

    return diffInDays > 0 ? diffInDays : 0;
  };

  const handleFileSelect = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const csvData = event.target.result;
      const parsedData = Papa.parse(csvData, { header: true }).data;

      const employeeProjects = {};

      parsedData.forEach((project) => {
        const { EmpID, ProjectID, DateFrom, DateTo } = project;
        const key = ProjectID;

        if (employeeProjects.hasOwnProperty(key)) {
          const pair = employeeProjects[key];
          pair.employeeId2 = EmpID;
          const daysWorked = calculateDaysWorked(
            pair.dateFrom,
            pair.dateTo,
            DateFrom,
            DateTo
          );
          if (daysWorked > 0) {
            pair.daysWorked += daysWorked;
          }
        } else {
          employeeProjects[key] = {
            employeeId1: EmpID,
            employeeId2: "",
            projectId: ProjectID,
            dateFrom: DateFrom,
            dateTo: DateTo,
            daysWorked: 0,
          };
        }
      });

      const commonProjects = Object.values(employeeProjects).filter(
        (project) => project.employeeId2 !== ""
      );

      setData(commonProjects);
    };

    reader.readAsText(file);
  };

  const parseDate = (dateString, possibleFormats) => {
    for (let i = 0; i < possibleFormats.length; i++) {
      const parsedDate = parse(dateString, possibleFormats[i], new Date());
      if (isValid(parsedDate)) {
        return parsedDate;
      }
    }
    return null;
  };

  return (
    <div className="common-projects">
      <h1 className="cpm-title">Common Projects</h1>
      <FileInput onFileSelect={handleFileSelect} />
      {data.length > 0 && <CommonProjects data={data} />}
    </div>
  );
};

export default App;
