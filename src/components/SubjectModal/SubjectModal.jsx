import { useState, useEffect, useContext, useId, useRef } from 'react';
import MeshContext from '../../context/MeshContext';
import './SubjectModal.css';

const SubjectModal = ({ isOpen, closeModal, subjectObj }) => {
  const subjectNameInputId = useId();
  const subjectCreditsInputId = useId();
  const formRef = useRef();

  const MIN_CREDITS = 1;
  const MAX_CREDITS = 100;
  const DEFAULT_CREDITS = 3;

  const initialForm = {
    name: subjectObj.name,
    credits: subjectObj.credits || DEFAULT_CREDITS
  };

  const { mesh, setMesh } = useContext(MeshContext);
  const [subjectForm, setSubjectForm] = useState(initialForm);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setSubjectForm((prevState) => ({ ...prevState, [name]: value }));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleSubmit(event) {
    event.preventDefault();

    const MeshCopy = [...mesh];
    const subjectToEdit = MeshCopy.flat().find((sbj) => sbj.id === subjectObj.id);

    subjectToEdit.name = String(subjectForm.name);
    subjectToEdit.credits = Number(subjectForm.credits);

    setMesh(MeshCopy);
    localStorage.setItem('mesh', JSON.stringify(mesh));
    closeModal();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleCancel() {
    event.preventDefault();
    setSubjectForm(initialForm);
    closeModal();
  }

  function handleClick(event) {
    // Event to close the modal when clicking outside of it
    if (!formRef.current.contains(event.target)) {
      handleCancel();
    }
  }

  useEffect(() => {
    function handleKeydown(event) {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }

      if (event.key === 'Escape') {
        handleCancel(event);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
    }

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen, handleSubmit, handleCancel]);

  function decreaseCredits(event) {
    event.preventDefault();

    if (subjectForm.credits > MIN_CREDITS) {
      setSubjectForm({
        ...subjectForm,
        credits: subjectForm.credits - 1
      });
    }
  }

  function increaseCredits(event) {
    event.preventDefault();

    if (subjectForm.credits < MAX_CREDITS) {
      setSubjectForm({
        ...subjectForm,
        credits: subjectForm.credits + 1
      });
    }
  }

  if (!isOpen) return null;

  return (
    <section
      className="SubjectModal"
      onClick={handleClick}
    >
      <div className="SubjectModal-formContainer">
        <h2>Editar asignatura</h2>
        <hr />
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
              min={MIN_CREDITS}
              max={MAX_CREDITS}
              required
            />
            <div className="SubjectModal-buttonContainer">
              <button
                className="SubjectModal-button"
                onClick={decreaseCredits}
              >
                -
              </button>
              <button
                className="SubjectModal-button"
                onClick={increaseCredits}
              >
                +
              </button>
            </div>
          </div>
          <div className="SubjectModal-buttonContainer">
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
          </div>
        </form>
      </div>
    </section>
  );
};

export default SubjectModal;
