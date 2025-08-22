import { useContext } from 'react';
import MeshContext from './context/MeshContext';
import confetti from 'canvas-confetti';
import Subject from './components/Subject/Subject';
import { verifyRequired } from './utils';

const VERSION = '0.1.6';
const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const App = () => {
  const { mesh, completedSubjects, setCompletedSubjects } = useContext(MeshContext);

  const completedCredits = completedSubjects.reduce((acc, current) => current.credits + acc, 0);
  const totalCredits = mesh.reduce(
    (acc, current) => current.reduce((acc, current) => current.credits + acc, 0) + acc,
    0
  );

  const progress = ((completedCredits / totalCredits) * 100).toFixed(2);

  function resetSubjects() {
    if (confirm('¿Seguro/a que quieres reiniciar la malla?')) {
      setCompletedSubjects([]);
    }
  }

  if (completedSubjects.length === 60 || progress === 100) confetti();

  return (
    <>
      <main>
        <section className="Mesh">
          {mesh.map((semester, i) => (
            <section
              key={i}
              className="Mesh-column"
            >
              <h2 className="Mesh-semesterNumber">{romanNumbers[i]}</h2>
              {semester.map((subjectObj) => (
                <Subject
                  key={subjectObj.id}
                  subjectObj={subjectObj}
                  isAvailable={verifyRequired(completedSubjects, subjectObj)}
                />
              ))}
            </section>
          ))}
        </section>
      </main>
      <footer>
        <div>
          <h1>Malla Curricular Interactiva - Ingeniería Química</h1>
          <h2>Universidad Nacional de Colombia, Sede Manizales</h2>
          <span>Version {VERSION} - Hecho por Tryncha</span>
        </div>
        <div className="MeshInfo">
          <div className="MeshInfo-progress">
            <span>
              Créditos: {completedCredits}/{totalCredits}
            </span>
            <span>Progreso: {progress}%</span>
          </div>
          <button
            className="u-resetButton"
            onClick={resetSubjects}
          >
            Reiniciar
          </button>
        </div>
      </footer>
    </>
  );
};

export default App;
