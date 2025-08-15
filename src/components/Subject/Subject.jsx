import { useContext, useState } from 'react';
import { verifyRequired, verifyCompletedIds } from '../../utils';
import MeshContext from '../../context/MeshContext';
import './Subject.css';

const Subject = ({ subjectObj }) => {
  const { completedSubjectsIds, setCompletedSubjectsIds } = useContext(MeshContext);
  const isActive = completedSubjectsIds.includes(subjectObj.id);
  const [isHover, setIsHover] = useState(false);

  function toggleSubject() {
    if (!completedSubjectsIds.includes(subjectObj.id)) {
      setCompletedSubjectsIds([...completedSubjectsIds, subjectObj.id]);
    } else {
      const withoutSubjectId = completedSubjectsIds.filter((sbj) => sbj !== subjectObj.id);
      const cleanedCompletedIds = verifyCompletedIds(withoutSubjectId);
      setCompletedSubjectsIds(cleanedCompletedIds);
    }
  }

  function handleMouseEnter() {
    setIsHover(true);
  }

  function handleMouseLeave() {
    setIsHover(false);
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
        <div
          className="Subject is-disabled"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          {isHover ? (
            <div className="Subject-tooltip">
              <span className="Subject-tooltipTitle">Prerrequisitos</span>
              <ul>
                {subjectObj.prerequired.map((pre) => (
                  <li key={pre.id}>{pre.name}</li>
                ))}
              </ul>
            </div>
          ) : null}
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
