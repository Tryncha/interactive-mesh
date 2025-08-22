import { useState, useContext } from 'react';
import { verifyCompleted } from '../../utils';
import MeshContext from '../../context/MeshContext';
import SubjectModal from '../SubjectModal/SubjectModal';
import { CapIcon, HeartIcon, PencilIcon } from '../Icons';
import './Subject.css';
import SubjectTooltip from '../SubjectTooltip/SubjectTooltip';

const Subject = ({ subjectObj, isAvailable }) => {
  const { completedSubjects, setCompletedSubjects } = useContext(MeshContext);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subjectIds = completedSubjects.map((sbj) => sbj.id);
  const isActive = subjectIds.includes(subjectObj.id);

  const SUBJECT_NAME_MAX_LENGTH = 60;

  function toggleSubject() {
    if (!subjectIds.includes(subjectObj.id)) {
      setCompletedSubjects([...completedSubjects, subjectObj]);
    } else {
      const withoutSubject = completedSubjects.filter((sbj) => sbj.id !== subjectObj.id);
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

  return (
    <>
      <SubjectModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        subjectObj={subjectObj}
      />
      <div
        className={isAvailable ? (isActive ? 'Subject is-active' : 'Subject') : 'Subject is-disabled'}
        onClick={isAvailable ? toggleSubject : null}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SubjectTooltip
          isHovering={isHovering}
          subjectObj={subjectObj}
        />
        <div className={`Subject-header Subject--${subjectObj.category}`}>
          <span
            className="Subject-credits"
            title="Créditos"
          >
            {subjectObj.credits || '-'}
          </span>
          {subjectObj.type === 'optional' ? (
            <span
              className="Subject-editToggle"
              title="Editar asignatura"
              onClick={openModal}
            >
              <PencilIcon />
            </span>
          ) : null}
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
          <div
            className={`Subject-category Subject--${subjectObj.category}`}
            title="Categoría"
          />
          <div
            className={`Subject-type Subject--${subjectObj.type}`}
            title="Tipo"
          >
            {subjectObj.type === 'mandatory' ? <CapIcon /> : <HeartIcon />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;
