import { useState } from 'react';
import SubjectModal from '../SubjectModal/SubjectModal';
import SubjectTooltip from '../SubjectTooltip/SubjectTooltip';
import { CapIcon, HeartIcon, PencilIcon } from '../Icons';
import { verifyCompleted } from '../../utils';
import './Subject.css';
import useMesh from '../../hooks/useMesh';

const Subject = ({ subjectObj, isAvailable }) => {
  const { completedSubjects, setCompletedSubjects } = useMesh();
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id, name, credits, prerequired, corequired, category, type } = subjectObj;

  const subjectIds = completedSubjects.map((sbj) => sbj.id);
  const isActive = subjectIds.includes(id);

  const SUBJECT_NAME_MAX_LENGTH = 60;

  function toggleSubject() {
    if (!subjectIds.includes(id)) {
      setCompletedSubjects([...completedSubjects, subjectObj]);
    } else {
      const withoutSubject = completedSubjects.filter((sbj) => sbj.id !== id);
      const cleanedCompleted = verifyCompleted(withoutSubject);
      setCompletedSubjects(cleanedCompleted);
    }
  }

  function handleMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  function openModal(event) {
    event.stopPropagation();
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const className = `Subject Subject--${category} Subject--${type}`;

  return (
    <>
      <SubjectModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        subjectObj={subjectObj}
      />
      <div
        className={isAvailable ? (isActive ? `${className} is-active` : `${className}`) : `${className} is-disabled`}
        onClick={isAvailable ? toggleSubject : null}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SubjectTooltip
          isHovering={isHovering}
          subjectObj={subjectObj}
        />
        <div className="Subject-header">
          <span
            className="Subject-credits"
            title="Créditos"
          >
            {credits || '-'}
          </span>
          {type === 'optional' ? (
            <span
              className="Subject-editToggle"
              title="Editar asignatura"
              onClick={openModal}
            >
              <PencilIcon
                fill="none"
                stroke="#fff"
              />
            </span>
          ) : null}
          <div className="Subject-required">
            <span
              className="Subject-prerequired"
              title={prerequired.length > 0 ? 'Tiene prerrequisitos' : 'No tiene prerrequisitos'}
            >
              {prerequired.length > 0 ? 'P' : '-'}
            </span>
            <span
              className="Subject-corequired"
              title={corequired.length > 0 ? 'Tiene correquisitos' : 'No tiene correquisitos'}
            >
              {corequired.length > 0 ? 'C' : '-'}
            </span>
          </div>
        </div>
        <div
          className="Subject-name"
          title={name.length >= SUBJECT_NAME_MAX_LENGTH ? name : ''}
        >
          {name.length >= SUBJECT_NAME_MAX_LENGTH ? `${name.slice(0, SUBJECT_NAME_MAX_LENGTH)}...` : name}
        </div>
        <div className="Subject-footer">
          <div
            className="Subject-category"
            title="Categoría"
          />
          <div
            className="Subject-type"
            title="Tipo"
          >
            {type === 'mandatory' ? <CapIcon fill="#fff" /> : <HeartIcon fill="#fff" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;
