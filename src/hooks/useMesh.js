import { useContext } from 'react';
import MeshContext from '../context/MeshContext';

function useMesh() {
  const { mesh, setMesh, completedSubjects, setCompletedSubjects } = useContext(MeshContext);
  return { mesh, setMesh, completedSubjects, setCompletedSubjects };
}

export default useMesh;
