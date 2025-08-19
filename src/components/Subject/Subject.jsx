import { useContext, useId, useState } from 'react';
import { verifyCompletedIds } from '../../utils';
import MeshContext from '../../context/MeshContext';
import './Subject.css';
import { CapIcon, HeartIcon } from '../Icons';

const Subject = ({ subjectObj, isAvailable }) => {
  const { completedSubjectsIds, setCompletedSubjectsIds } = useContext(MeshContext);
  const isActive = completedSubjectsIds.includes(subjectObj.id);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const SUBJECT_NAME_MAX_LENGTH = 60;

  const optionalSubjectNameInputId = useId();
  const optionalSubjectCreditsInputId = useId();

  function toggleSubject() {
    if (!completedSubjectsIds.includes(subjectObj.id)) {
      if (subjectObj.type === 'optional') {
        console.log('optional here');
        setIsModalOpen(true);
      } else {
        setCompletedSubjectsIds([...completedSubjectsIds, subjectObj.id]);
      }
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
      {isModalOpen ? (
        <div className="SubjectModal">
          <form className="SubjectModal-form">
            <div>
              <label htmlFor={optionalSubjectNameInputId}>Nombre: </label>
              <input
                id={optionalSubjectNameInputId}
                type="text"
              />
            </div>
            <div>
              <label htmlFor={optionalSubjectCreditsInputId}>Créditos: </label>
              <input
                id={optionalSubjectCreditsInputId}
                type="number"
              />
            </div>
            <button type="submit">Confirmar</button>
            <button>Cancelar</button>
          </form>
        </div>
      ) : null}
      <div
        className={isAvailable ? (isActive ? 'Subject is-active' : 'Subject') : 'Subject is-disabled'}
        onClick={isAvailable ? toggleSubject : null}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovering && (subjectObj.prerequired.length > 0 || subjectObj.corequired.length > 0) ? (
          <div className="Subject-tooltip">
            {subjectObj.prerequired.length > 0 ? (
              <>
                <span className="Subject-tooltipTitle">Prerrequisitos</span>
                <ul>
                  {subjectObj.prerequired.map((pre) => (
                    <li key={pre.id}>{pre.name}</li>
                  ))}
                </ul>
              </>
            ) : null}
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
        <div className={`Subject-header Subject--${subjectObj.category}`}>
          <span
            className="Subject-credits"
            title="Créditos"
          >
            {subjectObj.credits}
          </span>
          <div className="Subject-required">
            <span
              className="Subject-prerequired"
              title={subjectObj.prerequired.length > 0 ? 'Tiene prerrequisitos' : 'No tiene prerrequisitos'}
            >
              {subjectObj.prerequired.length > 0 ? 'P' : '-'}
            </span>
            <span
              className="Subject-corequired"
              title={subjectObj.corequired.length > 0 ? 'Tiene correquisitos' : 'No tiene correquisitos'}
            >
              {subjectObj.corequired.length > 0 ? 'C' : '-'}
            </span>
          </div>
        </div>
        <div
          className="Subject-name"
          title={subjectObj.name.length >= SUBJECT_NAME_MAX_LENGTH ? subjectObj.name : ''}
        >
          {subjectObj.name.length >= SUBJECT_NAME_MAX_LENGTH
            ? `${subjectObj.name.slice(0, SUBJECT_NAME_MAX_LENGTH)}...`
            : subjectObj.name}
        </div>
        <div className="Subject-footer">
          <div className={`Subject-category Subject--${subjectObj.category}`} />
          <div className={`Subject-type Subject--${subjectObj.type}`}>
            {subjectObj.type === 'mandatory' ? <CapIcon /> : <HeartIcon />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;
