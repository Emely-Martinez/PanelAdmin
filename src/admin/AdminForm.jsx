import { useState, useEffect } from 'react';
import { pb } from './pocketbase';

export default function AdminForm({ collectionName, recordToEdit, onSaved }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (recordToEdit) {
      setNombre(recordToEdit.title || recordToEdit.nombre || '');
      setDescripcion(recordToEdit.description || recordToEdit.descripcion || '');
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [recordToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { 
      nombre: nombre, 
      descripcion: descripcion,
      title: nombre, 
      description: descripcion 
    };

    try {
      if (recordToEdit) {
        await pb.collection(collectionName).update(recordToEdit.id, data);
      } else {
        await pb.collection(collectionName).create(data);
      }
      setNombre('');
      setDescripcion('');
      if (onSaved) onSaved();
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'rgba(13, 22, 18, 0.85)',
      border: '1px solid #1e3a2b',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      <h3 style={{ margin: 0, color: '#22c55e', fontSize: '1.2rem' }}>
        {recordToEdit ? ' Editar Servicio' : ' Agregar Nuevo Servicio'}
      </h3>

      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#cbd5e1' }}>
          Nombre del Servicio
        </label>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          placeholder="Ej: Mantenimiento Preventivo"
          required 
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #274e37',
            backgroundColor: '#070d0a',
            color: '#ffffff',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#cbd5e1' }}>
          Descripción
        </label>
        <textarea 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          placeholder="Detalles del servicio..."
          required 
          rows="3"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #274e37',
            backgroundColor: '#070d0a',
            color: '#ffffff',
            boxSizing: 'border-box',
            resize: 'vertical'
          }}
        />
      </div>

      <button 
        type="submit" 
        style={{
          backgroundColor: '#16a34a',
          color: '#ffffff',
          border: 'none',
          padding: '10px 18px',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer',
          alignSelf: 'flex-start'
        }}
      >
        {recordToEdit ? 'Guardar Cambios' : 'Registrar Servicio'}
      </button>
    </form>
  );
}