import { useContext } from 'react';
import MeshContext from './context/MeshContext';
import confetti from 'canvas-confetti';
// import Mesh from './components/Mesh/Mesh';
// import MeshInfo from './components/MeshInfo/MeshInfo';
import subjectsPerSemester from './constants/subjectsPerSemester.json';
import Subject from './components/Subject/Subject';

const Header = () => {
  return (
    <header>
      <h1>Malla Curricular Interactiva - Ingeniería Química</h1>
      <h2>Universidad Nacional de Colombia, Sede Manizales</h2>
    </header>
  );
};

const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const App = () => {
  const { completedSubjectsIds, setCompletedSubjectsIds } = useContext(MeshContext);

  function resetSubjects() {
    if (window.confirm('¿Seguro que quieres reiniciar la malla?')) {
      setCompletedSubjectsIds([]);
    }
  }

  if (completedSubjectsIds.length === 60) confetti();

  return (
    <>
      <Header />
      <main>
        <section className="Mesh">
          {subjectsPerSemester.map((semester, i) => (
            <div
              key={i}
              className="Mesh-column"
            >
              <h2 className="Mesh-semesterNumber">{romanNumbers[i]}</h2>
              {semester.map((subjectObj) => (
                <Subject
                  key={subjectObj.id}
                  subjectObj={subjectObj}
                />
              ))}
            </div>
          ))}
        </section>
        <hr className="u-hr" />
        <section className="MeshInfo">
          <button
            className="u-resetButton"
            onClick={resetSubjects}
          >
            Reiniciar
          </button>
          <hr className="u-vr" />
          <div className="MeshInfo-progress">
            <span>Créditos: 20/60</span>
            <span>Progreso: 80%</span>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
