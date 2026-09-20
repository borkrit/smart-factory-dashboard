import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import type { Shift } from "../types/database";

type ShiftFormData = Omit<Shift, "id" | "created_at">;

const initState: ShiftFormData = {
  name: "",
  code: "",
  startTime: "",
  endTime: "",
};

const AddShifts = () => {
  const [shift, setShift] = useState<ShiftFormData>(initState);
  const [shiftsList, setShiftsList] = useState<Shift[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);


  const fetchShifts = async () => {
    try {
      setFetching(true);
      const { data, error } = await supabase
        .from("shifts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching shifts:", error.message);
        return;
      }

      if (data) {
        setShiftsList(data);
      }
    } catch (err) {
      console.error("Unexpected error fetching shifts:", err);
    } finally {
      setFetching(false);
    }
  };

  
  useEffect(() => {
    fetchShifts();
  }, []);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShift((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("shifts").insert({
        name: shift.name,
        code: shift.code,
        start_time: shift.startTime,
        end_time: shift.endTime,
      });

      if (error) {
        console.error("Error creating shift:", error.message);
        alert(`Error: ${error.message}`);
        return;
      }

      setShift(initState);
      
      await fetchShifts();
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
     
      <div className="w-full max-w-md p-5 bg-slate-800 rounded-xl text-white shadow-lg">
        <h2 className="text-lg font-bold border-b border-slate-700 pb-2 mb-4">
          Existing Shifts
        </h2>

        {fetching ? (
          <p className="text-slate-400 text-sm">Loading shifts...</p>
        ) : shiftsList.length === 0 ? (
          <p className="text-slate-400 text-sm">No shifts created yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {shiftsList.map((item) => (
              <div
                key={item.code}
                className="p-3 bg-slate-700/60 border border-slate-600 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold text-amber-300">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    Code: <span className="font-mono">{item.code}</span>
                  </div>
                </div>
                <div className="text-xs bg-slate-800 px-2.5 py-1 rounded border border-slate-600 font-mono">
                  {item.startTime} - {item.endTime}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md p-5 bg-slate-800 rounded-xl text-white shadow-lg shrink-0"
      >
        <h2 className="text-lg font-bold border-b border-slate-700 pb-2">
          Add New Shift
        </h2>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Name Shift
          <input
            name="name"
            type="text"
            required
            value={shift.name}
            onChange={handleChangeForm}
            placeholder="e.g. Morning Shift"
            className="p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Code Shift
          <input
            name="code"
            type="text"
            required
            value={shift.code}
            onChange={handleChangeForm}
            placeholder="e.g. SHIFT_1"
            className="p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </label>

        <div className="flex gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium flex-1">
            Start time Shift
            <input
              name="startTime"
              type="time"
              required
              value={shift.startTime}
              onChange={handleChangeForm}
              className="p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium flex-1">
            End time Shift
            <input
              name="endTime"
              type="time"
              required
              value={shift.endTime}
              onChange={handleChangeForm}
              className="p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 py-2 px-4 bg-amber-500 hover:bg-amber-600 font-bold text-slate-900 rounded-lg transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      
    </div>
  );
};

export default AddShifts;