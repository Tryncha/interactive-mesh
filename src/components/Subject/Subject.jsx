import { useContext, useState } from 'react';
import { verifyCompletedIds } from '../../utils';
import MeshContext from '../../context/MeshContext';
import './Subject.css';
import { CapIcon, HeartIcon } from '../Icons';

const Subject = ({ subjectObj, isAvailable }) => {
  const { completedSubjectsIds, setCompletedSubjectsIds } = useContext(MeshContext);
  const isActive = completedSubjectsIds.includes(subjectObj.id);
  const [isHovering, setIsHovering] = useState(false);

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
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  return (
    <>
      <div
        className={isAvailable ? (isActive ? 'Subject is-active' : 'Subject') : 'Subject is-disabled'}
        onClick={isAvailable ? toggleSubject : null}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovering && subjectObj.prerequired.length > 0 ? (
          <div className="Subject-tooltip">
            <span className="Subject-tooltipTitle">Prerrequisitos</span>
            <ul>
              {subjectObj.prerequired.map((pre) => (
                <li key={pre.id}>{pre.name}</li>
              ))}
            </ul>
            {subjectObj.corequired.length > 0 ? (
              <>
                <span className="Subject-tooltipTitle">Correquisitos</span>
                <ul>
                  {subjectObj.corequired.map((pre) => (
                    <li key={pre.id}>{pre.name}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        ) : null}
        <div className="Subject-name">{subjectObj.name}</div>
        <div className="Subject-footer">
          <div
            className={
              isAvailable
                ? `Subject-category Subject--${subjectObj.category}`
                : `Subject-category Subject--${subjectObj.category} is-disabled`
            }
          />
          <div
            className={
              isAvailable
                ? `Subject-type Subject--${subjectObj.type}`
                : `Subject-type Subject--${subjectObj.type} is-disabled`
            }
          >
            {subjectObj.type === 'mandatory' ? <CapIcon /> : <HeartIcon />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;
