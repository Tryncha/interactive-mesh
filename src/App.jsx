import { useContext } from 'react';
import MeshContext from './context/MeshContext';
import confetti from 'canvas-confetti';
import Subject from './components/Subject/Subject';
import { verifyRequired } from './utils';
import ThemeContext from './context/ThemeContext';

const VERSION = '0.1.8';
const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const App = () => {
  const { theme, applyTheme } = useContext(ThemeContext);
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

  function handleThemeChange(event) {
    applyTheme(event.target.value);
  }

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
      <section className="MeshInfo">
        <div className="MeshInfo-title">
          <h1>Malla Curricular Interactiva - Ingeniería Química</h1>
          <h2>Universidad Nacional de Colombia, Sede Manizales</h2>
        </div>
        <div className="MeshInfo-options">
          <div className="MeshInfo-theme">
            <select
              id="temp-selectTheme"
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="system">Sistema</option>
            </select>
          </div>
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
      </section>
      <footer>Version {VERSION} - Hecho por Tryncha</footer>
    </>
  );
};

export default App;
