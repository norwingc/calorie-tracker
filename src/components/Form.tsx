import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type formProps = {
  dispatch: React.Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: formProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    setActivity(
      state.activeId
        ? state.activities.filter((a) => a.id === state.activeId)[0]
        : initialState
    );
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? Number(e.target.value) : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidActivity()) return;

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Ej. Comida, Jugo de Naranja, etc."
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Ej. 300, 500, etc."
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full text-white font-bold p-2 uppercase cursor-pointer disabled:opacity-10"
        value={`Guardar ${activity.category === 1 ? "Comida" : "Ejercicio"}`}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
