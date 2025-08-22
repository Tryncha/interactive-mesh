import { useState, useEffect, useContext, useId, useRef } from 'react';
import MeshContext from '../../context/MeshContext';
import './SubjectModal.css';

const SubjectModal = ({ isOpen, closeModal, subjectObj }) => {
  const subjectNameInputId = useId();
  const subjectCreditsInputId = useId();
  const formRef = useRef();

  const DEFAULT_CREDITS = 3;
  const initialForm = {
    name: subjectObj.name,
    credits: subjectObj.credits || DEFAULT_CREDITS
  };

  const { mesh, setMesh, completedSubjects, setCompletedSubjects } = useContext(MeshContext);
  const [subjectForm, setSubjectForm] = useState(initialForm);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setSubjectForm((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const MeshCopy = [...mesh];
    const subjectToEdit = MeshCopy.flat().find((sbj) => sbj.id === subjectObj.id);

    subjectToEdit.name = String(subjectForm.name);
    subjectToEdit.credits = Number(subjectForm.credits);

    setMesh(MeshCopy);
    localStorage.setItem('mesh', JSON.stringify(mesh));

    setCompletedSubjects([...completedSubjects, subjectObj]);
    setSubjectForm(initialForm);
    closeModal();
  }

  function handleClick(event) {
    // Event to close the modal when clicking outside of it
    if (!formRef.current.contains(event.target)) {
      handleCancel();
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleCancel() {
    setSubjectForm(initialForm);
    closeModal();
  }

  useEffect(() => {
    function handleKeydown(event) {
      if (event.key === 'Escape') {
        handleCancel();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
    }

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen, handleCancel]);

  if (!isOpen) return null;

  return (
    <section
      className="SubjectModal"
      onClick={handleClick}
    >
      <div className="SubjectModal-formContainer">
        <form
          className="SubjectModal-form"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="SubjectModal-labelInput">
            <label htmlFor={subjectNameInputId}>Nombre: </label>
            <input
              type="text"
              name="name"
              id={subjectNameInputId}
              value={subjectForm.name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="SubjectModal-labelInput">
            <label htmlFor={subjectCreditsInputId}>Créditos: </label>
            <input
              type="number"
              name="credits"
              id={subjectCreditsInputId}
              value={subjectForm.credits}
              onChange={handleFormChange}
              min={1}
              max={100}
              required
            />
          </div>
          <button
            className="SubjectModal-button SubjectModal-button--submit"
            type="submit"
          >
            Confirmar
          </button>
          <button
            className="SubjectModal-button SubjectModal-button--cancel"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubjectModal;
