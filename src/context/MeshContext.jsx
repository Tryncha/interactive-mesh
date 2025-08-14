import { createContext, useState } from 'react';

const MeshContext = createContext();

export const MeshProvider = ({ children }) => {
  const [completedSubjectsIds, setCompletedSubjectsIds] = useState([]);

  console.log('Completed Subjects Ids: ', completedSubjectsIds);

  return (
    <MeshContext.Provider value={{ completedSubjectsIds, setCompletedSubjectsIds }}>{children}</MeshContext.Provider>
  );
};

export default MeshContext;
