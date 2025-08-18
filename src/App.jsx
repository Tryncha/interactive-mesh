import { useContext } from 'react';
import MeshContext from './context/MeshContext';
import confetti from 'canvas-confetti';
import subjectsPerSemester from './constants/subjectsPerSemester.json';
import Subject from './components/Subject/Subject';

const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const App = () => {
  const { completedSubjectsIds, setCompletedSubjectsIds } = useContext(MeshContext);

  function resetSubjects() {
    if (window.confirm('¿Seguro que quieres reiniciar la malla?')) {
      setCompletedSubjectsIds([]);
    }
  }

  if (completedSubjectsIds.length === 60) confetti();

  const totalCredits = subjectsPerSemester.reduce(
    (acc, current) => current.reduce((acc, current) => current.credits + acc, 0) + acc,
    0
  );

  return (
    <>
      <header>
        <div>
          <h1>Malla Curricular Interactiva - Ingeniería Química</h1>
          <h2>Universidad Nacional de Colombia, Sede Manizales</h2>
        </div>
        <div className="MeshInfo">
          <div className="MeshInfo-progress">
            <span>Créditos: 20/{totalCredits}</span>
            <span>Progreso: 80%</span>
          </div>
          <button
            className="u-resetButton"
            onClick={resetSubjects}
          >
            Reiniciar
          </button>
        </div>
      </header>
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
      </main>
      <footer>Version 0.1 - Hecho por Tryncha</footer>
    </>
  );
};

export default App;
