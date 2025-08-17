import subjectsPerSemester from '../../constants/subjectsPerSemester.json';
import Subject from '../Subject/Subject';
import './Mesh.css';

const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const Mesh = () => {
  return (
    <main className="Mesh">
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
    </main>
  );
};

export default Mesh;
