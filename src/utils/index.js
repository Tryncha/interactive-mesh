export function verifyRequired(completedSubjects, subjectObj) {
  const hasPreMet = subjectObj.prerequired.every((pre) => {
    const subjectIds = completedSubjects.map((sbj) => sbj.id);
    return subjectIds.includes(pre.id);
  });

  return hasPreMet;
}

export function verifyCompleted(completedSubjects) {
  let updatedSubjects = [...completedSubjects];

  updatedSubjects.forEach((extSbj) => {
    if (!verifyRequired(updatedSubjects, extSbj)) {
      const withoutNewSubjectId = updatedSubjects.filter((intSbj) => intSbj !== extSbj);
      updatedSubjects = verifyCompleted(withoutNewSubjectId);
    }
  });

  return updatedSubjects;
}
