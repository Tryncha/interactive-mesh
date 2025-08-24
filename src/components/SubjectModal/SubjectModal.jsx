import { useState, useEffect, useContext, useId, useRef } from 'react';
import MeshContext from '../../context/MeshContext';
import './SubjectModal.css';

const SubjectModal = ({ isOpen, closeModal, subjectObj }) => {
  const subjectNameInputId = useId();
  const subjectCreditsInputId = useId();
  const modalRef = useRef(null);
  const subjectNameInputRef = useRef(null);

  const MIN_CREDITS = 1;
  const MAX_CREDITS = 10;
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

  useEffect(() => {
    function selectText() {
      subjectNameInputRef.current.focus();
      subjectNameInputRef.current.select();
    }

    if (isOpen) selectText();
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCancel();
      }
    }

    function handleKeydown(event) {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }

      if (event.key === 'Escape') {
        handleCancel(event);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
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
    <section className="SubjectModal">
      <div
        className="SubjectModal-modalContainer"
        ref={modalRef}
      >
        <h2>Editar asignatura</h2>
        <hr />
        <form
          className="SubjectModal-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor={subjectNameInputId}>Nombre</label>
          <input
            type="text"
            name="name"
            id={subjectNameInputId}
            ref={subjectNameInputRef}
            value={subjectForm.name}
            onChange={handleFormChange}
            autoComplete="on"
            required
          />
          <label htmlFor={subjectCreditsInputId}>Créditos</label>
          <div className="SubjectModal-creditsInputContainer">
            <button
              className="SubjectModal-button SubjectModal-creditButton"
              onClick={decreaseCredits}
            >
              -
            </button>
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
            <button
              className="SubjectModal-button SubjectModal-creditButton"
              onClick={increaseCredits}
            >
              +
            </button>
          </div>
          <div className="SubjectModal-buttonContainer">
            <button
              className="SubjectModal-button SubjectModal-button--submit"
              type="submit"
            >
              Guardar cambios
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
