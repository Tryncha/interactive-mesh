import { useContext } from 'react';
import MeshContext from '../../context/MeshContext';

const MeshInfo = () => {
  const { setCompletedSubjectsIds } = useContext(MeshContext);

  function resetSubjects() {
    if (window.confirm('¿Seguro que quieres reiniciar la malla?')) {
      setCompletedSubjectsIds([]);
    }
  }

  return (
    <section className="MeshInfo">
      <button
        className="u-resetButton"
        onClick={resetSubjects}
      >
        Reiniciar
      </button>
      <hr className="u-vr" />
      <div className="MeshInfo-progress">
        <span>Créditos: 20/60</span>
        <span>Progreso: 80%</span>
      </div>
    </section>
  );
};

export default MeshInfo;
