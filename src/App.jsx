import Subject from './components/Subject/Subject';
import subjectsPerSemester from './constants/subjectsPerSemester.json';

const App = () => {
  return (
    <main className="Mesh">
      {subjectsPerSemester.map((semester, i) => (
        <div key={i} className="Mesh-row">
          {semester.map((subject) => (
            <Subject key={subject.id} subject={subject} />
          ))}
        </div>
      ))}
    </main>
  );
};

export default App;
