import { useContext } from 'react';
import MeshContext from './context/MeshContext';
import confetti from 'canvas-confetti';
import Mesh from './components/Mesh/Mesh';
import MeshInfo from './components/MeshInfo/MeshInfo';

const Header = () => {
  return (
    <header>
      <h1>Malla Curricular Interactiva - Ingeniería Química</h1>
      <h2>Universidad Nacional de Colombia, Sede Manizales</h2>
    </header>
  );
};

const App = () => {
  const { completedSubjectsIds } = useContext(MeshContext);

  if (completedSubjectsIds.length === 60) confetti();

  return (
    <>
      <Header />
      <Mesh />
      <hr className="u-hr" />
      <MeshInfo />
    </>
  );
};

export default App;
