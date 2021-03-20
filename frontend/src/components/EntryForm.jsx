import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntries } from "../API";

const EntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      values.latitude = location.latitude;
      values.longitude = location.longitude;
      const created = await createLogEntries(values);
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='entryLog'>
      {error ? <div className='ERROR'></div> : null}
      <label>Title</label>
      <input name='title' required ref={register} />
      <label htmlFor='comments'>Comments</label>
      <textarea name='comments' rows={3} ref={register}></textarea>
      <label htmlFor='description'>Description</label>
      <textarea name='description' rows={3} ref={register}></textarea>
      <label htmlFor='image'>Image</label>
      <input name='image' ref={register} />
      <label htmlFor='visitDate'>Visit Date</label>
      <input name='visitDate' type='date' required ref={register} />
      <button className="createEntry" disabled={loading}>{loading ? "loading" : "Create Entry"}</button>
    </form>
  );
};

export default EntryForm;