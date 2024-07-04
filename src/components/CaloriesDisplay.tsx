type CaloriesDisplayProps = {
  calories: number;
  text: string;
};

export default function CaloriesDisplay({
  calories,
  text,
}: CaloriesDisplayProps) {
  return (
    <p className="text-white font-bold rounnded-full text-center grid grid-cols-1 gap-3">
      <span className="font-bold text-6xl">{calories}</span>
      {text}
    </p>
  );
}
