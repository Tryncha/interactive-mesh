import { useContext } from 'react';
import subjectsPerSemester from '../../constants/subjectsPerSemester.json';
import Subject from '../Subject/Subject';
import './Mesh.css';
import MeshContext from '../../context/MeshContext';

const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const Mesh = () => {
  const { setCompletedSubjectsIds } = useContext(MeshContext);

  function resetSubjects() {
    if (window.confirm('¿Seguro que quieres reiniciar la malla?')) {
      setCompletedSubjectsIds([]);
    }
  }

  return (
    <main className="Mesh">
      <section className="Mesh-columns">
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
  );
};

export default Mesh;
