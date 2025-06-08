import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function ConfirmationModal({ title, message, isOpen, onConfirm, onCancel }) {
  const { loading } = useSelector(state => state.loading)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          {
            loading ? <button disabled
              className="flex items-center justify-center gap-3 cursor-not-allowed px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Please wait <AiOutlineLoading3Quarters className='animate-spin' />
            </button> : <button
              onClick={onConfirm}
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Confirm
            </button>
          }
        </div>
      </div>
    </div>
  );
}
