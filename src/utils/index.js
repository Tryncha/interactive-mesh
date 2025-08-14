import subjectsPerSemester from '../constants/subjectsPerSemester.json';

export function verifyRequired(completedSubjectsIds, subjectObj) {
  return subjectObj.prerequired.every((pre) => completedSubjectsIds.includes(pre.id));
}

export function verifyCompletedIds(completedSubjectsIds) {
  let updatedIds = [...completedSubjectsIds];

  updatedIds.forEach((extSbjId) => {
    const subjectObj = subjectsPerSemester.flat().find((sbj) => sbj.id === extSbjId);

    if (!verifyRequired(updatedIds, subjectObj)) {
      const withoutNewSubjectId = updatedIds.filter((intSbjId) => intSbjId !== extSbjId);
      updatedIds = verifyCompletedIds(withoutNewSubjectId);
    }
  });

  return updatedIds;
}
