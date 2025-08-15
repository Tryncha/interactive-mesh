import { useContext } from 'react';
import MeshContext from './context/MeshContext';
import subjectsPerSemester from './constants/subjectsPerSemester.json';
import Subject from './components/Subject/Subject';

const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const App = () => {
  const { setCompletedSubjectsIds } = useContext(MeshContext);

  function resetSubjects() {
    if (window.confirm('Are you sure you want to reset?')) {
      setCompletedSubjectsIds([]);
    }
  }

  return (
    <main className="u-mainPage">
      <section className="Mesh">
        {subjectsPerSemester.map((semester, i) => (
          <div
            key={i}
            className="Mesh-column">
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
      <button
        className="u-resetButton"
        onClick={resetSubjects}>
        Reset
      </button>
    </main>
  );
};

export default App;
