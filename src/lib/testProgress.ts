const STORAGE_KEY = "quironaTestProgress";

export const loadTestProgress = (): Record<string, boolean> => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? (JSON.parse(item) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
};

export const saveTestProgress = (progress: Record<string, boolean>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const markTestCompleted = (testId: string) => {
  const progress = loadTestProgress();
  progress[testId] = true;
  saveTestProgress(progress);
};
