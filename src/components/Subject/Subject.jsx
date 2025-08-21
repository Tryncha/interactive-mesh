import { useContext, useId, useState } from 'react';
import { verifyCompleted } from '../../utils';
import MeshContext from '../../context/MeshContext';
import './Subject.css';
import { CapIcon, HeartIcon, PencilIcon } from '../Icons';

const Subject = ({ subjectObj, isAvailable }) => {
  const { mesh, setMesh, completedSubjects, setCompletedSubjects } = useContext(MeshContext);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [optionalSubjectForm, setOptionalSubjectForm] = useState({ name: '', credits: 2 });

  const optionalSubjectNameInputId = useId();
  const optionalSubjectCreditsInputId = useId();

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

  function handleOptionalSubjectChange(event) {
    const { name, value } = event.target;
    setOptionalSubjectForm((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const MeshCopy = [...mesh];
    const subjectToEdit = MeshCopy.flat().find((sbj) => sbj.id === subjectObj.id);

    subjectToEdit.name = String(optionalSubjectForm.name);
    subjectToEdit.credits = Number(optionalSubjectForm.credits);

    setMesh(MeshCopy);
    localStorage.setItem('mesh', JSON.stringify(mesh));

    setCompletedSubjects([...completedSubjects, subjectObj]);
    setOptionalSubjectForm({ name: '', credits: 2 });
    setIsModalOpen(false);
  }

  function handleCancel(event) {
    event.preventDefault();
    setIsModalOpen(false);
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
          <form
            className="SubjectModal-form"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend>Editar asignatura</legend>
              <div>
                <label htmlFor={optionalSubjectNameInputId}>Nombre: </label>
                <input
                  type="text"
                  name="name"
                  id={optionalSubjectNameInputId}
                  value={optionalSubjectForm.name}
                  onChange={handleOptionalSubjectChange}
                  required
                />
              </div>
              <div>
                <label htmlFor={optionalSubjectCreditsInputId}>Créditos: </label>
                <input
                  type="number"
                  name="credits"
                  id={optionalSubjectCreditsInputId}
                  value={optionalSubjectForm.credits}
                  onChange={handleOptionalSubjectChange}
                  min={1}
                  required
                />
              </div>
            </fieldset>
            <button type="submit">Confirmar</button>
            <button onClick={handleCancel}>Cancelar</button>
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
            {subjectObj.credits || '-'}
          </span>
          {subjectObj.type === 'optional' ? (
            <span
              className="Subject-editToggle"
              title="Editar asignatura"
              onClick={() => setIsModalOpen(true)}
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
