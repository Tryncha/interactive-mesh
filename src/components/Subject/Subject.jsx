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
        <div
          className={isActive ? 'Subject is-active' : 'Subject'}
          onClick={toggleSubject}>
          <div className="Subject-name">{subjectObj.name}</div>
          <div className="Subject-footer">
            <div className={`Subject-category Subject--${subjectObj.category}`} />
            <div className={`Subject-type Subject--${subjectObj.type}`} />
          </div>
        </div>
      ) : (
        <div className="Subject is-disabled">
          <div className="Subject-name">{subjectObj.name}</div>
          <div className="Subject-footer">
            <div className={`Subject-category Subject--${subjectObj.category} is-disabled`} />
            <div className={`Subject-type Subject--${subjectObj.type} is-disabled`} />
          </div>
        </div>
      )}
    </>
  );
};
export default Subject;
