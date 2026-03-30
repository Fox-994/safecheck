// lib/diagnosis-engine.js

const MAX_DEPENDENCY_PENALTY = 12;
const MAX_CHECKLIST_ITEMS = 5;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getSeverity(value) {
  if (value === 3) return 'critical';
  if (value === 2) return 'warning';
  return 'good';
}

function getBaseRiskPoints(value, weight = 1) {
  if (value === 3) return 100 * weight;
  if (value === 2) return 55 * weight;
  return 0;
}

function buildQuestionMap(questions = []) {
  return questions.reduce((acc, question) => {
    acc[question.id] = question;
    return acc;
  }, {});
}

function applyDependencyRules({ answers, questions, dependencyRules }) {
  const questionMap = buildQuestionMap(questions);
  const dependencyBoostMap = {};
  const matchedRules = [];
  let totalPenalty = 0;

  for (const rule of dependencyRules) {
    const triggerValue = answers?.[rule.triggerQuestionId];

    if (!rule.triggerValues.includes(triggerValue)) continue;

    matchedRules.push({
      id: rule.id,
      triggerQuestionId: rule.triggerQuestionId,
      triggerValue,
      penalty: rule.penalty || 0,
      reason: rule.reason,
      affects: rule.affects,
    });

    totalPenalty += rule.penalty || 0;

    for (const affected of rule.affects) {
      if (!questionMap[affected.questionId]) continue;

      dependencyBoostMap[affected.questionId] =
        (dependencyBoostMap[affected.questionId] || 0) + affected.boost;
    }
  }

  return {
    dependencyBoostMap,
    matchedRules,
    totalPenalty: clamp(totalPenalty, 0, MAX_DEPENDENCY_PENALTY),
  };
}

function buildPriorityItems({
  answers,
  questions,
  dependencyBoostMap,
  actionLibrary,
}) {
  return questions
    .filter((question) => typeof answers?.[question.id] === 'number')
    .map((question) => {
      const value = answers[question.id];
      const weight = question.weight || 1;
      const baseRisk = getBaseRiskPoints(value, weight);
      const dependencyBoost = dependencyBoostMap[question.id] || 0;
      const finalPriorityScore = baseRisk + dependencyBoost;
      const action = actionLibrary?.[question.id]?.[value] || null;

      return {
        questionId: question.id,
        title: question.shortTitle || question.title || question.id,
        category: question.category || null,
        value,
        severity: getSeverity(value),
        weight,
        baseRisk,
        dependencyBoost,
        finalPriorityScore,
        action,
      };
    })
    .sort((a, b) => b.finalPriorityScore - a.finalPriorityScore);
}

function buildChecklist(priorityItems) {
  const result = [];
  const usedIds = new Set();

  for (const item of priorityItems) {
    if (![2, 3].includes(item.value)) continue;
    if (!item.action) continue;
    if (usedIds.has(item.questionId)) continue;

    result.push({
      id: item.questionId,
      questionId: item.questionId,
      title: item.action.title,
      description: item.action.description,
      guidePath: item.action.guidePath || null,
      impact: item.action.impact || 0,
      eta: item.action.eta || null,
      basedOnSeverity: item.value,
      priorityScore: item.finalPriorityScore,
      dependencyBoost: item.dependencyBoost,
    });

    usedIds.add(item.questionId);

    if (result.length >= MAX_CHECKLIST_ITEMS) break;
  }

  return result.sort((a, b) => {
    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }

    return (b.impact || 0) - (a.impact || 0);
  });
}

export function buildDiagnosis({
  answers,
  questions = [],
  baseScore = 0,
  dependencyRules = [],
  actionLibrary = {},
}) {
  const {
    dependencyBoostMap,
    matchedRules,
    totalPenalty,
  } = applyDependencyRules({
    answers,
    questions,
    dependencyRules,
  });

  const priorityItems = buildPriorityItems({
    answers,
    questions,
    dependencyBoostMap,
    actionLibrary,
  });

  const checklist = buildChecklist(priorityItems);
  const topPriorities = priorityItems.slice(0, 3);

  const finalScore = clamp(Math.round(baseScore - totalPenalty), 0, 100);

  return {
    baseScore,
    finalScore,
    dependencyPenalty: totalPenalty,
    dependencyBoostMap,
    matchedRules,
    priorityItems,
    topPriorities,
    checklist,
  };
}