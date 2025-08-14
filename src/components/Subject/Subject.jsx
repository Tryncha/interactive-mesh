import { useContext } from 'react';
import { verifyRequired, verifyCompletedIds } from '../../utils';
import MeshContext from '../../context/MeshContext';
import './Subject.css';

const Subject = ({ subjectObj }) => {
  const { completedSubjectsIds, setCompletedSubjectsIds } = useContext(MeshContext);
  const isActive = completedSubjectsIds.includes(subjectObj.id);

  function toggleSubject() {
    if (!completedSubjectsIds.includes(subjectObj.id)) {
      setCompletedSubjectsIds([...completedSubjectsIds, subjectObj.id]);
    } else {
      const withoutSubjectId = completedSubjectsIds.filter((sbj) => sbj !== subjectObj.id);
      const cleanedCompletedIds = verifyCompletedIds(withoutSubjectId);
      setCompletedSubjectsIds(cleanedCompletedIds);
    }
  }

  return (
    <>
      {verifyRequired(completedSubjectsIds, subjectObj) ? (
        <div className={`Subject Subject--${isActive ? 'active' : 'deactive'}`} onClick={toggleSubject}>
          {subjectObj.name}
        </div>
      ) : (
        <div className={`Subject Subject--disabled`}>{subjectObj.name}</div>
      )}
    </>
  );
};
export default Subject;
