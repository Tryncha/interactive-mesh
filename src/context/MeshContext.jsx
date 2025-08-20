import { createContext, useState } from 'react';

const MeshContext = createContext();

export const MeshProvider = ({ children }) => {
  const [completedSubjects, setCompletedSubjects] = useState([]);

  console.log('Completed Subjects: ', completedSubjects);

  return <MeshContext.Provider value={{ completedSubjects, setCompletedSubjects }}>{children}</MeshContext.Provider>;
};

export default MeshContext;
