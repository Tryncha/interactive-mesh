import { useContext } from 'react';
import './Subject.css';
import MeshContext from '../../context/MeshContext';

function verifyRequired(completedSubjects, subject) {
  return subject.prerequired.every((pre) => completedSubjects.includes(pre));
}

const Subject = ({ subject }) => {
  const { completedSubjects, setCompletedSubjects } = useContext(MeshContext);
  const isActive = completedSubjects.includes(subject.name);

  function handleClick() {
    if (verifyRequired(completedSubjects, subject)) {
      if (!completedSubjects.includes(subject.name)) {
        setCompletedSubjects(completedSubjects.concat(subject.name));
      } else {
        setCompletedSubjects(completedSubjects.filter((sbj) => sbj !== subject.name));
      }
    }
  }

  return (
    <>
      {verifyRequired(completedSubjects, subject) ? (
        <div className={`Subject Subject--${isActive ? 'active' : 'deactive'}`} onClick={handleClick}>
          {subject.name}
        </div>
      ) : (
        <div className={`Subject Subject--disabled`} onClick={handleClick}>
          {subject.name}
        </div>
      )}
    </>
  );
};
export default Subject;
