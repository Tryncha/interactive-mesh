import { createContext, useEffect, useState } from 'react';
import subjectsPerSemester from '../constants/subjectsPerSemester.json';

const MeshContext = createContext();

export const MeshProvider = ({ children }) => {
  const [mesh, setMesh] = useState([]);
  const [completedSubjects, setCompletedSubjects] = useState([]);

  useEffect(() => {
    const localStorageMesh = JSON.parse(localStorage.getItem('mesh'));
    const localStorageProgress = JSON.parse(localStorage.getItem('completedSubjects'));

    if (localStorageMesh) {
      setMesh(localStorageMesh);
    } else {
      setMesh(subjectsPerSemester);
    }

    if (localStorageProgress && localStorageProgress.length !== 0) {
      setCompletedSubjects(localStorageProgress);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedSubjects', JSON.stringify(completedSubjects));
  }, [completedSubjects]);

  // console.log('Mesh: ', mesh);
  // console.log('Completed Subjects: ', completedSubjects);

  const meshValue = {
    mesh,
    setMesh,
    completedSubjects,
    setCompletedSubjects
  };

  return <MeshContext.Provider value={meshValue}>{children}</MeshContext.Provider>;
};

export default MeshContext;
