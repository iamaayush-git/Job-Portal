// components/ConfirmationModal.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const ConfirmationModal = ({ showConfirmation, title, message, onCancel, onConfirm }) => {
  const { loading } = useSelector(state => state.loading)

  if (!showConfirmation) return null;

  return (
    <div className="fixed inset-0 bg-gray-50  -opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="mb-4 text-gray-700">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          {
            loading ? <button disabled
              className="flex items-center justify-center gap-3 cursor-not-allowed px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Please wait <AiOutlineLoading3Quarters className='animate-spin' />
            </button> : <button
              onClick={onConfirm}
              className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirm
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
