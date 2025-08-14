import subjectsPerSemester from './constants/subjectsPerSemester.json';
import Subject from './components/Subject/Subject';

const App = () => {
  return (
    <main className="Mesh">
      {subjectsPerSemester.map((semester, i) => (
        <div key={i} className="Mesh-row">
          {semester.map((subjectObj) => (
            <Subject key={subjectObj.id} subjectObj={subjectObj} />
          ))}
        </div>
      ))}
    </main>
  );
};

export default App;
