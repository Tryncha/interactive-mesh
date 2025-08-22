import './SubjectTooltip.css';

const SubjectTooltip = ({ isHovering, subjectObj }) => {
  const { prerequired, corequired } = subjectObj;

  if (!(isHovering && (prerequired.length > 0 || corequired.length > 0))) return null;

  return (
    <div className="SubjectTooltip">
      {prerequired.length > 0 ? (
        <>
          <span className="SubjectTooltip-title">Prerrequisitos</span>
          <ul>
            {prerequired.map((pre) => (
              <li key={pre.id}>{pre.name}</li>
            ))}
          </ul>
        </>
      ) : null}
      {corequired.length > 0 ? (
        <>
          <span className="SubjectTooltip-title">Correquisitos</span>
          <ul>
            {corequired.map((pre) => (
              <li key={pre.id}>{pre.name}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default SubjectTooltip;
